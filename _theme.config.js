import { useRouter } from "next/router";
import { useBlogContext } from "nextra-theme-blog";
import { NAME, UNAME, EMAIL, SITE, TWITTER } from "./const";

const API = `${SITE}/api/og`;
const LOGO = `${SITE}/logo.png`;
const blogRegex = /\/blog\/.+/;
const dateFmt = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});

function OgImage({ content }) {
    return (
        <>
            <meta name="image" content={content} />
            <meta itemProp="image" content={content} />
            <meta property="og:image" content={content} />
            <meta name="twitter:image" content={content} />
        </>
    );
}

function BlogOgImages({ opts }) {
    const params = new URLSearchParams({
        t: opts.title,
        d: dateFmt.format(new Date(opts.frontMatter.date)),
        p: opts.route,
        r: opts.readingTime?.text,
    });

    return <OgImage content={`${API}?${params.toString()}`} />;
}

function Seo({ meta }) {
    const { opts } = useBlogContext();

    const title = `${meta.title} - ${NAME}`;
    const type = "date" in meta ? "article" : "website";

    const isPost = blogRegex.test(opts.route);

    return (
        <>
            {/* <!-- Search Engine --> */}
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link
                rel="canonical"
                href={`${SITE}${opts.route}`}
                key="canonical_url"
            />
            <meta name="author" content={NAME} key="author" />
            <meta name="title" content={title} key="title" />
            <meta
                name="description"
                content={meta.description}
                key="description"
            />

            {/* <!-- Schema.org for Google --> */}
            <meta itemProp="name" content={title} key="schema_title" />
            <meta
                itemProp="description"
                content={meta.description}
                key="schema_description"
            />

            {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
            <meta property="og:type" content={type} key="og_type" />
            <meta property="og:title" content={title} key="og_title" />
            <meta
                property="og:description"
                content={meta.description}
                key="og_description"
            />
            <meta property="og:url" content={SITE} key="og_url" />
            <meta property="og:logo" content={LOGO} key="og_logo" />

            <meta
                property="twitter:card"
                content="summary_large_image"
                key="twitter_card"
            />

            {/* <!-- Twitter --> */}
            <meta
                name="twitter:creator"
                content={TWITTER}
                key="twitter_creator"
            />
            <meta
                property="twitter:site"
                content={TWITTER}
                key="twitter_site"
            />
            <meta
                property="twitter:title"
                content={title}
                key="twitter_title"
            />
            <meta
                property="twitter:description"
                content={meta.description}
                key="twitter_description"
            />
            <meta property="twitter:url" content={SITE} key="twitter_url" />
            <meta property="twitter:image" content={LOGO} key="twitter_image" />

            {isPost ? (
                <BlogOgImages opts={opts} />
            ) : (
                <OgImage
                    content={`${API}?t=${encodeURIComponent(meta.title)}`}
                />
            )}
        </>
    );
}

function Footer() {
    const { pathname } = useRouter();
    const isPost = blogRegex.test(pathname);

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
                <aside>
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
                </aside>
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

const theme = {
    darkMode: true,
    readMore: "Read More →",
    titleSuffix: ` ❙ ${NAME}`,
    head: Seo,
    footer: <Footer />,
    // navs: [
    //     {
    //         url: "/",
    //         name: "About",
    //     },
    //     {
    //         url: "/blog",
    //         name: "Blog",
    //     },
    // ],
};

export default theme;
