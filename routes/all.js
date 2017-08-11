var pages = require("./pages.js");

module.exports = function(app) {

    //  Generic pages, content pages etc.
    app.get('/:node*/', pages.node);
    app.get('/', pages.node);

};
