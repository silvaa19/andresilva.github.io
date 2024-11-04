'use strict';


// Carousel navigation functionality
document.querySelectorAll(".project-modal").forEach((modal) => {
  const images = modal.querySelectorAll(".carousel-images img");
  let currentIndex = 0;

  const updateCarousel = (index) => {
    images.forEach((img, i) => img.classList.toggle("active", i === index));
  };

  modal.querySelector("[data-carousel-btn='prev']").addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateCarousel(currentIndex);
  });

  modal.querySelector("[data-carousel-btn='next']").addEventListener("click", () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateCarousel(currentIndex);
  });

  // Initialize the carousel display
  updateCarousel(currentIndex);
});







// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

///////////////////////////////////////////////////////

// Selecting all testimonial items and modals
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalCloseBtns = document.querySelectorAll("[data-modal-close-btn]");
const overlay = document.querySelectorAll("[data-overlay]");

'use strict';

// Toggle function for all modals
const toggleModalFunc = function (modal) {
  modal.classList.toggle("active");
  const overlay = modal.querySelector(".overlay");
  overlay.classList.toggle("active");
};

// Select all items that open modals (testimonials and projects)
document.querySelectorAll("[data-modal-id]").forEach((item) => {
  item.addEventListener("click", function () {
    const modalId = item.getAttribute("data-modal-id");
    const modal = document.getElementById(modalId);

    if (modal) {
      toggleModalFunc(modal);

      // Optional: Update modal content if applicable
      if (item.hasAttribute("data-testimonials-item")) {
        modal.querySelector("[data-modal-img]").src = item.querySelector("[data-testimonials-avatar]").src;
        modal.querySelector("[data-modal-img]").alt = item.querySelector("[data-testimonials-avatar]").alt;
        modal.querySelector("[data-modal-title]").innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
        modal.querySelector("[data-modal-text]").innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      }
    } else {
      console.error("Modal with ID " + modalId + " not found.");
    }
  });
});

// Close modals on close button and overlay click
document.querySelectorAll("[data-modal-close-btn], [data-overlay]").forEach((element) => {
  element.addEventListener("click", function () {
    const modal = element.closest(".modal-container");
    if (modal && modal.classList.contains("active")) toggleModalFunc(modal);
  });
});

overlay.forEach((overlayItem) => {
  overlayItem.addEventListener("click", function () {
    const modal = overlayItem.closest(".modal-container");
    testimonialsModalFunc(modal);
  });
});


///////////////////////////////////////////////////////


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// =========== CONTACT =========================//
// contact form variables
// Initialize EmailJS with your public key
emailjs.init('55Py0ebjoRAajEajl');

const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Send the form data using EmailJS
  emailjs.sendForm('service_a02gcpi', 'template_stykkyd', this)
    .then(function () {
       successMessage.style.display = 'block';
      //form.style.display = 'none';
    }, function (error) {
      // Display the exact error to understand what's going wrong
      console.error('Failed to send message:', error);
      alert(`Failed to send message: ${JSON.stringify(error)}`);
    });
});





// =============================================//



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}