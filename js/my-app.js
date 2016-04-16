// Initialize your app
var myApp = new Framework7();
	 material: true ;//enable Material theme
	 hideNavbarOnPageScroll: true;

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}


$(document).on("pagecreate", "#main_page", function () {
    $(".step").not(":eq(0)").addClass("ui-screen-hidden");
    $(".step:eq(0)").addClass("active");
    $(".progress p:eq(0)").addClass("currentStep");
    $(".ui-content").on("swipeleft swiperight", function (e) {
        var swipe = e.type,
            nextStep = $(".steps").find(".active").next(".step"),
            prevStep = $(".steps").find(".active").prev(".step");
        switch (true) {
            case (swipe == "swipeleft" && nextStep.length > 0):
                $(".step.active")
                    .toggleClass("slide out");
                break;
            case (swipe == "swiperight" && prevStep.length > 0):
                $(".step.active")
                    .toggleClass("slide out reverse");
                break;
        }
    });
}).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", ".step", function (e) {
    var elm = $(e.target);
    switch (true) {
        case (elm.hasClass("out") && !elm.hasClass("reverse")):
            $(elm).toggleClass("slide out ui-screen-hidden active");
            $(elm).next(".step").toggleClass("slide in active ui-screen-hidden");
            break;
        case (elm.hasClass("out") && elm.hasClass("reverse")):
            $(elm).toggleClass("slide out ui-screen-hidden reverse active");
            $(elm).prev(".step").toggleClass("slide in active reverse ui-screen-hidden");
            break;
        case (elm.hasClass("in") && !elm.hasClass("reverse")):
            elm.toggleClass("slide in");
            break;
        case (elm.hasClass("in") && elm.hasClass("reverse")):
            elm.toggleClass("slide in reverse");
            break;
    }
    var dot = $(".active").index();
	$("p:eq(" + dot + ")").addClass("currentStep");
	$("p:eq(" + dot + ")").prev("p").removeClass("currentStep");
   $("p:eq(" + dot + ")").next("p").removeClass("currentStep");
});


$(page).appendTo($.mobile.pageContainer).page();