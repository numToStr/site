import { useStaticQuery, graphql } from "gatsby";

function useSiteMetadata() {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    name
                    author
                    title
                    about
                    description
                    social {
                        twitter
                        github
                    }
                }
            }
        }
    `);

    return site.siteMetadata;
}

export default useSiteMetadata;
