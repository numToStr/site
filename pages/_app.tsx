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
                `}
            </style>
            {getLayout(<Component {...pageProps} />)}
        </>
    );
}
