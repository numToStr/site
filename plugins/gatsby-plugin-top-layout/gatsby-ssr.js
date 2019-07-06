/* eslint-disable import/prefer-default-export, react/prop-types */

import React from "react";
import TopLayout from "./TopLayout";
import { ThemeProvider } from "../../src/components/ThemeContext";

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeProvider>
            <TopLayout>{element}</TopLayout>
        </ThemeProvider>
    );
};
