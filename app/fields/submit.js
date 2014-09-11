var _ = require("underscore");

module.exports = function(options) {

    var defaults = {
        type: "form/field--submit",
        label: "Submit"
    };

    return _.extend(defaults, options);
};



