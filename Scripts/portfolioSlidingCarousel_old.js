$(document).ready(function () {
 

  // $('body').removeClass('hide');
  $("body").hide().fadeIn(400);
  var landingLink = "Sub-Pages/ProjectCarousel.html";
  $(".rightContainer").hide().load(landingLink).fadeIn(600);
  
  $.when($.ajax("Sub-Pages/ProjectCarousel.html")).then(ProjectInfo);
  $.when($.ajax("Sub-Pages/ProjectCarousel.html")).then(Carousel);

  




  $("#logo, .line").on("click", function () {
    $(".rightContainer").hide().load(landingLink).fadeIn(600);
    $.when($.ajax("Sub-Pages/ProjectCarousel.html")).then(Carousel);
    $.when($.ajax("Sub-Pages/ProjectCarousel.html")).then(ProjectInfo);
    $('.line').css('cursor', 'default');
  });



  function ProjectInfo() {

    $(".rightLanding").on( "click", function( event ) {
if (event.target.parentElement.id != ''){
       var idLink = event.target.parentElement.id;
       console.log(idLink);
      var loadFile = injectLinkData(idLink);
  $(".rightContainer").hide().load(loadFile).fadeIn(600);
  $('.line').css('cursor', 'pointer');



}
       

    });


    
 }




function injectLinkData(dataId){

 var $dataId = dataId.replace("-link", "");
var data;
  switch (String($dataId)) {
      case 'resonance':
      data = 'Sub-Pages/ProjectDescriptions/ProjectInfo_Resonance.html'
      break;

      case 'silenceOf':
      data = 'Sub-Pages/ProjectDescriptions/ProjectInfo_SilenceOf.html'
      break;
      
      case 'sitrekin':
      data = 'Sub-Pages/projectInfo.html'
      break;

      case 'blackQueen':

      break;

      case 'vsr':

      break;

      case 'sostr':

      break;

      case 'syntheticUtopia':

      break;

      case 'emptyMind':

      break;

      default: 
      // data = NaN;

       data = 'Sub-Pages/projectInfo.html'
      
      } 

     


      return data



}



  function Carousel() {
    
//  if (window.matchMedia("min-width:1281px")){

//   var mobileScrollText = '<section><div><p>Click for next project</p></div></section>'
//   $(mobileScrollText).addClass('clickToScroll');
//   $('.container').append(mobileScrollText);
//  }




    let pattern = [2, 1, 1, 4, 0, 0, 0, 0];

    var section = document.querySelector(".rightLanding");
    var slides = section.querySelectorAll("div");

    for (let index = pattern.length; index < slides.length; index++) {
      pattern.push(0);
      //  console.log(pattern)
    }

    var dif = slides.length - pattern.length;
    //  console.log(slides)
    let index = 0;

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    //console.log(pattern)
    let nextSlide = () => {
      index += 1;
      index %= pattern.length;


      /*pattern.forEach(element => {
    if (element < index || element > index +2) {

        pattern[element] = 0

    } else {
        let random = (Math.random()*10)/2
        let randomCeil = Math.ceil(random)
        pattern[element] = randomCeil
    }

    
})*/

      for (let i = 0; i < pattern.length; i++) {
        /*  if (i < index || i > index +2 || i > index - 2 ) {

        pattern[i] = 0

    } else {
        let random = (Math.random()*10)/3
        let randomCeil = Math.ceil(random)
        pattern[i] = randomCeil
    } */

        // if ( i >= index && i <= index + 3 || i < index -3 ){
        //     let random = (Math.random()*10)

        //     console.log(random)
        //     let randomCeil = Math.ceil(random)

        //     if (i != index){
        //         pattern[i] = randomCeil
        //         slides[i].classList.remove("hide")
        //     }

        // } else {
        //     pattern[i] = 0
        //     slides[i].classList.add("hide")

        // }

        if ((i >= index && i <= index + 3) || i < index - 3) {
          if (i != index && pattern[i] == 0) {
            let random = randomNumber(2, 5);

            //  console.log(random)
            pattern[i] = random;
            slides[i].classList.remove("hide");
          }
        } else {
          pattern[i] = 0;
          slides[i].classList.add("hide");
        }
      }

      let pattern2 = pattern
        .map((p) => {
          return `${p}fr`;
        })
        .join(" ");

      section.style.gridTemplateColumns = pattern2;

      //console.log(pattern2)
      //console.log("index: " + index)
    };

    if (section != null) {
      section.addEventListener("click", nextSlide);
      // section.addEventListener("touch", nextSlide);
      section.addEventListener("touchmove", nextSlide);
    }
  }
});
