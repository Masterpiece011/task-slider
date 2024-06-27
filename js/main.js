"use strict"

const allSlidesIds = []
let pickedSlidesIds = [0]

let currentSlide = 0
let offset = 0
let slideWidth = 960

const continueBtn = document.querySelector(".js-continue-btn")
const progressBarElem = document.querySelector(".js-progress-bar")

const slidesList = document.querySelector(".js-slides-list")
const allSlidesElems = document.querySelectorAll(".js-slide")
const allSlidesItemsElems = document.querySelectorAll(".js-slides-item")
const slidesItemsContainer = document.querySelector(".js-slides-items")

const prevSlideBtn = document.querySelector(".js-prev-btn")
const nextSlideBtn = document.querySelector(".js-next-btn")


function pickedSlidesChecker() {
    if (!pickedSlidesIds.includes(currentSlide)) {
        pickedSlidesIds.push(currentSlide)
    }
}

function pickCurrentSlide() {
    currentSlide == 0 ? prevSlideBtn.classList.remove('active') : prevSlideBtn.classList.add('active')
    currentSlide == allSlidesIds.length - 1 ? nextSlideBtn.classList.remove('active') : nextSlideBtn.classList.add('active')
    offset = -slideWidth * currentSlide
    slidesList.style.left = offset + "px"
}

function refreshCurrentSlideItems() {
    const allSlidesItemsElems = document.querySelectorAll(".js-slides-item")
    allSlidesItemsElems.forEach(slideItem => {
        slideItem.classList.remove("active")
    })
    allSlidesItemsElems[currentSlide].classList.add("active")
}

function refreshProgressBar(countPickedSlides) {
    if (countPickedSlides > (allSlidesIds.length / 2)) {
        progressBarElem.style.backgroundColor = "#ffd43f"
    }
    if (countPickedSlides == allSlidesIds.length) {
        progressBarElem.style.backgroundColor = "#73BE43"
    }
    progressBarElem.style.width = countPickedSlides * (1000 / allSlidesIds.length) + "px"
}

function isReadyToContinue() {
    if (pickedSlidesIds.length == allSlidesIds.length) {
        continueBtn.removeAttribute("disabled")
        continueBtn.classList.add("active")
    }
}

function getCurrentSlideId() {
    let activeSlideId = 0

    const allSlidesItemsElems = document.querySelectorAll(".js-slides-item")

    for (let id = 0; id < allSlidesItemsElems.length; id++) {
        if (allSlidesItemsElems[id].classList.contains("active")) {
            activeSlideId = id
        }
    }
    return activeSlideId
}

function nextSlide() {
    if (offset > (-slideWidth * (allSlidesElems.length - 1))) {
        currentSlide += 1
        offset = offset - slideWidth
        slidesList.style.left = offset + "px"
        currentSlide == 0 ? prevSlideBtn.classList.remove('active') : prevSlideBtn.classList.add('active')
        currentSlide == allSlidesIds.length - 1 ? nextSlideBtn.classList.remove('active') : nextSlideBtn.classList.add('active')
        pickedSlidesChecker()
        refreshCurrentSlideItems()
        refreshProgressBar(pickedSlidesIds.length)
        isReadyToContinue()
    }
}

function prevSlide() {
    if (offset < 0) {
        currentSlide -= 1
        offset = offset + slideWidth
        slidesList.style.left = offset + "px"
        currentSlide == 0 ? prevSlideBtn.classList.remove('active') : prevSlideBtn.classList.add('active')
        currentSlide == allSlidesIds.length ? nextSlideBtn.classList.remove('active') : nextSlideBtn.classList.add('active')
        pickedSlidesChecker()
        refreshCurrentSlideItems()
        refreshProgressBar(pickedSlidesIds.length)
        isReadyToContinue()
    }
}

function renderSlidesItems() {
    for (let i = 0; i < allSlidesIds.length; i++) {
        let slideItem = document.createElement("li")
        slideItem.classList.add("main__slides-item")
        slideItem.classList.add("js-slides-item")
        if (i == 0) {
            slideItem.classList.add("active")
        }
        slidesItemsContainer.appendChild(slideItem)
    }

    const allSlidesItemsElems = document.querySelectorAll(".js-slides-item")

    allSlidesItemsElems.forEach(slideItem => {
        slideItem.addEventListener("click", () => {
            document.querySelectorAll(".js-slides-item").forEach(slideItem => {
                slideItem.classList.remove("active")
            })
            slideItem.classList.add("active")
            currentSlide = getCurrentSlideId()
            pickCurrentSlide()
            pickedSlidesChecker()
            refreshProgressBar(pickedSlidesIds.length)
            isReadyToContinue()
        })
    })
}

nextSlideBtn.addEventListener("click", () => {
    nextSlide()
})

prevSlideBtn.addEventListener("click", () => {
    prevSlide()
})

for (let id = 0; id < allSlidesElems.length; id++) {
    allSlidesIds.push(id)
}

renderSlidesItems()
slidesList.style.width = allSlidesIds.length * slideWidth + "px"
progressBarElem.style.width = (1000 / allSlidesIds.length) + "px"
