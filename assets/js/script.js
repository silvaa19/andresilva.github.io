'use strict';
//APIKEYS
let latestCommitDate = '';

const fetchLatestCommit = async (repo) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/commits`);
    const data = await response.json();
    const latestCommit = data[0];
    return latestCommit;
  } catch (error) {
    console.error('Error fetching latest commit:', error);
  }
};

// Prefetch the latest commit data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchLatestCommit('silvaa19/ENT_Login_Project').then((commit) => {
    if (commit) {
      latestCommitDate = new Date(commit.commit.author.date).toLocaleDateString('en-US');
    }
  });
});

// Prevent the default action of project links
document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevents page from scrolling to top or reloading
  });
});

// Carousel navigation functionality with swipe support
document.querySelectorAll(".carousel").forEach((carousel) => {
  const images = carousel.querySelectorAll(".carousel-images img");
  let currentIndex = 0;
  let startX = 0;
  let endX = 0;

  const updateCarousel = (index) => {
    images.forEach((img, i) => img.classList.toggle("active", i === index));
  };

  // Event listeners for previous and next buttons
  carousel.querySelector("[data-carousel-btn='prev']").addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateCarousel(currentIndex);
  });

  carousel.querySelector("[data-carousel-btn='next']").addEventListener("click", () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateCarousel(currentIndex);
  });

  // Swipe handling for mobile devices
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  const handleSwipe = () => {
    if (startX > endX + 50) {
      // Swipe left: Show next image
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    } else if (startX < endX - 50) {
      // Swipe right: Show previous image
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    }
    updateCarousel(currentIndex);
  };

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

      // Update the latest commit date in the modal
      const latestCommitDateElement = modal.querySelector('[data-latest-commit-date]');
      latestCommitDateElement.innerHTML = latestCommitDate;
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
    toggleModalFunc(modal);
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