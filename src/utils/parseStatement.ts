export async function parseStatement(file: ArrayBufferLike) {
    const extracted = await load(file);
    const textContent = extracted.map((x) => x.pageContent).join("\n");
    const lines = textContent.split("\n");
    const transactionRegex =
        /^(\d{2}\/\d{2}(?:\/\d{2})?)(.+?)(\d{1,3}(?:,\d{3})*\.\d{2})([+-])((?:\d{1,3}(?:,\d{3})*|\d*)?\.\d{2})$/gm;
    const descriptionRegex = /^\s{3}/gm;

    let transaction = {
        data: "",
        date: "",
        details: "",
        amount: 0,
        sign: "",
        balance: 0,
        descriptions: [] as string[],
    };

    const transactions: (typeof transaction)[] = [];
    const statementInfo = {
        accountNumber: "",
        date: "",
        beginningBalance: 0,
        endingBalance: 0,
        totalCredit: 0,
        totalDebit: 0,
    };

    const flush = () => {
        if (transaction.data.length > 0) {
            transactions.push({ ...transaction });
            transaction = {
                data: "",
                date: "",
                details: "",
                amount: 0,
                sign: "",
                balance: 0,
                descriptions: [],
            };
        }
    };

    const gen = lineGenerator(lines);

    for (const line of gen) {
        if (line.match(transactionRegex)) {
            flush();

            const [, date, details, amount, sign, balance] =
                transactionRegex.exec(line)!;

            transaction.data = line;
            transaction.date = date;
            transaction.details = details.trim();
            transaction.amount = parseNumber(amount);
            transaction.sign = sign;
            transaction.balance = parseNumber(balance);
        } else if (line.match(descriptionRegex)) {
            transaction.descriptions.push(line.trim());
        } else if (line.startsWith("ENDING BALANCE :")) {
            flush();
            const [, balance] = line.split(":");
            statementInfo.endingBalance = parseNumber(balance);
        } else if (line.startsWith("NOMBOR AKAUN")) {
            for (let i = 0; i < 4; i++) {
                gen.next();
            }
            const { value } = gen.next();
            statementInfo.accountNumber = value!.trim();
        } else if (line.startsWith("TOTAL CREDIT")) {
            const [, totalCredit] = line.split(":");
            statementInfo.totalCredit = parseNumber(totalCredit);
        } else if (line.startsWith("TOTAL DEBIT")) {
            const [, totalDebit] = line.split(":");
            statementInfo.totalDebit = parseNumber(totalDebit);
        } else if (line.startsWith("BEGINNING BALANCE")) {
            const beginningBalance = line.replace("BEGINNING BALANCE", "");
            statementInfo.beginningBalance = parseNumber(beginningBalance);
        } else if (line.startsWith("STATEMENT DATE")) {
            gen.next();
            const { value } = gen.next();
            statementInfo.date = value!.trim();
        }
    }

    const matchedTransactions = lines.filter((line) =>
        line.match(transactionRegex)
    );

    return {
        matchedTransactions: matchedTransactions.length,
        missingTransactions: matchedTransactions.filter(
            (transaction) => !transactions.some((t) => t.data === transaction)
        ),
        transactions,
        statementInfo,
    };
}

function* lineGenerator(lines: string[]) {
    for (const line of lines) {
        yield line;
    }
}

function parseNumber(value: string) {
    return Number(value.replace(/,/g, ""));
}

async function load(file: ArrayBufferLike) {
    const { getDocument } = await getPdfJS();

    const pdf = await getDocument({
        data: file,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
    }).promise;

    const documents: { pageContent: string; pageNumber: number }[] = [];

    for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        if (content.items.length === 0) {
            continue;
        }

        let lastY: any;
        const textItems: string[] = [];
        for (const item of content.items) {
            if ("str" in item) {
                if (lastY === item.transform[5] || !lastY) {
                    textItems.push(item.str);
                } else {
                    textItems.push(`\n${item.str}`);
                }
                lastY = item.transform[5];
            }
        }

        const text = textItems.join("");
        documents.push({
            pageContent: text.trim(),
            pageNumber: i,
        });
    }

    return documents;
}

async function getPdfJS() {
    try {
        //@ts-ignore
        return { getDocument: PDFJS.getDocument };
    } catch (e) {
        console.error(e);
        throw new Error(
            "Failed to load pdf-parse. Please install it with eg. `npm install pdf-parse`."
        );
    }
}
