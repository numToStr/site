import { useStaticQuery, graphql } from "gatsby";

function useBlogs() {
    const {
        allMarkdownRemark: { edges },
    } = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            date
                        }
                        excerpt(format: PLAIN, pruneLength: 50)
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    return edges;
}

export default useBlogs;
