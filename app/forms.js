var _ = require("underscore");
var Field = require("./field");


var Form = function(data, options) {
    var defaults = {
        "last": "complete"
    };

    this.formName = data.title;
    this.data = data.steps;
    this.options = _.extend(defaults, options);
    this.errors = [];
};

Form.prototype = {

    getData: function(req, data) {

        var url = req.path;

        if (!(url.substr(-1) === "/")) {
            url = url + "/";
        }

        return _.extend({
            step: "",
            url: url,
            title: this.formName
        }, data);
    },

    index: function(req, res) {
        var name = req.params.form_name;
        var step = this.data['intro'];
        this.clearFormErrors();

        return res.render(step.template, this.getData(req, step.data));
    },

    step: function(req, res) {
        var name = req.params.form_name;
        var step = req.params.step;
        var template = "pages/forms/form.j2";
        var stepObject = this.data[step];
        var data = data,
            merge = [];

        if (stepObject && stepObject.template) {
            template = stepObject.template;
        }

        var fields = stepObject ? stepObject.fields : {};
        var fieldErrors = req.validationErrors();

        if (stepObject && "data" in stepObject) {
            merge = this.getData(req, stepObject.data);
        }

//        for (var fieldsetName in stepObject.fields) {
//            var fs = stepObject.fields[fieldsetName];
//
//            for (var i = 0; i < fs.fields.length; i++) {
//                var field = fs.fields[i];
//                var fieldName = field.name;
//                console.log(fieldName);
//
//                if (fieldName) {
//
//                    var validation = field.validation;
//
//                    if (validation.length) {
//                        console.log("VALIDATION::: ", validation);
//
//                        var handle = req.checkBody(fieldName, "Can't be empty");
//
//                        for (validatorId in validation) {
//
//                            var validatorName = validation[validatorId].type;
//                            handle[validatorName]();
//                        }
//                    }
//                }
//            }
//        }

        merge['form'] = {};


        // Hack in some error logic. Woot!
        if (fieldErrors) {
            merge['form']['fields'] = this.mapFieldErrors(fields, fieldErrors, req);
        } else {
            merge['form']['fields'] = this.clearFieldErrors(fields);
        }

        merge['form']['has_field_errors'] = !!(fieldErrors);
        merge['form']['errors'] = this.getFormErrors();


        return res.render(template, merge);
    },

    mapFieldErrors: function(fields, errors, req) {
        var field, fieldName, subFieldName, subField, fieldErrors, subFieldErrors;

        for (fieldName in fields) {
            field = fields[fieldName];

            if (field.type === "form/fieldset") {

                for (subFieldName in field.fields) {
                    subField = field.fields[subFieldName];
                    subFieldErrors = this.getFieldErrors(errors, subField.name);
                    subField.value = req.body[subField.name];
                    subField.errors = subFieldErrors;
                }

            } else {
                fieldErrors = this.getFieldErrors(errors, field.name);
                field.errors = fieldErrors;
            }
        }
        return fields;
    },

    clearFieldErrors: function(fields) {
        var field, fieldName, subFieldName, subField;

        for (fieldName in fields) {
            field = fields[fieldName];
            if (field.type === "form/fieldset") {
                for (subFieldName in field.fields) {
                    subField = field.fields[subFieldName];
                    subField.value = "";
                    subField.errors = false;
                }
            }
        }
        return fields;
    },

    getFieldErrors: function(errors, name) {
        var error, messages = [];

        for (var i = 0; i < errors.length; i++) {
            error = errors[i];
            if (error.param == name) {
                messages.push(error);
            }
        }

        return messages.length ? messages : false;
    },

    getFields: function(obj) {
        return obj.fields;
    },

    validate: function(req, res) {
        var fieldErrors;
        var name = req.params.form_name;
        var step = req.params.step;
        var stepObject = this.data[step];
        var next,
            redirect = this.options.last;

        var fields = this.getFields(stepObject);
        var fieldset, fieldName, fieldsetName;

        for (fieldsetName in fields) {
            fieldset = fields[fieldsetName];

            if (fieldset.type === "form/fieldset") {

                for (fieldName in fieldset.fields) {
                    var item = new Field(fieldset.fields[fieldName]);
                    item.validate(req);
                }
            }
        }

        fieldErrors = req.validationErrors();
        this.clearFormErrors();

        if (stepObject) {
            next = stepObject.validate(req, res);

            if (typeof(next) === "string") {
                redirect = next;
            } else if (next instanceof Array || next instanceof Object) {
                this.addFormError(next);
            }
        }


        // If there's form errors or field errors, show the
        // step again with errors.
        if (this.getFormErrors().length || fieldErrors) {
            return this.step(req, res);
        }

        return res.redirect(redirect);
    },

    clearFormErrors: function() {
        this.errors = [];
    },

    addFormError: function(errors) {
        if (errors instanceof Array) {
            for (var i = 0; i < errors.length; i++) {
                this.errors.push(errors[i]);
            }
        } else {
            this.errors.push(errors);
        }
    },

    getFormErrors: function() {
        return this.errors.length ? this.errors : false;
    }
};

module.exports = Form;