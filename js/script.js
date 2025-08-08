// filepath: portfolio-website/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Example of a simple form validation
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      if (!name || !email) {
        e.preventDefault();
        alert("Please fill in all fields.");
      }
    });
  }
});