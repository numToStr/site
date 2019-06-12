/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const React = require("react")
const TopLayout = require("./src/components/TopLayout").default

exports.wrapRootElement = ({ element, props }) => {
  return <TopLayout {...props}>{element}</TopLayout>
}
