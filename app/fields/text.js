var _ = require("underscore");

module.exports = function(options) {

    var defaults = {
        type: "form/field--text",
        validation: [{
            type: "notEmpty"
        }]
    };

    return _.extend(defaults, options);
};
