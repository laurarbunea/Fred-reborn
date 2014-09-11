// stick breadcrumbs with position:sticky and JS where not supported

module.exports = {
    init: function () {

        var siteBreadCrumbs = document.getElementById("site-breadcrumbs"),
            siteContent = document.getElementById("site-content");

        if(siteBreadCrumbs) {
            var breadCrumbs = window.requestAnimationFrame(stickBreadCrumbs);
        }

        function stickBreadCrumbs() {

            var isFixed = siteBreadCrumbs.className.match(/fixed/);

            if (window.pageYOffset >= siteContent.offsetTop) {
                if (!isFixed) {
                    if (!Browser.has("sticky")) {
                        siteContent.style.paddingTop = siteBreadCrumbs.offsetHeight + "px";
                    }
                    siteBreadCrumbs.className += " fixed";
                }
            } else if (isFixed) {
                if (!Browser.has("sticky")) {
                    siteContent.style.paddingTop = 0;
                }
                siteBreadCrumbs.className = siteBreadCrumbs.className.replace(/ ?fixed/, "");
            }
            breadCrumbs = window.requestAnimationFrame(stickBreadCrumbs);

        }

    }
};
