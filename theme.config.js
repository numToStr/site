import { useRouter } from "next/router";
import pkg from "./package.json";

const NAME = pkg.author.name;
const SITE = pkg.author.url;
const TWITTER = pkg.author.twitter;
const EMAIL = pkg.author.email;
const LOGO = `${SITE}/logo.png`;

function Seo({ meta }) {
    const { pathname } = useRouter();
    const title = `${meta.title} - ${NAME}`;
    const type = "date" in meta ? "article" : "website";

    return (
        <>
            {/* <!-- Search Engine --> */}
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link
                rel="canonical"
                href={`${SITE}${pathname}`}
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

            {/* Visit https://cards.microlink.io/*/}
            {/* Somehow create cover images at build time and store them at public folder */}
            {/*
                <meta name="image" content="" />
                <meta itemProp="image" content="" />
                <meta property="og:image" content="" />
                <meta name="twitter:image" content="" />
                */}
        </>
    );
}

function Footer() {
    const { pathname } = useRouter();
    const isPost = /\/blog\/.+/.test(pathname);

    return (
        <footer>
            <hr />
            <div className="legends">
                <div>
                    <a
                        href="https://twitter.com/numToStr"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                    <span> · </span>
                    <a
                        href="https://github.com/numToStr"
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
                </div>
                <div>
                    {isPost ? (
                        <a
                            title="Found a Typo? Have any suggestions? Feel free to submit a PR :)"
                            href={`https://github.com/numToStr/site/edit/main/pages${pathname}.mdx`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Edit on Github
                        </a>
                    ) : null}
                </div>
            </div>
            <div style={{ marginTop: "4rem" }}>
                <abbr
                    title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
                    style={{ cursor: "help" }}
                >
                    CC BY-NC 4.0
                </abbr>
                <time> {new Date().getFullYear()}</time> &copy; {NAME}.
                {/* <a href="/feed.xml">RSS</a> */}
            </div>
        </footer>
    );
}

const theme = {
    darkMode: true,
    readMore: "Read More →",
    titleSuffix: ` - ${NAME}`,
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
