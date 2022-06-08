import fs from "fs";
import { globby } from "globby";
import prettier from "prettier";

// This is a workaround for vercel not supporting json modules
const pkg = JSON.parse(
    fs.readFileSync(new URL("../package.json", import.meta.url))
);

const prettierConfig = await prettier.resolveConfig("./.prettierrc");

const pages = await globby([
    "pages/*.js",
    "pages/*.mdx",
    "pages/**/*.mdx",
    "pages/**/*.md",
    "!pages/_*.js",
    "!pages/api",
    "!pages/404.js",
]);

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

            //  <url>
            //     <loc>http://website.com/page</loc>
            //     <lastmod>date created</lastmod>
            //     <changefreq>monthly</changefreq>
            //     <priority>1.0</priority>
            // </url>

            return `
                <url>
                    <loc>${pkg.author.url}${path}</loc>
                </url>
            `;
        })
        .join("\n")}
</urlset>`;

const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
});

fs.writeFileSync("./public/sitemap.xml", formatted);
