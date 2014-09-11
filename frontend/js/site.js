(function() {
    var forms = require("./components/forms.js");
    var breadcrumbs = require("./components/BreadCrumbs.js");
    var responsiveTables = require("./components/ResponsiveTables.js");
    var tabs = require("./components/Tabs.js");
    var nav = require("./components/Nav.js");

    var Site = {
        init: function() {
           
            breadcrumbs.init();
            responsiveTables.init();
            tabs.init();
            nav.init();
        }
    };
    
    if ("addEventListener" in window) {
        window.addEventListener("load", function() {
            Site.init.call(Site);
            breadcrumbs.init();
            responsiveTables.init();
            tabs.init();
        });
    }

    return Site;

})();

