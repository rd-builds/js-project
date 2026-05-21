/* ============================================================
   TABLE OF CONTENTS
   1.  SMOOTH SCROLL
   2.  NAVBAR — MOBILE COLLAPSE
   3.  NAVBAR — SCROLL SHADOW EFFECT
   4.  NAVBAR — SCROLL SPY (ACTIVE LINK HIGHLIGHT)
   5.  SCROLL REVEAL (INTERSECTION OBSERVER)
   6.  BACK TO TOP BUTTON
   7.  COUNTER ANIMATION
   8.  TOAST NOTIFICATION (UTILITY)
   9.  DONATE PAGE — AMOUNT SELECTOR
   10. DONATE PAGE — RECURRING / ONE-TIME TOGGLE
   11. DONATE PAGE — FORM VALIDATION & SUBMISSION
   12. IMPACT TABS — DYNAMIC CONTENT SWITCHER
   13. VOLUNTEER FORM — VALIDATION & SUBMISSION
   14. PARTNER FORM — VALIDATION & SUBMISSION
   15. STORY SLIDER — MANUAL + AUTO SLIDE
   16. STORY MODAL — OPEN / CLOSE
   17. FOOTER — NEWSLETTER FORM
   18. TESTIMONIAL CAROUSEL — AUTO-ROTATE
   19. EVENTS — DATA, RENDER & REGISTRATION MODAL
   ============================================================ */


/* ============================================================
   1. SMOOTH SCROLL
   Intercepts clicks on nav links that point to in-page anchors
   and scrolls to the target section smoothly.
   ============================================================ */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith("#")) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* ============================================================
   2. NAVBAR — MOBILE COLLAPSE
   Closes the Bootstrap navbar collapse menu when a nav link
   is clicked on small screens (viewport width < 992 px).
   ============================================================ */
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992 && navbarCollapse) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});


/* ============================================================
   3. NAVBAR — SCROLL SHADOW EFFECT
   Adds a subtle box-shadow to the navbar once the user scrolls
   more than 50 px from the top of the page.
   ============================================================ */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".custom-navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
  }
});


/* ============================================================
   4. NAVBAR — SCROLL SPY (ACTIVE LINK HIGHLIGHT)
   Tracks which section is currently visible in the viewport
   and adds the "active" class to the matching nav link.
   ============================================================ */
const sections  = document.querySelectorAll("section");
const navLinks2 = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  /* Find the section whose top edge has been passed */
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  /* Highlight the matching nav link */
  navLinks2.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


/* ============================================================
   5. SCROLL REVEAL (INTERSECTION OBSERVER)
   Watches all elements with class "hidden" and adds class
   "show" once they enter the viewport.
   ============================================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));


/* ============================================================
   6. BACK TO TOP BUTTON
   Shows the button after scrolling 300 px, and scrolls
   smoothly to the top when clicked.
   ============================================================ */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (topBtn) {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

if (topBtn) {
  topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}


/* ============================================================
   7. COUNTER ANIMATION
   Animates every ".counter" element from 0 up to its
   "data-target" value using a rapid incremental loop.
   ============================================================ */
document.querySelectorAll(".counter").forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const count  = +counter.innerText;
    const inc    = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 20);
    } else {
      counter.innerText = target; /* Snap to exact target value */
    }
  };

  update();
});


/* ============================================================
   8. TOAST NOTIFICATION (UTILITY)
   Creates a temporary on-screen toast message that auto-
   removes itself after 3 seconds. Used by multiple sections.
   ============================================================ */
function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText  = msg;
  toast.className  = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


/* ============================================================
   9. DONATE PAGE — AMOUNT SELECTOR
   Handles preset donation amount buttons and a free-text
   custom amount field. Keeps "selectedAmount" in sync and
   updates the main donate button label accordingly.
   ============================================================ */
const amountBtns     = document.querySelectorAll(".amount-btn");
const donateMainBtn  = document.querySelector(".donate-main-btn");
const customAmount   = document.getElementById("customAmount");

/* Default donation amount (INR) */
let selectedAmount = 6000;

/* --- Preset amount buttons --- */
amountBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    /* Deactivate all, activate clicked */
    amountBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    selectedAmount = btn.dataset.amount;
    donateMainBtn.innerText = `Donate ₹${selectedAmount}`;

    /* Clear custom field when a preset is chosen */
    customAmount.value = "";
  });
});

