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