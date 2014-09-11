var forms = require('./forms');
var payment = require('./payment');
var pages = require("./pages.js");

module.exports = function(app) {

    // Forms
    app.get('/transaction-centre/', forms.all);
    app.get('/transaction-centre/b', forms.all2);
    app.get('/transaction-centre/c', forms.all3);

    app.route('/transaction-centre/:form/')
        .get(forms.index);

    app.route('/transaction-centre/:form/start')
        .get(forms.index);

    app.route('/transaction-centre/:form/payment/')
        .get(payment.index);

    app.route('/transaction-centre/:form/:step')
        .get(forms.step)
        .post(forms.validate);

    app.route('/transaction-centre/:form/payment/:step')
        .get(payment.step);

    app.route('/search')
        .get(pages.search)
        .post(pages.search);


    app.route('/traffic/:part*')
        .get(function(req, res, next) {
            res.redirect("/traffic/")
        });



    //  Generic pages, content pages etc.
    app.get('/:node*/', pages.node);
    app.get('/', pages.node);

};
