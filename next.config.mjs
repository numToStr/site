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
                source: "/tags",
                destination: "/blog",
                permanent: false,
            },
        ];
    },
});
