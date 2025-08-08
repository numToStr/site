"use client";

import { usePathname } from "next/navigation";
import { UNAME } from "../const.mjs";

const postsRegex = /\/blog\/.+/;

export function PageEdit() {
    const pathname = usePathname();
    const isPost = postsRegex.test(pathname);

    return (
        <aside>
            {isPost ? (
                <a
                    title="Found a Typo? Have any suggestions? Feel free to submit a PR :)"
                    href={`https://github.com/${UNAME}/site/edit/main/app${pathname}/page.mdx`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Edit on Github
                </a>
            ) : null}
        </aside>
    );
}