/* --- Free-text custom amount --- */
if (customAmount) {
  customAmount.addEventListener("input", () => {
    if (customAmount.value !== "") {
      selectedAmount = customAmount.value;

      /* Deactivate preset buttons when custom value is typed */
      amountBtns.forEach(b => b.classList.remove("active"));

      donateMainBtn.innerText = `Donate ₹${selectedAmount}`;
    }
  });
}


/* ============================================================
   10. DONATE PAGE — RECURRING / ONE-TIME TOGGLE
   Toggles between "One-time" and "Monthly" donation mode
   buttons (only one active at a time).
   ============================================================ */
const toggleBtns = document.querySelectorAll(".toggle-btn");

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


/* ============================================================
   11. DONATE PAGE — FORM VALIDATION & SUBMISSION
   Validates donor name (min 3 chars) and email (regex) before
   accepting the donation. Shows inline error messages and
   success/error styling on each field.
   ============================================================ */
const donateForm = document.getElementById("donateForm");

if (donateForm) {
  donateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput  = document.getElementById("donorName");
    const emailInput = document.getElementById("donorEmail");

    const nameError  = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    let valid = true;

    /* Reset previous validation state */
    nameError.innerText  = "";
    emailError.innerText = "";
    nameInput.classList.remove("input-error",  "input-success");
    emailInput.classList.remove("input-error", "input-success");

    /* Name — minimum 3 characters */
    if (nameInput.value.trim().length < 3) {
      nameError.innerText = "Enter a valid full name";
      nameInput.classList.add("input-error");
      valid = false;
    } else {
      nameInput.classList.add("input-success");
    }

    /* Email — standard format check */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.innerText = "Enter a valid email address";
      emailInput.classList.add("input-error");
      valid = false;
    } else {
      emailInput.classList.add("input-success");
    }

    /* All fields valid — confirm donation and reset form */
    if (valid) {
      nameError.innerText  = "";
      emailError.innerText = "";

      alert(
        `🎉 Thank you for donating ₹${selectedAmount}!\n\nYour support helps children build a brighter future 💙`
      );

      donateForm.reset();
      donateMainBtn.innerText = `Donate ₹6000`;
      selectedAmount = 6000;

      nameInput.classList.remove("input-success");
      emailInput.classList.remove("input-success");
    }
  });
}


/* ============================================================
   12. IMPACT TABS — DYNAMIC CONTENT SWITCHER
   Clicking an impact tab swaps the title, body text, image,
   background colour, heading colour, and the decorative
   triangle colour in the impact content panel.
   ============================================================ */
const impactTabs    = document.querySelectorAll(".impact-tab");
const impactTitle   = document.getElementById("impactTitle");
const impactText    = document.getElementById("impactText");
const impactImage   = document.getElementById("impactImage");
const impactContent = document.getElementById("impactContent");

impactTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    /* Mark only this tab as active */
    impactTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    /* Swap text and image */
    impactTitle.innerText = tab.dataset.title;
    impactText.innerText  = tab.dataset.text;
    impactImage.src       = tab.dataset.image;

    /* Update panel background and heading colour */
    impactContent.style.background = tab.dataset.color;
    impactTitle.style.color        = tab.dataset.textcolor;

    /* Reset all tab triangles, then colour the active one */
    const triangles = document.querySelectorAll(".impact-triangle");
    triangles.forEach(triangle => {
      triangle.style.borderTopColor = "transparent";
    });

    const activeTriangle = tab.querySelector(".impact-triangle");
    activeTriangle.style.borderTopColor = tab.dataset.color;

    impactTab.style.color = tab.dataset.textcolor;
  });
});


/* ============================================================
   13. VOLUNTEER FORM — VALIDATION & SUBMISSION
   Validates name (min 3 chars), email (regex), and phone
   (10 digits). Shows a toast on success and resets the form.
   ============================================================ */
const volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name  = document.getElementById("volunteerName");
    const email = document.getElementById("volunteerEmail");
    const phone = document.getElementById("volunteerPhone");

    const nameError  = document.getElementById("volunteerNameError");
    const emailError = document.getElementById("volunteerEmailError");
    const phoneError = document.getElementById("volunteerPhoneError");

    let valid = true;

    /* Reset previous validation state */
    nameError.innerText  = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    name.classList.remove("input-error",  "input-success");
    email.classList.remove("input-error", "input-success");
    phone.classList.remove("input-error", "input-success");

    /* Name — minimum 3 characters */
    if (name.value.trim().length < 3) {
      nameError.innerText = "Enter a valid full name";
      name.classList.add("input-error");
      valid = false;
    } else {
      name.classList.add("input-success");
    }

    /* Email — standard format check */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.innerText = "Enter a valid email address";
      email.classList.add("input-error");
      valid = false;
    } else {
      email.classList.add("input-success");
    }

    /* Phone — exactly 10 digits */
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phoneError.innerText = "Enter a valid 10-digit phone number";
      phone.classList.add("input-error");
      valid = false;
    } else {
      phone.classList.add("input-success");
    }

    /* All fields valid — show toast and reset */
    if (valid) {
      showToast("Volunteer Form Submitted 💚");
      volunteerForm.reset();
      name.classList.remove("input-success");
      email.classList.remove("input-success");
      phone.classList.remove("input-success");
    }
  });
}


