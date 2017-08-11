var fs = require('fs');
var marked = require('marked');
var beautifyHtml = require('js-beautify').html;
var beautify = require('js-beautify').js_beautify;
var jsonlint = require("jsonlint");


var prettyHtml = function(html) {
    return beautifyHtml(html, {
        "indent_size": "2",
        "preserve_newlines": false,
        "wrap_line_length": 200
    });
};






var buildGuide = function() {
    var data = jsonlint.parse(fs.readFileSync("./frontend/documentation/documentation.json", 'utf8'));
    return data['style-guide'];
};


var nunjucks = false;

var renderExamples = function(string, app) {
    var component_example, example;

    if (!nunjucks) {
        nunjucks = require("../../config/nunjucks")(app);
    }

    component_example = string.match(/::([\w\d\.\-]+.*)/g);
//    console.log(component_example);

    for (var eg in component_example) {
        var component = component_example[eg].replace("::", "").replace("</p>","");
        var json = false;

        try {
            json = jsonlint.parse(fs.readFileSync("/components/" + component + "/" + component + ".json", "utf8"));
        } catch(e) {
            console.log('Couldn\'t read ' + component);
        }

        if (json && json.examples) {

            var examples = [];

            for (var ex in json['examples']) {
                var _example = json['examples'][ex];
                var exData = _example.example;
                var exTitle = _example.title;
                var show_code = typeof(_example["show_code"]) === "undefined" ? true : _example["show_code"];
                var exampleHtml = prettyHtml(
                    nunjucks.render("style-guide/example.j2", {
                        item: exData,
                        json: JSON.stringify(exData, null, '  '),
                        get_param: encodeURIComponent(JSON.stringify(exData)),
                        show_code: show_code,
                        title: exTitle
                    })
                );

                examples.push(exampleHtml);
            }

            string = string.replace(component_example[eg], examples.join("\n"));
        }
    }

    return string;
};


var StyleGuide = function() {

};

StyleGuide.prototype = {

    view: function(req, res) {

        var documentsPath = "./frontend/documentation/";
        var apiPath = "/components/";

        var pages = buildGuide();
        var page = req.params.page || "";
        console.log(page);

        var data = pages["/" + page];

        var rendered = [];

        if (data.data instanceof Array === false) {
            rendered.push(marked( fs.readFileSync(documentsPath + data.data, 'utf8')));
        }

        else if (data.data instanceof Array) {

            for (var thing in data.data) {
                var item = data.data[thing];

                var apiObject =  jsonlint.parse(fs.readFileSync(apiPath + item + ".json", 'utf8'));
                var markdown = marked(fs.readFileSync(documentsPath + item + ".md", 'utf8'));

                var examples = apiObject.examples;

                for (var exampleName in examples) {
                    var exampleObj = examples[exampleName];
                    var exampleData = exampleObj.example;
                    exampleObj.show_code = typeof(exampleObj["show_code"]) === "undefined" ? true : exampleObj["show_code"];
                    exampleObj.json = JSON.stringify(exampleData, null, '  ');
                    exampleObj.get_param = encodeURIComponent(JSON.stringify(exampleData));
                    examples[exampleName] = exampleObj;
                }

                rendered.push({
                    data: apiObject.examples,
                    content: markdown
                });
            }
        }


        res.render("style-guide/index.j2", {
            data: data,
            content: rendered,
            nav: pages
        });

    },

    index_old: function(req, res) {
        var i = 0,
            len,
            comment,
            component,
            component_name,
            example,
            component_regex,
            data = [],
            expression,
            regex,
            local_data,
            local_json;

        var nunjucks = require("../../config/nunjucks")(req.app);

        var handle = fs.readFileSync("./www/css/site.css", 'utf8');
        var comments = handle.match(/(\/\*\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/g);
        
        len = comments.length;


        var esc = function(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };

        // Parse inline comment blocks out as HTML through the nunjucks API
        for (i; i < len; i++) {
            comment = comments[i].replace("/**\n", "").replace("*/", "");
            component_regex = comment.match(/(:::[^*]*?:::)/g);
            component_example = comment.match(/::([\w\d\.\-]+.*)/g);

            for (var eg in component_example) {
                var component = component_example[eg].replace("::", "");
                var json = false;

                try {
                    json = jsonlint.parse(fs.readFileSync("/components/" + component + "/" + component + ".json", "utf8"));
                } catch(e) {
                    console.log('Couldn\'t read ' + component);
                }


                if (json) {

                    var show_code = typeof(json["show_code"]) === "undefined" ? true : json["show_code"];

                    example = prettyHtml(
                        nunjucks.render("style-guide/example.j2", {
                            item: json,
                            json: JSON.stringify(json, null, '  '),
                            get_param: encodeURIComponent(JSON.stringify(json)),
                            show_code: show_code
                        })
                    );

                    comment = comment.replace(component_example[eg], example);
                }
            }


            for (var reg in component_regex) {
                regex = component_regex[reg];
                example_data = regex.match(/({[^*]*?})/g);
                
                if (example_data){
                    example_data = example_data[0];

                    item_json = jsonlint.parse(example_data);
                    show_code = typeof(item_json["example"]) === "undefined" ? true : item_json["example"];
                    delete item_json["example"];

                    // Create an example and render it using the Nunjucks env
                    example = prettyHtml(
                        nunjucks.render("style-guide/example.j2", {
                            item: item_json,
                            json: JSON.stringify(item_json, null, '  '),
                            show_code: show_code
                        })
                    );

                    expression = new RegExp(example_data, "m");


                    var newData = regex.replace(expression, example);
                    newData = newData.replace(/:::/gm, "");

                    var oldRegex = new RegExp(regex, "m");
                    comment = comment.replace(oldRegex, newData);
                }
            }

            // var commentRegex = new RegExp(esc(comments[i]), "m");
            // handle = handle.replace(commentRegex, comment)

            comment = marked(comment);
            data.push({
                type: "chunk",
                text: comment
            });
        }

        return res.render("style-guide/index.j2", {
            "title": "Style guide",
            data: data
        });
    },
    page: function(req, res) {
        return res.render("./frontend/" + req.params.page + ".j2", {
        });
    },

    componentJson: function(req, res) {

        var name = req.params.component;
        var nunjucks = require("../../config/nunjucks")(req.app);
        var data = req.body || {};

        var obj = {
            "name": name,
            "data": nunjucks.render("components/" + name + "/" + name + ".j2", data)
        };

        return res.json(obj);
    },

    componentHtml: function(req, res) {
        // var name = req.params.component;
        var data = req.body;
        var name = req.params[0];


        if (!data.type) {
            var apiData = jsonlint.parse(fs.readFileSync("/components/" + name + "/" + name + ".json", "utf8"));

            try {
                data = apiData["examples"][0].example;
            } catch(e) {
              throw new Error("This API example is missing.");
            }

        }

        return res.render("components/" + name + "/" + name + ".j2", {
            item: data
        });
    },

    component: function(req, res) {
        var name = req.params.component;
        var data = req.body;

        if (req.method === "GET" && req.query['item']) {
            data = jsonlint.parse(req.query.item);
        }

        if (data.type) {
            return prettyHtml(res.render("components/" + data.type + "/" + data.type + ".j2", {
                item: data
            }));
        } else {
            throw new Error("Component not found");
        }
    },

    staticCss: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(fs.readFileSync("./www/css/screen.css", "utf8"));
        res.end();
    },

    staticJs: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(fs.readFileSync("./www/js/site.js", "utf8"));
        res.end();
    }
};

module.exports = new StyleGuide();




