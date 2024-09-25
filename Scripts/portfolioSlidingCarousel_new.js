$(document).ready(function () {

//   document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

function isTouchDevice() {
  return (
    'ontouchstart' in window ||    // Check if touch events are supported
    navigator.maxTouchPoints > 0 ||  // For modern devices (touch screens, tablets, etc.)
    navigator.msMaxTouchPoints > 0   // For older Microsoft devices
  );
}

// if (isTouchDevice()) {
//   console.log("Touch device detected.");
// } else {
//   console.log("Non-touch device detected.");
// }
  const landingLink = "Sub-Pages/ProjectCarousel.html";


  // Initial page load effects
  $("body").hide().fadeIn(400);
  loadPageContent(landingLink);

  // Logo and line click handler
  $("#logo, .line").on("click", function () {
    console.log("klik"),
    loadPageContent(landingLink);
    $(".line").css("cursor", "default");
  });

  $(document).on("click", "#back", function () {
    console.log("klik"),
    loadPageContent(landingLink);
    $(".line").css("cursor", "default");
  });

  // Load content and initialize ProjectInfo and Carousel
  function loadPageContent(link) {
    //$("#back").remove();
    $(".rightContainer")
      .hide()
      .load(link, function () {
        $(this).fadeIn(600);
        ProjectInfo();
        AboutInfo();
        Carousel();
      });
 
     
      // <h3 class = "cormorant-garamond-light one-liner">BACK</h3>
  }

  function ProjectInfo() {
    $(".rightLanding").on("click", function (event) {
      const idLink = event.target.parentElement.id;
      if (idLink) {
        const loadFile = injectLinkData(idLink);
        $(".rightContainer")
          .hide()
          .load(loadFile, function () {
            $(this).fadeIn(600);
            PrependElement("<a href ='#' id = 'back'><h3 class = 'cormorant-garamond-light' >BACK</h3></a>");
            $(".line").css("cursor", "pointer");

          });
         
      }
    });
  }

  function PrependElement(element){

    $(".rightContainer").prepend(element);


  }

  function AboutInfo(){
    $("#about").click( function (event) {
      const idLink = event.target.id;
      if (idLink) {
        const loadFile = injectLinkData(idLink);
        $(".rightContainer")
          .hide()
          .load(loadFile, function () {
            $(this).fadeIn(600);
            PrependElement("<a href =#' id = 'back'>BACK</a>");
            $(".line").css("cursor", "pointer");
          });
      }





    });
  }

  function injectLinkData(dataId) {
    

    let dataMapping = {
      about: "Sub-Pages/PortfolioAbout",

      resonance: "Sub-Pages/ProjectDescriptions/ProjectInfo_Resonance.html",
      silenceOf: "Sub-Pages/ProjectDescriptions/ProjectInfo_SilenceOf.html",
      sitrekin: "Sub-Pages/ProjectDescriptions/ProjectInfo_Sitrekin.html",
      blackQueen: "Sub-Pages/ProjectDescriptions/ProjectInfo_blackQueen.html",
      vsr:  "Sub-Pages/ProjectDescriptions/ProjectInfo_VSR.html",
      sostr: "Sub-Pages/ProjectDescriptions/ProjectInfo_SØSTR.html",
      glas: "Sub-Pages/ProjectDescriptions/ProjectInfo_Glas.html",
      syntheticUtopia: "Sub-Pages/ProjectDescriptions/ProjectInfo_SyntheticUtopia.html",
      emptyMind: "Sub-Pages/ProjectDescriptions/ProjectInfo_EmptyMind.html",

      default: "Sub-Pages/projectInfo.html",
    };
    let key;
    if (dataId.includes('-link')) {
      key = dataId.replace("-link", "");
    } else {
      key = dataId;
    }
    

    return dataMapping[key] || dataMapping["default"];
  }



  let currentIndex = localStorage.getItem("carouselIndex") || 0;

  function shiftArrayRight(arr) {
    if (arr.length === 0) return arr; // If the array is empty, return it as is.
    const lastElement = arr.pop(); // Remove the last element of the array.
    // if (currentIndex < visibleItems){
      arr.unshift(lastElement); // Add the removed element to the front of the array.

    // } else {
    //   arr.push(0);
    // }

    return arr;
  }

  function MakePattern(slideArr, visibleArr){

    if (slideArr.length === 0) return visibleArr;
    let carouselArr = visibleArr.slice();

    for (let index = visibleArr.length; index < slideArr.length; index++) {

      carouselArr.push(0);
    }
    return carouselArr;

  }
  function Carousel() {

    let visibleItemsPattern = [4, 6, 3, 2];
    //let carouselPattern = [4, 6, 3, 2, 0, 0];
    let timeOut;
    var section = document.querySelector(".rightLanding");
    var slides = section.querySelectorAll("div");
    const carouselPattern = MakePattern(slides,visibleItemsPattern);
   // console.log(visibleItemsPattern);
   //console.log(carouselPattern);
    //const visibleItems = visibleItemsPattern.length;

    let modifiedPattern = carouselPattern.slice()
  


    let timer;

    let nextSlide = () => {
      if(currentIndex < slides.length-4){



          shiftArrayRight(modifiedPattern);
          //console.log(carouselPattern);

        currentIndex++;

      } else{
         modifiedPattern = carouselPattern.slice();
         currentIndex = 0;
      }

      

      

      patternMapped = modifiedPattern
        .map((p) => {
          return `${p}fr`;
        })
        .join(" ");



      clearInterval(timer);
      section.style.gridTemplateColumns = patternMapped;

    };

    if (section != null) {
      timer = window.setInterval(nextSlide, 4500);
      if (isTouchDevice()) {
        // Disable click events and enable touch events for carousel
        section.addEventListener("touchmove", nextSlide);
        section.removeEventListener("click", nextSlide); // Optional: Remove click if needed
      } else {
        // Enable click events for non-touch devices
        section.addEventListener("click", nextSlide);
      }

      // section.addEventListener("click", nextSlide);
      // // section.addEventListener("touch", nextSlide);
      // section.addEventListener("touchmove", nextSlide);
      // timer = window.setInterval(nextSlide, 4500);


    }


  }
});
