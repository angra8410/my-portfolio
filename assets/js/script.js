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

// Initialize EmailJS
emailjs.init("WUwT4rzcyJX7RPNOk");

document.addEventListener('DOMContentLoaded', function() {
  // Get the contact form
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.error("Contact form not found!");
    return;
  }

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submission started");

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const templateParams = {
      from_name: this.querySelector('[name="from_name"]').value,
      from_email: this.querySelector('[name="from_email"]').value,
      from_phone: this.querySelector('[name="from_phone"]').value,
      message: this.querySelector('[name="message"]').value,
      to_name: 'Antonio'
    };
    console.log("Form data:", templateParams);

    // Send the email using EmailJS
    emailjs.send('service_yifcdby', 'template_dgv7l6q', templateParams)
      .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert('Message sent successfully!');
        contactForm.reset();
      })
      .catch(function(error) {
        console.error("FAILED...", error);
        alert('Failed to send message: ' + error.text);
      })
      .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
});
