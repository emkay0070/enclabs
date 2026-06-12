/* ================================
   TEAM DETAILS – FULL ENGINE
   ================================ */

/* ---------- CONFIG ---------- */
const FALLBACK_IMG = "../imgs/avatar.png";
let isAnimating = false;

/* ---------- DOM ---------- */
const contentWrapper = document.querySelector("main");
const sidebar = document.getElementById("team-sidebar");

/* ---------- HELPERS ---------- */
function safeBg(el, src) {
  const img = new Image();
  img.src = src;

  img.onload = () => {
    el.style.backgroundImage = `url(${src})`;
  };

  img.onerror = () => {
    el.style.backgroundImage = `url(${FALLBACK_IMG})`;
  };
}

function preloadImages() {
  Object.values(TEAM_MEMBERS).forEach(member => {
    [member.heroImg, member.profileImg].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });
}

/* ---------- CONTENT UPDATE ---------- */
function updateMemberContent(member) {
  // HERO
  safeBg(document.querySelector(".tm-hero"), member.heroImg);

  // PROFILE IMAGE
  safeBg(document.getElementById("tm-img"), member.profileImg);

  // TEXT
  document.getElementById("tm-name").textContent = member.name;
  document.getElementById("tm-name-2").textContent = member.name;
  document.getElementById("tm-bio").textContent = member.bio;
  document.getElementById("tm-about").textContent = member.about;

  // CONTACT
  document.getElementById("tm-phone").textContent = member.phone;
  document.getElementById("tm-email").textContent = member.email;

  // PORTFOLIO
  document.getElementById("tm-portfolio").href = member.portfolio;

  // MORE ABOUT SECTION
  document.getElementById("tm-more-title").textContent =
    member.more?.title || `Know More About ${member.name}`;

  document.getElementById("tm-more-desc").textContent =
    member.more?.description ||
    "Dive deep into details, skills, projects and experience.";

  document.getElementById("tm-more-cta-text").textContent =
    member.more?.ctaText || `Find out more about ${member.name}`;

  // SEO
  document.title = `${member.name} | ENCLabs Team`;

  // SIDEBAR ACTIVE STATE
  document.querySelectorAll("#team-sidebar a").forEach(a => {
    a.classList.toggle("active-member", a.dataset.id === member.id);
  });
}


/* ---------- AJAX MEMBER LOAD ---------- */
async function loadMember(id, pushState = true) {
  if (isAnimating || !TEAM_MEMBERS[id]) return;
  isAnimating = true;

  if (pushState) {
    history.pushState({ id }, "", `?id=${id}`);
  }

  // EXIT
  await gsap.to(contentWrapper, {
    opacity: 0,
    y: 30,
    duration: 0.45,
    ease: "power2.inOut"
  });

  updateMemberContent(TEAM_MEMBERS[id]);

  // ENTER
  gsap.fromTo(
    contentWrapper,
    { opacity: 0, y: -30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power4.out",
      onComplete: () => (isAnimating = false)
    }
  );
}

/* ---------- SIDEBAR BUILD ---------- */
function buildSidebar(currentId) {
  sidebar.innerHTML = "";

  Object.values(TEAM_MEMBERS).forEach(person => {
    const a = document.createElement("a");
    a.href = `?id=${person.id}`;
    a.dataset.id = person.id;
    a.className = person.id === currentId ? "active-member" : "";

    const img = document.createElement("img");
    img.src = person.profileImg;
    img.alt = `${person.name} Profile Image`;
    img.onerror = () => (img.src = FALLBACK_IMG);

    const p = document.createElement("p");
    p.textContent = person.name;

    a.appendChild(img);
    a.appendChild(p);
    sidebar.appendChild(a);

    // AJAX CLICK
    a.addEventListener("click", e => {
      e.preventDefault();
      loadMember(person.id);
    });
  });
}

/* ---------- INITIAL LOAD ---------- */
const params = new URLSearchParams(window.location.search);
const initialId =
  params.get("id") || Object.keys(TEAM_MEMBERS)[0];

buildSidebar(initialId);
updateMemberContent(TEAM_MEMBERS[initialId]);
history.replaceState({ id: initialId }, "", `?id=${initialId}`);

/* ---------- BACK / FORWARD ---------- */
window.addEventListener("popstate", e => {
  if (e.state?.id) {
    loadMember(e.state.id, false);
  }
});

/* ---------- PRELOAD ---------- */
preloadImages();



/* ---------- ENTRANCE ANIMATION ---------- */
gsap.from(".tm-hero h2", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
});


