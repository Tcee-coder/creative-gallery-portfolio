/* =========================
   PROJECT DATA
========================= */

const projects = [
  {
    title: "Smart Airport Baggage Tracking",
    category: "Web Development",
    image: "images/project-01.jpg",
    description:
      "A student prototype designed to simulate baggage registration, tracking and airport staff monitoring.",
  },

  {
    title: "UI/UX Design Concept",
    category: "UI/UX Design",
    image: "images/project-02.jpg",
    description:
      "A clean interface concept exploring layouts, visual hierarchy and user-focused design.",
  },

  {
    title: "Research Course Portal",
    category: "Web Application",
    image: "images/project-03.jpg",
    description:
      "An educational research portal supporting course activities, participant surveys and research data.",
  },

  {
    title: "STEM School Website",
    category: "Web Design",
    image: "images/project-04.jpg",
    description:
      "A responsive school website concept designed to present programmes, activities, news and resources.",
  },

  {
    title: "Technology Dashboard",
    category: "Dashboard Development",
    image: "images/project-05.jpg",
    description:
      "A dashboard interface concept for displaying useful information through cards, tables and visual data.",
  },

  {
    title: "Creative Web Experience",
    category: "Web Development",
    image: "images/project-06.jpg",
    description:
      "A modern web experience focused on visual presentation, responsive design and interaction.",
  },
];

/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isActive = mainNav.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");

    menuToggle.setAttribute(
      "aria-label",
      isActive ? "Close navigation menu" : "Open navigation menu",
    );

    menuToggle.textContent = isActive ? "✕" : "☰";
  });

  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Open navigation menu");

      menuToggle.textContent = "☰";
    });
  });
}

/* =========================
   FOOTER YEAR
========================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================
   LIGHTBOX
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDescription = document.getElementById("lightboxDescription");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const lightboxOverlay = document.querySelector(".lightbox-overlay");

let currentProjectIndex = 0;

/* =========================
   OPEN LIGHTBOX
========================= */

function openLightbox(index) {
  if (!lightbox) {
    return;
  }

  currentProjectIndex = index;

  const project = projects[currentProjectIndex];

  lightboxImage.src = project.image;
  lightboxImage.alt = project.title;

  lightboxTitle.textContent = project.title;

  lightboxCategory.textContent = project.category;

  lightboxDescription.textContent = project.description;

  lightbox.classList.add("active");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

/* =========================
   NEXT PROJECT
========================= */

function showNextProject() {
  currentProjectIndex++;

  if (currentProjectIndex >= projects.length) {
    currentProjectIndex = 0;
  }

  openLightbox(currentProjectIndex);
}

/* =========================
   PREVIOUS PROJECT
========================= */

function showPreviousProject() {
  currentProjectIndex--;

  if (currentProjectIndex < 0) {
    currentProjectIndex = projects.length - 1;
  }

  openLightbox(currentProjectIndex);
}

/* =========================
   PROJECT BUTTONS
========================= */

const projectButtons = document.querySelectorAll(".project-view-btn");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.getAttribute("data-index"));

    openLightbox(index);
  });
});

/* =========================
   LIGHTBOX CONTROLS
========================= */

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", showNextProject);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", showPreviousProject);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener("click", closeLightbox);
}

/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNextProject();
  }

  if (event.key === "ArrowLeft") {
    showPreviousProject();
  }
});

/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {
  lightbox.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true },
  );

  lightbox.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;

      handleSwipe();
    },
    { passive: true },
  );
}

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) < 50) {
    return;
  }

  if (swipeDistance < 0) {
    showNextProject();
  } else {
    showPreviousProject();
  }
}

/* =========================
   PREVENT IMAGE DRAGGING
========================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
});

/* =========================
   IMAGE PRELOADING
========================= */

projects.forEach((project) => {
  const image = new Image();

  image.src = project.image;
});

/* =========================
   SMOOTH SCROLLING
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* =========================
   RESET MOBILE MENU
========================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 700 && mainNav && menuToggle) {
    mainNav.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.textContent = "☰";
  }
});

/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    const emailSubject = encodeURIComponent(
      subject || "Freelance Project Inquiry",
    );

    const emailBody = encodeURIComponent(
      `Hello Tracy,

My name is ${name}.

Email: ${email}

Message:
${message}`,
    );

    const mailtoLink = `mailto:tracybaffoe56@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoLink;
  });
}

/* =========================
   CONSOLE MESSAGE
========================= */

console.log("Tracy Baffoe Portfolio loaded successfully.");
