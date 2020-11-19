const dateRegexValidator = /^(19[0-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/;
const usernamePattern = /^[a-zA-Z_][A-Za-z0-9_]*[a-zA-Z0-9]$/;
module.exports = { dateRegexValidator, usernamePattern };
