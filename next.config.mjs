import nextra from "nextra";

const withNextra = nextra({
    theme: "nextra-theme-blog",
    themeConfig: "./theme.config.js",
    unstable_staticImage: true,
    unstable_defaultShowCopyCode: true,
    unstable_readingTime: true,
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
    experimental: {
        // newNextLinkBehavior: true, // Not needed for now
        browsersListForSwc: true,
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
