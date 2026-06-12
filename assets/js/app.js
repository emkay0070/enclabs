
const lenis = new Lenis();


// lenis.on("scroll",ScrollTrigger.update());
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
});

gsap.ticker.lagSmoothing(10);


// sm-timeline
let SmAct = document.querySelector(".sm-activator");
let SmNav = document.querySelector(".small-nav");

SmAct.addEventListener("click", () => {
  gsap.to(SmNav, {
    x: 0,          // bring it fully into view
    opacity: 1,    // fade in
    pointerEvents: "auto",
    ease: "power2.out"
  });
});
// Close small nav when a link is clicked

let closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  gsap.to(SmNav, {
    x: "-100%",
    opacity: 0,
    pointerEvents: "none",
    ease: "bounce"
  });
});
