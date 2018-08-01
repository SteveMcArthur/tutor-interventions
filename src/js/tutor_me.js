/*global $*/
// Contact Form Scripts
$(function() {



    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
    
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var subjects = $("input#subjects").val();
            var location = $("input#location").val();
            var fname = $("input#first-name").val();
            var lname = $("input#last-name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var freq = $("input[name='frequency']:checked").val();
            var delivery = $("input[name='delivery']:checked").val();
            var name =  fname + " " + lname;
      
            $.ajax({
                url: "https://getsimpleform.com/messages/ajax?form_api_token=437c648741436f4156d4a081cbc1a2df",
                dataType: "jsonp",
                data: {
                    "Title": "Tutor Request from "+name+"  in "+location+" via tutorinterventions.co.uk",
                    "Name": name,
                    "Subjects": subjects || "Not indicated",
                    "Location": location,
                    "Frequency": freq || "Not indicated",
                    "Delivery": delivery || "Not indicated",
                    "Details": message,
                    "Phone": phone,
                    "Email": email
                },
                cache: false,
                success: function() {
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success > .alert-success")
                        .append("<strong>Your message has been sent. </strong>");
                    $("#success > .alert-success")
                        .append("</div>");

                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function() {
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success > .alert-danger").append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$("#name").focus(function() {
    $("#success").html("");
});
