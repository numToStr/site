const NAME = "Vikas Rajbanshi";
const SITE = "https://vikasraj.dev";

const theme = {
    darkMode: true,
    readMore: "Read More →",
    titleSuffix: ` - ${NAME}`,
    head: ({ meta }) => {
        return (
            <>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="canonical" href={SITE} />
                <meta name="author" content={NAME} />
                <meta name="title" content={meta.title} />
                <meta property="description" content={meta.description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:url" content={SITE} />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:site" content="@numToStr" />
                <meta property="twitter:title" content={meta.title} />
                <meta
                    property="twitter:description"
                    content={meta.description}
                />
                <meta property="twitter:url" content={SITE} />
                <meta property="twitter:image" content={`${SITE}/logo.png`} />
            </>
        );
    },
    footer: (
        <div>
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
        </div>
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
