var _ = require("underscore");
var Form = require("../forms");
var fields = require("../fields");
var monthField = fields.month;
var textField = fields.text;
var submitButton = fields.submit;
var fieldSet = fields.fieldset;

var summaryList = function() {
    return {
        type: "dl",
        data: [
            {
                "left": "Test type",
                "right": "Motorcycle: class 6 restricted licence test"
            },
            {
                "left": "Applicant name",
                "right": "Jane Smith"
            },
            {
                "left": "Test location",
                "right": "AA Palmerston North,<br>185 Broadway Avenue,<br> Palmerston North<br> <a href='https://www.google.co.nz/maps/search/AA+Palmerston+North,+185+Broadway+Avenue,+Palmerston+North/@-40.352063,175.61632,17z/data=!3m1!4b1'>View on map</a>"
            },
            {
                "left": "Test date",
                "right": "9 June 2014"
            },
            {
                "left": "Reporting time",
                "right": "3:30 p.m."
            },
            {
                "left": "Test start time",
                "right": "4:00 p.m."
            },
            {
                "left": "Test duration",
                "right": "60 minutes"
            }
        ]
    }
}
var feeList = function() {
    return {
        type: "dl",
        data: [
            {
                "left": "Restricted licence class 6 fee",
                "right": "$48.70"
            },
            {
                "left": "Class 6R test fee",
                "right": "$88.30"
            },
            {
                "left": "Total fee",
                "right": "<strong>$137.00</strong><br>Incl. GST"
            },
            {
                "left": "Westpac receipt number",
                "right": "1234"
            },
            {
                "left": "Transaction time",
                "right": "3 May 2014 2:58 p.m."
            },
            {
                "left": "Test type",
                "right": "Motorcycle: class 6 restricted licence test"
            },
            {
                "left": "Applicant name",
                "right": "Bubbles De Vere"
            },
            {
                "left": "Test location",
                "right": "AA Palmerston North,<br>185 Broadway Avenue,<br> Palmerston North<br> <a href='https://www.google.co.nz/maps/search/AA+Palmerston+North,+185+Broadway+Avenue,+Palmerston+North/@-40.352063,175.61632,17z/data=!3m1!4b1'>View on map</a>"
            },
            {
                "left": "Test date",
                "right": "9 June 2014"
            },
            {
                "left": "Reporting time",
                "right": "3:30 p.m."
            },
            {
                "left": "Test start time",
                "right": "4:00 p.m."
            },
            {
                "left": "Test duration",
                "right": "60 minutes"
            }
        ]
    }
}

var validateTime = function(req) {

    var time = req.body.time;

    if (!time) {
        return {
            msg: "Please choose a time to take your test."
        };
    }

    return "confirm";
}


