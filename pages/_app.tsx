import Script from "next/script";

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;

export default function App({ Component, pageProps }) {
    return (
        <>
            <style global jsx>
                {`
                    :root {
                        font-family: "Fira Code", monospace;
                    }

                    blockquote > p::after,
                    blockquote > p::before {
                        content: none !important;
                    }

                    kbd {
                        border: 1px solid;
                        padding: 0 0.3rem 0.1rem;
                        border-radius: 0.3rem;
                        border-bottom: 0.2rem solid;
                    }

                    footer {
                        font-size: small;
                    }

                    footer .legends {
                        display: flex;
                        flex-direction: column;
                    }

                    footer .legends > div {
                        padding: 0.25rem 0;
                    }

                    @media only screen and (min-width: 600px) {
                        footer .legends {
                            flex-direction: row;
                            justify-content: space-between;
                        }
                    }
                `}
            </style>
            <Component {...pageProps} />
            <Script
                async
                id="gtag-script"
                src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
            />
            <Script
                id="gtag-setup"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GTAG_ID}');
                    `,
                }}
            />
        </>
    );
}
