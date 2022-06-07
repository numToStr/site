import fs from "fs";
import { globby } from "globby";
import prettier from "prettier";

const URL = "https://www.vikasraj.dev";

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
                .replace("posts/", "posts/")
                .replace(".js", "")
                .replace(".mdx", "")
                .replace(".md", "");

            if (["/blog/index", "/tags/[tag]"].includes(path)) {
                return false;
            }

            //  <url>
            //     <loc>http://website.com/page</loc>
            //     <lastmod>date created</lastmod>
            //     <changefreq>monthly</changefreq>
            //     <priority>1.0</priority>
            // </url>

            return `
                <url>
                    <loc>${URL}${path === "/index" ? "" : path}</loc>
                </url>
            `;
        })
        .filter(Boolean)
        .join("\n")}
</urlset>`;

const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
});

fs.writeFileSync("./public/sitemap.xml", formatted);