module.exports = new Form({
    title: "Book, change or cancel a driving&nbsp;test",
    steps: {
        intro: {
            template: "pages/forms/form-book-practical-test-intro.j2",
            
        },
        step1: {
            template: "pages/forms/form.j2",
            data: {
                step_name:"Driver license details"
            },
            validate: function(req) {
                return "select1";
            },
            fields: [
                fieldSet([
                    textField({
                        name: "licence_number",
                        label: "Driver licence number",
                        class: "uppercase",
                        maxlength: "8",
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
                        maxlength: "3",
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
        },
        select1: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "What do you need to do?"
            },
            validate: function(req) {
                return "select2";
            },
            fields: [
                fieldSet([

                    {
                        type: "form/field--radio-button-list",
                        name: "type",
                        default_value: "a",
                        values: [
                            {
                                label: "Book a licence test",
                                value: "a"
                            },
                            {
                                label: "Rebook a cancelled or failed test",
                                value: "b"
                            },
                            {
                                label: "View, change or cancel a booking",
                                value: "c"
                            }
                        ]
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    })
                ])
            ]
        },
        select2: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "What type of test do you want to take?"
            },
            validate: function(req) {
                return "region";
            },
            fields: [
                fieldSet([
                    {
                        type: "form/field--radio-button-list",
                        name: "type",
                        default_value: "a",
                        values: [
                            {
                                label: "Car: class 1 restricted licence",
                                value: "a"
                            }
                        ]
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    })
                ])
            ]
        },
        region: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "Region"
            },
            validate: function(req) {

                var region = req.body.region;

                if (!region) {
                    return {
                        msg: "Please choose the region you live in."
                    };
                }

                return "town";
            },
            fields: [ 
                fieldSet([
                    {
                        type: "form/field--radio-button-list",
                        name: "region",
                        label: "What part of New Zealand do you live in?",
                        default_value: "",
                        values: [
                            { label: "Northland",             value: "Northland"            },
                            { label: "Auckland",              value: "Auckland"             },
                            { label: "Waikato",               value: "Waikato"              },
                            { label: "Bay Of Plenty",         value: "Bay Of Plenty"        },
                            { label: "Gisborne",              value: "Gisborne"             },
                            { label: "Hawke’s Bay",           value: "Hawke’s Bay"          },
                            { label: "Taranaki",              value: "Taranaki"             },
                            { label: "Manawatu / Wanganui",   value: "Manawatu / Wanganui"  },
                            { label: "Wellington",            value: "Wellington"           },
                            { label: "Nelson / Tasman",       value: "Nelson / Tasman"      },
                            { label: "Marlborough",           value: "Marlborough"          },
                            { label: "West Coast",            value: "West Coast"           },
                            { label: "Canterbury",            value: "Canterbury"           },
                            { label: "Otago",                 value: "Otago"                },
                            { label: "Southland",             value: "Southland"            }
                        ]
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    })
                ])
            ]
        },
        town: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "Town"
            },
            validate: function(req) {
                return "agent";
            },
            fields: [ 
                fieldSet([
                    {
                        type: "form/field--radio-button-list",
                        name: "town",
                        label: "What’s your nearest town?",
                        default_value: "Palmerston North",
                        values: [
                            { label: "Palmerston North", value: "Palmerston North" }
                        ]
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    }),
                    {
                        type: "buttons/btn",
                        theme: "secondary",
                        href: "region",
                        label: "Change your region",
                        block: true
                    }
                ])
            ]
        },
        agent: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "Where would you like to take the test?"
            },
            validate: function(req) {

                var agent = req.body.agent,
                    date  = req.body.date;

                if (!agent) {
                    return {
                        msg: "Please choose a test location."
                    };
                }
                if (!date) {
                    return {
                        msg: "Please indicate your preferred test date."
                    };
                }

                return "times1";
            },
            fields: [ 
                fieldSet([
                    {
                        type: "form/field--radio-button-list",
                        name: "agent",
                        label: "Select a test location",
                        default_value: "Palmerston North",
                        values: [
                            { label: "AA Palmerston North",  value: "AA Palmerston North"  , secondary_label:"<a href='https://www.google.co.nz/maps/place/AA+Centre/@-40.352049,175.616347,17z/data=!3m1!4b1!4m2!3m1!1s0x6d41b2d914f7b4d3:0x672b62c8a2e49c28' target='_blank'>Map</a>"},
                            { label: "VTNZ Rangitikei Line", value: "VTNZ Rangitikei Line" , secondary_label:"<a href='https://www.google.co.nz/maps/place/VTNZ+Palmerston+North+-+Rangitikei+Line/@-40.340068,175.597806,17z/data=!3m1!4b1!4m2!3m1!1s0x6d404cd235273e35:0xa3fde0582813bc9c' target='_blank'>Map</a>"}
                        ]
                    }
                ]),
                fieldSet([
                    {
                        type:"form/field--text",
                        name:"date",
                        label:"Preferred test date",
                        field_note:"You’re eligible to sit your test on this date, but you can change it a later date if you prefer.",
                        value: "05-06-2014",
                        default: "05-06-2014"
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    }),
                    {
                        type: "buttons/btn",
                        theme: "secondary",
                        href: "town",
                        label: "Change your town",
                        block: true
                    }
                ])
            ]
        },
        times1: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "When would you like to take the test?"
            },
            validate: validateTime,
            fields: [ 
                fieldSet([
                    {
                        type:"form/field--details",
                        data: [
                            {
                                type:"p",
                                data:"Arrive <strong>30 minutes before your test starts,</strong> to give you time to complete your application."
                            }
                        ]
                    },
                    {
                        type: "form/field--radio-button-list",
                        name: "time",
                        default_value: "Palmerston North",
                        values: [
                            { label: "Monday 5  June", secondary_label:"09:00 a.m.", value: "0"  },
                            { label: "Monday 5  June", secondary_label:"10:00 a.m.", value: "1"  },
                            { label: "Monday 5  June", secondary_label:"11:00 a.m.", value: "2"  },
                            { label: "Monday 5  June", secondary_label:"12:00 a.m.", value: "3"  },
                            { label: "Monday 5  June", secondary_label:"01:00 p.m.", value: "4"  },
                            { label: "Monday 5  June", secondary_label:"02:00 p.m.", value: "5"  },
                            { label: "Monday 5  June", secondary_label:"03:00 p.m.", value: "6"  },
                            { label: "Monday 5  June", secondary_label:"04:00 p.m.", value: "7"  },
                            { label: "Tuesday 6 June", secondary_label:"09:00 a.m.", value: "8"  },
                            { label: "Tuesday 6 June", secondary_label:"10:00 a.m.", value: "9"  }
                        ]
                    },
                    {
                        type: "form/field--prev-next",
                        next_href: "times2",
                        next_label: "Later test times"
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    }),
                    {
                        type: "buttons/btn",
                        theme: "secondary",
                        href: "town",
                        label: "Change test location",
                        block: true
                    }
                ])
            ]
        },
        times2: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "When would you like to take the test?"
            },
            validate: validateTime,
            fields: [ 
                fieldSet([
                    {
                        type:"form/field--details",
                        data: [
                            {
                                type:"p",
                                data:"Arrive <strong>30 minutes before your test starts,</strong> to give you time to complete your application."
                            }
                        ]
                    },
                    {
                        type: "form/field--radio-button-list",
                        name: "time",
                        default_value: "Palmerston North",
                        values: [
                            { label: "Thursday 8 June", secondary_label:"03:00 p.m.", value: "10" },
                            { label: "Thursday 8 June", secondary_label:"04:00 p.m.", value: "11" },
                            { label: "Friday 6   June", secondary_label:"11:00 a.m.", value: "12" },
                            { label: "Friday 6   June", secondary_label:"12:00 p.m.", value: "13" },
                            { label: "Friday 6   June", secondary_label:"01:00 p.m.", value: "14" },
                            { label: "Friday 6   June", secondary_label:"02:00 p.m.", value: "15" },
                            { label: "Friday 6   June", secondary_label:"03:00 p.m.", value: "16" },
                            { label: "Friday 6   June", secondary_label:"04:00 p.m.", value: "17" },
                            { label: "Friday 6   June", secondary_label:"09:00 a.m.", value: "18" },
                            { label: "Friday 6   June", secondary_label:"01:00 a.m.", value: "19" }
                        ]

                    },
                    {
                        type: "form/field--prev-next",
                        prev_href: "times1",
                        prev_label: "Earlier test times",
                        next_href: "times3",
                        next_label: "Later test times"
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    }),
                    {
                        type: "buttons/btn",
                        theme: "secondary",
                        href: "town",
                        label: "Change test location",
                        block: true
                    }
                ])
            ]
        },
        times3: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "When would you like to take the test?"
            },
            validate: validateTime,
            fields: [ 
                fieldSet([
                    {
                        type:"form/field--details",
                        data: [
                            {
                                type:"p",
                                data:"Arrive <strong>30 minutes before your test starts,</strong> to give you time to complete your application."
                            }
                        ]
                    },
                    {
                        type: "form/field--radio-button-list",
                        name: "time",
                        default_value: "Palmerston North",
                        values: [
                            { label: "Friday 8  June",  secondary_label:"03:00 p.m.", value: "10" },
                            { label: "Friday 8  June",  secondary_label:"04:00 p.m.", value: "11" },
                            { label: "Monday 11 June",  secondary_label:"09:00 a.m.", value: "12" },
                            { label: "Monday 11 June",  secondary_label:"10:00 a.m.", value: "13" },
                            { label: "Monday 11 June",  secondary_label:"11:00 p.m.", value: "14" },
                            { label: "Monday 11 June",  secondary_label:"02:00 p.m.", value: "15" },
                            { label: "Monday 11 June",  secondary_label:"03:00 p.m.", value: "16" }
                        ]
                    },
                    {
                        type: "form/field--prev-next",
                        prev_href: "times2",
                        prev_label: "Earlier test times"
                    }
                ]),
                fieldSet([
                    submitButton({
                        label: "Continue"
                    }),
                    {
                        type: "buttons/btn",
                        theme: "secondary",
                        href: "town",
                        label: "Change test location",
                        block: true
                    }
                ])
            ]
        },
        confirm: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "Confirm your test details"
            },
            validate: function(req) {
                return "payment/"
            },
            fields: [
                fieldSet([
                    summaryList()
                ]),
                fieldSet([
                    {
                        type: "form/field--submit",
                        label: "Confirm and pay"
                    },
                    {
                        type: "buttons/btn",
                        theme: "secondary",
                        href: "times1",
                        label: "Change test time",
                        block: true
                    }
                ])
            ]
        },
        complete: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "You’re done"
            },
            validate: function(req) {
                var email_address = req.body.email_address;

                if (!email_address) {
                    return {
                        msg: "Check your email address is correct and try again."
                    };
                }

                return "complete_emailed";
            },
            confirmation_msg: {
                title: "Payment confirmed"
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
                                    data: "Get email confirmation of your booking"
                                },
                                { 
                                    type: "p",
                                    data: "We can send you an email confirmation with the details of your test booking."
                                }
                            ]
                        },
                        {
                            type: "form/field--email-plus-submit",
                            name: "email_address",
                            label: "Your email address",
                            submit_label: "Send",
                            placeholder: "eg email@example.com",
                            field_note: "You won’t get any junk email, we promise.",
                            validation: [{
                                type: "notEmpty"
                            },{
                                type: "isEmail"
                            }]
                        }
                    ]
                },
                fieldSet([
                    feeList()
                ])
            ]
        },
        complete_emailed: {
            template: "pages/forms/form.j2",
            data: {
                step_name: "You’re done.",
                confirmation_msg: {
                    title: "Thanks",
                    body: "We’ve sent you email confirmation of your booking."
                    
                }
            },
            validate: function(req) {
                return "complete_emailed/"
            },
            confirmation_msg: {
                title: "We’ve sent you email confirmation of your booking.",
                body: "If your current vehicle licence expires before your new label arrives in the post, print out the email and keep it in the vehicle.",
                action: {
                        "href": "/forms/",
                        "label": "Continue to transaction centre"
                    }
            },
            fields: [
                fieldSet([
                    feeList()
                ])
            ]
        }
    }
});