// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. LOADER LOGIC ---
window.addEventListener("load", () => {
    const tl = gsap.timeline();

    // Animasi Progress Bar (Pura-pura loading)
    tl.to("#progress-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    })
    .to("#loader-text", {
        text: "ACCESS GRANTED", // Perlu plugin TextPlugin atau ganti manual, kita pakai simple opacity aja
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    .to("#loader", {
        y: "-100%", // Geser layar hitam ke atas
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
            // Izinkan scroll lagi setelah loading selesai
            document.body.classList.remove("overflow-hidden");
            // Jalankan animasi Hero Section
            initHeroAnimations();
        }
    });
});

// --- 2. HERO ANIMATION (Dipanggil setelah Loader) ---
function initHeroAnimations() {
    gsap.from(".gsap-hero", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    });
}

// --- 3. SCROLL REVEAL ANIMATIONS (Tetap sama) ---
const fadeUps = document.querySelectorAll('.gsap-fade-up');
fadeUps.forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

gsap.from(".gsap-fade-right", {
    scrollTrigger: { trigger: "#profile", start: "top 70%" },
    x: -50, opacity: 0, duration: 1.5, ease: "power3.out"
});

gsap.from(".gsap-fade-left", {
    scrollTrigger: { trigger: "#profile", start: "top 70%" },
    x: 50, opacity: 0, duration: 1.5, ease: "power3.out"
});

// --- 4. TABS LOGIC ---
function switchTab(tabName) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => p.classList.add('hidden'));

    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));

    const activePanel = document.getElementById('panel-' + tabName);
    const activeBtn = document.getElementById('tab-' + tabName);

    if(activePanel && activeBtn) {
        activePanel.classList.remove('hidden');
        activeBtn.classList.add('active');

        gsap.fromTo(activePanel.children, 
            {y: 20, opacity: 0}, 
            {y: 0, opacity: 1, duration: 0.4, stagger: 0.1}
        );
    }
}
// --- CUSTOM CURSOR LOGIC ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot (titik kecil) gerak instan
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline (lingkaran besar) gerak agak delay (smooth)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});
// --- MOBILE MENU LOGIC ---
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    // Toggle class 'hidden'
    mobileMenu.classList.toggle('hidden');
    
    // Ganti icon (Garis tiga <-> Silang)
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    } else {
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
        
        // Animasi kecil saat menu turun
        gsap.from(mobileMenu.children, {
            y: -10,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1
        });
    }
});