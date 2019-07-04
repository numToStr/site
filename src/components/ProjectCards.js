import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import WebIcon from "@material-ui/icons/PublicTwoTone";
import { useStaggeredSlideIn } from "./Animation/useStaggeredSlideIn";

const ProjectCard = ({
    project: { id, name, description, url, homepageUrl },
    ...props
}) => {
    return (
        <Box {...props} key={id} mb={2}>
            <Box display="flex" alignItems="center">
                <Box
                    fontSize={{
                        xs: "h6.fontSize",
                        md: "h5.fontSize",
                    }}
                    color="primary.main"
                    fontWeight="fontWeightBold"
                    clone
                >
                    <Link
                        href={url}
                        target="_blank"
                        gutterBottom
                        underline="always"
                    >
                        {name}
                    </Link>
                </Box>
                <Link
                    href={homepageUrl}
                    target="_blank"
                    color="inherit"
                    style={{ marginLeft: 10 }}
                >
                    <WebIcon fontSize="small" />
                </Link>
            </Box>
            <Typography variant="body2">{description}</Typography>
        </Box>
    );
};

const ProjectCards = ({ projects }) => {
    const [trails, animated] = useStaggeredSlideIn(projects.length);

    return trails.map(({ x, opacity }, $i) => {
        const { node } = projects[$i];

        return (
            <ProjectCard
                key={node.id}
                component={animated.div}
                style={{
                    opacity,
                    transform: x.to(_x => `translate3d(${_x}px,${_x}px,0)`),
                }}
                project={node}
            />
        );
    });
};

export default ProjectCards;
