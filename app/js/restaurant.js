//this function will be called after page is initialized
jQuery( function() {
  jQuery("section").on("click", "figure", function() {
    var selected = jQuery(this).hasClass("selected");
    jQuery("section figure.selected").removeClass("selected");
    if (!selected) {
        jQuery(this).addClass("selected");
    }
    
    
  }) ;
  
  
});

