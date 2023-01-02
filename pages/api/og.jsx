import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: "edge",
};

const font = fetch(
    new URL("../../assets/FiraCode-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const AUTHOR = "Vikas Rajbanshi";

async function og(req) {
    const firaCode = await font;

    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const title = searchParams.get("t");
    const date = searchParams.get("d");

    if (!title) {
        return new ImageResponse(<>Visit with https://vikasraj.dev/blog</>, {
            width: 1200,
            height: 630,
        });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "60px 80px",
                    backgroundColor: "#030303",
                    border: "10px solid #ffffff",
                    fontWeight: 600,
                    color: "white",
                }}
            >
                <h3
                    style={{
                        position: "absolute",
                        top: 60,
                        left: 80,
                        fontSize: 18,
                        textTransform: "uppercase",
                    }}
                >
                    {AUTHOR}
                </h3>

                <h1
                    style={{
                        fontSize: 50,
                        letterSpacing: -2,
                        backgroundImage:
                            "linear-gradient(90deg, #fff 40%, #aaa)",
                        backgroundClip: "text",
                        "-webkit-background-clip": "text",
                        color: "transparent",
                    }}
                >
                    {title}
                </h1>
                <p style={{ color: "rgba(141, 141, 147, 1)" }}>
                    {date} · 3 Min
                </p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        position: "absolute",
                        left: 80,
                        bottom: 60,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        height="24px"
                        width="24px"
                        fill="#ffffff"
                        style={{ marginRight: 5, marginBottom: 2 }}
                    >
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
                    </svg>
                    <p>vikasraj.dev</p>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        position: "absolute",
                        right: 80,
                        bottom: 60,
                    }}
                >
                    <svg
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                        style={{ marginRight: 5, marginBottom: 2 }}
                    >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <p>/numToStr</p>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Fira Code",
                    data: firaCode,
                    style: "normal",
                },
            ],
        }
    );
}
export default og;
