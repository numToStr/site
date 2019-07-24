import React from "react";
import { Chip, Box, Typography } from "@material-ui/core";

const BlogTags = ({ tags = [] }) => {
    let tagList = null;

    if (tags) {
        tagList = tags.map((tag, $i) => {
            return (
                <Box key={$i} clone m={0.5}>
                    <Chip size="small" label={`#${tag}`} />
                </Box>
            );
        });
    }

    return (
        <Box py={2.5}>
            <Typography gutterBottom variant="body2">
                Tags:
            </Typography>
            {tagList}
        </Box>
    );
};

export default BlogTags;
