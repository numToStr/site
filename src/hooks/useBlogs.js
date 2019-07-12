import { useStaticQuery, graphql } from "gatsby";

function useBlogs() {
    const {
        allMarkdownRemark: { edges },
    } = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                edges {
                    node {
                        timeToRead
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
