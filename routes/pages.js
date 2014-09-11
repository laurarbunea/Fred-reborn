var PRODUCTION = false;
var fs = require('fs');
var jsonlint = require("jsonlint");

var displayNode = function(res, data) {
    var template = "pages/page.j2";

    if (data.template) {
        template = data.template;
    }

    res.render(template, data);
};



exports.node = function(req, res, next) {
    var filepath, file, url, basepath;
    url = req.path.split("/");
    basepath = req.route.path.split("/")[1];

    url.shift();

    filepath = "../pages/" + url.join("/") + "/index.json";
    filepath = filepath.replace("//", "/");

    console.log(filepath);

    if (PRODUCTION) {
        file = require(filepath);
        return displayNode(file, res);
    } else {
        fs.readFile(filepath.replace("../",""), 'utf8', function (err, data) {
            if (err) {

                if (err.code === "ENOENT") {
                    err.status = 404;

                    return next(err);
                }

                return next(new Error(err));
            }
            try {
                data = jsonlint.parse(data);
                try {
                    // also get section data
                    var section_path = filepath.split('/');
                    console.log("section_path: ",section_path);
                    if(section_path[2]!=="index.json") {
                        var section_file = "./pages/" + section_path[2] + "/index.json";
                        data.section = jsonlint.parse(fs.readFileSync(section_file, "utf-8"));
                        data.section.icon = "i-section-"+section_path[2];
                        data.section.path = "/"+section_path[2]+"/";
                    }
                } catch(err) {
                    console.log(err);
                }
                displayNode(res, data);
            } catch(err) {
                console.log(err);
                return next(new Error("Couldn't decode json file.. check your syntax. " + err , 500));
            }
           
        });
    }
};


exports.search = function(req, res, next) {

    var term = req.query.term;

    var results = [
        {title: "Result 1"}, {title: "Result 2"}, {title: "Result 3"}, {title: "Result 4"}, {title: "Result 5"},
        {title: "Result 6"}, {title: "Result 7"}, {title: "Result 8"}, {title: "Result 9"}, {title: "Result 10"}
    ];



    res.render("pages/search.j2", { term: term, results: results });
};