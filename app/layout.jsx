import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-blog";
import { Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-blog/style.css";
import { NAME, UNAME, EMAIL, SITE, TWITTER } from "../const.mjs";
/**
 * @type {import("next").Metadata}
 */
export const metadata = {
    title: {
        template: `%s | ${NAME}`,
    },
    openGraph: {
        url: SITE,
        // siteName: "Nextra",
        locale: "en_US",
        type: "website",
    },
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head backgroundColor={{ dark: "#0f172a", light: "#fefce8" }} />
            <body>
                <Layout>
                    <Navbar pageMap={await getPageMap()}>
                        <Search />
                        <ThemeSwitch />
                    </Navbar>

                    {children}

                    <Footer>
                        <Footer2 />
                    </Footer>
                </Layout>
            </body>
        </html>
    );
}

function Footer2() {
    // const { pathname } = useRouter();
    // const isPost = blogRegex.test(pathname);

    return (
        <footer>
            <hr />
            <section className="legends">
                <nav>
                    <a
                        href={`https://twitter.com/${UNAME}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                    <span> · </span>
                    <a
                        href={`https://github.com/${UNAME}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <span> · </span>
                    <a
                        href={`mailto:${EMAIL}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {EMAIL}
                    </a>
                </nav>
                {/* <aside>
                    {isPost ? (
                        <a
                            title="Found a Typo? Have any suggestions? Feel free to submit a PR :)"
                            href={`https://github.com/${UNAME}/site/edit/main/pages${pathname}.mdx`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Edit on Github
                        </a>
                    ) : null}
                </aside> */}
            </section>
            <section style={{ marginTop: "4rem" }}>
                <abbr
                    title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License."
                    style={{ cursor: "help" }}
                >
                    CC BY-NC-SA 4.0
                </abbr>
                <time> {new Date().getFullYear()}</time> &copy; {NAME}.
                {/* <a href="/feed.xml">RSS</a> */}
            </section>
        </footer>
    );
}
