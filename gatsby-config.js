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
        "gatsby-plugin-top-layout",
        {
            resolve: `gatsby-plugin-material-ui`,
            // options: {
            //     stylesProvider: {
            //         injectFirst: true,
            //     },
            // },
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `red`,
                // Disable the loading spinner.
                showSpinner: false,
            },
        },
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
                icon: `src/images/logo.jpg`, // This path is relative to the root of the site.
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
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: "language-",
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in src/layouts/index.js
                            // right after importing the prism color scheme:
                            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,
                            // This adds a new language definition to Prism or extend an already
                            // existing language definition. More details on this option can be
                            // found under the header "Add new language definition or extend an
                            // existing language" below.
                            languageExtensions: [
                                {
                                    language: "superscript",
                                    extend: "javascript",
                                    definition: {
                                        superscript_types: /(SuperType)/,
                                    },
                                    insertBefore: {
                                        function: {
                                            superscript_keywords: /(superif|superelse)/,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
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