/* ============================================================
   14. PARTNER FORM — VALIDATION & SUBMISSION
   Validates organisation name, contact person (both min 3
   chars), email (regex), and phone (10 digits). Shows a
   toast on success and resets the form.
   ============================================================ */
const partnerForm = document.getElementById("partnerForm");

if (partnerForm) {
  partnerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const org    = document.getElementById("partnerOrg");
    const person = document.getElementById("partnerPerson");
    const email  = document.getElementById("partnerEmail");
    const phone  = document.getElementById("partnerPhone");

    const orgError    = document.getElementById("partnerOrgError");
    const personError = document.getElementById("partnerPersonError");
    const emailError  = document.getElementById("partnerEmailError");
    const phoneError  = document.getElementById("partnerPhoneError");

    let valid = true;

    /* Reset previous validation state */
    orgError.innerText    = "";
    personError.innerText = "";
    emailError.innerText  = "";
    phoneError.innerText  = "";
    org.classList.remove("input-error",    "input-success");
    person.classList.remove("input-error", "input-success");
    email.classList.remove("input-error",  "input-success");
    phone.classList.remove("input-error",  "input-success");

    /* Organisation name — minimum 3 characters */
    if (org.value.trim().length < 3) {
      orgError.innerText = "Enter organization name";
      org.classList.add("input-error");
      valid = false;
    } else {
      org.classList.add("input-success");
    }

    /* Contact person — minimum 3 characters */
    if (person.value.trim().length < 3) {
      personError.innerText = "Enter contact person name";
      person.classList.add("input-error");
      valid = false;
    } else {
      person.classList.add("input-success");
    }

    /* Email — standard format check */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.innerText = "Enter a valid email address";
      email.classList.add("input-error");
      valid = false;
    } else {
      email.classList.add("input-success");
    }

    /* Phone — exactly 10 digits */
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phoneError.innerText = "Enter a valid 10-digit phone number";
      phone.classList.add("input-error");
      valid = false;
    } else {
      phone.classList.add("input-success");
    }

    /* All fields valid — show toast and reset */
    if (valid) {
      showToast("Partner Request Submitted 🤝");
      partnerForm.reset();
      org.classList.remove("input-success");
      person.classList.remove("input-success");
      email.classList.remove("input-success");
      phone.classList.remove("input-success");
    }
  });
}


/* ============================================================
   15. STORY SLIDER — MANUAL + AUTO SLIDE
   A simple translateX-based slider for ".story-card" elements.
   Supports previous/next buttons and auto-advances every 4 s.
   ============================================================ */
const slider     = document.querySelector(".slider-container");
const cards      = document.querySelectorAll(".story-card");
const nextBtn    = document.querySelector(".next");
const prevBtn    = document.querySelector(".prev");

let index      = 0;
const totalCards = cards.length;

/* Move the strip to show the card at "index" */
function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
}

/* Next button — wraps around to the first card */
nextBtn.addEventListener("click", () => {
  index++;
  if (index >= totalCards) index = 0;
  updateSlider();
});

/* Previous button — wraps around to the last card */
prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) index = totalCards - 1;
  updateSlider();
});

/* Auto-advance every 4 seconds */
setInterval(() => {
  index++;
  if (index >= totalCards) index = 0;
  updateSlider();
}, 4000);


/* ============================================================
   16. STORY MODAL — OPEN / CLOSE
   Populates a modal with a story's title and body text when
   a ".open-story" button is clicked. Closes on the close
   button or a click outside the modal box.
   ============================================================ */
const modal       = document.getElementById("storyModal");
const modalTitle  = document.getElementById("modalTitle");
const modalText   = document.getElementById("modalText");
const openButtons = document.querySelectorAll(".open-story");
const closeBtn    = document.querySelector(".close-btn");

/* Open modal and populate content from data attributes */
openButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    modalTitle.innerText = this.dataset.title;
    modalText.innerText  = this.dataset.text;
    modal.classList.add("show");
  });
});

/* Close modal via the close button */
closeBtn.addEventListener("click", function() {
  modal.classList.remove("show");
});

