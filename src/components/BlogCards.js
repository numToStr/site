import React, { memo } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "gatsby";
import { useStaggeredSlideIn } from "./Animation/useStaggeredSlideIn";
import DateFormat from "../components/DateFormat";
import ListTitle from "./ListTitle";
import TimeToRead from "./TimeToRead";

const BlogCard = ({
    blog: {
        timeToRead,
        frontmatter: { title, date },
        excerpt,
        fields: { slug },
    },
    ...props
}) => (
    <Box {...props} mb={3}>
        <ListTitle clone display="inline-block" mb={1}>
            <Link to={`/blog/${slug}`}>{title}</Link>
        </ListTitle>
        <Box mb={1} display="flex">
            <DateFormat date={date} />
            <TimeToRead time={timeToRead} />
        </Box>
        <Typography variant="body2">{excerpt}</Typography>
    </Box>
);

const BlogCards = ({ blogs }) => {
    const [trails, animated] = useStaggeredSlideIn(blogs.length);

    return trails.map(({ x, ...props }, $i) => {
        const { node } = blogs[$i];

        return (
            <BlogCard
                key={$i}
                blog={node}
                component={animated.div}
                style={{
                    ...props,
                    transform: x.to(_x => `translate3d(${_x}px,${_x}px,0)`),
                }}
            />
        );
    });
};

export default memo(BlogCards);
