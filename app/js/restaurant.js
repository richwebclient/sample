//this function will be called after page is initialized
jQuery(function () {
    jQuery("section").on("click", "figure", function () {
        var selected = jQuery(this).hasClass("selected");
        jQuery("section figure.selected").removeClass("selected");
        if (!selected) {
            jQuery(this).addClass("selected");
        }
    });

    var tableCtrl = tableController(tableService());
    tableCtrl.redraw();
});


var tableService = function () {
    var tables = [
        {
            id: 1,
            state: "FREE"
        },
        {
            id: 2,
            state: "OCCUPIED"
        },
        {
            id: 3,
            state: "OCCUPIED"
        },
        {
            id: 4,
            state: "FREE"
        },
        {
            id: 5,
            state: "FREE"
        },
        {
            id: 6,
            state: "OCCUPIED"
        }
    ], findTable = function (id) {
        for (var index in tables) {
            if (tables[index].id === id) {
                return tables[index];
            }
        }
    };


    return {
        getTables: function () {
            return tables;
        },
        occupy: function (id) {
            var table = findTable(id);
            table.state = "OCCUPIED";
            this.markTable(table);
        }, 
        free: function (id) {
            var table = findTable(id);
            table.state = "FREE";
            this.markTable(table);
        }, findTable : findTable,
        getFromServer : function( callback ) {
            jQuery.get('/services/rest/tablemanagement/table/', function(data) {
                tables = data;
                callback(tables);
            });
        },
        markTable : function (table, callback) {
            jQuery.post( '/services/rest/tablemanagement/table/'+table.id+'/markTableAs'+table.state);
            
        }
    };
};

var tableController = function (tableService) {
    var addTableButtons = function (tableElem, id) {
        var menu = jQuery("<menu>");
        var occupyButton = jQuery("<button>OCCUPY</button>");
        occupyButton.on("click", function () {
            tableService.occupy(id);
            updateTable(tableElem,id);
        });
        var freeButton = jQuery("<button>FREE</button>");
        freeButton.on("click", function () {
            tableService.free(id);
            updateTable(tableElem,id);
        });
        menu.append(occupyButton);
        menu.append(freeButton);
        tableElem.append(menu);
    }, updateTable = function(tableElem, id) {
        var table = tableService.findTable(id);
        tableElem.attr('data-state', table.state);
    };
    
    

    return {
        makeTable: function (table) {
            var figTable = jQuery("<figure>");

            var figTableCaption = jQuery("<figcaption>").text(table.id);
            figTable = figTable.append(figTableCaption);
            figTable.attr('data-state', table.state);
            figTable.addClass("table");
            figTable.attr("data-id", table.id);
            addTableButtons(figTable, table.id);
            return figTable;
        },
        drawTables: function () {
            var root = jQuery("section"),
                    allTables = tableService.getTables();

            for (var i = 0; i < allTables.length; i++) {
                root.append(this.makeTable(allTables[i]));
            }
        },
        redraw: function () {
            var self = this;
            tableService.getFromServer( function() { self.drawTables(); } );
        }
        
    };

};