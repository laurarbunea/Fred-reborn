(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var MobileNav = function() {

};

MobileNav.prototype = {
    init: function() {
        var nav = document.querySelectorAll("[data-navigation]");
        var menu = document.getElementById("menu");

        if (!nav.length) {
            return;
        }

        this.listeners = [];

        // Strip the hash if the nav is opened.
        if (window.location.hash === "#menu") {
            window.location.hash = "";
        }

        this.duration = 200;

        this.sandboxNavClicks = this.sandboxNavClicks.bind(this);
        this.animationEnd = this.animationEnd.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.click = this.click.bind(this);

        for (var i = 0; i < nav.length; ++i) {

            var el = nav[i];

            if (el) {
                el.addEventListener("click", this.sandboxNavClicks, false);
                el.addEventListener("keydown", this.handleKeyUp, false);
                this.listeners.push(el);
            }
        }

        this.menu = menu;
        this.$menu = $(menu);
        this.isOpen = false;
        this.triggers = nav;
    },

    handleKeyUp: function(e) {

        var KEY_ESCAPE = 27;
        var KEY_SPACE = 32;
        var menu = this.menu;


        switch(e.keyCode) {
            case KEY_SPACE:
                this.triggerOpen();

                var first = menu.querySelector("a");
                first.focus();


                e.preventDefault();
                e.stopPropagation();
                break;

            case KEY_ESCAPE:
                this.triggerClose();
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    },

    handleEscape: function(e) {
        var KEY_ESCAPE = 27;
        var doc = document.documentElement;

        if (e.keyCode === KEY_ESCAPE) {
            this.triggerClose();
            if (this.triggers.length) {
                this.triggers[0].focus();
            }
        }
    },

    hashChange: function() {
        var doc = document.documentElement;
        var bod = document.body;

        if (window.location.hash === "#menu") {
            bod.classList.add("menu--active");
            doc.addEventListener("click", this.click);
        } else {
            bod.classList.remove("menu--active");
            doc.removeEventListener("click", this.click);
        }
    },

    click: function(e) {
        var doc = document.documentElement;
        var bod = document.body;

        this.triggerClose();
        doc.removeEventListener("click", this.click);

    },

    toggle: function() {
        if (this.isOpen) {
            this.triggerClose();
        } else {
            this.triggerOpen();
        }
    },

    triggerClose: function() {
        var repaint;
        var doc = document.documentElement;
        var bod = document.body;
        var menu = this.menu;
        var $menu = this.$menu;

        bod.classList.remove("menu--active");

        if (window.animation) {
            menu.classList.remove("anim-nav-in");
            repaint = document.body.offsetLeft;
            menu.classList.add("anim-nav-out");
            menu.addEventListener(window.animation.animationEnd, this.animationEnd, false);
            setTimeout(this.animationEnd, this.duration + 20);

        } else {
            $menu.fadeOut(this.duration, function() {
                this.hideMenu();
            }.bind(this));
        }

        doc.removeEventListener("click", this.click);
        menu.removeEventListener("click", this.preventClick);
        doc.removeEventListener("keyup", this.handleEscape);
    },

    triggerOpen: function() {
        var repaint;
        var doc = document.documentElement;
        var bod = document.body;
        var menu = this.menu;
        var $menu = this.$menu;

        bod.classList.add("menu--active");

        if (window.animation) {
            menu.classList.remove("anim-nav-out");

            menu.style.display = "block";
            menu.classList.add("anim-nav-in");
        } else {
            $menu.fadeIn(this.duration);
        }

        this.isOpen = true;



        doc.addEventListener("click", this.click);
        doc.addEventListener("keyup", this.handleEscape);
        menu.addEventListener("click", this.preventClick);
    },

    sandboxNavClicks: function(e) {
        this.toggle();
        e.preventDefault();
        e.stopPropagation();
    },
    preventClick: function(e) {
        e.stopPropagation();
    },
    animationEnd: function(e) {
        var menu = this.menu;
        if (window.animation) {
            menu.removeEventListener(window.animation.animationEnd, this.animationEnd, false);

        }
        menu.classList.remove("anim-nav-out");
        this.hideMenu();
    },

    hideMenu: function() {
        var menu = this.menu;
        menu.style.display = "none";
        this.isOpen = false;
    }
};

module.exports = new MobileNav();


},{}],3:[function(require,module,exports){
 /**
 * ------------------------------------------------------------------------
 * Responsive tables
 * ------------------------------------------------------------------------
 */
module.exports = {
    init: function() {
        var table, theads, tcells, c;
        var tables = document.querySelectorAll("[data-responsive-table]");

        if (!tables.length) {
            return;
        }

        for (var i = 0; i < tables.length; i++) {
            table = tables[i];
            theads = table.querySelectorAll("thead th");
            tcells = table.querySelectorAll("tbody td");
            table.className += " table--responsive";


            for (c = 0; c < tcells.length; c++) {
                var cell = tcells[c];
                var index = cell.cellIndex;

                if (index > 0) {
                    cell.setAttribute('data-header', theads[cell.cellIndex].innerHTML);
                }
            }
        }
    }
};

},{}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
module.exports = {
    init: function() {

    }
};
},{}],6:[function(require,module,exports){
module.exports = (function() {

    var lastTime = 0;

    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }


    // Fix the console in IE8.
    if (typeof console === 'undefined') {
        console = {};
        console.log = function(){

        };
    }

    // Add function binding to unsupported browsers
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }


    // Add eventlisteners to IE8

    (function() {
        if (!Event.prototype.preventDefault) {
            Event.prototype.preventDefault=function() {
                this.returnValue=false;
            };
        }
        if (!Event.prototype.stopPropagation) {
            Event.prototype.stopPropagation=function() {
                this.cancelBubble=true;
            };
        }
        if (!Element.prototype.addEventListener) {
            var eventListeners=[];

            var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
                var self=this;
                var wrapper=function(e) {
                    e.target=e.srcElement;
                    e.currentTarget=self;
                    if (listener.handleEvent) {
                        listener.handleEvent(e);
                    } else {
                        listener.call(self,e);
                    }
                };
                if (type=="DOMContentLoaded") {
                    var wrapper2=function(e) {
                        if (document.readyState=="complete") {
                            wrapper(e);
                        }
                    };
                    document.attachEvent("onreadystatechange",wrapper2);
                    eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

                    if (document.readyState=="complete") {
                        var e=new Event();
                        e.srcElement=window;
                        wrapper2(e);
                    }
                } else {
                    this.attachEvent("on"+type,wrapper);
                    eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
                }
            };
            var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
                var counter=0;
                while (counter<eventListeners.length) {
                    var eventListener=eventListeners[counter];
                    if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
                        if (type=="DOMContentLoaded") {
                            this.detachEvent("onreadystatechange",eventListener.wrapper);
                        } else {
                            this.detachEvent("on"+type,eventListener.wrapper);
                        }
                        break;
                    }
                    ++counter;
                }
            };
            Element.prototype.addEventListener=addEventListener;
            Element.prototype.removeEventListener=removeEventListener;
            if (HTMLDocument) {
                HTMLDocument.prototype.addEventListener=addEventListener;
                HTMLDocument.prototype.removeEventListener=removeEventListener;
            }
            if (Window) {
                Window.prototype.addEventListener=addEventListener;
                Window.prototype.removeEventListener=removeEventListener;
            }
        }
    })();


    /**
     * Animation events lookup
     */
    (function() {
        var animationEvent;
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            pfx  = '';

        var el = document.createElement('fakeelement');

        if ( el.style.animationName !== undefined ) { animation = true; }

        if( animation === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( el.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    pfx = domPrefixes[ i ];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }


        function whichTransitionEvent(){
            var t;

            var transitions = {
                'transition':'transitionend',
                'OTransition':'oTransitionEnd',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

            for(t in transitions){
                if( el.style[t] !== undefined ){
                    return transitions[t];
                }
            }
        }


        function whichAnimationEvent(){
            var t;

            var animations = {
                'animation':'animationend',
                'OAnimation':'oAnimationEnd',
                'MozAnimation':'animationend',
                'WebkitAnimation':'webkitAnimationEnd'
            };

            for(t in animations){
                if( el.style[t] !== undefined ){
                    return animations[t];
                }
            }
        }

        if (animation) {
            window.animation = {
                string: animationstring,
                animationEnd: whichAnimationEvent(),
                transitionEnd: whichTransitionEvent()
            };
        } else {
            window.animation = false;
        }

    })();


})();
},{}],7:[function(require,module,exports){
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


},{"./components/BreadCrumbs.js":1,"./components/Nav.js":2,"./components/ResponsiveTables.js":3,"./components/Tabs.js":4,"./components/forms.js":5}]},{},[1,2,3,4,5,6,7])