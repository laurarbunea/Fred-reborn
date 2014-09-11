(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["info"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<div class=\"traffic-info\">\n\n    <div class=\"traffic-info__header\">\n        <ol class=\"breadcrumb\">\n            <li>\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"road", env.autoesc)) {
output += "\n                    ";
output += "\n                    <a  data-back>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"road", env.autoesc), env.autoesc);
output += "</a>\n                ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"region", env.autoesc) || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"motorway", env.autoesc)) {
output += "\n                    <a  class=\"back\" data-back>Back</a>\n                ";
;
}
else {
output += "\n                    <a href=\"#\" class=\"close\" data-close>Close</a>\n                ";
;
}
;
}
output += "\n                ";
output += "\n\n            </li>\n        </ol>\n\n        <h1>\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"info", env.autoesc), env.autoesc);
output += "\n        </h1>\n\n        <h2>\n            Expect delays\n        </h2>\n\n        <p>18 Jun – 6 Jul 2014</p>\n\n        <p>Due to traffic light fault at the intersection with brougham and antigua street, all right turns into and out of antigua street are closed until the fault will be repaired. Motorists are advised to take extra care.</p>\n\n    </div>\n\n    <div class=\"traffic-info__body\">\n\n        <ul class=\"location-list\" data-items>\n\n            <li class=\"list__item block-theme--yellow\">\n                <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway/Tristram%20Ave\" class=\"list__link theme__background\">\n                    <h3>\n                        Alternative route\n                        <span class=\"location-list__split\">\n                            <i class=\"i i-route\"></i>\n                        </span>\n                    </h3>\n                    <p><strong>30 min</strong> Upper Harbour Motorway</p>\n                </a>\n            </li>\n\n            <li class=\"list__item full-width\">\n\n                <ul class=\"share-nav\">\n                    <li><span>Share</span></li>\n                    <li>\n                        <a href=\"#\" class=\"link-theme--twitter\">\n                            <i class=\"i i-twitter\"></i>\n                            <span class=\"sr-only\">Twitter</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\" class=\"link-theme--facebook\">\n                            <i class=\"i i-facebook\"></i>\n                            <span class=\"sr-only\">Facebook</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\" class=\"link-theme--google\">\n                            <i class=\"i i-google\"></i>\n                            <span class=\"sr-only\">Google</span>\n                        </a>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["listItem"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.autoesc);
output += "\" class=\"list__link\"><h4>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.autoesc);
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "label");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_3.length - 1);
output += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"first", env.autoesc)) {
output += "<span class=\"location-list__split\">";
;
}
output += "\n    <span class=\"pill pill--";
output += runtime.suppressValue(runtime.memberLookup((t_4),"type", env.autoesc), env.autoesc);
output += "\"><i class=\"i i-";
output += runtime.suppressValue(runtime.memberLookup((t_4),"type", env.autoesc), env.autoesc);
output += "\"></i> ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"text", env.autoesc), env.autoesc);
output += "</span>\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"last", env.autoesc)) {
output += "</span>";
;
}
;
}
}
frame = frame.pop();
output += "</h4></a>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["motorway"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<div class=\"traffic-info\">\n\n    ";
output += "\n    <div class=\"traffic-info__header\">\n\n        <ol class=\"breadcrumb\">\n            <li>\n                <a data-back>Auckland</a>\n            </li>\n        </ol>\n\n        <h1>\n            North-Western Motorway\n            <div class=\"highway\">\n                <span class=\"highway__number\">1</span>\n                <i class=\"i i-sh i--red\"></i>\n            </div>\n        </h1>\n\n        <h2>Oteha Valley Rd. – Fanshawe St.</h2>\n\n        <ul class=\"switch-nav\">\n            <li class=\"nav__item\">\n                <a href=\"#\" class=\"active\">Northbound</a>\n            </li>\n            <li class=\"nav__item\">\n                <a href=\"#\" class=\"\">Southbound</a>\n            </li>\n        </ul>\n\n    </div>\n\n    <div class=\"traffic-info__body\">\n\n        <ul class=\"location-list\" data-items>\n\n            <li class=\"list__item block-theme--grey\">\n                <div class=\"theme__background\">\n                    <div class=\"traffic-metrics\">\n                        <div class=\"\">\n                            <i class=\"i i-distance\"></i><br />\n                            45 km\n                        </div>\n                        <div class=\"\">\n                            <i class=\"i i-speed\"></i><br />\n                            60 km/h\n                        </div>\n                        <div class=\"\">\n                            <i class=\"i i-duration\"></i><br />\n                            45 min\n                        </div>\n                    </div>\n\n                    <div class=\"traffic-messages\">\n                        <a href=\"#\" class=\"pill pill--orange\">\n                            <i class=\"i i-roadworks\"></i>\n                            <strong>Tristram Ave.</strong>\n                            Delays\n                        </a>\n                        <a href=\"#\" class=\"pill pill--warning\">\n                            <i class=\"i i-warning\"></i>\n                            <strong>Fanshawe St.</strong>\n                            Road closed\n                        </a>\n                    </div>\n                </div>\n            </li>\n\n            <li class=\"list__item\">\n                <ul class=\"route\">\n\n                    <li class=\"route__item\">\n                        <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway/Tristram%20Ave\">\n                            <div class=\"route__figure\">\n                                <img src=\"/images/traffic/webcam-1.jpg\" alt=\"\" class=\"figure__image\"/>\n                            </div>\n                            <h4>Tristram Ave <i class=\"i i-arrow-r\"></i></h4>\n                            <p class=\"icon-text\"><i class=\"i i-time\"></i>4 min</p>\n                        </a>\n                    </li>\n\n                    <li class=\"route__item\">\n                        <a href=\"#\" class=\"\">\n                            <h4>Greville <i class=\"i i-arrow-r\"></i></h4>\n                            <p class=\"icon-text\"><i class=\"i i-time\"></i>2 min</p>\n                        </a>\n                    </li>\n\n                    <li class=\"route__item\">\n                        <a href=\"#\">\n                            <h4>Constellation <i class=\"i i-arrow-r\"></i></h4>\n                            <p class=\"icon-text\"><i class=\"i i-time\"></i>16 min</p>\n                            <div class=\"route__figure\">\n                                <img src=\"/images/traffic/webcam-3.jpg\" alt=\"\" class=\"figure__image\"/>\n                            </div>\n                        </a>\n                    </li>\n\n                    <li class=\"route__item route__item--orange\">\n                        <a href=\"#\">\n                            <h4>Tristram <i class=\"i i-arrow-r\"></i></h4>\n                            <p class=\"icon-text\"><i class=\"i i-time\"></i>12 min</p>\n                            <p>Some extra content...</p>\n                        </a>\n                    </li>\n\n                    <li class=\"route__item route__item--roadworks\">\n                        <a href=\"#\">\n                            <h4>Tristram <i class=\"i i-arrow-r\"></i></h4>\n                            <p class=\"icon-text\"><i class=\"i i-time\"></i>12 min</p>\n                            <p>Some extra content...</p>\n                        </a>\n                    </li>\n\n                    <li class=\"route__item route__item--warning\">\n                        <a href=\"#\">\n                            <h4>Greville <i class=\"i i-arrow-r\"></i></h4>\n                            <p class=\"icon-text\"><i class=\"i i-time\"></i>7 min</p>\n                            <div class=\"route__figure\">\n                                <img src=\"/images/traffic/webcam-2.jpg\" alt=\"\" class=\"figure__image\"/>\n                            </div>\n                        </a>\n                    </li>\n\n                    <li class=\"route__item route__item--red\">\n                        <h4>Constellation</h4>\n                    </li>\n\n                </ul>\n            </li>\n\n        </ul>\n\n    </div>\n\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["panel"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"traffic-info level-1\">\n\n    ";
output += "\n    <div class=\"traffic-info__header\">\n        <ol class=\"breadcrumb\">\n            <li>\n                <a href=\"/\">NZTA</a>\n            </li>\n        </ol>\n        <h1>New Zealand Traffic</h1>\n    </div>\n    <div class=\"traffic-info__body\">\n        <ul class=\"location-list\" data-items>\n        </ul>\n    </div>\n\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["region"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<div class=\"traffic-info\">\n\n    ";
output += "\n    <div class=\"traffic-info__header\">\n\n        <ol class=\"breadcrumb\">\n            <li>\n                <a  data-back>New Zealand</a>\n            </li>\n        </ol>\n\n        <h1>\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"region", env.autoesc), env.autoesc);
output += " Traffic\n        </h1>\n\n    </div>\n\n    <div class=\"traffic-info__body\">\n        <ul class=\"location-list\" data-items>\n            <li class=\"list__item\">\n\n                <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway\" class=\"list__link\">\n                    <h3>\n                        North-Western Motorway\n                        <div class=\"highway\">\n                            <span class=\"highway__number\">1</span>\n                            <i class=\"i i-sh i--red\"></i>\n                        </div>\n                    </h3>\n                </a>\n\n                <div class=\"traffic-messages\">\n                    <span class=\"pill\">\n                        <i class=\"i i-time\"></i>\n                        <strong>45 min</strong>\n                    </span>\n                    <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway/Tristram%20Ave/info/Roadworks\" class=\"pill pill--orange\">\n                        <i class=\"i i-roadworks\"></i>\n                        <strong>Tristram Ave.</strong>\n                        Road closed\n                    </a>\n                    <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway/Fanshawe%20St./info/Accident\" class=\"pill pill--warning\">\n                        <i class=\"i i-warning\"></i>\n                        <strong>Fanshawe St.</strong>\n                        Delays\n                    </a>\n                </div>\n\n                <div class=\"[ horizontal-scroll ]\">\n                    <ul class=\"webcam-list\">\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-1.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Greville Road</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-2.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Tristram Ave</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-3.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Northcote Road</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-1.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Esmonde Road</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-2.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Tristram Ave</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-3.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Northcote Road</p>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n\n            </li>\n\n            <li class=\"list__item\">\n                <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway\" class=\"list__link\">\n                    <h3>\n                        Upper Harbour Motorway\n                        <div class=\"highway\">\n                            <span class=\"highway__number\">18</span>\n                            <i class=\"i i-sh i--red\"></i>\n                        </div>\n                    </h3>\n                </a>\n                <div class=\"traffic-messages\">\n                    <span class=\"pill\">\n                        <i class=\"i i-time\"></i>\n                        <strong>30 min</strong>\n                    </span>\n                    <span class=\"pill pill--confirm\">\n                        <strong>No delays</strong>\n                    </span>\n                </div>\n                <div class=\"[ horizontal-scroll ]\">\n                    <ul class=\"webcam-list\">\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-3.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Tauhini Bridge</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-1.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Albany Highway</p>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </li>\n\n            <li class=\"list__item\">\n                <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway\" class=\"list__link\">\n                    <h3>\n                        Southern Motorway\n                        <div class=\"highway\">\n                            <span class=\"highway__number\">5</span>\n                            <i class=\"i i-sh i--red\"></i>\n                        </div>\n                    </h3>\n                </a>\n                <div class=\"traffic-messages\">\n                    <span class=\"pill\">\n                        <i class=\"i i-time\"></i>\n                        <strong>40 min</strong>\n                    </span>\n                    <span class=\"pill pill--confirm\">\n                        <strong>No delays</strong>\n                    </span>\n                </div>\n                <div class=\"[ horizontal-scroll ]\">\n                    <ul class=\"webcam-list\">\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-2.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Esmonde Road</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-3.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Northcote Road</p>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"webcam\">\n                                <img src=\"/images/traffic/webcam-1.jpg\" alt=\"\" class=\"webcam__image\"/>\n                                <p class=\"webcam__caption\">Greville Road</p>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n\n            </li>\n\n\n        </ul>\n    </div>\n\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["regions"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"traffic-info\">\n    <div class=\"traffic-info__header\">\n        <h1>\n            Traffic info\n        </h1>\n    </div>\n    <div class=\"traffic-info__body\">\n    <ul data-items class=\"location-list\"></ul>\n    </div>\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["road"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n    <div class=\"traffic-info\">\n\n        ";
output += "\n        <div class=\"traffic-info__header\">\n\n            <ol class=\"breadcrumb\">\n                <li>\n                    <a  data-back>North-Western Motorway</a>\n                </li>\n            </ol>\n\n            <h1>\n                Tristram Ave. – Northcote Rd.\n                <div class=\"sh\">\n                    <span class=\"sh__number\">1</span>\n                    <i class=\"i i-sh\"></i>\n                </div>\n            </h1>\n\n            <h2>Southbound</h2>\n\n        </div>\n\n        <div class=\"traffic-info__body\">\n\n            <ul class=\"location-list\" data-items>\n\n                <li class=\"[ full-width ] list__item\">\n                    <div class=\"webcam\">\n                        <img src=\"/images/traffic/webcam-3.jpg\" alt=\"\" class=\"webcam__image\"/>\n                        <p class=\"webcam__caption\">\n                            SH1 2 Tristram Ave., looking South\n                            <span class=\"webcam__last-update\"><i class=\"i i-timer\"></i>28/08/2014 3:15:21pm</span>\n                        </p>\n                    </div>\n                </li>\n\n                <li class=\"list__item block-theme--grey\">\n                    <div class=\"theme__background\">\n\n                        <div class=\"traffic-metrics\">\n                            <div>\n                                <i class=\"i i-distance\"></i><br />\n                                3 km\n                            </div>\n                            <div>\n                                <i class=\"i i-speed\"></i><br />\n                                30 km/h\n                            </div>\n                            <div>\n                                <i class=\"i i-duration\"></i><br />\n                                6 min\n                            </div>\n                        </div>\n\n                    </div>\n                </li>\n\n                <li class=\"list__item block-theme--orange\">\n                    <a href=\"#\" data-href=\"Auckland/North-Western%20Motorway/Tristram%20Ave/info/Roadworks\" class=\"list__link theme__background\">\n                        <h3>\n                            Roadworks\n                            <i class=\"i i-roadworks\"></i>\n                        </h3>\n                        <h5>SH1 Tristram Ave. Offramp</h5>\n                        <p><strong>Expect delays</strong> 18 Jun – 6 Jul 2014</p>\n                    </a>\n                </li>\n\n                <li class=\"[ full-width ] list__item\">\n\n                    <ul class=\"share-nav\">\n                        <li><span>Share</span></li>\n                        <li>\n                            <a href=\"#\" class=\"link-theme--twitter\">\n                                <i class=\"i i-twitter\"></i>\n                                <span class=\"sr-only\">Twitter</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"link-theme--facebook\">\n                                <i class=\"i i-facebook\"></i>\n                                <span class=\"sr-only\">Facebook</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"link-theme--google\">\n                                <i class=\"i i-google\"></i>\n                                <span class=\"sr-only\">Google</span>\n                            </a>\n                        </li>\n                    </ul>\n\n                </li>\n\n            </ul>\n\n        </div>\n\n    </div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
