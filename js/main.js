"use strict"

const allSlidesIds = []
let pickedSlidesIds = []

let currentSlide = 0
let offset = 0
let slideWidth = 960

let currentSliderContent = []
let currentSliderItems = []
let currentSliderElems = []

const continueBtn = document.querySelector(".js-continue-btn")
const progressBarElem = document.querySelector(".js-progress-bar")

const allSliders = document.querySelectorAll(".js-slider")

function pickedSlidesChecker(pickedSlidesCount, allSlidesItems) {
    for (let id = 0; id < allSlidesItems.length; id++) {
        if (allSlidesItems[id].classList.contains("active") && !pickedSlidesCount.includes(id)) {
            pickedSlidesCount.push(id)
        }
    }
}

function pickCurrentSlide(countOfSliderContent) {
    let currentPrevBtn = document.querySelector(".js-slider.active .js-prev-btn")
    let currentNextBtn = document.querySelector(".js-slider.active .js-next-btn")
    let currentSlidesList = document.querySelector(".js-slider.active .js-slides-list")

    currentSlide == 0 ? currentPrevBtn.classList.remove('active') : currentPrevBtn.classList.add('active')
    currentSlide == countOfSliderContent - 1 ? currentNextBtn.classList.remove('active') : currentNextBtn.classList.add('active')
    offset = -slideWidth * currentSlide
    currentSlidesList.style.left = offset + "px"
}

function refreshCurrentSlideItems() {
    let allCurrentSlidesItems = document.querySelectorAll(".js-slider.active .js-slides-item")
    allCurrentSlidesItems.forEach(slideItem => {
        slideItem.classList.remove("active")
    })
    allCurrentSlidesItems[currentSlide].classList.add("active")
}

function refreshProgressBar(countPickedSlides) {
    let bgColor = ""
    if (countPickedSlides > (allSlidesIds.length / 2)) {
        bgColor = "#ffd43f"
    }
    if (countPickedSlides == allSlidesIds.length) {
        bgColor = "#73BE43"
    }
    progressBarElem.style.backgroundColor = bgColor
    progressBarElem.style.width = countPickedSlides * (1000 / allSlidesIds.length) + "px"
}

function isReadyToContinue(countPickedSlides, countAllSlides) {
    if (countPickedSlides == countAllSlides) {
        continueBtn.removeAttribute("disabled")
        continueBtn.classList.add("active")
    }
}

function getCurrentSlideId() {
    let activeSlideId = 0
    let currentSliderItems = document.querySelectorAll(".js-slider.active .js-slides-item")

    for (let id = 0; id < currentSliderItems.length; id++) {
        if (currentSliderItems[id].classList.contains("active")) {
            activeSlideId = id
        }
    }
    return activeSlideId
}

function refreshSlider() {
    pickedSlidesChecker(pickedSlidesIds, allSlidesItemsElems)
    refreshProgressBar(pickedSlidesIds.length)
    isReadyToContinue(pickedSlidesIds.length, allSlidesIds.length)
}

function nextSlide(countOfSlides) {
    offset = -slideWidth * currentSlide
    if (offset > (-slideWidth * (countOfSlides - 1))) {
        let currentSlidesList = document.querySelector(".js-slider.active .js-slides-list")
        let currentPrevBtn = document.querySelector(".js-slider.active .js-prev-btn")
        let currentNextBtn = document.querySelector(".js-slider.active .js-next-btn")

        currentSlide += 1
        offset = -slideWidth * currentSlide
        currentSlidesList.style.left = offset + "px"
        
        currentSlide == 0 ? currentPrevBtn.classList.remove('active') : currentPrevBtn.classList.add('active')
        currentSlide == countOfSlides - 1 ? currentNextBtn.classList.remove('active') : currentNextBtn.classList.add('active')
        refreshCurrentSlideItems()
        refreshSlider()
    }
}

function prevSlide(countOfSlides) {
    offset = -slideWidth * currentSlide
    if (offset < 0) {
        let currentSlidesList = document.querySelector(".js-slider.active .js-slides-list")
        let currentPrevBtn = document.querySelector(".js-slider.active .js-prev-btn")
        let currentNextBtn = document.querySelector(".js-slider.active .js-next-btn")

        currentSlide -= 1
        offset = -slideWidth * currentSlide
        currentSlidesList.style.left = offset + "px"

        currentSlide == 0 ? currentPrevBtn.classList.remove('active') : currentPrevBtn.classList.add('active')
        currentSlide == countOfSlides ? currentNextBtn.classList.remove('active') : currentNextBtn.classList.add('active')
        
        refreshCurrentSlideItems()
        refreshSlider()
    }
}

function renderSlidesItems(countOfSlides, sliderListEl) {
    for (let i = 0; i < countOfSlides; i++) {
        let slideItem = document.createElement("li")
        slideItem.classList.add("main__slides-item")
        slideItem.classList.add("js-slides-item")
        if (i == 0) {
            slideItem.classList.add("active")
        }
        sliderListEl.appendChild(slideItem)
    }
}

function clearActiveSliders() {
    allSliders.forEach(slider => {
        slider.classList.remove("active")
    })
}

allSliders.forEach(slider => {
    slider.addEventListener("mouseover", () => {
        if (!slider.classList.contains("active")) {
            clearActiveSliders()
            slider.classList.add("active")

            currentSlide = getCurrentSlideId()
            currentSliderContent = slider.querySelectorAll(".js-slide")
            currentSliderItems = currentSliderContent.length
            currentSliderElems = slider.querySelectorAll(".js-slides-item")
        }
    })

    currentSliderContent = slider.querySelectorAll(".js-slide")
    currentSliderItems = currentSliderContent.length

    let sliderContainer = slider.querySelector(".js-slides-items")
    const sliderList = slider.querySelector(".js-slides-list")
    sliderList.style.width = currentSliderItems * slideWidth + "px"

    renderSlidesItems(currentSliderItems, sliderContainer)

    currentSliderElems = slider.querySelectorAll(".js-slides-item")

    currentSliderElems.forEach(slideItem => {
        slideItem.addEventListener("click", () => {
            slider.querySelectorAll(".js-slides-item").forEach(slideItem => {
                slideItem.classList.remove("active")
            })
            slideItem.classList.add("active")
            currentSlide = getCurrentSlideId()
            pickCurrentSlide(currentSliderItems)
            refreshSlider()
        })
    })

    const prevSlideBtn = slider.querySelector(".js-prev-btn")
    const nextSlideBtn = slider.querySelector(".js-next-btn")

    nextSlideBtn.addEventListener("click", () => {
        nextSlide(currentSliderContent.length)
    })

    prevSlideBtn.addEventListener("click", () => {
        prevSlide(currentSliderContent.length)
    })
})

const allSlidesItemsElems = document.querySelectorAll(".js-slides-item")

for (let id = 0; id < allSlidesItemsElems.length; id++) {
    allSlidesIds.push(id)
}

pickedSlidesChecker(pickedSlidesIds, allSlidesItemsElems)

progressBarElem.style.width = pickedSlidesIds.length * (1000 / allSlidesIds.length) + "px"
