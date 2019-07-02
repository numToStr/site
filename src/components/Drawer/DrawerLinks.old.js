import React, { useState, useCallback } from "react";
import styled from "@material-ui/styles/styled";
import Link from "@material-ui/core/Link";
import { navigate } from "gatsby";
import { animated, useTrail } from "react-spring";

const LinkDiv = styled(animated.div)(({ theme: { breakpoints } }) => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    margin: "0 0 1rem",
    lineHeight: "normal",
    fontSize: "3.5rem",
    [breakpoints.down("sm")]: {
        fontSize: "2rem",
    },
}));

const links = [
    {
        text: "Home",
        to: "/",
    },
    {
        text: "About",
        to: "/about",
    },
    {
        text: "Projects",
        to: "/",
    },
    {
        text: "Blog",
        to: "/blog",
    },
    {
        text: "Contact",
        to: "/contact",
    },
];

const config = { mass: 1, tension: 170, friction: 18 };

export default ({ open, onTap }) => {
    const [hover, setHover] = useState(false);

    const handleClick = useCallback(
        link => ev => {
            ev.preventDefault();
            onTap();
            navigate(link);
        },
        [onTap, navigate]
    );

    const handleHover = useCallback(
        val => () => {
            setHover(val);
        },
        [setHover]
    );

    const trails = useTrail(links.length, {
        config,
        from: {
            opacity: 0,
            xy: [-50, -200],
            letterSpacing: 0,
        },
        to: {
            opacity: open ? 1 : 0,
            xy: open ? [0, 0] : [-50, -200],
            letterSpacing: hover ? 20 : 10,
            color: hover ? "#ff0" : "#fff",
        },
    });

    return trails.map(({ xy, opacity, letterSpacing, color }) => {
        const curr = links[$i];
        return (
            <LinkDiv
                key={curr.text}
                onMouseOver={handleHover(true)}
                onMouseLeave={handleHover(false)}
                style={{
                    opacity: opacity.to([0, 0.7, 1], [0, 0.3, 1]),
                    transform: xy.to(
                        (_x, _y) => `translate3d(${_x}%,${_y}px,0)`
                    ),
                    letterSpacing,
                    color,
                }}
            >
                <Link
                    color="inherit"
                    underline="none"
                    onClick={handleClick(curr.to)}
                    data-href={curr.to}
                    href={curr.to}
                >
                    {curr.text}
                </Link>
            </LinkDiv>
        );
    });
};
