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
