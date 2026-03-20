document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enrollForm');
  const messageDiv = document.getElementById('formMessage');

  // Clear previous errors and messages
  function clearErrors() {
    messageDiv.textContent = '';
    messageDiv.style.color = '';
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(err => err.remove());
  }

  // Show error message next to a field
  function showError(field, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#5C4033'; // chocolate color for errors
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '4px';
    field.parentNode.appendChild(error);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    // Check required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        showError(field, 'This field is required');
        valid = false;
      }
    });

    // Email format validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value.trim())) {
        showError(emailField, 'Please enter a valid email address');
        valid = false;
      }
    }

    if (!valid) {
      messageDiv.textContent = '⚠ Please fix the errors above and try again.';
      messageDiv.style.color = '#5C4033'; // chocolate warning
      messageDiv.style.fontWeight = 'bold';
      return;
    }

    // If valid, show success message
    messageDiv.textContent = '✅ Thank you for your application! We will contact you soon.';
    messageDiv.style.color = '#3E2723'; // deep brown for success
    messageDiv.style.fontWeight = 'bold';

    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav ul");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
});