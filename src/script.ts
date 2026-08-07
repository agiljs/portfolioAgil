// =====================================================
// TypeScript version (fully typed)
// =====================================================

// ==============================
// PRELOADER
// ==============================

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.style.opacity = "0";

  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// ==============================
// MOBILE MENU
// ==============================

const menuButton = document.querySelector<HTMLButtonElement>(".menu-btn");
const navMenu = document.querySelector<HTMLElement>(".nav-menu");

menuButton?.addEventListener("click", () => {
  if (!navMenu) return;

  navMenu.classList.toggle("active");

  const icon = menuButton.querySelector<HTMLElement>("i");
  if (!icon) return;

  if (navMenu.classList.contains("active")) {
    icon.classList.remove("bi-list");
    icon.classList.add("bi-x-lg");
  } else {
    icon.classList.remove("bi-x-lg");
    icon.classList.add("bi-list");
  }
});

// ==============================
// CLOSE MENU WHEN CLICK LINK
// ==============================

document.querySelectorAll<HTMLAnchorElement>(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("active");

    const icon = menuButton?.querySelector<HTMLElement>("i");
    if (!icon) return;

    icon.classList.remove("bi-x-lg");
    icon.classList.add("bi-list");
  });
});

// ==============================
// STICKY HEADER
// ==============================

const header = document.querySelector<HTMLElement>("header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 50) {
    header.style.background = "rgba(15,23,42,.95)";
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";
  } else {
    header.style.background = "rgba(15,23,42,.75)";
    header.style.boxShadow = "none";
  }
});

// ==============================
// ACTIVE NAVIGATION
// ==============================

const sections = document.querySelectorAll<HTMLElement>("section");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id") || "";
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ==============================
// SMOOTH SCROLL
// ==============================

document
  .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener(
      "click",
      function (this: HTMLAnchorElement, e: MouseEvent) {
        e.preventDefault();

        const href = this.getAttribute("href");
        if (!href) return;

        const target = document.querySelector<HTMLElement>(href);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      },
    );
  });

// ==============================
// BACK TO TOP
// ==============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==============================
// DARK MODE
// ==============================

const darkButton = document.getElementById("darkMode");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");

  if (darkButton) {
    darkButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }
}

darkButton?.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    darkButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    localStorage.setItem("theme", "dark");
    darkButton.innerHTML = '<i class="bi bi-moon-stars"></i>';
  }
});

// ==============================
// TYPING ANIMATION
// ==============================

const typingElement = document.getElementById("typing");

const words: string[] = [
  "Frontend Developer",
  "Web Developer",
  "UI Designer",
  "JavaScript Developer",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typingEffect(): void {
  if (!typingElement) return;

  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;

      setTimeout(typingEffect, 1500);

      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;

      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typingEffect, isDeleting ? 60 : 120);
}

typingEffect();

// ==============================
// SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll<HTMLElement>(
  ".section-title, .about-image, .about-content, .skill-card, .service-card, .project-card, .timeline-item, .stat-box, .testimonial-card, .contact-card, .contact-form",
);

const revealObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  element.classList.add("fade-up");
  revealObserver.observe(element);
});

// ==============================
// COUNTER ANIMATION
// ==============================

const counters = document.querySelectorAll<HTMLElement>(".stat-box h2");

const counterObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target as HTMLElement;

      const targetText = counter.textContent || "0";

      const target = parseInt(targetText, 10);

      let current = 0;

      const increment = Math.max(1, Math.ceil(target / 80));

      const updateCounter = (): void => {
        current += increment;

        if (current >= target) {
          counter.textContent = targetText;
        } else {
          counter.textContent = current + "+";

          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();

      counterObserver.unobserve(counter);
    });
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// ==============================
// PROGRESS BAR ANIMATION
// ==============================

const progressBars = document.querySelectorAll<HTMLElement>(".value");

const progressObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target as HTMLElement;

        const width = progress.dataset.width || "0";

        progress.style.width = width;

        progressObserver.unobserve(progress);
      }
    });
  },
  {
    threshold: 0.4,
  },
);

