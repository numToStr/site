require("./src/styles/dracula-prism.css");

const React = require("react");
const TopLayout = require("./src/components/TopLayout").default;
const Layout = require("./src/components/Layout").default;

exports.wrapRootElement = ({ element, props }) => {
    return <TopLayout {...props}>{element}</TopLayout>;
};

exports.wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};
