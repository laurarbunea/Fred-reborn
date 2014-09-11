/**
 * Tabs
 */
module.exports = (function() {
    var tabsObj = {

        init: function() {

            // initialise tab events
            if (location.hash !== "#" && !location.hash.match(/^#+$/) && location.hash) {
                this.showTabContent(document.location.hash);
            }
            if ("onhashchange" in window) {
                _self = this;
                window.onhashchange = function() {
                    _self.showTabContent(document.location.hash);
                };
            }

        },

        showTabContent: function(tabId) {

            tabId = tabId.replace("#","");

            if(tabId) {

                var $trigger = $("#" + tabId + "-trigger");
                var $content = $("#" + tabId + "-content");

                // show tab content
                $content.parent().children().hide();
                $content.show();

                // set active state of tab-link
                $trigger.parent().children().removeClass("is-active");
                $trigger.addClass("is-active");

                // update document location
                document.location.hash = tabId;

            }

        }

    };
    return tabsObj;
})();

