require("./src/styles/dracula-prism.css");
require("./src/styles/index.css");

const React = require("react");
const Layout = require("./src/components/Layout").default;

exports.wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};
