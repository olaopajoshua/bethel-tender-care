/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      if (window.innerWidth <= 960) {
        mainNav.style.display = "none";
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

/* SCROLL REVEAL */
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section, .card, .feature, .stat, .teacher-card, .event-card")
  .forEach(el => {
    el.classList.add("will-appear");
    observer.observe(el);
  });

/* inject fade styles */
const style = document.createElement("style");
style.innerHTML = `
  .will-appear {opacity:0; transform:translateY(18px); transition:all .8s cubic-bezier(.2,.9,.2,1);}
  .is-visible {opacity:1; transform:none;}
`;
document.head.appendChild(style);

/* COUNTERS */
function animateCount(el, target) {
  let start = 0;
  const duration = 1500;
  const step = Math.max(1, Math.floor(target / (duration / 16)));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 16);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".count").forEach(counter => {
    const target = +counter.dataset.target || 0;
    const io = new IntersectionObserver((entries, ob) => {
      if (entries[0].isIntersecting) {
        animateCount(counter, target);
        ob.unobserve(counter);
      }
    }, { threshold: 0.5 });
    io.observe(counter);
  });
});

/* TESTIMONIALS CAROUSEL */
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

function showTestimonial(i) {
  testimonials.forEach(t => t.classList.remove("active"));
  testimonials[i].classList.add("active");
}

prevBtn.addEventListener("click", () => {
  index = (index - 1 + testimonials.length) % testimonials.length;
  showTestimonial(index);
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
});

// Auto-slide every 5 seconds
setInterval(() => {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
}, 5000);

// Initial load
showTestimonial(index);

/* GALLERY LIGHTBOX */
(function () {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  const img = document.createElement("img");
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      img.src = item.src || item.querySelector("img").src;
      lightbox.classList.add("visible");
    });
  });

  lightbox.addEventListener("click", () =>
    lightbox.classList.remove("visible")
  );
})();

/* FAQ ACCORDION */
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const open = answer.style.display === "block";
    document.querySelectorAll(".faq-a").forEach(a => (a.style.display = "none"));
    answer.style.display = open ? "none" : "block";
  });
});

/* ENROLL FORM */
const enrollForm = document.getElementById("enrollForm");
if (enrollForm) {
  enrollForm.addEventListener("submit", e => {
    e.preventDefault();
    const required = enrollForm.querySelectorAll("[required]");
    for (let el of required) {
      if (!el.value.trim()) {
        el.focus();
        alert("Please fill all required fields.");
        return;
      }
    }
    document.getElementById("formMessage").textContent =
      "Application submitted. We will contact you shortly.";
    enrollForm.reset();
  });
}

const toggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav ul");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

