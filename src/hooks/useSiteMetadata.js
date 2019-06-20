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
                        platform
                        name
                    }
                }
            }
        }
    `);

    return site.siteMetadata;
}

export default useSiteMetadata;
