import React from "react";

import { useTrail, animated } from "react-spring";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/styles/useTheme";

const bars = [28, 20, 28];

const DrawerButton = ({ onClick, open }) => {
    const { palette } = useTheme();

    const trails = useTrail(bars.length, {
        from: {
            color: "#ff0",
            xy: [400, -150],
        },
        to: {
            color: open ? "#fff" : palette.text.primary,
            xy: [0, 0],
        },
    });

    return (
        <Box
            onClick={onClick}
            style={{ cursor: "pointer" }}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            p={{
                md: 0.5,
            }}
        >
            {trails.map(({ color, xy }, $i) => (
                <Box
                    component={animated.div}
                    key={$i}
                    width={bars[$i]}
                    height={3}
                    mb={0.5}
                    borderRadius="borderRadius"
                    style={{
                        backgroundColor: color,
                        transform: xy.interpolate(
                            (_x, _y) => `translate3d(${_x}%,${_y}px,0)`
                        ),
                    }}
                />
            ))}
        </Box>
    );
};

export default DrawerButton;
