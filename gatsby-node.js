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
    const tagTemplate = path.resolve(__dirname, "src/templates/Tag.js");

    const { data } = await graphql(`
        query {
            allMarkdownRemark(
                sort: { fields: frontmatter___date, order: DESC }
            ) {
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
                        frontmatter {
                            tags
                        }
                    }
                }
            }
        }
    `);

    let tags = [];
    data.allMarkdownRemark.edges.forEach(
        ({ node: { fields, frontmatter }, previous, next }) => {
            const _previous = previous ? previous.fields.slug : null;
            const _next = next ? next.fields.slug : null;

            tags = tags.concat(frontmatter.tags);

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

    // Removing unique values
    tags = new Set(tags);

    const kebabCase = text =>
        String(text)
            .toLowerCase()
            .replace(/ /g, "_");

    // Make tag pages
    tags.forEach(tag => {
        createPage({
            path: `/tags/${kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
                tag,
            },
        });
    });
};
