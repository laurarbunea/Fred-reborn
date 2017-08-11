// Node application setup
var port = 8000;
var http = require('http');
var ip = require('ip');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var slash = require('express-slash');
var expressValidator = require('express-validator');
var auth = require('http-auth');
var app = express();
var tree = require("./app/tree");


// Routes and classes
app.enable('strict routing');


// Lock it up tight on Delila.
var basic = auth.basic({
    realm: "NZTA Prototype.",
    file: __dirname + "/config/auth/users.htpasswd"
});

if (ip.address() === "10.0.0.10") {
    app.use(auth.connect(basic));
}

// Bindings
app.use(express.static(__dirname + '/www'));
app.use(bodyParser());


// App validation
expressValidator.validator.extend('isNZDate', function (str) {
    var datePart = str.split(/[^0-9]+/);
    if (!datePart.length) {
        return false;
    }
    return Date.parse(datePart[1] + "-" + datePart[0] + "-" + datePart[2]);
});

app.use(expressValidator({}));

// Session stuff
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    key: 'sid',
    cookie: {
        secure: true
    }
}));


var buildBreadCrumb = function(arr, objects) {
    var crumbs = [];
    var currentCrumb = "/";

    for (var i = 0; i < arr.length; i++) {
        var crumbName = arr[i];

        if (crumbName !== "") {
            currentCrumb += crumbName + "/";
        }

        var crumbObj = objects[currentCrumb];
        crumbs.push(crumbObj);
    }

    return crumbs;
};


/**
 * Inline the page content tree structure
 */
app.use(function(req, res, next){
    var last, crumbs, crumbObjects, children, siblings, parent;

    parent = "";

    crumbs = req.url.split("/");
    res.locals.tree = tree.nested;
    res.locals.tree_flat = tree.flat;

    crumbs.pop();

    for (var i = 0; i < crumbs.length; i++) {
        if (i < crumbs.length - 1) {
            parent += crumbs[i];
            parent += "/";
        }
    }

    crumbObjects = buildBreadCrumb(crumbs, tree.flat);
    children = tree.flat[req.url] ? tree.flat[req.url]['children'] : false;

    if (!parent) {
        siblings = tree.nested;
    } else {
        siblings = tree.flat[parent]?  tree.flat[parent]['children'] : false;
    }

    res.locals.children = children;
    res.locals.breadcrumb = crumbObjects;
    res.locals.siblings = siblings;
    res.locals.url = req.url;
    res.locals.path = req.url;
    last = crumbObjects[crumbObjects.length - 2];
    res.locals.parent = last;

    next();
});




var nunjucks = require("./config/nunjucks")(app);
var styleguide = require("./routes/style-guide")(app);
var routes = require("./routes/all")(app);


// Handle server errors
app.use(function(err, req, res, next){
    console.log(err.status);

    if (err.status == 404) {
        next(err);
        return;
    } else {
        res.status(err.status || 500);
        res.render('500.j2', {
            error: err
        });
    }

});

// If nothing else has triggered, it's probably
// a bonafide 404
app.use(function(err, req, res, next){
    res.status(404);


    // respond with html page
    if (req.accepts('html')) {
        res.render('404.j2', {
            url: req.url
        });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});



// Boot up/init code
app.listen(port);
console.log('Express started on port %d', port);


