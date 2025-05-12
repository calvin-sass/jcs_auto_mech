"use strict";
/* 

Author: Calvin Sass
Date: 27 October 2022

File Name: script.js

*/

// VARIABLES

// Event Listener to load staff data
window.addEventListener("load", () => {
  // Retrieve staff data with FETCH API
  fetch("staff.json")
    .then((response) => response.json())
    .then((text) => {
      // Get the staff array in JSON file
      let staff = text.staff;

      // Get access employee input fields
      let empName = document.querySelectorAll(".emp-name");
      let empAge = document.querySelectorAll(".emp-age");
      let empCountry = document.querySelectorAll(".emp-country");
      let empCity = document.querySelectorAll(".emp-city");
      let empPosition = document.querySelectorAll(".emp-position"); // Fixed typo: 'empPosistion' to 'empPosition'

      // Iterate through the HTML collection and insert staff data
      for (let i = 0; i < staff.length; i++) {
        empName[i].textContent = staff[i].name;
        empAge[i].textContent = staff[i].age;
        empCountry[i].textContent = staff[i].country;
        empCity[i].textContent = staff[i].city;
        empPosition[i].textContent = staff[i].position; // Fixed typo
      }
    })
    .catch((error) => console.error("Error fetching staff data:", error)); // Improved error logging
});

// SLIDESHOW
let allImages = document.querySelectorAll(".image-container");
let imageView = document.querySelector(".image-view");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");
let closeBtn = document.querySelector(".close-image");
let imageBox = document.querySelector(".image-box");
let currentImageIndx = 0;

if (imageView !== null) {
  // Fixed null check
  closeBtn.addEventListener("click", () => {
    imageView.style.display = "none";
    imageBox.style.display = "none";
  });
}

// Iterate through all the images and capture the click event
allImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    imageView.style.display = "block";
    imageBox.style.display = "block";
    currentImageIndx = index + 1;
    currentImageDisplay();
  });
});

// Function to display the current image
function currentImageDisplay() {
  imageBox.style.background = `url(images/${currentImageIndx}.jpg) center/cover no-repeat`;
}

if (prevBtn !== null) {
  // Fixed null check
  // Navigation of the slideshow
  prevBtn.addEventListener("click", () => {
    currentImageIndx--;
    if (currentImageIndx === 0) {
      currentImageIndx = allImages.length;
    }
    currentImageDisplay();
  });
}

if (nextBtn !== null) {
  // Fixed null check
  // Navigation of the slideshow
  nextBtn.addEventListener("click", () => {
    currentImageIndx++;
    if (currentImageIndx > allImages.length) {
      // Fixed boundary condition
      currentImageIndx = 1;
    }
    currentImageDisplay();
  });
}

// REGISTER FORM
// Get access to submit button and email
let submitBtn = document.getElementById("submit");
let email1 = document.getElementById("email-check");

if (email1 !== null) {
  // Fixed null check
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission for validation

    // Validate Email
    validateEmail(email1);

    // Validate Password
    passwordCheck();
  });
}

// Function to validate password
function passwordCheck() {
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("password2");

  if (password.validity.patternMismatch) {
    password.setCustomValidity(
      "Your password must be at least 8 characters with at least one letter and one number"
    );
  } else if (password.value !== confirmPassword.value) {
    password.setCustomValidity("Your passwords must match");
  } else {
    password.setCustomValidity("");
  }
  password.reportValidity(); // Ensure the message is displayed
}

// Function to validate Email Address
function validateEmail(email) {
  if (email.value === "") {
    // Fixed condition
    email.setCustomValidity("Enter your email address");
  } else if (!isEmail(email.value)) {
    email.setCustomValidity("Email is not valid");
  } else {
    email.setCustomValidity("");
  }
  email.reportValidity(); // Ensure the message is displayed
}

function isEmail(email) {
  let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return regex.test(email);
}

// FORM VALIDATION ON THE FORM SUBMIT FORM

// Get order information from invoice form
window.addEventListener("load", function () {
  // Retrieve the field/value pairs from the URL
  let formData = location.search.slice(1);
  formData = formData.replace(/\+/g, " ");
  formData = decodeURIComponent(formData);
  let formFields = formData.split(/[&=]/g);

  // Write the field values to the order form
  let orderForm = document.forms.orderInfo;
  if (orderForm) {
    // Ensure the form exists
    orderForm.elements.maintenance2.value = "R " + formFields[1];
    orderForm.elements.communication2.value = "R " + formFields[5];
    orderForm.elements.ac2.value = "R " + formFields[9];
    orderForm.elements.other2.value = "R " + formFields[13];

    let finalSub = document.querySelector("#subtotal2");
    let finalTax = document.querySelector("#tax2");
    let finalTotal = document.querySelector("#total2");

    let finalSubNumber = (
      parseFloat(formFields[1]) +
      parseFloat(formFields[5]) +
      parseFloat(formFields[9]) +
      parseFloat(formFields[13])
    ).toFixed(2);
    let finalTaxNumber = (finalSubNumber * 0.14).toFixed(2);
    let finalTotalNumber = (
      parseFloat(finalSubNumber) + parseFloat(finalTaxNumber)
    ).toFixed(2);

    finalSub.innerHTML = finalSubNumber;
    finalTax.innerHTML = finalTaxNumber;
    finalTotal.innerHTML = finalTotalNumber;
  }
});

// Fixed duplicate variable declaration for formSubmitBtn
let formSubmitBtn = document.getElementById("formsubmit-btn");
if (formSubmitBtn) {
  formSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission
    validateEmail(paymentEmail);
    validateName();
    validateNumber();
    validateMonth();
    validateYear();
    validateCVV();
  });
}

// Fixed reset button event listener
let resetBtn = document.getElementById("reset");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    document.forms.serviceForm.reset();
  });
}
