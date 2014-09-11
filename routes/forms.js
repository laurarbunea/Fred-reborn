exports.index = function(req, res) {
    var form = require("../app/forms/" + req.params.form);
    form.index(req, res);
};

exports.step = function(req, res) {
    var form = require("../app/forms/" + req.params.form);
    form.step(req, res);
};

exports.validate = function(req, res) {
    var form = require("../app/forms/" + req.params.form);
    form.validate(req, res);
};


var items = [
    {
        name : 'Relicence your vehicle (rego)',
        url: "vehicle-registration/start"
    },
    {
        name : 'Book, change or cancel a driving test',
        url: "book-a-test/",
        description: 'Practical driving tests'
    },
    {
        name : 'Buy a distance licence',
        url: "",
        description: 'RUC (Road User Charges) distance label for diesel vehicles.'
    },
    {
        name : 'I’ve sold a vehicle',
        url: "",
        description: 'Notice of disposal: seller.'
    },
    {
        name : 'I’ve bought a vehicle',
        url: "",
        description: 'Notice of acquisition: buyer.'
    },
    {
        name : 'Change your address',
        url: "",
        description: ''
    },
    {
        name : 'I won’t be using a vehicle for at least 3 months',
        url: "",
        description: 'Vehicle licensing exemption.'
    },
    {
        name : 'Registered person check',
        url: "",
        description: 'Confirm if a person is the registered owner of a vehicle.'
    },
    {
        name : 'Revoke authorised access to my personal details',
        url: "",
        description: 'Prevent access to your personal details.'
    },
    {
        name : 'Apply for registered person details',
        url: "",
        description: 'Find out the name and address of a registered vehicle’s owner.'
    }
];

var section = {
    title: "Transaction centre",
    path: "/transaction-centre/",
    icon: "i-section-forms"
};




exports.all = function(req, res) {

    var _items = items;
    _items[0] = {
        name : 'Relicense your vehicle (rego)',
        url: "vehicle-registration/start",
        description: 'Get a new registration label'
    };

    res.render('pages/forms.j2', {
        title : 'Transaction centre',
        headline : 'Transaction Centre',
        section: section,
        items : _items
    });
};



exports.all2 = function(req, res) {
    var _items = items;
    _items[0] = {
        name : 'Get a new vehicle licence',
        url: "vehicle-registration/start",
        description: 'Registration label'
    };

    res.render('pages/forms.j2', {
        title : 'Transaction centre',
        headline : 'Transaction Centre',
        section: section,
        items : _items
    });
};




exports.all3 = function(req, res) {
    var _items = items;
    _items[0] = {
        name : 'Renew your vehicle licence',
        url: "vehicle-registration/start",
        description: 'Get a new registration label'
    };

    res.render('pages/forms.j2', {
        headline : 'Transaction Centre',
        title : 'Transaction centre',
        section: section,
        items : _items
    });
};