progressBars.forEach((progress) => {
  progress.dataset.width = progress.style.width || "";

  progress.style.width = "0";

  progressObserver.observe(progress);
});

// ==============================
// RIPPLE BUTTON EFFECT
// ==============================

const buttons = document.querySelectorAll<HTMLButtonElement>(".btn");

buttons.forEach((button) => {
  button.style.position = "relative";
  button.style.overflow = "hidden";

  button.addEventListener(
    "click",
    function (this: HTMLButtonElement, e: MouseEvent) {
      const ripple = document.createElement("span");

      const rect = this.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);

      ripple.style.width = size + "px";
      ripple.style.height = size + "px";

      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      ripple.className = "ripple";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    },
  );
});

// ==============================
// CURSOR GLOW
// ==============================

const cursor = document.createElement("div");

cursor.className = "cursor-glow";

document.body.appendChild(cursor);

window.addEventListener("mousemove", (e: MouseEvent) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// ==============================
// HERO PARALLAX
// ==============================

const heroImage = document.querySelector<HTMLElement>(".image-box");

window.addEventListener("mousemove", (e: MouseEvent) => {
  if (!heroImage) return;

  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

// ==============================
// LIGHTBOX PORTFOLIO
// ==============================

const portfolioImages =
  document.querySelectorAll<HTMLImageElement>(".project-card img");

const overlay = document.createElement("div");

overlay.className = "lightbox";

overlay.innerHTML = `
    <span class="close-lightbox">&times;</span>
    <img>
`;

document.body.appendChild(overlay);

const lightboxImage = overlay.querySelector<HTMLImageElement>("img");

portfolioImages.forEach((image) => {
  image.style.cursor = "pointer";

  image.addEventListener("click", () => {
    overlay.classList.add("show");

    if (lightboxImage) {
      lightboxImage.src = image.src;
    }
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("show");
});

// ==============================
// TOAST NOTIFICATION
// ==============================

const toast = document.createElement("div");

toast.className = "toast";

document.body.appendChild(toast);

function showToast(text: string): void {
  toast.innerHTML = text;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ==============================
// CONTACT FORM VALIDATION
// ==============================

interface ContactDraft {
  name: string;
  email: string;
  message: string;
}

const contactForm = document.getElementById(
  "contactForm",
) as HTMLFormElement | null;
const submitButton = document.getElementById(
  "btnSend",
) as HTMLButtonElement | null;
const nameInput = document.getElementById("name") as HTMLInputElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const messageInput = document.getElementById(
  "message",
) as HTMLTextAreaElement | null;

const phone = "6282178950267";

/*=================================
    LOAD DRAFT
==================================*/

window.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("contactDraft");
  if (!raw) return;

  const draft: ContactDraft = JSON.parse(raw);
  if (!draft) return;

  if (nameInput) nameInput.value = draft.name || "";
  if (emailInput) emailInput.value = draft.email || "";
  if (messageInput) messageInput.value = draft.message || "";
});

/*=================================
    SAVE DRAFT
==================================*/

function saveDraft(): void {
  const draft: ContactDraft = {
    name: nameInput?.value || "",
    email: emailInput?.value || "",
    message: messageInput?.value || "",
  };

  localStorage.setItem("contactDraft", JSON.stringify(draft));
}

nameInput?.addEventListener("input", saveDraft);
emailInput?.addEventListener("input", saveDraft);
messageInput?.addEventListener("input", saveDraft);

/*=================================
    SUBMIT
==================================*/

contactForm?.addEventListener("submit", function (e: SubmitEvent) {
  e.preventDefault();

  if (
    !submitButton ||
    !nameInput ||
    !emailInput ||
    !messageInput ||
    !contactForm
  )
    return;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // validasi
  // buka WhatsApp

  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }, 1000);

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name === "" || email === "" || message === "") {
    showToast("form masih kosong");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Format email tidak valid.");
    return;
  }

  const text = `Halo,

Perkenalkan saya ${name}

Email : ${email}

Pesan :

${message}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");

  localStorage.removeItem("contactDraft");

  contactForm.reset();
});
