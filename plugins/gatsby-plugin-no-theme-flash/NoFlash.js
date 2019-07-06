import React, { useMemo } from "react";

const noFlashScript = ({ key, lightClass, darkClass }) => `
    (global => {
        let prefferedTheme;
        const setTheme = newTheme => {
            global.__theme = newTheme;
            prefferedTheme = newTheme;
            document.body.classList.add(newTheme);
        };
        try {
            prefferedTheme = localStorage.getItem("${key}");
        } catch (error) {}
        const darkQuery = global.matchMedia("(prefers-color-scheme: dark)");
        darkQuery.addListener(ev => {
            const _isDark = ev.matches ? "${darkClass}" : "${lightClass}";
            setTheme(_isDark);
        });
        const isDark = darkQuery.matches ? "${darkClass}" : "${lightClass}";
        const whichTheme = prefferedTheme || isDark;
        setTheme(whichTheme);
    })(window);
`;

const NoFlash = ({ storageKey, darkClassName, lightClassName }) => {
    const _script = useMemo(() =>
        noFlashScript(
            {
                key: storageKey,
                darkClass: darkClassName,
                lightClass: lightClassName,
            },
            [noFlashScript, storageKey, darkClassName, lightClassName]
        )
    );

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: _script,
            }}
        />
    );
};

export default NoFlash;
