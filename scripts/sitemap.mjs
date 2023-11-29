import fs from "node:fs";
import { globby } from "globby";
import prettier from "prettier";
import { SITE } from "../const.mjs";

const prettierConfig = await prettier.resolveConfig("./.prettierrc");

const pages = await globby([
    "pages/*.js",
    "pages/*.md",
    "pages/*.mdx",
    "pages/**/*.mdx",
    "pages/**/*.md",
    "!pages/_*.js",
    "!pages/api",
    "!pages/404.js",
]);

// fr-CA allows to format date in YYYY-MM-DD
const dateFmt = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map((page) => {
            const path = page
                .replace("pages/", "/")
                .replace(/\.(js|mdx|md)$/, "")
                .replace(/\/index$/, "");

            if (["/tags/[tag]"].includes(path)) {
                return "";
            }

            if (/\/blog\/.+/.test(page)) {
                const stats = fs.statSync(
                    new URL(`../${page}`, import.meta.url)
                );

                return `
                <url>
                    <loc>${SITE}${path}</loc>
                    <lastmod>${dateFmt.format(new Date(stats.mtime))}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>`;
            }

            return `
                <url>
                    <loc>${SITE}${path}</loc>
                </url>
            `;
        })
        .join("\n")}
</urlset>`;

const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
});

fs.writeFileSync("./public/sitemap.xml", formatted);
