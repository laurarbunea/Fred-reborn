var ValidationDefaults = {
    "notEmpty": "Please fill out this field",
    "isAlphanumeric": "This should only contain letters and numbers",
    "isNZDate": "Make sure this is a date"
};







var Field = function(data) {
    this.data = data;
};

Field.prototype = {
    validate: function(req) {
        var validators = this.data.validation;
        var name = this.data.name;

        // If no validation, assume it's valid.
        if (!validators) {
            return true;
        }

        var validator, validatorName, errors, message;

        for (validatorName in validators) {
            validator = validators[validatorName];
            console.log(validator);
            message = validator.message || ValidationDefaults[validator.type];
            req.assert(name, message)[validator.type]();
        }

        return req;
    }
};

module.exports = Field;

