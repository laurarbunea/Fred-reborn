(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone.Marionette.StackRegion = (function(_super) {
    __extends(StackRegion, _super);

    function StackRegion() {
        StackRegion.__super__.constructor.apply(this, arguments);
        this.views = [];
    }

    StackRegion.prototype.peek = function() {
        if (this.views.length) {
            return this.views[this.views.length - 1];
        }
    };

    StackRegion.prototype.push = function(view) {
        var topView;
        this._ensureElement();
        topView = this.peek();
        if (topView) {
            this._hideView(topView);
        }
        view.render();
        this.open(view);
        this._displayView(view, {animate: true});
        this.views.push(view);
        return this.currentView = view;
    };

    StackRegion.prototype.pop = function() {
        var poppedView;
        poppedView = this.views.pop();
        if (poppedView) {
            this._closeView(poppedView);
        }
        this.currentView = this.peek();
        if (this.currentView) {
            return this._displayView(this.currentView);
        }
    };

    StackRegion.prototype.show = function(view) {
        while (this.views.length && this.peek() !== view) {
            this.pop();
        }
        if (!this.views.length) {
            return this.push(view);
        }
    };

    StackRegion.prototype.open = function(view) {
        return this.$el.append(view.el);
    };

    StackRegion.prototype.close = function() {
        while (this.views.length) {
            this.pop();
        }
        return Marionette.triggerMethod.call(this, "close");
    };

    StackRegion.prototype.attachView = function(view) {
        this.views.push(view);
        return this.currentView = view;
    };

    StackRegion.prototype._displayView = function(view, options) {
        view.$el.show();
        Marionette.triggerMethod.call(view, "show", options);
        this.$el.scrollTop(0);
        return Marionette.triggerMethod.call(this, "show", view);
    };

    StackRegion.prototype._hideView = function(view, options) {

        return Marionette.triggerMethod.call(view, "hide", options);
    };

    StackRegion.prototype._closeView = function(view) {

        if ((view != null ? view.remove : void 0) && !view.isClosed) {
            return view.remove({ animate: true });
        }
    };

    return StackRegion;

})(Backbone.Marionette.Region);







(function(document, window) {
    var App, $doc, app;


    /**
     * Replace default renderer with nunjucks
     * http://mozilla.github.io/nunjucks/
     *
     * @param template
     * @param data
     * @returns {string} HTML
     */
    Backbone.Marionette.Renderer.render = function(template, data){
        return nunjucks.render(template, data);
    };


    /**
     * Force repaint for triggering CSS animations
     * @returns {number}
     */
    window.repaint = function() {
        return document.body.offsetLeft;
    };





    // A better remove function
    function animateRemove(options) {
        var animate = options.animate;
        var _remove = Marionette.ItemView.prototype.remove;

        if (animate) {

            this.el.classList.remove("anim-reveal");
            this.el.classList.add("anim-slideout");

            setTimeout(function() {
                this.$el.remove();
            }.bind(this), 500);

        } else {
            this.$el.remove();
        }
    }

    // A better show function
    function animateShow(options) {

        if (options && options.animate) {
            this.el.classList.add("anim-reveal");
        } else {
            this.el.classList.remove("anim-reveal");
        }
    }

    function animateHide(options) {
        this.$el.fadeOut(400);
        setTimeout(function() {
            this.$el.hide();
        }.bind(this), 500);

    }


    var View = Backbone.Marionette.ItemView.extend({
        onShow: animateShow,
        onHide: animateHide,
        remove: animateRemove
    });

    var CompositeView = Backbone.Marionette.CompositeView.extend({
        onShow: animateShow,
        onHide: animateHide,
        remove: animateRemove
    });


    var ListItemView = View.extend({
        template: "listItem",
        className: "list__item",
//        events: {
//            "click": "navigate"
//        },
        navigate: function(e) {
            var url = this.model.get("name");
//            e.preventDefault();
//            Backbone.history.navigate(url, {trigger: true});
        }
    });

    var ModalView = View.extend({
        template: "info",
        events: {
            "click [data-close]": "closeModal"
        },
        onShow: function() {
            this.el.classList.add("anim-fadein");
        },
        closeModal: function(e) {
            e.preventDefault();
            document.body.classList.remove("modal-active");
            window.history.back();
        }
    });


    var ListView = CompositeView.extend({
        template: "motorway", // panel
        childViewContainer: "[data-items]",
        className: "absolute",
        childView: ListItemView,
        model: this.model,
        events: {
            "click [href]": "navigate",
            "click [data-href]": "navigate",
            "click [data-close]": "navigateBack",
            "click [data-back]": "navigateBack"
        },
        navigate: function(e) {
            var clicked_el = e.currentTarget;
            var url = clicked_el.dataset.href;
            e.preventDefault();

            if (!url) {
                url = clicked_el.getAttribute("href");
            }

            if (url) {
                Backbone.history.navigate(url, { trigger: true });
                this.options.app.history.push(url);
            }
        },
        navigateBack: function(e) {
            this.options.app.main.pop();
            this.options.app.history.pop();
        }
    });


    var TopListView = ListView.extend({
       template: "regions"
    });



    var regions = new Backbone.Collection(
        [
            {
                name: "Northland"
            },
            {
                name: "Auckland",
                label: [
                    {
                        type: "roadworks",
                        text: "2"
                    }
                ]
            },
            {
                name: "Waikato"
            },
            {
                name: "Central North Island"
            },
            {
                name: "Wellington",
                label: [
                    {
                        type: "roadworks",
                        text: "2"
                    },
                    {
                        type: "warning",
                        text: "1"
                    }
                ]
            },
            {
                name: "Nelson & Marlborough"
            },
            {
                name: "Canterbury & West Coast"
            },
            {
                name: "Otago & Southland"
            }
        ]);


    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "index",
            "info/:id": "infoModal",
            ":id": "region",
            ":id/:motorway": "motorway",
            ":id/:motorway/:detail": "road",
            ":id/:motorway/:detail/info/:info": "info"
        }
    });



    var Controller = Marionette.Controller.extend({

        initialize: function(options){
            this.app = options.app;
        },
        index: function() {
            var view = new TopListView({ collection: regions, app: this.app });

            this.listenTo(view, "click [data-back]", function() {
                this.app.main.pop();
            });

            this.app.main.show( view );


        },
        region: function(regionId) {
            var data = {};
            data.region = regionId;
            var model = new Backbone.Model();
            model.set("data", data);
            var view = new ListView({
                template: "region", model: model, app: this.app
            });

            this.listenTo(view, "click [data-back]", function() {
                this.app.main.pop();
            });

            this.app.main.push(view);
        },
        motorway: function(regionId, motorwayId) {
            var view = new ListView({ template: "motorway", app: this.app });

            this.listenTo(view, "click [data-back]", function() {
                this.app.main.pop();
            });


            this.app.main.push(view);
        },
        road: function(regionId, motorwayId, roadId) {
            var view = new ListView({ template: "road", app: this.app });
            this.listenTo(view, "click [data-back]", function() {
                this.app.main.pop();
            });


            this.app.main.push(view);
        },
        infoModal: function(infoId) {
            document.body.classList.add("modal-active");
            var view = new ModalView({ template: "info", app: this.app });

            this.listenTo(view, "click [data-back]", function() {
                this.app.main.pop();
            });

            this.app.modal.show(view);
        },
        info: function(regionId, motorwayId, roadId, infoId) {
//            console.log("regionId, motorwayId, roadId, infoId", regionId, motorwayId, roadId, infoId);

            var data = {};
            data.region = regionId;
            data.motorway = motorwayId;
            data.road = roadId;
            data.info = infoId;

            var model = new Backbone.Model();
            model.set("data", data);

            var view = new ListView({ template: "info", model: model, app: this.app });

            this.listenTo(view, "click [data-back]", function() {
                this.app.main.pop();
            });

            this.app.main.push(view);
        }

    });


    var StackHistory = function() {
        this._fragments = [];
    };

    StackHistory.prototype = {
        pop: function() {
            var frag = this._fragments.pop();
            var last = this._fragments[this._fragments.length-1];

            if (last) {
                Backbone.history.navigate("/" + last, {});
            } else {
                Backbone.history.navigate("/#");
            }



        },
        push: function(fragment) {
            var last = this._fragments[this._fragments.length-1];
            if (fragment !== last) {
                this._fragments.push(fragment);
            }
        }
    };


    App = Backbone.Marionette.Application.extend({
        beforeStart: function() {
            this.addRegions({
                main: {
                    selector: "[data-region='main']",
                    regionClass: Backbone.Marionette.StackRegion
                },
                modal: "[data-region='modal']"
            });
        },
        afterStart: function() {
            var app = this;
            this.router = new Router({ controller: new Controller({ app: app }) });
            if (Backbone.history) {
                Backbone.history.start({ pushState: true, root: '/traffic/' });

                if (window.backbonePath) {
                    Backbone.history.navigate(window.backbonePath, { trigger: true });
                }

            }
        },
        history: new StackHistory()
    });


    $doc = $(document);

    app = new App();
    app.addInitializer(app.beforeStart);
    app.on("start", app.afterStart);




    // Handle actual booting
    $doc.ready( function appInit() {
        var el = document.querySelector("[data-app]");

        if (el) {
            app.start();
        }

    });


    window.Traffic = app;



})(document, window);








