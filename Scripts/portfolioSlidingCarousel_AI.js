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

    function Carousel() {
        let currentIndex = Number(localStorage.getItem('carouselIndex')) || 0;
        const section = document.querySelector(".rightLanding");
        const slides = section.querySelectorAll("div");
        const totalItems = slides.length;
        const visibleItems = 4; // Number of visible items at a time

        function showSlides() {
            slides.forEach((slide, i) => {
                slide.classList.toggle("hide", i < currentIndex || i >= currentIndex + visibleItems);
            });
            localStorage.setItem('carouselIndex', currentIndex);
        }

        function nextSlide() {
        
            currentIndex = (currentIndex + 1) % totalItems;
            if (currentIndex + visibleItems > totalItems) {
                currentIndex = 0;
            }
            showSlides();
        }

        showSlides();

        section.addEventListener("click", nextSlide);
        section.addEventListener("touchmove", nextSlide);
    }
});
