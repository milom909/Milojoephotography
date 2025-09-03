window.addEventListener('DOMContentLoaded', () => {

  // ================= Image click cycle =================
  const img = document.getElementById('tt1');
  const images = [
    'Photos/IMG_1524.jpg',
    'Photos/IMG_1795.jpg',
    'Photos/IMG_1027.jpg',
    'Photos/IMG_2036.jpg',
    'Photos/IMG_7025.jpg',
    'Photos/IMG_1593.jpg',
    'Photos/IMG_1076.jpg',
  ];
  let num = 1;

  if (img) {
    img.addEventListener('click', () => {
      img.src = images[num];
      num = (num < images.length - 1) ? num + 1 : 0;
    });
  }

  // ================= Hover overlay =================
  const searchBtn = document.getElementById('Search');
  const overlay = document.getElementById('hover-overlay');
  if (searchBtn && overlay) {
    searchBtn.addEventListener('mouseenter', () => overlay.style.opacity = 1);
    searchBtn.addEventListener('mouseleave', () => overlay.style.opacity = 0);
    searchBtn.addEventListener('focus', () => overlay.style.opacity = 1);
    searchBtn.addEventListener('blur', () => overlay.style.opacity = 0);
  }

  // ================= GSAP ScrollTrigger =================
  gsap.registerPlugin(ScrollTrigger);

let scrollStart, scrollEnd;

if (window.innerWidth < 768) {  // Mobile
  scrollStart = "top 30%";
  scrollEnd   = "bottom 10%";
} else {  // Desktop
  scrollStart = "top 50%";
  scrollEnd   = "bottom 5%";
}

let xvalue;
if (window.innerWidth < 768) {  // Mobile
  xvalue = 350;
  scrollEnd   = "bottom 10%";
} else {  // Desktop
  xvalue = 800;
}


let xvalue2;
if (window.innerWidth < 768) {  // Mobile
  xvalue2 = 400;
  scrollEnd   = "bottom 10%";
} else {  // Desktop
  xvalue2 = 1450;
}


gsap.from("#info-container2", {
  scrollTrigger: {
    trigger: "#fly-photo",
    start: scrollStart,
    end: scrollEnd,
    toggleActions: "play none none reverse",
    markers: true
  },
  x: "110vw",
  rotation: -36,
   ease: "power1.inOut",
  duration: 1.5,
  onComplete: function() {
    // Floating motion after the fly-in completes
    gsap.to("#fly-photo", {
      y: "-=20",       // float up 20px
      repeat: -1,      // infinite
      yoyo: true,
      ease: "sine.inOut",
      duration: 2
    });
  }
});


gsap.from("#fly-photo2", {
  scrollTrigger: {
    trigger: "#fly-photo2",
    start: "top 50%",
    end: scrollEnd,
    toggleActions: "play none none reverse",
    markers: true
  },
  x: "110vw",
  rotation: -36,
   ease: "power1.inOut",
  duration: 1.5,
  onComplete: function() {
    // Floating motion after the fly-in completes
    gsap.to("#fly-photo2", {
      y: "-=20",       // float up 20px
      repeat: -1,      // infinite
      yoyo: true,
      ease: "sine.inOut",
      duration: 2
    });
  }
});

gsap.from("#info-container3", {
  scrollTrigger: {
    trigger: "#fly-photo2",
    start: scrollStart,
    end: scrollEnd,
    toggleActions: "play none none reverse",
    markers: true
  },
  x: "110vw",
  rotation: -36,
   ease: "power1.inOut",
  duration: 1.5,
  onComplete: function() {
    // Floating motion after the fly-in completes
    gsap.to("#fly-photo2", {
      y: "-=20",       // float up 20px
      repeat: -1,      // infinite
      yoyo: true,
      ease: "sine.inOut",
      duration: 2
    });
  }
});




  gsap.from("#fly-photo", {
  scrollTrigger: {
    trigger: "#fly-photo",
    start: scrollStart,
    end: scrollEnd,
    toggleActions: "play none none reverse",
    markers: true
  },
  x: "110vw",
  rotation: 36,
   ease: "power5.inOut",
  duration: 1.5,
  onComplete: function() {
    // Floating motion after the fly-in completes
    gsap.to("#fly-photo", {
      y: "-=20",       // float up 20px
      repeat: -1,      // infinite
      yoyo: true,
      ease: "sine.inOut",
      duration: 2
    });
  }
});

});

















gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Create smooth scrolling
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,            // How smooth the scroll feels
  effects: true           // Enable ScrollTrigger effects to work
});