/* Close modal when clicking on the backdrop (outside the box) */
window.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});


/* ============================================================
   17. FOOTER — NEWSLETTER FORM
   Validates that the email field is non-empty, then shows a
   toast and resets the form.
   ============================================================ */
const footerNewsletter = document.getElementById('footerNewsletterForm');

if (footerNewsletter) {
  footerNewsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = footerNewsletter.querySelector('input[type="email"]').value;
    if (email) {
      showToast('Thanks for subscribing! 💌');
      footerNewsletter.reset();
    }
  });
}


/* ============================================================
   18. TESTIMONIAL CAROUSEL — AUTO-ROTATE
   IIFE that manages a multi-slide testimonial section with:
   - Auto-rotation every 5 s (pauses on hover)
   - Manual prev / next buttons
   - Dot indicator click navigation
   - Keyboard arrow-key support while hovering
   - Auto-resumes 10 s after the last manual interaction
   ============================================================ */
(function() {
  let currentSlide      = 0;
  let autoRotateInterval;
  let isAutoRotating    = true;
  const rotationDelay   = 5000; /* ms between auto-advances */

  const slides      = document.querySelectorAll('.testimonial-slide');
  const dots        = document.querySelectorAll('.dot');
  const prevBtn     = document.getElementById('testimonialPrev');
  const nextBtn     = document.getElementById('testimonialNext');
  const progressBar = document.querySelector('.auto-rotate-progress');

  /* Bail out if the carousel markup is not on this page */
  if (slides.length === 0) return;

  /* Show a specific slide by index (handles wrap-around) */
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot   => dot.classList.remove('active'));

    if (index < 0)              index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

    /* Re-clone progress bar to restart its CSS animation */
    if (progressBar && isAutoRotating) {
      const newProgress = progressBar.cloneNode(true);
      progressBar.parentNode.replaceChild(newProgress, progressBar);
    }
  }

  /* Advance to the next slide and restart the timer */
  function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoRotate();
  }

  /* Go back one slide and restart the timer */
  function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoRotate();
  }

  /* Clear existing interval and restart if auto-rotate is on */
  function resetAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    if (isAutoRotating) startAutoRotate();
  }

  /* Begin the auto-rotation interval */
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (isAutoRotating) nextSlide();
    }, rotationDelay);
  }

  /* Stop auto-rotation (triggered by manual user interaction) */
  function stopAutoRotate() {
    isAutoRotating = false;
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
    const indicatorText = document.querySelector('.auto-rotate-text');
    if (indicatorText) indicatorText.textContent = 'Paused';
  }

  /* Resume auto-rotation after 10 s of inactivity */
  let resumeTimeout;
  function resumeAutoRotate() {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      if (!isAutoRotating) {
        isAutoRotating = true;
        startAutoRotate();
        const indicatorText = document.querySelector('.auto-rotate-text');
        if (indicatorText) indicatorText.textContent = 'Auto-rotating';
      }
    }, 10000);
  }

  /* Previous button */
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoRotate();
      resumeAutoRotate();
    });
  }

  /* Next button */
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoRotate();
      resumeAutoRotate();
    });
  }

  /* Dot indicators */
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoRotate();
      resumeAutoRotate();
    });
  });

  /* Pause on mouse enter, resume on mouse leave */
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
      }
    });

    carousel.addEventListener('mouseleave', () => {
      if (isAutoRotating && !autoRotateInterval) {
        startAutoRotate();
      }
    });
  }

  /* Keyboard navigation (left / right arrows while hovering) */
  document.addEventListener('keydown', (e) => {
    if (carousel && carousel.matches(':hover')) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoRotate();
        resumeAutoRotate();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoRotate();
        resumeAutoRotate();
      }
    }
  });

  /* Kick off auto-rotation on page load */
  startAutoRotate();
})();


/* ============================================================
   19. EVENTS — DATA, RENDER & REGISTRATION MODAL

   - events[]         : source data for all event cards
   - locIcon()        : returns an inline SVG pin icon
   - timeIcon()       : returns an inline SVG clock icon
   - renderEvents()   : builds the featured + side-card layout
   - openRegisterModal(): opens the registration modal for an event
   - Modal close listeners handle button click and backdrop click
   - registerSubmitBtn validates name + email before confirming
   ============================================================ */

