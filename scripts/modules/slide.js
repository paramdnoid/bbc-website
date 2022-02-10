const slidercontainer = document.querySelector(".slider-outer-wrapper");
const slide = document.querySelector(".slider-inner-wrapper");
const slides = document.querySelectorAll(".slide");
const hammer = new Hammer(slide);
const slidersize = 100;
const sensitivity = 15;

let timer;
let panIsRunning = false;
let activeIndex = 0;

slide.style.width = `${slides.length * 100}%`;

hammer.on("pan", ($event) => {
    panIsRunning = true;
    const panDistance = ((slidersize / slides.length) * $event.deltaX) / slide.clientWidth;
    const panDistanceCalculated = panDistance - (slidersize / slides.length) * activeIndex;
    animateSlider(panDistanceCalculated);
    if ($event.isFinal) {
        if (panDistance <= -(sensitivity / slides.length)) {
            goToSlide(activeIndex + 1);
        } else if (panDistance >= sensitivity / slides.length) {
            goToSlide(activeIndex - 1);
        } else {
            goToSlide(activeIndex);
        }
    }
});

const generateBullets = (elements, target) => {
    const newNavigation = document.createElement("ul");
    newNavigation.classList.add("contentnav");
    elements.forEach((bullet, index) => {
        const newBullet = document.createElement("li");
        newBullet.dataset.active = index;
        if (index === activeIndex) {
            newBullet.classList.add("selected");
        }
        newNavigation.appendChild(newBullet);
    });
    target.appendChild(newNavigation);
    document.querySelectorAll(".contentnav > li").forEach((bullet) => {
        bullet.addEventListener("click", bulletClick, false);
    });
};

const bulletClick = ($event) => {
    activeIndex = Number($event.target.dataset.active);
    goToSlide(activeIndex);
};

const setActiveBullet = () => {
    const activeBullet = document.querySelector(".contentnav > .selected");
    if (activeBullet) {
        activeBullet.classList.remove("selected");
    }
    document.querySelectorAll(".contentnav > li").forEach((bullet) => {
        if (bullet.dataset.active === activeIndex.toString()) {
            bullet.classList.add("selected");
        }
    });
};

const goToSlide = (index) => {
    if (index < 0) {
        activeIndex = 0;
    } else if (index > slides.length - 1) {
        activeIndex = slides.length - 1;
    } else {
        activeIndex = index;
    }
    slide.classList.add("is-animating");
    const percentage = -(slidersize / slides.length) * activeIndex;
    animateSlider(percentage);
    setActiveBullet();
    setActiveSlide(activeIndex);
    addSmoothTransition();
};

const addSmoothTransition = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        slide.classList.remove("is-animating");
        panIsRunning = false;
    }, 400);
};

const animateSlider = (percentage) => {
    const distance = (slidersize / slides.length) * (slides.length - 1);
    if (percentage > 0) {
        percentage = 0;
    } else if (percentage < -distance) {
        percentage = -distance;
    }
    slide.style.transform = "translateX( " + percentage + "% )";
};

const setActiveSlide = (index) => {
    const ELEMENT = document.querySelector(".active");
    if (ELEMENT) {
        ELEMENT.classList.remove("active");
    }
    slides[index].classList.add("active");
};

setActiveSlide(activeIndex);
generateBullets(slides, slidercontainer);
