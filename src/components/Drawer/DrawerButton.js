import React from "react";
import Box from "@material-ui/core/Box";
import { useStaggeredSlideIn } from "../Animation/useStaggeredSlideIn";
import { useThemeContext } from "../ThemeContext";

const bars = [28, 20, 28];

const DrawerButton = ({ onClick }) => {
    const {
        palette: { text },
    } = useThemeContext();

    const [trails, animated] = useStaggeredSlideIn(bars.length, {
        to: { backgroundColor: text.primary },
    });

    return (
        <Box
            onClick={onClick}
            style={{ cursor: "pointer" }}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            ml={{ xs: 1.25, md: 2 }}
            p={{ md: 0.5 }}
        >
            {trails.map(({ x, ...rest }, $i) => (
                <Box
                    component={animated.div}
                    key={$i}
                    width={bars[$i]}
                    height={3}
                    mb={0.6}
                    borderRadius="borderRadius"
                    style={{
                        ...rest,
                        transform: x.to(_x => `translate3d(${_x}px,${_x}px,0)`),
                    }}
                />
            ))}
        </Box>
    );
};

export default DrawerButton;
