// Smooth scroll
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

// Navbar close mobile
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992 && navbarCollapse) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// Forms
["volunteerForm","partnerForm","donateForm"].forEach(id=>{
  const form=document.getElementById(id);
  if(form){
    form.addEventListener("submit",e=>{
      e.preventDefault();
      showToast("Submitted successfully ✅");
      form.reset();
    });
  }
});

// Toast
function showToast(msg){
  const toast=document.createElement("div");
  toast.innerText=msg;
  toast.className="toast";
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),3000);
}

// Scroll reveal
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach(el=>observer.observe(el));

// Navbar scroll effect
window.addEventListener("scroll",()=>{
  const navbar=document.querySelector(".custom-navbar");
  if(window.scrollY>50){
    navbar.style.boxShadow="0 4px 15px rgba(0,0,0,0.1)";
  }
});

// Scroll spy
const sections=document.querySelectorAll("section");
const navLinks2=document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const top=section.offsetTop-100;
    if(scrollY>=top){
      current=section.getAttribute("id");
    }
  });

  navLinks2.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href")==="#"+current){
      link.classList.add("active");
    }
  });
});

// Back to top
const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{
  if(topBtn){
    topBtn.style.display=window.scrollY>300?"block":"none";
  }
});

if(topBtn){
  topBtn.onclick=()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  };
}

// Counter animation
document.querySelectorAll(".counter").forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const inc = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };

  update();
});

/* ===== DONATE PAGE ===== */

const amountBtns = document.querySelectorAll(".amount-btn");
const donateMainBtn = document.querySelector(".donate-main-btn");
const customAmount = document.getElementById("customAmount");

/* DEFAULT */
let selectedAmount = 6000;

/* PRESET BUTTONS */
amountBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    amountBtns.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    selectedAmount = btn.dataset.amount;

    donateMainBtn.innerText = `Donate ₹${selectedAmount}`;

    customAmount.value = "";
  });

});

/* CUSTOM */
if (customAmount) {

  customAmount.addEventListener("input", () => {

    if (customAmount.value !== "") {

      selectedAmount = customAmount.value;

      amountBtns.forEach(b => b.classList.remove("active"));

      donateMainBtn.innerText = `Donate ₹${selectedAmount}`;
    }

  });

}

/* TOGGLE */
const toggleBtns = document.querySelectorAll(".toggle-btn");

toggleBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    toggleBtns.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

  });

});

/* ===== DONATION FORM VALIDATION ===== */

const donateForm = document.getElementById("donateForm");

if (donateForm) {

  donateForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const nameInput = document.getElementById("donorName");
    const emailInput = document.getElementById("donorEmail");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    let valid = true;

    /* RESET */
    nameError.innerText = "";
    emailError.innerText = "";

    nameInput.classList.remove("input-error", "input-success");
    emailInput.classList.remove("input-error", "input-success");

    /* NAME VALIDATION */
    if (nameInput.value.trim().length < 3) {

      nameError.innerText = "Enter a valid full name";

      nameInput.classList.add("input-error");

      valid = false;

    } else {

      nameInput.classList.add("input-success");

    }

    /* EMAIL VALIDATION */
    const emailPattern =
      /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {

      emailError.innerText = "Enter a valid email address";

      emailInput.classList.add("input-error");

      valid = false;

    } else {

      emailInput.classList.add("input-success");

    }

    /* SUCCESS */
    if (valid) {

      showToast("Donation Submitted Successfully 💙");

      donateForm.reset();

      nameInput.classList.remove("input-success");
      emailInput.classList.remove("input-success");

    }

  });

}

/* ===== DYNAMIC NGO SECTION ===== */

const impactTabs = document.querySelectorAll(".impact-tab");

const impactTitle = document.getElementById("impactTitle");
const impactText = document.getElementById("impactText");
const impactImage = document.getElementById("impactImage");
const impactContent = document.getElementById("impactContent");

