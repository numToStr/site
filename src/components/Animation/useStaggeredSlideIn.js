import { useTrail, animated } from "react-spring";

export const useStaggeredSlideIn = (length, { to, from } = {}) => {
    if (!length && typeof length === "number") {
        throw new Error("Please provide a valid trail length.");
    }

    const trails = useTrail(length, {
        from: {
            ...from,
            x: -12,
            opacity: 0,
        },
        to: {
            ...to,
            x: 0,
            opacity: 1,
        },
        config: {
            mass: 1,
            tension: 200,
            friction: 15,
        },
    });

    return [trails, animated];
};
