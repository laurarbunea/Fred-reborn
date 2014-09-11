var _ = require("underscore");

module.exports = function(options) {

    var defaults = {
        type: "form/field--radio-button-group",
        name: "purchase_period",
        label: "Licence period",
        label_note: "",
        field_note: "How long would you like to relicense your vehicle for?",
        default_value: "12",
        values: [
        {
            label: "3",
            value: "3",
            secondary_label: "months"
        },
        {
            label: "4",
            value: "4",
            secondary_label: "months"
        },
        {
            label: "5",
            value: "5",
            secondary_label: "months"
        },
        {
            label: "6",
            value: "6",
            secondary_label: "months"
        },
        {
            label: "7",
            value: "7",
            secondary_label: "months"
        },
        {
            label: "8",
            value: "8",
            secondary_label: "months"
        },
        {
            label: "9",
            value: "9",
            secondary_label: "months"
        },
        {
            label: "10",
            value: "10",
            secondary_label: "months"
        },
        {
            label: "11",
            value: "11",
            secondary_label: "months"
        },
        {
            label: "12",
            value: "12",
            secondary_label: "months"
        }
        ]
    };

    var opts = _.extend(defaults, options);
    console.log(opts);
    return opts;
};
// monthField({
//                         name: "purchase_period",
//                         label: "Licence period",
//                         label_note: "(months)",
//                         field_note: "How long would you like to relicense your vehicle for?",
//                         default_value: "12",
//                         values: [
//                             {
//                                 label: "3",
//                                 value: "3",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "4",
//                                 value: "4",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "5",
//                                 value: "5",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "6",
//                                 value: "6",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "7",
//                                 value: "7",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "8",
//                                 value: "8",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "9",
//                                 value: "9",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "10",
//                                 value: "10",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "11",
//                                 value: "11",
//                                 secondary_label: "months"
//                             },
//                             {
//                                 label: "12",
//                                 value: "12",
//                                 secondary_label: "months"
//                             }
//                         ]
//                     })