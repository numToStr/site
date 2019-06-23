const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: `.env.development`,
});

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    const {
        internal: { type },
        fileAbsolutePath,
    } = node;

    if (type === "MarkdownRemark") {
        const filePath = path.parse(fileAbsolutePath);

        createNodeField({
            node,
            name: "slug",
            value: filePath.name,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const blogTemplate = path.resolve(__dirname, "src/templates/Blog.js");

    const { data } = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    previous {
                        fields {
                            slug
                        }
                    }
                    next {
                        fields {
                            slug
                        }
                    }
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    data.allMarkdownRemark.edges.forEach(
        ({ node: { fields }, previous, next }) => {
            const _previous = previous ? previous.fields.slug : null;
            const _next = next ? next.fields.slug : null;

            createPage({
                component: blogTemplate,
                path: `/blog/${fields.slug}`,
                context: {
                    previous: _previous,
                    slug: fields.slug,
                    next: _next,
                },
            });
        }
    );
};
