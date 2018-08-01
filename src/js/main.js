$(function() {

    
    var focusOut = false; 
    $('.navbar-top .btn-search').click(function(ev){
        ev.preventDefault(); 
        $('.search-form .search-container').addClass('search-active');
        if(!focusOut){
            focusOut = true;
            $('.gsc-input').focusout(function(ev){
                $('.search-form .search-container').removeClass('search-active');
            }); 
        }
     });

     
/*     $('.navbar-top .btn-search').focusout(function(ev){
        $('.search-form .search-container').removeClass('search-active');
     });  */
     
     $("a[href='/request-tutor/']").click(function(ev){
         ev.preventDefault();
         $(".request-popup").removeClass("hidden");
     });

     $(".request-popup .form-header i").click(function(ev){
        ev.preventDefault();
        $(".request-popup").addClass("hidden");
     })

});