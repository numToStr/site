import { animated, useSpring, config } from "react-spring";

export const useFadeIn = () => {
    const spring = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        config: config.wobbly,
        delay: 10,
    });

    return [spring, animated];
};
