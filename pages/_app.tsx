import "nextra-theme-blog/style.css";

export default function App({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page: React.Component) => page);

    return (
        <>
            <style global jsx>
                {`
                    :root {
                        font-family: "Fira Code", monospace;
                    }

                    .post-item .post-item-title {
                        font-weight: 700;
                    }

                    .post-item > h3 {
                        margin-bottom: 0;
                    }

                    .post-item .post-item-date {
                        --tw-text-opacity: inherit;
                    }

                    .post-item .post-item-more {
                        margin-left: 0.5rem;
                    }

                    h2 a.subheading {
                        font-weight: bold;
                    }

                    code::after,
                    code::before,
                    blockquote > p::after,
                    blockquote > p::before {
                        content: none !important;
                    }
                `}
            </style>
            {getLayout(<Component {...pageProps} />)}
        </>
    );
}
