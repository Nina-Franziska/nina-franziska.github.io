$(document).ready(function () {
  const landingLink = "Sub-Pages/ProjectCarousel.html";

  // Initial page load effects
  $("body").hide().fadeIn(400);
  loadPageContent(landingLink);

  // Logo and line click handler
  $("#logo, .line").on("click", function () {
      loadPageContent(landingLink);
      $(".line").css("cursor", "default");
  });

  // Load content and initialize ProjectInfo and Carousel
  function loadPageContent(link) {
      $(".rightContainer").hide().load(link, function () {
          $(this).fadeIn(600);
          ProjectInfo();
          Carousel();
      });
  }

  function ProjectInfo() {
      $(".rightLanding").on("click", function (event) {
          const idLink = event.target.parentElement.id;
          if (idLink) {
              const loadFile = injectLinkData(idLink);
              $(".rightContainer").hide().load(loadFile, function () {
                  $(this).fadeIn(600);
                  $(".line").css("cursor", "pointer");
              });
          }
      });
  }

  function injectLinkData(dataId) {
      const dataMapping = {
          'resonance': 'Sub-Pages/ProjectDescriptions/ProjectInfo_Resonance.html',
          'silenceOf': 'Sub-Pages/ProjectDescriptions/ProjectInfo_SilenceOf.html',
          'sitrekin': 'Sub-Pages/ProjectDescriptions/ProjectInfo_Sitrekin.html',
          'blackQueen': 'Sub-Pages/ProjectDescriptions/ProjectInfo_blackQueen.html',
          'vsr': 'Sub-Pages/ProjectDescriptions/ProjectInfo_VSR.html',
          'sostr': 'Sub-Pages/ProjectDescriptions/ProjectInfo_SØSTR.html',
          'syntheticUtopia': 'Sub-Pages/ProjectDescriptions/ProjectInfo_SyntheticUtopia.html',
          'emptyMind': 'Sub-Pages/ProjectDescriptions/ProjectInfo_EmptyMind.html',
          'default': 'Sub-Pages/projectInfo.html'
      };
      const key = dataId.replace("-link", "");
      return dataMapping[key] || dataMapping['default'];
  }

  // function getRandomInt(min, max) {
  //   const minCeiled = Math.ceil(min);
  //   const maxFloored = Math.floor(max);
  //   return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  // }
  

  function shiftArrayRight(arr) {
    if (arr.length === 0) return arr; // If the array is empty, return it as is.
    const lastElement = arr.pop(); // Remove the last element of the array.
    arr.unshift(lastElement); // Add the removed element to the front of the array.
    return arr;
}

  function Carousel() {

    let currentIndex = localStorage.getItem('carouselIndex') || 0;
   
// let pattern2 = [2, 1, 1, 4, 0, 0, 0, 0]
    let pattern2 = [4, 6, 3, 2, 0, 0];

    var section = document.querySelector(".rightLanding");
    var slides = section.querySelectorAll("div");
    //let currentIndex = 0;
    
    // const totalItems = slides.length;
    // let pattern = [totalItems];
      const visibleItems = 4;
    // var minFraction = 1;
    // var maxFraction = 4;

    // for (let index = 0; index < totalItems; index++) {
    //   if(index < showedItems){
    //     pattern[index] = getRandomInt(minFraction, maxFraction);
    //   } else {
    //     pattern[index] = 0;
    //   }

    // }

    // console.log(pattern);


  //   function showSlides() {
  //     slides.forEach((slide, i) => {
  //         slide.classList.toggle("hide", i < currentIndex || i >= currentIndex + visibleItems);
  //     });
  //     localStorage.setItem('carouselIndex', currentIndex);
  // }

    
    let nextSlide = () => {
      shiftArrayRight(pattern2);
      let pattern3 = pattern2
        .map((p) => {
          return `${p}fr`;
        })
        .join(" ");
      //section.style.gridTemplateColumns = "4fr 2fr 3fr 2fr 0fr 0fr";
      currentIndex++;
      section.style.gridTemplateColumns = pattern3;
      console.log(pattern3);

      
          // for (let index = 0; index < totalItems; index++) {
    //   if(index < showedItems){
    //     pattern[index] = getRandomInt(minFraction, maxFraction);
    //   } else {
    //     pattern[index] = 0;
    //   }

    //showSlides();

    }; 

   // showSlides();

    if (section != null) {
      section.addEventListener("click", nextSlide);
      // section.addEventListener("touch", nextSlide);
      section.addEventListener("touchmove", nextSlide);
    }
  }
});
