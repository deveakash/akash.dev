/* ==========================================
   NAVBAR & MOBILE MENU
========================================== */

const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const year = document.getElementById("year");

// Automatically update the copyright year
if (year) {
  year.textContent = new Date().getFullYear();
}

// Navbar scroll effect
window.addEventListener(
  "scroll",
  () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

// Mobile navigation toggle
menuToggle?.addEventListener("click", () => {
  if (!navLinks) return;

  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );

  menuToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Navigation links
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    navLinks
      .querySelectorAll("a")
      .forEach((item) => item.classList.remove("active"));

    link.classList.add("active");
  });
});

/* ==========================================
   WHATSAPP PROJECT ENQUIRY
   Akash Sharma — Developer Portfolio
========================================== */

(() => {
  const contactForm = document.getElementById("contactForm");

  // Country code + phone number, without + or spaces.
  const WHATSAPP_NUMBER = "917068575216";

  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.namedItem("name")?.value.trim();
    const email = form.elements.namedItem("email")?.value.trim();
    const projectType = form.elements.namedItem("projectType")?.value;
    const message = form.elements.namedItem("message")?.value.trim();

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailInput = form.elements.namedItem("email");

    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    // Build the enquiry message
    const whatsappMessage = [
      "Hi Akash! I'd like to discuss a project with you.",
      "",
      "*PROJECT ENQUIRY*",
      "",
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*Project Type:* ${projectType}`,
      "",
      "*Project Details:*",
      message,
      "",
      "I'd like to discuss the requirements, timeline, and pricing.",
      "",
      "I found your portfolio website.",
    ].join("\n");

    // Generate WhatsApp URL
    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(whatsappMessage);

    // Open WhatsApp in a new tab
    const whatsappWindow = window.open(whatsappURL, "_blank");

    // Fallback if the browser blocks the new tab
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  });
})();

/* ==========================================
   SCROLL REVEAL — MATCHES YOUR HTML
========================================== */

(() => {
  const selectors = [
    "#about .section-heading",
    "#about .about-copy",
    "#about .stat",
    "#services .section-heading",
    "#services .service-card",
    ".tech-strip",
    "#projects .section-heading",
    "#projects .project-card",
    "#projects .project-note",
    "#process .section-heading",
    "#process .process-grid article",
    "#contact .contact-intro",
    "#contact .contact-form",
  ];

  const elements = document.querySelectorAll(selectors.join(", "));

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Respect accessibility preferences
  if (reducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  // Add animation classes
  elements.forEach((element) => {
    element.classList.add("scroll-reveal");

    if (
      element.matches(
        "#services .service-card, #projects .project-card, #process .process-grid article, #about .stat",
      )
    ) {
      element.classList.add("from-scale");

      const siblings = Array.from(element.parentElement.children);
      const index = siblings.indexOf(element);

      element.style.setProperty("--reveal-delay", `${index * 100}ms`);
    }

    if (
      element.matches(
        "#about .section-heading, #about .about-copy, #contact .contact-intro",
      )
    ) {
      element.classList.add("from-left");
    }

    if (element.matches("#contact .contact-form")) {
      element.classList.add("from-right");
    }
  });

  // Observe elements as they enter the viewport
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
})();
