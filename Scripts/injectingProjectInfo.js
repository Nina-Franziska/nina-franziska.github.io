
$(document).ready(function () {





       
// $( document ).on( "ajaxComplete", function( event, request, settings ) {

//    if ( settings.url === "PortfolioNina-Franziska_China.html" ) {
//       $( "p" ).text( "Triggered ajaxComplete handler. The result is " +
//         xhr.responseText );
//     }

   
//  });

$.when( $.ajax( "/ProjectCarousel.html" ) ).then(ProjectInfo);   

// switch (projectClass) {
//    case resonance:
//    // statements to be executed when expression matches value1
//    data = 'projectInfo.html'
//    break;
//    case silenceOf:
//    // statements to be executed when expression matches value2
//    break;
//    //
//    case sitrekin:
//    // statements to be executed when expression matches valueN
//    break;

//    case blackQueen:

//    break;

//    case VSR:

//    break;

//    case sostr:

//    break;

//    case syntheticUtopia:

//    break;

//    case emptyMind:

//    break;

//    default: 
//    data = 'projectInfo.html'
   
//    }



function ProjectInfo(){

   $(".rightLanding").on("click", function () {
      $(".rightLanding").fadeOut(50);
      // var $wrapper = $("<div>", { id: "", class: "RightProjectInfoWrapper" });
      $('#rightContainer').hide().load("ProjectInfo.html").fadeIn(600);
      
      // $wrapper.hide();
      // $("#rightContainer").prepend($wrapper);
      // $wrapper.fadeIn(600);
      // $(".rightLanding").empty();
    });

}





});


// const rightContainer = document.getElementById('right');
// box.innerHTML =
//   '<object width="100%" type="text/html" data="home.html"</object>';
