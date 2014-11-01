//this function will be called after page is initialized
jQuery(function () {
    jQuery("section").on("click", "figure", function () {
        var selected = jQuery(this).hasClass("selected");
        jQuery("section figure.selected").removeClass("selected");
        if (!selected) {
            jQuery(this).addClass("selected");
        }
    });
});


var tableService = function () {
    var tables, _getTables = function () {
        return tables;
    }, _initTables = function () {
        tables = [
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
        ];
    };
    _initTables();
    return {
        getTables: _getTables
    };
};