impactTabs.forEach(tab => {

  tab.addEventListener("click", () => {

    /* ACTIVE TAB */
    impactTabs.forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    /* CHANGE CONTENT */
    impactTitle.innerText = tab.dataset.title;

    impactText.innerText = tab.dataset.text;

    impactImage.src = tab.dataset.image;

    /* CHANGE BACKGROUND COLOR */
    /* BACKGROUND */
impactContent.style.background = tab.dataset.color;

/* HEADING COLOR */
impactTitle.style.color = tab.dataset.textcolor;

/* TRIANGLE COLOR */

const triangles =
  document.querySelectorAll(".impact-triangle");

triangles.forEach(triangle => {
  triangle.style.borderTopColor = "transparent";
});

const activeTriangle =
  tab.querySelector(".impact-triangle");

activeTriangle.style.borderTopColor =
  tab.dataset.color;

impactTab.style.color = tab.dataset.textcolor;

  });

});

/* ===== VOLUNTEER VALIDATION ===== */

const volunteerForm =
  document.getElementById("volunteerForm");

if (volunteerForm) {

  volunteerForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
      document.getElementById("volunteerName");

    const email =
      document.getElementById("volunteerEmail");

    const phone =
      document.getElementById("volunteerPhone");

    const nameError =
      document.getElementById("volunteerNameError");

    const emailError =
      document.getElementById("volunteerEmailError");

    const phoneError =
      document.getElementById("volunteerPhoneError");

    let valid = true;

    /* RESET */
    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";

    name.classList.remove("input-error", "input-success");
    email.classList.remove("input-error", "input-success");
    phone.classList.remove("input-error", "input-success");

    /* NAME */
    if (name.value.trim().length < 3) {

      nameError.innerText =
        "Enter a valid full name";

      name.classList.add("input-error");

      valid = false;

    } else {

      name.classList.add("input-success");

    }

    /* EMAIL */
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

      emailError.innerText =
        "Enter a valid email address";

      email.classList.add("input-error");

      valid = false;

    } else {

      email.classList.add("input-success");

    }

    /* PHONE */
    const phonePattern =
      /^[0-9]{10}$/;

    if (!phonePattern.test(phone.value.trim())) {

      phoneError.innerText =
        "Enter a valid 10-digit phone number";

      phone.classList.add("input-error");

      valid = false;

    } else {

      phone.classList.add("input-success");

    }

    /* SUCCESS */
    if (valid) {

      showToast("Volunteer Form Submitted 💚");

      volunteerForm.reset();

      name.classList.remove("input-success");
      email.classList.remove("input-success");
      phone.classList.remove("input-success");

    }

  });

}

/* ===== PARTNER VALIDATION ===== */

const partnerForm =
  document.getElementById("partnerForm");

if (partnerForm) {

  partnerForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const org =
      document.getElementById("partnerOrg");

    const person =
      document.getElementById("partnerPerson");

    const email =
      document.getElementById("partnerEmail");

    const phone =
      document.getElementById("partnerPhone");

    const orgError =
      document.getElementById("partnerOrgError");

    const personError =
      document.getElementById("partnerPersonError");

    const emailError =
      document.getElementById("partnerEmailError");

    const phoneError =
      document.getElementById("partnerPhoneError");

    let valid = true;

    /* RESET */
    orgError.innerText = "";
    personError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";

    org.classList.remove("input-error", "input-success");
    person.classList.remove("input-error", "input-success");
    email.classList.remove("input-error", "input-success");
    phone.classList.remove("input-error", "input-success");

    /* ORGANIZATION */
    if (org.value.trim().length < 3) {

      orgError.innerText =
        "Enter organization name";

      org.classList.add("input-error");

      valid = false;

    } else {

      org.classList.add("input-success");

    }

    /* CONTACT PERSON */
    if (person.value.trim().length < 3) {

      personError.innerText =
        "Enter contact person name";

      person.classList.add("input-error");

      valid = false;

    } else {

      person.classList.add("input-success");

    }

    /* EMAIL */
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

      emailError.innerText =
        "Enter a valid email address";

      email.classList.add("input-error");

      valid = false;

    } else {

      email.classList.add("input-success");

    }

    /* PHONE */
    const phonePattern =
      /^[0-9]{10}$/;

    if (!phonePattern.test(phone.value.trim())) {

      phoneError.innerText =
        "Enter a valid 10-digit phone number";

      phone.classList.add("input-error");

      valid = false;

    } else {

      phone.classList.add("input-success");

    }

    /* SUCCESS */
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

