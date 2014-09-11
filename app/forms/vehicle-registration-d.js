var _ = require("underscore");
var Form = require("../forms");
var fields = require("../fields");
var monthField = fields.month;
var textField = fields.text;
var submitButton = fields.submit;
var fieldSet = fields.fieldset;


// These fields are used in two steps so just return them from a function :)
var step2Fields = function() {
    return [
        fieldSet([
            textField({
                name: "licence_number",
                label: "Driver licence number",
                class:"uppercase",
                maxlength:"8",
                placeholder: "eg AB123456",
                field_note: "Item 5A on your driver licence",
                validation: [{
                    type: "notEmpty"
                },{
                    type: "isAlphanumeric"
                }]
            }),
            textField({
                type: "form/field--number",
                name: "licence_version",
                label: "Driver licence version",
                field_note: "Item 5B on your driver licence",
                maxlength:"3",
                placeholder: "eg 123",
                validation: [{
                    type: "notEmpty"
                },
                {
                   type: "isNumeric"
                }]
            }),
            textField({
                name: "surname",
                label: "Surname",
                validation: [{
                    type: "notEmpty"
                }]
            }),
            textField({
                type: "form/field--number",
                name: "date_of_birth",
                label: "Date of birth",
                placeholder: "DD-MM-YYYY",
                field_note: "Type your date of birth as it appears on your licence, including dashes",
                validation: [{
                    type: "notEmpty"
                },{
                    type: "isNZDate"
                }]
            })
        ]),
        fieldSet([
            submitButton({
                label: "Continue"
            })
        ])
    ]
};

// this summary list repeats a few times throughout the process, dropped into a function…
var summaryList = function() {
    return {
        type: "dl",
        data: [
            {
                "left": "Fee",
                "right": "<strong>$284.45</strong><br>Including GST"
            },
            {
                "left": "Plate number",
                "right": "ABC123"
            },
            {
                "left": "Current vehicle licence expires",
                "right": "14 May 2014"
            },
            {
                "left": "New vehicle licence expires",
                "right": "14 May 2015"
            },
            {
                "left": "Licence period",
                "right": "12 Months"
            },
            {
                "left": "Vehicle year",
                "right": "2005"
            },
            {
                "left": "Vehicle make",
                "right": "Subaru"
            },
            {
                "left": "Vehicle model",
                "right": "Legacy"
            },
            {
                "left": "Vehicle colour",
                "right": "Silver"
            },
        ]
    }
}
// this summary list repeats a few times throughout the process, dropped into a function…
var receiptList = function() {
    return {
        type: "dl",
        data: [
            {
                "left": "Fee",
                "right": "<strong>$284.45</strong><br>Including GST"
            },
            {
                "left": "Your address",
                "right": "98 Parkvale Road,<br> Karori,<br> Wellington 6012<br> <a href='#'>Change</a>"
            },
            {
                "left": "Westpac receipt number",
                "right": "1234"
            },
            {
                "left": "Transaction date and time",
                "right": "14 May 2014 9:00p.m."
            },
            {
                "left": "Plate number",
                "right": "ABC123"
            },
            {
                "left": "Current vehicle licence expires",
                "right": "14 May 2014"
            },
            {
                "left": "New vehicle licence expires",
                "right": "14 May 2015"
            },
            {
                "left": "Licence period",
                "right": "12 Months"
            },
            {
                "left": "Vehicle year",
                "right": "2005"
            },
            {
                "left": "Vehicle make",
                "right": "Subaru"
            },
            {
                "left": "Vehicle model",
                "right": "Legacy"
            },
            {
                "left": "Vehicle colour",
                "right": "Silver"
            },
        ]
    }
}

module.exports = new Form({
    title: "Relicense your vehicle (rego) B",
    steps: {
        intro: {
            template: "pages/forms/form-intro.j2",
            data: {
                step_name: "Get a new registration label"
            }
        },
        step1: {
            data: {
                "step_name": "Vehicle licence details"
            },
            fields: [
                fieldSet([
                    {
                        type: "form/field--text",
                        name: "plate_number",
                        class: "uppercase",
                        maxlength: "6",
                        label: "Plate number",
                        placeholder: "eg ABC123",
                        value: ""
                    },
                    {
                        type: "form/field--text",
                        name: "reminder_number",
                        class: "uppercase",
                        label: "Reminder number",
                        label_note: "(optional)",
                        field_note: "Fill in the reminder number from your registration notice, and we won’t need your driver licence details.",
                        value: ""
                    }
                ]),
                
                fieldSet([
                    submitButton({
                        label: "Continue"
                    })
                ])
            ],
            validate: function(req, res) {
                var rego = req.body.plate_number;
                var name = req.body.reminder_number;

                return "step1";
            }
        }
    }
});