// Google maps options



(function() {


        // show/hide tools on mobile
    function toggleTools() {
        var b = document.body;
        var activeClass = "tools-active";
        if ( b.classList.contains(activeClass) ) {
            b.classList.remove(activeClass);
        } else {
            b.classList.add(activeClass);
        }
    }
    var elems = document.getElementsByClassName("toggle-tools");
    for (var i in elems) {
        elems[i].onclick = toggleTools;
    }

//    // show/hide dummy modal
//    function toggleModal() {
//        var b = document.body;
//        var activeClass = "modal-active";
//        if ( b.classList.contains(activeClass) ) {
//            b.classList.remove(activeClass);
//        } else {
//            b.classList.add(activeClass);
//        }
//    }
//    var elems = document.getElementsByClassName("toggle-modal");
//    for (var i in elems) {
//        elems[i].onclick = toggleModal;
//    }

    // map/list nav
    function trafficNav(e) {
        var target = e.target || e.srcElement;
        var id = target.getAttribute("data-traffic-nav");
        var activeClass = "active";

        // highlight current nav item
        var triggers = document.querySelectorAll("[data-traffic-nav]");
        for (var n = 0; n < triggers.length; n++) {
            var trigger = triggers[n];
            var triggerId = trigger.getAttribute("data-traffic-nav");
            if (triggerId === id ) {
                trigger.classList.add(activeClass);
                continue;
            } else {
                trigger.classList.remove(activeClass);
            }

        }

        // add active class to body element
        var b = document.body;
        var activeClass = "list-active";
        if ( id === "list" ) {
            b.classList.add(activeClass);
        } else {
            b.classList.remove(activeClass);
        }

    }
    var elems = document.querySelectorAll("[data-traffic-nav]");
    for (var i = 0; i < elems.length; i++) {
        var trigger = elems[i];
        trigger.addEventListener("click", trafficNav.bind(this));
    }


})();


