var _ = require("underscore");
var Form = require("../forms");

module.exports = new Form({
    "title": "Driver licence form",
    "steps": {
        intro: {
            template: "pages/forms/form-intro.j2"
        },
        complete: {
            template: "pages/forms/form-complete.j2"
        },
        step1: {
            data: {
            },
            fields: [
                {
                    type: "fieldset",
                    fields: [
                        {
                            type: 'text',
                            value: 'Hello!',
                            name: "licence_name"
                        }
                    ]
                },
                {
                    type: "fieldset",
                    fields: [
                        {
                            type: "submit",
                            label: "Continue"
                        }
                    ]
                }
            ],
            validate: function(req) {
                return false;
            }
        },
        "step2-vehicle": {
            data: {
            },
            validate: function(req) {
                return false;
            }
        },
        "step2-name": {
            data: {
            },
            validate: function(req) {
                return false;
            }
        }
    }
});