const slider = document.querySelector(".slider-container");
const cards = document.querySelectorAll(".story-card");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
const totalCards = cards.length;

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
}

/* NEXT BUTTON */
nextBtn.addEventListener("click", () => {
  index++;

  if (index >= totalCards) {
    index = 0;
  }

  updateSlider();
});

/* PREV BUTTON */
prevBtn.addEventListener("click", () => {
  index--;

  if (index < 0) {
    index = totalCards - 1;
  }

  updateSlider();
});

/* AUTO SLIDE */
setInterval(() => {
  index++;

  if (index >= totalCards) {
    index = 0;
  }

  updateSlider();
}, 4000);



const modal = document.getElementById("storyModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const openButtons = document.querySelectorAll(".open-story");
const closeBtn = document.querySelector(".close-btn");

/* OPEN MODAL */
openButtons.forEach(button => {

  button.addEventListener("click", function(e){

    e.preventDefault();

    modalTitle.innerText = this.dataset.title;
    modalText.innerText = this.dataset.text;

    modal.classList.add("show");

  });

});

/* CLOSE MODAL */
closeBtn.addEventListener("click", function(){

  modal.classList.remove("show");

});

/* CLOSE WHEN CLICKING OUTSIDE */
window.addEventListener("click", function(e){

  if(e.target === modal){

    modal.classList.remove("show");

  }

});

// Footer Newsletter Form
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


/* ===== TESTIMONIAL CAROUSEL WITH AUTO-ROTATE ===== */
(function() {
  let currentSlide = 0;
  let autoRotateInterval;
  let isAutoRotating = true;
  const rotationDelay = 5000; // 5 seconds per slide
  
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const progressBar = document.querySelector('.auto-rotate-progress');
  
  // Only initialize if carousel exists
  if (slides.length === 0) return;
  
  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle wrap-around
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentSlide = index;
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    
    // Reset progress bar animation
    if (progressBar && isAutoRotating) {
      const newProgress = progressBar.cloneNode(true);
      progressBar.parentNode.replaceChild(newProgress, progressBar);
    }
  }
  
  // Next slide function
  function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoRotate();
  }
  
  // Previous slide function
  function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoRotate();
  }
  
  // Reset auto-rotate timer
  function resetAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    if (isAutoRotating) {
      startAutoRotate();
    }
  }
  
  // Start auto-rotate
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (isAutoRotating) {
        nextSlide();
      }
    }, rotationDelay);
  }
  
  // Stop auto-rotate (on user interaction)
  function stopAutoRotate() {
    isAutoRotating = false;
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
    // Change indicator text
    const indicatorText = document.querySelector('.auto-rotate-text');
    if (indicatorText) indicatorText.textContent = 'Paused';
  }
  
  // Resume auto-rotate (optional - after 10 seconds of inactivity)
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
    }, 10000); // Resume after 10 seconds of inactivity
  }
  
  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoRotate();
      resumeAutoRotate();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoRotate();
      resumeAutoRotate();
    });
  }
  
  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoRotate();
      resumeAutoRotate();
    });
  });
  
  // Pause on hover
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
  
  // Start auto-rotate
  startAutoRotate();
  
  // Keyboard navigation
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
})();