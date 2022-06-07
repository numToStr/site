const NAME = "Vikas Rajbanshi";
const SITE = "https://www.vikasraj.dev";

const theme = {
    darkMode: true,
    readMore: "Read More →",
    titleSuffix: ` - ${NAME}`,
    head({ meta }) {
        const title = `${meta.title}${this.titleSuffix}`;
        const type = "date" in meta ? "article" : "website";

        return (
            <>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="canonical" href={SITE} />
                <meta name="author" content={NAME} />
                <meta name="title" content={title} />
                <meta name="description" content={meta.description} />
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:url" content={SITE} />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:site" content="@numToStr" />
                <meta property="twitter:title" content={title} />
                <meta
                    property="twitter:description"
                    content={meta.description}
                />
                <meta property="twitter:url" content={SITE} />
                <meta property="twitter:image" content={`${SITE}/logo.png`} />
                {/* Visit https://cards.microlink.io/*/}
                {/* Somehow create cover images at build time and store them at public folder */}
                {/*
                <meta name="image" content="" />
                <meta itemProp="image" content="" />
                <meta property="og:image" content="" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="" />
                */}
            </>
        );
    },
    footer: (
        <footer>
            <hr />
            <small>
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
                    href="mailto:sudo@vikasraj.dev"
                    target="_blank"
                    rel="noreferrer"
                >
                    sudo@vikasraj.dev
                </a>
                <div style={{ marginTop: "2rem" }}>
                    <abbr
                        title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
                        style={{ cursor: "help" }}
                    >
                        CC BY-NC 4.0
                    </abbr>
                    <time> {new Date().getFullYear()}</time> © {NAME}.
                    {/* <a href="/feed.xml">RSS</a> */}
                </div>
            </small>
        </footer>
    ),
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
