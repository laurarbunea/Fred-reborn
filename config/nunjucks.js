var nunjucks = require("nunjucks");
var marked = require('marked');
var beautifyHtml = require('js-beautify').html;
var tree = require("../app/tree");
var jsonlint = require("jsonlint");
var fs = require('fs');


/**
 * Returns true if an item is iterable (array or object)
 * @param item
 * @returns {boolean}
 */
var iterable = function(item) {
    if (item instanceof Array) return true;
    if (item instanceof Object) return true;
    return false;
};


/**
 * Slugifies a string (My awesome title >> my-awesome-title)
 * @param str
 * @returns {XML|string}
 */
var slugify = function(str) {
    if (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-')  // collapse dashes
            .replace(/-$/g, ''); // trim dashes from end of string.
    } else {
        str = "";
    }

    return str;
};

/**
 * Renders an item as markdown
 * @param str
 * @returns {HTML|string}
 */
var markdown = function(str) {
    return marked(str);
};



var ext_markdown = function(path) {

    var path = "./" + path;
    var text = fs.readFileSync(path, "utf8");
    var ret = "";

    try {
        ret = marked(text);
    } catch(e) {
        return "";
    }

    return new nunjucks.runtime.SafeString(ret);
};


/**
 * Designed to be piped around, mainly for the styleguide
 *
 * As such, it accesses str.val rather than str.
 * @param  {Object} str  Incoming text
 * @return {String}      Pretty HTML
 */
var pretty_html = function(str) {
    return beautifyHtml(str.val, {
        "indent_size": "2",
        "preserve_newlines": false,
        "wrap_line_length": 200
    });
};



/**
 * Iterates over children of a node, compiles 'em.
 * @param item
 * @returns {SafeString}
 */
var children = function(item) {
    var i, len;

    var html = "";

    if (item.data) {
        if (iterable(item.data)) {
            len = item.data.length;

            for (i = 0; i < len; i++) {
                var _item = item.data[i];
//                console.log("component:", _item);
                html += component(_item);
            }

        } else {
            html = item.data;
        }

    } else {
        if (iterable(item) && typeof(item.data) == "undefined") {
            html = "";
        } else {
            html = item;
        }
    }

    return new nunjucks.runtime.SafeString(html);
};


/**
 * Loads a component based on the type and renders it with the item's data.
 * @param item
 * @returns {SafeString}
 */
var component = function(item) {

    if (!iterable(item)) {
        return new nunjucks.runtime.SafeString("<p>" + item + "</p>");
    }

    if (item.data && !item.type) {
        return new nunjucks.runtime.SafeString(children(item));
    }

    if (item.type === "text") {
        return new nunjucks.runtime.SafeString(item.text);
    }


    var ret = nunjucks.render("components/" + item.type + ".j2", {
        item: item
    });

    return new nunjucks.runtime.SafeString(ret);
};



/**
 * Loads an example on the type and renders it with the item's data.
 * @param item
 * @returns {SafeString}
 */
var describe = function(componentName) {
    console.log(componentName);

    var path = "./frontend/api/" + componentName + ".json";
    var ret = [];
    var apiData = fs.readFileSync(path, "utf8");


    try {
        ret = jsonlint.parse(apiData);
    } catch(e) {
        console.log(e);
    }

    if (ret.examples) {
        ret = ret.examples;
        return ret;
    }

//    console.log("ret", ret);

    return false;
};


/**
 * Loads an example on the type and renders it with the item's data.
 * @param item
 * @returns {SafeString}
 */
var getApi = function(apiName) {
    console.log(apiName);

    var path = "./frontend/api/" + apiName + ".json";
    var ret = [];
    var apiData = fs.readFileSync(path, "utf8");


    try {
        ret = jsonlint.parse(apiData);
    } catch(e) {
        console.log(e);
    }

    if (ret.examples) {
        ret = ret.examples;
        return ret;
    }

//    console.log("ret", ret);

    return false;
};




var jason = function(obj) {
    return new nunjucks.runtime.SafeString(JSON.stringify(obj, null, '  '));
};

var url_safe = function(obj) {
    return new nunjucks.runtime.SafeString(encodeURIComponent(JSON.stringify(obj)));
};




module.exports = function(app) {

    // Template config
    var nj = nunjucks.configure(['frontend/templates','templates'], {
        autoescape: true,
        express   : app
    });


    var data = function(str, key) {
        var obj = tree.flat[str];

        console.log(tree.flat);


        if (obj && obj.data) {

            if (typeof key === "string") {

                if (key in obj.data) {
                    return obj.data[key];
                }
            }

            if (!key) {
                return obj.data;
            }
        }



        return false;
    };


    nj.addFilter('iterable', iterable);
    nj.addFilter('slug', slugify);
    nj.addFilter('markdown', markdown);
    nj.addFilter('ext_markdown', ext_markdown);
    nj.addFilter('component', component);
    nj.addFilter('children', children);
    nj.addFilter('pretty_html', pretty_html);
    nj.addFilter('data', data);
    nj.addFilter('describe', describe);
    nj.addFilter('getApi', getApi);
    nj.addFilter('json', jason);
    nj.addFilter('url_safe', url_safe);

    return nj;
};
