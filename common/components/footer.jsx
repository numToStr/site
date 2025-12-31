import { NAME, UNAME, EMAIL } from "../const.mjs";
import { PageEdit } from "./page-edit";

export function BlogFooter() {
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
                <PageEdit />
            </section>
            <section style={{ marginTop: "2rem" }}>
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
