import React from "react";
import Typography from "@material-ui/core/Typography";
import DateIcon from "@material-ui/icons/DateRangeTwoTone";
import Box from "@material-ui/core/Box";

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const DateFormat = ({ date }) => {
    const formatted = new Date(date).toLocaleDateString("en-US", options);

    return (
        <Box display="flex" alignItems="center" mr={1}>
            <Box mr={0.5} lineHeight={1}>
                <DateIcon fontSize="small" />
            </Box>
            <Typography variant="caption">{formatted}</Typography>
        </Box>
    );
};

export default DateFormat;
