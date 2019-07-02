import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import WebIcon from "@material-ui/icons/PublicTwoTone";

const ProjectCard = ({
    project: { id, name, description, url, homepageUrl },
}) => {
    return (
        <Box key={id} mb={2}>
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
    return projects.map(project => (
        <ProjectCard key={project.node.id} project={project.node} />
    ));
};

export default ProjectCards;
