'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * SIGN UP/LOGIN
 */
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}


var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");

function login() {
    loginForm.style.left = "4px";
    registerForm.style.right = "-520px";
    loginBtn.classList.add("white-btn");
    registerBtn.classList.remove("white-btn");
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
}

function register() {
    loginForm.style.left = "-510px";
    registerForm.style.right = "5px";
    loginBtn.classList.remove("white-btn");
    registerBtn.classList.add("white-btn");
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
}

const popup = document.getElementById("popup");
const body = document.body;

function openPopup() {
  popup.style.display = "flex";
  body.classList.add("freeze-scroll");
}

function closePopup() {
  popup.style.display = "none";
  body.classList.remove("freeze-scroll");
}

const closeButton = document.querySelector('.close2-btn');
closeButton.addEventListener('click', function() {
  popup.style.display = 'none';
});







/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * ORDER RECEIPT
 */
function orderreceipt() {
  
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var food = document.getElementById("food").options[document.getElementById("food").selectedIndex].text;
  var quantity = document.getElementById("quantity").value;
  var orderrDate = document.getElementById("orderr-date").value;
  var time = document.getElementById("time").options[document.getElementById("time").selectedIndex].text;
  var message = document.getElementById("message").value;

  

  var receiptNumber = "Receipt #12345";
  var date = new Date().toLocaleDateString();

  var canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1200;
  var context = canvas.getContext('2d');
  
  context.fillStyle = "#F0F0F0";

  context.fillRect(0, 0, canvas.width, canvas.height);

  
  context.font = "bold 36px Arial";
  context.fillStyle = "#000000";
  context.fillText("-------------------------- ORDER RECEIPT --------------------------", 20, 30);
  context.fillText("---------------------- BAHARI DISHES ----------------------", 50, 100);
  context.font = "24px Arial";
  
  context.fillText("Receipt Number: " + receiptNumber, 60, 160);
  context.fillText("Date: " + date, 60, 220);
  context.fillText("Customer: " + name, 60, 280);
  context.fillText("Phone Number: " + phone, 60, 340);
  context.fillText("Order: " + food, 60, 400);
  context.fillText("Quantity: " + quantity, 60, 460);
  context.fillText("Order Date: " + orderrDate, 60, 520);
  context.fillText("Time: " + time, 60, 580);
  context.fillText("Message" + message, 60, 640);

  var image = new Image();
  image.src = canvas.toDataURL("image/png");

  var link = document.createElement('a');
  link.href = image.src;
  link.download = 'order_receipt.png';

 
  link.click();
}







/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});