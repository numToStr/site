import { useBlogContext } from "nextra-theme-blog";
import { NAME, SITE, TWITTER } from "./const";

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
            {/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
            {/* <link
                rel="canonical"
                href={`${SITE}${opts.route}`}
                key="canonical_url"
            /> */}
            {/* <meta name="author" content={NAME} key="author" />
            <meta name="title" content={title} key="title" />
            <meta
                name="description"
                content={meta.description}
                key="description"
            /> */}

            {/* <!-- Schema.org for Google --> */}
            <meta itemProp="name" content={title} key="schema_title" />
            <meta
                itemProp="description"
                content={meta.description}
                key="schema_description"
            />
            {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
            {/* <meta property="og:type" content={type} key="og_type" />
            <meta property="og:title" content={title} key="og_title" />
            <meta
                property="og:description"
                content={meta.description}
                key="og_description"
            />
            <meta property="og:url" content={SITE} key="og_url" /> */}
            {/* <meta property="og:logo" content={LOGO} key="og_logo" /> */}

            {/* <!-- Twitter --> */}
            {/* <meta
                property="twitter:card"
                content="summary_large_image"
                key="twitter_card"
            />
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
            /> */}
            {/* <meta property="twitter:url" content={SITE} key="twitter_url" /> */}
            {/* <meta property="twitter:image" content={LOGO} key="twitter_image" /> */}
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

const theme = {
    darkMode: true,
    readMore: "Read More →",
    titleSuffix: ` ❙ ${NAME}`,
    head: Seo,
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
