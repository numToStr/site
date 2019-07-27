import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { Link } from "gatsby";
import { kebabCase } from "../utils/string.utils";

const BlogTags = ({ tags = [] }) => {
    let tagList = null;

    if (tags) {
        tagList = tags.map((tag, $i) => {
            return (
                <Box key={$i} clone m={0.5}>
                    <Chip
                        component={Link}
                        to={`/tags/${kebabCase(tag)}`}
                        size="small"
                        label={`#${kebabCase(tag)}`}
                        clickable
                    />
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