/* --- Event data source --- */
const events = [
  {
    tag: '#FoodCamp',
    title: 'Healthy food and nutrition awareness campaign december',
    desc: 'A food and nutrition awareness campaign focused on providing healthy meals, spreading nutrition education, and supporting underprivileged families for a healthier future.',
    location: 'Sukhna Lake, Chandigarh',
    time: '2 pm',
    day: '10', mon: 'Jun',
    img: 'https://as2.ftcdn.net/jpg/02/87/65/37/1000_F_287653730_bZdLt5mKknPjiWCsmvdS3FhnT5WvIsEk.jpg',
    featured: true
  },
  {
    tag: '#RunForElder',
    title: 'Run for the senior citizens.',
    desc: 'A community marathon dedicated to supporting and empowering senior citizens through healthcare, companionship, and social care.',
    location: 'Town Park, Panchkula',
    time: '6 am', day: '25', mon: 'May'
  },
  {
    tag: '#ChildrenEducation',
    title: 'Education for all children',
    desc: 'An initiative providing quality education and learning resources for children to build a brighter future.',
    location: 'Rajouri Garden, New Delhi',
    time: '5 pm', day: '25', mon: 'Jun'
  },
  {
    tag: '#RightForWomen',
    title: 'Stop violence against women',
    desc: 'Raising awareness and taking action to end violence against women in our communities.',
    location: 'Sector 17, Chandigarh',
    time: '4 pm', day: '15', mon: 'Jul'
  }
];

/* --- Inline SVG helpers for meta icons --- */
function locIcon() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D85A30" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`;
}
function timeIcon() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D85A30" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
}

/* --- Render the events grid (featured card + side cards) --- */
function renderEvents() {
  const grid     = document.getElementById('eventsGrid');
  const featured = events[0];       /* First event gets the large featured card */
  const sides    = events.slice(1); /* Remaining events become compact side cards */

  /* Featured card HTML */
  const featuredHTML = `
    <div class="featured-card">
      ${featured.img
        ? `<img class="event-img" src="${featured.img}" alt="${featured.title}">`
        : `<div class="event-img" style="background:#c8d4c0;height:220px"></div>`}
      <div class="featured-body">
        <p class="event-tag">${featured.tag}</p>
        <div class="feat-title-row">
          <h3>${featured.title}</h3>
          <div class="date-blob">
            <div class="day">${featured.day}</div>
            <div class="mon">${featured.mon}</div>
          </div>
        </div>
        <p class="feat-desc">${featured.desc}</p>
        <div class="feat-meta">
          <div class="meta-item">${locIcon()}<span><span class="ml">Location:</span><span class="mv">${featured.location}</span></span></div>
          <div class="meta-item">${timeIcon()}<span><span class="ml">Starts at:</span><span class="mv">${featured.time}</span></span></div>
        </div>
        <button class="btn-join" onclick="openRegisterModal('${featured.title}')">Join event →</button>
      </div>
    </div>`;

  /* Side cards HTML */
  const sideCardsHTML = `
    <div class="side-cards">
      ${sides.map(e => `
        <div class="side-card" onclick="openRegisterModal('${e.title}')">
          <div class="side-card-body">
            <p class="side-tag">${e.tag}</p>
            <p class="side-title">${e.title}</p>
            <p class="side-desc">${e.desc}</p>
            <div class="side-meta">
              <div class="side-meta-item">${locIcon()}<span><span class="ml">Location:</span><span class="mv">${e.location}</span></span></div>
              <div class="side-meta-item">${timeIcon()}<span><span class="ml">Starts at:</span><span class="mv">${e.time}</span></span></div>
            </div>
          </div>
          <div class="side-blob">
            <div class="day">${e.day}</div>
            <div class="mon">${e.mon}</div>
          </div>
        </div>`).join('')}
    </div>`;

  grid.innerHTML = featuredHTML + sideCardsHTML;
}

/* --- Open the registration modal pre-filled with event title --- */
function openRegisterModal(title) {
  document.getElementById('registerModalTitle').textContent = 'Register — ' + title;
  document.getElementById('registerName').value  = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerModal').style.display = 'flex';
}

/* Close modal via the × button */
document.querySelector('.register-modal-close').addEventListener('click', () => {
  document.getElementById('registerModal').style.display = 'none';
});

/* Close modal when clicking on the backdrop */
document.getElementById('registerModal').addEventListener('click', function(e) {
  if (e.target === this) this.style.display = 'none';
});

/* Validate name + email before confirming registration */
document.getElementById('registerSubmitBtn').addEventListener('click', () => {
  const name  = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();

  if (!name || !email) { alert('Please fill in all fields.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Enter a valid email.'); return; }

  document.getElementById('registerModal').style.display = 'none';
  alert(`✓ Registered! See you at the event, ${name}.`);
});

/* Kick off the events render on page load */
renderEvents();