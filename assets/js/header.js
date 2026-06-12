
  const nav = document.querySelector("nav");
  let isActive = false;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 100 && !isActive) {
      nav.classList.add("active");
      isActive = true;
    }

    if (window.scrollY < 100 && isActive) {
      nav.classList.remove("active");
      isActive = false;
    }
  });

