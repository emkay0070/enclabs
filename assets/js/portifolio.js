// GSAP & ScrollTrigger must be loaded before this
const runsContainer = document.querySelector(".Runs");
const currentRunEl = document.querySelector(".current-run");
const totalRunsEl = document.querySelector(".total-runs");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;

// Slides array
let slides = [
    {
        title: "Keam Blog",
        subtitle: "ENCLabs",
        desc: "A modern web solution designed to enhance online presence and engagement.",
        img: "../assets/imgs/brand.jpg"
    },
    {
        title: "Creative Brand",
        subtitle: "ENCLabs",
        desc: "Crafting digital experiences that reflect creativity, strategy, and functionality.",
        img: "../assets/imgs/prog01.jpg"
    },
    {
        title: "Support Portal",
        subtitle: "ENCLabs",
        desc: "A project focused on seamless user support and interaction.",
        img: "../assets/imgs/supp.jpg"
    }
];

// Generate slides dynamically
function generateSlides() {
    runsContainer.innerHTML = "";
    dotsContainer.innerHTML = "";

    slides.forEach((slide, index) => {
        const slideEl = document.createElement("div");
        slideEl.classList.add("c-h-cont");
        if (index === 0) slideEl.classList.add("active");
        slideEl.style.backgroundImage = `url(${slide.img})`;

        slideEl.innerHTML = `
            <div class="cont">
                <small><b>${slide.subtitle}</b></small>
                <h2>${slide.title}</h2>
                <p>${slide.desc}</p>
            </div>
        `;
        runsContainer.appendChild(slideEl);

        // Add dots
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    totalRunsEl.textContent = slides.length;

    // Dot click
    document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", e => showSlide(Number(e.target.dataset.index)));
    });
}


function showSlide(index) {
    const allSlides = document.querySelectorAll(".c-h-cont");
    const allDots = document.querySelectorAll(".dot");

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    allSlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add("active");
            gsap.fromTo(slide, 
                {opacity: 0, scale: 1.05, y: 50}, 
                {opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out"}
            );

            // Animate text
            const heading = slide.querySelector("h2");
            const paragraph = slide.querySelector("p");

            gsap.fromTo(heading, 
                {opacity: 0, y: 30}, 
                {opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3}
            );

            gsap.fromTo(paragraph, 
                {opacity: 0, y: 30}, 
                {opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6}
            );

        } else {
            slide.classList.remove("active");
        }
    });

    allDots.forEach(dot => dot.classList.remove("active"));
    allDots[index].classList.add("active");

    currentRunEl.textContent = index + 1;
    currentIndex = index;
}



// Navigation buttons
document.querySelector(".nextRun").addEventListener("click", () => showSlide(currentIndex + 1));
document.querySelector(".prevRun").addEventListener("click", () => showSlide(currentIndex - 1));

// Auto-slide every 6 seconds
setInterval(() => showSlide(currentIndex + 1), 6000);

// Initial render
generateSlides();


//gsap

gsap.registerPlugin("ScrollTrigger");
//pf-top 


const H2 = new SplitType(".H2",{type: "words,chars",tagName: "span"});
const Xp = new SplitType(".pf-top p",{type: "words,chars",tagName: "span"});

const PortTl = gsap.timeline({
    scrollTrigger:{
    trigger: ".pf-top",
    start: "top 80%",
    end: "+=200",
    scrub: 1.5,
}
});


PortTl.from(H2.chars,{
    y: 30,
    stagger: 0.5,
    ease: "power1.Out"
});

PortTl.from(Xp.chars,{
    x: -40,
    opacity: 0.1,
    stagger: 0.05,
    ease: "power2.Out",
});

//////....FEATURES..../////

const FeatsTl = gsap.timeline({
    scrollTrigger:{
        trigger: ".features",
        start: "top 80%",
        end: "+=100",
        scrub: 0.5,
        markers: false
    }
});

FeatsTl.from(".feature",{
    y: 50,
    height: "0%",
    ease: "power2.Out"
})

////pjts01////
    
const Pjts01Tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".pjts01",
        start: "top 80%",
        end: "+=400",
        scrub: 1.5,
        stagger: 1.5,
        markers: false
    }
});

Pjts01Tl.from(".p01",{
    x: -400
});

Pjts01Tl.from(".p02",{
    y: -100,
    height: "0%",
    opacity: 0,
    ease: "power2.Out"
})


//////p03//////////
ScrollTrigger.create({
        trigger: ".p03",
        start: "top 20%",
        end: "+=100",
        scrub: 1.5,
        pin: true
},

gsap.from(".p03 .img",{
    y: -100,
    opacity: 0,
    height: "0%",
    ease: "power2.Out"
}))

////pjts01////
    
const Pjts02Tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".pjts03",
        start: "top 80%",
        end: "+=300",
        scrub: 0.5
    }
});

Pjts02Tl.from(".p05",{
    x: -400
});

Pjts02Tl.from(".p06",{
    y: -100,
    height: "0%",
    opacity: 0,
    ease: "power2.Out",
})