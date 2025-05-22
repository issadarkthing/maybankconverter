import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                crawlDelay: 1,
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: "/api/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: "/api/",
            },
        ],
        sitemap: "https://maybankconverter.vercel.app/sitemap.xml",
        host: "https://maybankconverter.vercel.app",
    };
}
