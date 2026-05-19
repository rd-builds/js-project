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
// ["volunteerForm","partnerForm","donateForm"].forEach(id=>{
//   const form=document.getElementById(id);
//   if(form){
//     form.addEventListener("submit",e=>{
//       e.preventDefault();
//       showToast("Submitted successfully ✅");
//       form.reset();
//     });
//   }
// });

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
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {

      emailError.innerText = "Enter a valid email address";

      emailInput.classList.add("input-error");

      valid = false;

    } else {

      emailInput.classList.add("input-success");

    }

    /* SUCCESS */
    /* SUCCESS */
if (valid) {

  nameError.innerText = "";
  emailError.innerText = "";

  alert(
  `🎉 Thank you for donating ₹${selectedAmount}!\n\nYour support helps children build a brighter future 💙`
);

  donateForm.reset();

  donateMainBtn.innerText =
    `Donate ₹6000`;

  selectedAmount = 6000;

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


  // <!-----======================================================================
  //     JOIN US SECTION
  // ==============================-!>
  // events.js - Interactive Events with Registration

const events = [
  {
    tag: '#FoodCamp',
    title: 'Healthy food and nutrition awareness campaign december',
    desc: 'A food and nutrition awareness campaign focused on providing healthy meals, spreading nutrition education, and supporting underprivileged families for a healthier future.',
    location: 'Sukhna Lake, Chandigarh',
    time: '2 pm',
    day: '10', mon: 'Jun',
    img: 'https://storage.googleapis.com/peporg-bucket/blog_images/Donate_Food_on_Your_Birthday_-_Orphanage_Children_in_Hyderabad.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=pep-admin%40pepfoundation.iam.gserviceaccount.com%2F20260519%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260519T160801Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=2db95644c91a5e5deee6503514ee7e96ba89a011b0c79187600d7bc69486a13aca6524a6a73702c6fe75d49085d36f2b4aa11660b2d55b2b3ac78dfce860e89974ef324979f9c04282962bc73ca8d77e6d54ee561a52e922e0cf4a11e4d1af09da09f6fbb30853aeb8be6e564862fb827f24fdf99a540ad0c9603321aca36360923de9c070543a4f166e4b6d7e510870ec49e1ad0f41bb695f16154fb2dd380d72273d8e228564bc553e524af618856b40df768224c020f6c7e4f57b40db29a53909b0bb8e3bca7db21006f2cea60aa5b302c7fd91ce034343f87033850ab7039780013b7c4c9a64da8bfe5b5a39dbce235da81a75a8de66ff43c6504b83e3cc', // ← put your image path here
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

function locIcon() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D85A30" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`;
}
function timeIcon() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D85A30" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
}

function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  const featured = events[0];
  const sides = events.slice(1);

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

// Modal logic
function openRegisterModal(title) {
  document.getElementById('registerModalTitle').textContent = 'Register — ' + title;
  document.getElementById('registerName').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerModal').style.display = 'flex';
}

document.querySelector('.register-modal-close').addEventListener('click', () => {
  document.getElementById('registerModal').style.display = 'none';
});

document.getElementById('registerModal').addEventListener('click', function(e) {
  if (e.target === this) this.style.display = 'none';
});

document.getElementById('registerSubmitBtn').addEventListener('click', () => {
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  if (!name || !email) { alert('Please fill in all fields.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Enter a valid email.'); return; }
  document.getElementById('registerModal').style.display = 'none';
  alert(`✓ Registered! See you at the event, ${name}.`);
});

// Also update your HTML title if needed:
// <h1 class="events-title">Upcoming <span class="highlight">events</span></h1>

renderEvents();