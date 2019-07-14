import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { animated, useTrail, config } from "react-spring";
import Box from "@material-ui/core/Box";
import { useThemeContext } from "./ThemeContext";

const initSpace = [0, 1];

const AnimatedText = ({ text, ...props }) => {
    const { palette } = useThemeContext();
    const [hover, setHover] = useState(false);
    const _text = useMemo(() => text.split(""), [text]);
    const handleHover = useCallback(val => () => setHover(val), [setHover]);

    const trails = useTrail(_text.length, {
        to: {
            color: hover ? palette.primary.main : palette.text.primary,
            spacing: hover ? [0, 8] : initSpace,
        },
        config: config.stiff,
    });

    const items = trails.map(({ spacing, ...styles }, $i) => (
        <animated.span
            key={$i}
            style={{
                ...styles,
                padding: spacing.to((x, y) => `${x}px ${y}px`),
            }}
        >
            {_text[$i]}
        </animated.span>
    ));

    return (
        <Box
            display="flex"
            onMouseOver={handleHover(true)}
            onMouseLeave={handleHover(false)}
            {...props}
        >
            {items}
        </Box>
    );
};

AnimatedText.propTypes = {
    text: PropTypes.string.isRequired,
};

export default AnimatedText;
