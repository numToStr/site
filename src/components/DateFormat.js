import React from "react";
import Typography from "@material-ui/core/Typography";
import DateIcon from "@material-ui/icons/DateRangeTwoTone";
import Box from "@material-ui/core/Box";

const DateFormat = ({ date, margin, ...props }) => {
    const formatted = new Date(date).toDateString();

    return (
        <Box display="flex" alignItems="center" {...margin}>
            <Box mr={0.5} lineHeight={1}>
                <DateIcon fontSize="small" />
            </Box>
            <Typography {...props}>{formatted}</Typography>
        </Box>
    );
};

export default DateFormat;
