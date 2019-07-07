import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const MailIcon = props => {
    return (
        <SvgIcon {...props}>
            <path d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H11V18H4V8.37L12,13.37L20,8.37V10H22V6A2,2 0 0,0 20,4M12,11L4,6H20M19.07,13.88L13,19.94V22H15.06L21.12,15.93M22.7,13.58L21.42,12.3C21.32,12.19 21.18,12.13 21.04,12.13C20.89,12.14 20.75,12.19 20.65,12.3L19.65,13.3L21.7,15.3L22.7,14.3C22.89,14.1 22.89,13.78 22.7,13.58Z" />
        </SvgIcon>
    );
};

export default MailIcon;
