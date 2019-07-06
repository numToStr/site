import { useTransition, animated } from "react-spring";

export const useToggleAnimation = toggle => {
    if (typeof toggle !== "boolean") {
        throw new Error("Please provide a toggle boolean.");
    }

    const transition = useTransition(toggle, null, {
        from: {
            position: "absolute",
            transform: "translate3d(0,-20px,0)",
            opacity: 0,
        },
        enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
        leave: { transform: "translate3d(0,-20px,0)", opacity: 0 },
        unique: true,
    });

    return [transition, animated];
};
