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
                type: "form/field--text",
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
                "right": "<strong>$284.45</strong> (Including GST) "
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
        ], 

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
    title: "Relicense your vehicle (rego)",
    steps: {
        intro: {
            template: "pages/forms/form-intro.j2",
            data: {
                step_name: "Get a new registration label"
            }
        },
        complete: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "You’re done.",
                confirmation_msg: {
                    title: "Payment confirmed",
                    body: "Your registration label will be posted to you within 5 working days."
                }
            },
            fields: [
                {
                    type:"form/fieldset",
                    fields:[
                        {
                            type: "form/field--details",
                            data: [
                                { 
                                    type: "h3",
                                    data: "Need your rego label now?"
                                },
                                { 
                                    type: "p",
                                    data: "We can send you an email confirmation to keep in your vehicle until your new label arrives."
                                }
                            ]
                        },
                        {
                            type: "form/field--email-plus-submit",
                            name: "email_address",
                            label: "Your email address",
                            submit_label: "Send",
                            placeholder: "eg email@example.com",
                            field_note: "You won’t get any junk email.",
                            validation: [{
                                type: "notEmpty"
                            },{
                                type: "isEmail"
                            }]
                        }
                    ]
                },
                {
                    type:"form/fieldset",
                    fields:[
                        receiptList()
                    ]
                }
            ],
            validate: function(req, res) {
                var email_address = req.body.email_address;

                if (!email_address) {
                    return {
                        msg: "Check your email address is correct and try again."
                    };
                }

                return "complete_emailed";
            }
        },
        complete_emailed: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "",
                confirmation_msg: {
                title: "We’ve sent you an email confirmation.",
                body: "If your current vehicle licence expires before your new label arrives in the post, print out the email and keep it in the vehicle.",
                action: {
                        "href": "/forms/",
                        "label": "Continue to transaction centre"
                    }
                }
            },
            fields: [
                {
                    type:"form/fieldset",
                    fields:[
                        receiptList()
                    ]
                }
            ]
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
                        maxlength: "6",
                        label: "Plate number",
                        placeholder: "eg ABC123",
                        value: "",
                        validation: [{
                            type: "notEmpty"
                        },{
                            type: "isAlphanumeric"
                        }]
                    },
                    {
                        type: "form/field--text",
                        name: "reminder_number",
                        label: "Reminder number",
                        label_note: "(optional)",
                        field_note: "If you include this, we won’t need your driver licence details. It’s on your registration notice.",
                        value: ""
                        
                    }
                ]),
                fieldSet([
                    monthField({
                        name: "purchase_period",
                        label: "Licence period",
                        label_note: "(months)",
                        field_note: "The <a href='http://www.nzta.govt.nz/vehicle/registration-licensing/fees.html' target='_blank'>cost of licensing your vehicle</a> depends on the licence period you select.",
                        default_value: "12",
                        values: [
                            {
                                label: "3",
                                value: "3",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "4",
                                value: "4",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "5",
                                value: "5",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "6",
                                value: "6",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "7",
                                value: "7",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "8",
                                value: "8",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "9",
                                value: "9",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "10",
                                value: "10",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "11",
                                value: "11",
                                secondary_label: "months"
                            }
                            ,
                            {
                                label: "12",
                                value: "12",
                                secondary_label: "months"
                            }
                            // ,
                            // {
                            //     label: "13",
                            //     value: "13",
                            //     secondary_label: "months"
                            // }
                            // ,
                            // {
                            //     label: "14",
                            //     value: "14",
                            //     secondary_label: "months"
                            // }
                        ]
                    })
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

                if (!rego && !name) {
                    return {
                        msg: "Please enter your licence plate number."
                    };
                }

                if (rego && !name) {
                    return "step2-vehicle";
                }

                return "confirm";
            }
        },
        "step2-vehicle": {
            data: {
                "step_name": "Driver licence details"
            },
            fields: step2Fields(),
            validate: function(req) {
                return "confirm";
            }
        },
        "step2-reminder": {
            data: {
                "step_name": "Driver licence details"
            },
            fields: step2Fields(),
            validate: function(req) {
                return "confirm";
            }
        },
        
        "confirm": {
            data: {
                "step_name": "Confirm details"
            },
            fields: [
                    
                {
                    type: "form/fieldset",
                    fields: [
                        {
                            type: "form/field--details",
                            data: [
                                { 
                                    type: "p",
                                    data: "We’ll send you a GST receipt with your licence label."
                                }
                            ]
                        },
                        summaryList(),
                    ]
                },
                {
                    type: "form/fieldset",
                    fields: [
                        {
                            type: "form/field--submit",
                            label: "Confirm and pay"
                        },
                        {
                            type: "btn",
                            theme: "secondary",
                            href: "step1",
                            label: "Change vehicle or licence period",
                            block: true
                        }
                    ]
                }
            ],
            validate: function(req) {
                return "payment/";
            }
        },
    }
});