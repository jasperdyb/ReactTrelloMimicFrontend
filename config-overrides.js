const { override, disableEsLint, useBabelRc } = require("customize-cra");
module.exports = override(disableEsLint(), useBabelRc());
