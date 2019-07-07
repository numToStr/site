import { animated, useSpring } from "react-spring";

const useSlideIn = (toggle, { to, from } = {}) => {
    const spring = useSpring({
        from: {
            ...from,
            x: 0,
        },
        to: {
            ...to,
            x: toggle ? 1 : 0,
        },
    });

    return [spring, animated];
};

export default useSlideIn;
