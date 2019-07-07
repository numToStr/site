import React from "react";
import { useFadeIn } from "../Animation/useFadeIn";
import { useThemeContext } from "../ThemeContext";

const Logo = ({ ...props }) => {
    const {
        palette: { text },
    } = useThemeContext();

    const [fadeIn, animated] = useFadeIn({
        to: { fill: text.primary },
    });

    return (
        <animated.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 834 633.1"
            {...props}
            style={fadeIn}
        >
            <path d="M417 633.1L0 0h834L417 633.1zM149.5 80.5L417 486.7 684.5 80.5h-535z" />
            <path d="M49.3 159.8h735.5v80.5H49.3zM145 319.6h544.1v80.5H145z" />
        </animated.svg>
    );
};

export default Logo;
