import Link from "next/link";
import { NAME } from "../common/const.mjs";

export const metadata = {
    title: `Hey 👋 | ${NAME}`,
    description:
        "I am Vikas Rajbanshi, a software engineer based in India. I know how to code for the browser and server but I personally enjoy building stuff for the terminals.",
};

export default function About() {
    return (
        <main>
            <h1>Hey 👋</h1>
            <p>
                I am <strong>Vikas Rajbanshi</strong>, a Software Engineer based
                in India. I know how to code for the browser & server but I
                personally enjoy building stuff for the terminals.
            </p>
            <p>
                Mostly self taught and never took any formal education related
                to Computer Science. Did my graduation in Bachelor of Commerce
                (Hons) from Delhi Universtiy and completed my High School
                education from Kendriya Vidhyalaya.
            </p>
            <p>
                I love making tools and contributing to Open Source. My notable
                work are{" "}
                <a
                    href="https://github.com/numToStr/Comment.nvim"
                    target="_blank"
                    rel="noreferrer"
                >
                    Comment.nvim
                </a>
                {", "}
                <a
                    href="https://github.com/numToStr/FTerm.nvim"
                    target="_blank"
                    rel="noreferrer"
                >
                    FTerm.nvim
                </a>
                {", "}
                <a
                    href="https://github.com/numToStr/lemmy-help"
                    target="_blank"
                    rel="noreferrer"
                >
                    lemmy-help
                </a>
                .
            </p>
            <p>
                Thank you for visiting and be sure to check out my{" "}
                <Link href="/blog">
                    <strong>writiings</strong>
                </Link>
                !
            </p>
        </main>
    );
}
