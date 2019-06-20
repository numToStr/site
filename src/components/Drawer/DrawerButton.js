import React from "react";

import { useTrail, animated } from "react-spring";
import Box from "@material-ui/core/Box";

const bars = [28, 20, 28];

const DrawerButton = ({ onClick, open }) => {
    const trails = useTrail(bars.length, {
        from: {
            color: "#000",
        },
        to: {
            color: open ? "#fff" : "#000",
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
            {trails.map(({ color }, $i) => (
                <Box
                    component={animated.div}
                    key={$i}
                    width={bars[$i]}
                    height={3}
                    mb={0.5}
                    borderRadius="borderRadius"
                    style={{
                        backgroundColor: color,
                    }}
                />
            ))}
        </Box>
    );
};

export default DrawerButton;
