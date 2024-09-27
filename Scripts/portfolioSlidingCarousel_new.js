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
  LoadPageContent(landingLink);
  AboutInfo();

  // Logo and line click handler
  $("#logo, .line").on("click", function () {
    event.preventDefault(); 
    //preventDefault()
    LoadPageContent(landingLink);
     currentIndex = 0;
    $(".line").css("cursor", "default");
  });

  $(document).on("click", ".back", function () {
    event.preventDefault();
    //preventDefault()
    LoadPageContent(landingLink);
    currentIndex = 0;
    $(".line").css("cursor", "default");
  
  });

  // Load content and initialize ProjectInfo and Carousel

  let currentIndex = 0;

  function LoadPageContent(link) {



    let pageId = "landing";

    
    $(".rightContainer")
      .hide()
      .load(link, function () {
        $(this).fadeIn(600);
        ProjectInfo();
        Carousel();

        if (history.state && history.state.PageId != pageId){
          history.pushState({PageId: pageId}, "", `?page=${pageId}`);

        }

      });
 
     
  }





let backElement = "<a href ='javascript:void(0)' class = 'back'><h3 class = 'cormorant-garamond-bold' >BACK</h3></a>"


function LoadRightContainer(pageId){

  const loadFile = injectLinkData(pageId);
  pageId = pageId.replace("-link", ""); 
  $(".rightContainer")
    .hide()
    .load(loadFile, function () {
      $(this).fadeIn(600);
     // PrependElement(backElement);
      AppendElement(backElement);
      $(".line").css("cursor", "pointer");
      // Push the new state to the browser's history
      //if (history.state && history.state.PageId != pageId){
        history.pushState({PageId: pageId}, "", `?page=${pageId}`);

      //}


    });

}
  function ProjectInfo() {
    $(".rightLanding").on("click", function (event) {
      let idLink = event.target.parentElement.id;
      
      if (idLink) {

        LoadRightContainer(idLink);
         
      }
    });
  }

  function PrependElement(element){

   
    $(".rightProjectInfo").prepend(element);
    // $(".rightProjectInfo").children(".back").css("padding-bottom", "10%");



  }

  function AppendElement(element){

    $(".rightProjectInfo").append(element);


  }

  function AboutInfo(){
    $("#about").click( function (event) {
      let idLink = event.target.id;
      if (idLink) {
      LoadRightContainer(idLink);
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

  window.addEventListener("popstate", function (event) {
    const state = event.state;
    if (state != null){

     if (state.PageId != "landing") {
       LoadRightContainer(state.PageId);

    } else {
      LoadPageContent(landingLink);  // Load the landing page if no specific state is present

      
     }
  
    } 
  });

  currentIndex = localStorage.getItem("carouselIndex") || 0;

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

  function shiftArrayLeft(arr) {

    if (arr.length === 0) return arr;
    if (currentIndex == 0){
      for (let index = 0; index < 6; index++) {
        console.log(arr);
        const firstElement = arr.shift();  // Remove the first element of the array
      arr.push(firstElement);
        
      }
      currentIndex = currentIndex -4;

    } else {
      const firstElement = arr.shift();  // Remove the first element of the array
      arr.push(firstElement);  // Add the removed element to the end of the array
    }
   
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
  

    let modifiedPattern = carouselPattern.slice()

  


    let timer;
    let startX = 0;
    let startY = 0;
    let endX = 0;

    let nextSlide = () => {
      if(currentIndex < slides.length-4){

          shiftArrayRight(modifiedPattern);
    

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
      console.log("pattern: "+ patternMapped + " current index: " + currentIndex);


    };

    let prevSlide = () => {
      if (currentIndex > -slides.length) {
        shiftArrayLeft(modifiedPattern);  // You can write a `shiftArrayLeft` function to reverse the order
        currentIndex--;

      } else {
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
      console.log("pattern: "+ modifiedPattern + " current index: " + currentIndex);
      
      

    };

    if (isTouchDevice()) {
      section.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;  // Get the initial touch position (X-axis)
      }, { passive: false });

      document.querySelector(".rightLanding").addEventListener("touchmove", function(event) {
        const diffX = e.touches[0].clientX - startX;
        const diffY = e.touches[0].clientY - startY;
    
        // If the swipe is more horizontal than vertical, prevent default behavior (scrolling)
        if (Math.abs(diffX) > Math.abs(diffY)) {
            event.preventDefault();
        }
    }, { passive: false });
  
      section.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;  // Get the final touch position (X-axis)
  
        // Determine the swipe direction (left or right)
        if (startX > endX + 25) {
          // Left swipe (next slide)
          nextSlide();
        } else if (startX < endX - 25) {
          // Right swipe (previous slide)
          prevSlide();  // You can implement a `prevSlide` function if needed
        }

  

      });
    }

  if (section != null) {
      timer = window.setInterval(nextSlide, 4500);
      if (!isTouchDevice()) {
        section.addEventListener("click", nextSlide);

      } 

    }


    // if (section != null) {
    //   timer = window.setInterval(nextSlide, 4500);
    //   if (isTouchDevice()) {
    //     // Disable click events and enable touch events for carousel
    //     section.addEventListener("touchstart", nextSlide);
    //    // section.removeEventListener("click", nextSlide); // Optional: Remove click if needed
    //   } else {
    //     // Enable click events for non-touch devices
    //     section.addEventListener("click", nextSlide);
    //   }

    //   // section.addEventListener("click", nextSlide);
    //   // // section.addEventListener("touch", nextSlide);
    //   // section.addEventListener("touchmove", nextSlide);
    //   // timer = window.setInterval(nextSlide, 4500);

    // }


  }
});
