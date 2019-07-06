import React from "react";
import NoFlash from "./NoFlash";

export const onRenderBody = ({ setPreBodyComponents }, options) => {
    Reflect.deleteProperty(options, "plugins");

    setPreBodyComponents([<NoFlash key="no-flash-script" {...options} />]);
};
