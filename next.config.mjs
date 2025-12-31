import nextra from "nextra";

const withNextra = nextra({
    defaultShowCopyCode: true,
    readingTime: true,
});

export default withNextra({
    reactStrictMode: true,
    cleanDistDir: true,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/blog",
                permanent: false,
            },
            {
                source: "/tags",
                destination: "/blog",
                permanent: false,
            },
        ];
    },
    turbopack: {
        resolveAlias: {
            // Path to your `mdx-components` file with extension
            "next-mdx-import-source-file": "./mdx-components.jsx",
        },
    },
});
