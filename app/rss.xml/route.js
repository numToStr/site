import { NAME, SITE } from "../../common/const.mjs";
import { getPosts } from "../../common/get-posts";

export async function GET() {
    const allPosts = await getPosts();

    const posts = allPosts
        .map(
            (post) => `    <item>
        <title>${post.title}</title>
        <description>${post.frontMatter.description}</description>
        <link>${SITE}${post.route}</link>
        <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
    </item>`
        )
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>My Diary | ${NAME}</title>
    <link>${SITE}</link>
    <description>My little corner on the internet</description>
    <language>en-us</language>
${posts}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}
