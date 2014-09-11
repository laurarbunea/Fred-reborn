var jsonlint = require("jsonlint");

module.exports = (function () {
    "use strict";

    var fs = require('fs');
    var path = require('path');

    var flats = {};


    var getFile = function(path) {
        try {

            var data = jsonlint.parse(fs.readFileSync(path, "utf-8"));

            // get section data for header
            var section_path = path.split('/');
            if(section_path[2]!=="index.json") {
                var section_file = "./pages/" + section_path[2] + "/index.json";
                data.section = jsonlint.parse(fs.readFileSync(section_file, "utf-8"));
                data.section.icon = "i-section-"+section_path[2];
                data.section.path = "/"+section_path[2]+"/";
            }

            return data;

        } catch(e) {
            return {
                "title": "none"
            };
        }
    };


    function getFilesRecursive (folder) {
        var fileContents = fs.readdirSync(folder),
            fileTree = [],
            stats;

        fileContents.forEach(function (fileName) {
            stats = fs.lstatSync(folder + '/' + fileName);

            var relfolder = folder.replace("./pages", "");

            if (stats.isDirectory()) {
                var path = relfolder + '/' + fileName + '/';
                var obj = {
                    name: fileName,
                    path: path,
                    data: getFile(folder + '/' + fileName + "/index.json"),
                    children: getFilesRecursive(folder + '/' + fileName)
                };
                flats[path] = obj;
                fileTree.push(obj);

            } else {

                if (folder === "./pages" && fileName.match("index.json")) {
                    var path = relfolder + '/' + fileName.replace("index.json", "").replace(".json", "");

                    var obj = {
                        name: fileName,
                        data: getFile(folder + '/' + fileName),
                        path: path
                    };
                    flats[path] = obj;
                    fileTree.push(obj);
                } else if (!fileName.match("index.json") && fileName.match(".json")) {

                    var path = relfolder + '/' + fileName;

                    var obj = {
                        name: fileName,
                        data: getFile(folder + '/' + fileName),
                        path: path,
                        children: []
                    };
                    flats[path] = obj;
                    fileTree.push(obj);
                }
            }
        });

        return fileTree;
    }

    var pages = getFilesRecursive("./pages");

    var sorter = function(a, b) {
        var ao = a.data['order'];
        var bo = b.data['order'];


        if (ao && bo) {
            return ao > bo ? 1 : -1;
        }

        if (ao && !bo) {
            return 1;
        }

        if (!ao && bo) {
            return 1;
        }

        return -1;
    };

    var recursiveSort = function(arr) {
        var i, len, item;
        len = arr.length;

        arr.sort(sorter);

        for (i = 0; i < len; i++) {
            item = arr[i];
            if (item.children) {
                recursiveSort(item.children);
            }
        }

        return arr;
    };

    var _pages = recursiveSort(pages);


    return {
        nested: pages,
        flat: flats
    };

}());