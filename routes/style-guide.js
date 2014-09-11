// Pattern library
var styleGuide = require("../app/style-guide/style-guide");

module.exports = function(app) {

    app.get('/api/json/ui/:component', styleGuide.componentJson);
    app.post('/api/json/:component', styleGuide.componentJson);
    app.get('/api/css', styleGuide.staticCss);
    app.get('/api/js', styleGuide.staticJs);
    app.get(/^\/api\/(.+)/, styleGuide.componentHtml);
    app.post('/api/:component*', styleGuide.componentHtml);
    app.post('/api/', styleGuide.component);
    app.get('/api/', styleGuide.component);

};