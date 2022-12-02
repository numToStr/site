import nextra from "nextra";

const withNextra = nextra({
    theme: "nextra-theme-blog",
    themeConfig: "./theme.config.js",
    staticImage: true,
    defaultShowCopyCode: true,
    readingTime: true,
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
    reactStrictMode: true,
    experimental: {
        legacyBrowsers: false,
    },
    async redirects() {
        return [
            {
                source: "/tags",
                destination: "/blog",
                permanent: false,
            },
        ];
    },
};

export default withNextra(config);
