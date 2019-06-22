module.exports = {
    siteMetadata: {
        name: "Vikas Raj",
        title: `Full Stack Developer`,
        description: `Full Stack Developer who loves to make new things.`,
        about: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis accusamus dolore excepturi cum vero, nulla consectetur aliquam deserunt aut doloribus sed ratione magnam vitae deleniti id, delectus expedita maxime iste maiores aperiam voluptatem at libero nihil tempora. Ullam natus, error possimus dignissimos cum delectus corrupti aliquam nulla ut nesciunt molestiae illum tempore quo consequuntur nihil praesentium. Unde odio laborum repudiandae. vero, nulla consectetur aliquam deserunt aut doloribus sed ratione magnam vitae deleniti id, delectus expedita maxime iste maiores aperiam voluptatem at libero nihil tempora. Ullam natus, error possimus dignissimos cum delectus corrupti aliquam nulla ut nesciunt molestiae illum tempore quo consequuntur nihil praesentium. Unde odio laborum repudiandae.`,
        author: `@numToStr`,
        social: {
            twitter: "numToStr",
            github: "vkasraj",
        },
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
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/posts`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `vikasraj.dev`,
                start_url: `/`,
                background_color: `#000`,
                theme_color: `#000`,
                display: `hello...`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    // gatsby-remark-relative-images must
                    // go before gatsby-remark-images
                    {
                        resolve: `gatsby-remark-relative-images`,
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590,
                            linkImagesToOriginal: false,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        `gatsby-plugin-sass`,
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
