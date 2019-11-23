import styled from "@material-ui/core/styles/styled";
import Fab from "@material-ui/core/Fab";

const CustomFab = styled(Fab)(({ theme: { palette } }) => {
    return {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: palette.primary.main,
        backgroundColor: palette.background.default,
        "&:hover": {
            backgroundColor: "inherit",
        },
    };
});

export default CustomFab;