function initialize() {

    var mapOptions = {
        center: new google.maps.LatLng(-41.2889, 174.7772),
        zoom: 12,
        trafficEnabled: true,
        disableDefaultUI: true
    };

    // setting up custom controls.
    function TrafficControl( map ) {

        var zoomInDiv = document.getElementById("zoomIn");
        var zoomOutDiv = document.getElementById("zoomOut");

        google.maps.event.addDomListener(zoomInDiv, 'click', function() {
            var currentZoomLevel = map.getZoom();
            if(currentZoomLevel != 21){
                map.setZoom(currentZoomLevel + 1);}
        });
        google.maps.event.addDomListener(zoomOutDiv, 'click', function() {
            var currentZoomLevel = map.getZoom();
            if(currentZoomLevel != 0){
                map.setZoom(currentZoomLevel - 1);}
        });

    }

    function setMarkers(map, locations) {
        // Add markers to the map
        var images = {
            'camera': {
                url: '/images/traffic/marker/camera-shadow.png',
                size: new google.maps.Size(30, 38),
                scaledSize: new google.maps.Size(30, 38),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(15, 33)
            },
            'roadworks': {
                url: '/images/traffic/marker/roadworks-shadow.png',
                size: new google.maps.Size(30, 38),
                scaledSize: new google.maps.Size(30, 38),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(15, 33)
            },
            'warning': {
                url: '/images/traffic/marker/warning-shadow.png',
                size: new google.maps.Size(30, 38),
                scaledSize: new google.maps.Size(30, 38),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(15, 33)
            }
//            'warning': {
//                url: '/images/traffic/marker/warning.png',
//                size: new google.maps.Size(24, 32),
//                scaledSize: new google.maps.Size(24, 32),
//                origin: new google.maps.Point(0,0),
//                anchor: new google.maps.Point(12, 32)
//            }
        };
        for (var i = 0; i < locations.length; i++) {
            var info = locations[i];
            var myLatLng = new google.maps.LatLng(info[3], info[4]);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: images[info[1]],
                title: info[0],
                url: info[2],
                zIndex: info[5]
            });
            google.maps.event.addListener(marker, 'click', function() {
                if(this.url!=="") {
//                    window.location.href = this.url;
                    Backbone.history.navigate(this.url, {trigger: true});
                }
            });
        }
    }

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    var trafficControl = new TrafficControl( map );


    /**
     * Data for the markers consisting of a name, a LatLng and a zIndex for
     * the order in which these markers should display on top of each
     * other.
     */
    var traffic_info = [
        ['SH1', 'camera', '/info/roadworks', -41.25055, 174.809561, 4],
        ['SH1 Roadwoarks', 'roadworks', '', -41.270164, 174.780378, 5],
        ['SH1', 'roadworks', '', -41.284742, 174.772825, 3],
        ['Mt. Vic tunnel', 'warning', '', -41.302283, 174.785872, 2],
        ['Airport', 'roadworks', '', -41.316725, 174.809217, 1]
    ];

    setMarkers(map, traffic_info);

}

google.maps.event.addDomListener(window, 'load', initialize);
},{}]},{},[1])