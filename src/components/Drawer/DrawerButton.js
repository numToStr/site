import React, { useState, useCallback } from "react";

import { useTrail, animated } from "react-spring";
import Box from "@material-ui/core/Box";

const bars = [28, 20, 28];

const DrawerButton = ({ handleClick }) => {
    const [clicked, setClicked] = useState(false);

    const onHamClicked = useCallback(() => {
        setClicked(click => !click);
        handleClick();
    }, [setClicked, handleClick]);

    const trails = useTrail(bars.length, {
        from: {
            color: "#000",
        },
        to: {
            color: clicked ? "#fff" : "#000",
        },
    });

    return (
        <Box
            onClick={onHamClicked}
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
