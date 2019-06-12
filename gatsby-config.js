module.exports = {
    siteMetadata: {
        name: "Vikas Raj",
        title: `Full Stack Developer`,
        description: `Full Stack Developer who loves to make new things.`,
        author: `@numberToString`,
        social: [
            {
                platform: "twitter",
                name: "numberToString",
            },
            {
                platform: "github",
                name: "vkasraj",
            },
        ],
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-material-ui`,
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /images/, // See below to configure properly
                },
            },
        },
        {
            resolve: "gatsby-plugin-no-sourcemaps",
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
