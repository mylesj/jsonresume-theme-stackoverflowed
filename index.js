/**
 * The resume-cli erroneously validates the explicit existence of an index.js file
 * when attempting to import the theme - publishing this file with the package lets
 * us workaround the issue.
 *
 * Observed in resume-cli@3.0.6
 */

module.exports = require('./' + require('./package.json').main)
