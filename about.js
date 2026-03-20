const toggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav ul");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});