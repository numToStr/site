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
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    data.allMarkdownRemark.nodes.forEach(({ fields }) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${fields.slug}`,
            context: {
                slug: fields.slug,
            },
        });
    });
};
