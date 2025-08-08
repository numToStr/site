import { PostCard } from "nextra-theme-blog";
import { getPosts } from "../../common/get-posts";

export const metadata = {
    title: "Writings",
};

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <div data-pagefind-ignore="all">
            <h1>{metadata.title}</h1>
            {posts.map((post) => (
                <PostCard readMore="→" key={post.route} post={post} />
            ))}
        </div>
    );
}
