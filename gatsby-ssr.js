/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react");
const TopLayout = require("./src/components/TopLayout").default;
const Layout = require("./src/components/Layout").default;

exports.wrapRootElement = ({ element, props }) => {
    return <TopLayout {...props}>{element}</TopLayout>;
};

exports.wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};
