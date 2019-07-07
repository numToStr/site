import React from "react";
import Box from "@material-ui/core/Box";
import { useThemeContext } from "../ThemeContext";
import useToggleSlideIn from "../Animation/useToggleSlideIn";

export default ({ open, children }) => {
    const {
        palette: { background },
    } = useThemeContext();

    const [spring, animated] = useToggleSlideIn(open, {
        to: { backgroundColor: background.default },
    });

    return (
        <Box
            component={animated.div}
            height="100%"
            position="fixed"
            top={0}
            left={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            zIndex={1000}
            style={{
                ...spring,
                width: spring.x
                    .to([0, 0.2, 0.5, 1], [0, 50, 80, 100])
                    .to(x => `${x}%`),
            }}
        >
            {children}
        </Box>
    );
};
