import { animated, useSpring, config } from "react-spring";

export const useFadeIn = ({ to, from } = {}) => {
    const spring = useSpring({
        from: {
            ...from,
            opacity: 0,
        },
        to: {
            ...to,
            opacity: 1,
        },
        config: config.wobbly,
        delay: 10,
    });

    return [spring, animated];
};
