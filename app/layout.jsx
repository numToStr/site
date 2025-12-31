import Script from "next/script";
import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-blog";
import { Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-blog/style.css";
import { JetBrains_Mono } from "next/font/google";
import { NAME, SITE, TWITTER } from "../common/const.mjs";
import { BlogFooter } from "../common/components/footer";

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;

const jetBrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
});

/**
 * @type {import("next").Metadata}
 */
export const metadata = {
    metadataBase: SITE,
    title: {
        template: `%s | ${NAME}`,
    },
    referrer: "origin-when-cross-origin",
    category: "technology",
    authors: NAME,
    alternates: {
        canonical: "./",
    },
    openGraph: {
        url: "./",
        locale: "en_US",
        type: "website",
        images: "/og",
        publishedTime: "2023-01-01T00:00:00.000Z",
        logo: "/logo.png",
    },
    twitter: {
        card: "summary_large_image",
        creator: TWITTER,
        site: TWITTER,
        url: "./",
    },
    other: {
        author: NAME,
    },
};

// /**
//  *
//  * @param {{params: Promise<{slug: string}>, searchParams: Promise<{ [key: string]: string | string[] | undefined }>}} props
//  * @param {import("next").ResolvingMetadata} parent
//  * @returns {import("next").Metadata}
//  */
// export async function generateMetadata(props, parent) {
//     return {}
// }

export default async function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head backgroundColor={{ light: "#fefce8" }}>
                <style>
                    {`
                    :root {
                        --x-default-font-family: ${jetBrains.style.fontFamily};
                    }

                    kbd {
                        border: 1px solid;
                        padding: 0.1em 0.4em;
                        border-radius: 0.4em;
                        border-bottom: 0.24em solid;
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
            </Head>
            <body>
                <Layout>
                    <Navbar pageMap={await getPageMap()}>
                        <Search />
                        <ThemeSwitch />
                    </Navbar>

                    {children}

                    <Footer>
                        <BlogFooter />
                    </Footer>
                </Layout>
            </body>
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
        </html>
    );
}
