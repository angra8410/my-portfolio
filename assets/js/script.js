'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    // Toggle active state of buttons
    toggleBtns.forEach((btn, index) => {
      if (index === i) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Toggle the button box active state
    if (i === 1) { // Tools button clicked
      toggleBtnBox.classList.add("active");
      skillsBox.classList.add("active");
    } else { // Skills button clicked
      toggleBtnBox.classList.remove("active");
      skillsBox.classList.remove("active");
    }
  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/**
 * contact form
 */

// Initialize EmailJS with your public key
(function() {
  emailjs.init("HTMuORnzBGwneriD6"); // Replace with your actual public key
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Send the email using EmailJS
  emailjs.sendForm('service_yifcdby', 'template_dgv7l6q', this)
    .then(function() {
      // Show success message
      alert('Message sent successfully!');
      // Reset form
      document.getElementById('contact-form').reset();
    }, function(error) {
      // Show error message
      alert('Failed to send message. Please try again.');
      console.error('EmailJS error:', error);
    })
    .finally(function() {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});
