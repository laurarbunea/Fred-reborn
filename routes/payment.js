var paymentRoutes = {
    "index": {
        template: "pages/forms/payment/choose.j2",
        data: {
        }
    },
    "payment-credit-card": {
        template: "pages/forms/payment/credit-card.j2",
        data: {
        }
    },
    "payment-internet-banking": {
        template: "pages/forms/payment/poli.j2",
        data: {
        }
    },
    "bank": {
        template: "pages/forms/payment/bank.j2",
        data: {
            "title": "Westpac"
        }
    },
    "poli": {
        template: "pages/forms/payment/poli.j2",
        data: {
        }
    }
};


var step = function(req, res) {
    var form = require("../app/forms/" + req.params.form);
    var name = form.formName;
    var step = req.params.step;
    var stepData = paymentRoutes[step];
    var data = stepData.data;

    if (!data.title) {
        data.title = name;
    }

    if (stepData) {
        return res.render(
            stepData.template,
            data
        );
    }

    res.send('Not found', 404);
};


exports.step = function(req, res) {
    step(req, res);
};


exports.index = function(req, res) {
    req.params.step = "index";
    step(req, res);
};