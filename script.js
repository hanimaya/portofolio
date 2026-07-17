/* ============================================
   PORTFOLIO BENTO — JAVASCRIPT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animation ---
    const cards = document.querySelectorAll('.bento-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                const card = entry.target;
                const delay = Array.from(cards).indexOf(card) * 80;
                setTimeout(() => {
                    card.classList.add('visible');
                }, delay);
                revealObserver.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    cards.forEach(card => revealObserver.observe(card));
    // --- Animated Counter ---
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }
    // --- Stats Bar Animation ---
    const statsBar = document.querySelector('.stats-bar-fill');
    if (statsBar) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => statsBar.classList.add('animated'), 500);
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        barObserver.observe(statsBar.parentElement);
    }
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    // --- Local Time Display ---
    function updateLocalTime() {
        const timeEl = document.getElementById('localTime');
        if (timeEl) {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Jakarta'
            };
            timeEl.textContent = now.toLocaleTimeString('en-US', options) + ' WIB';
        }
    }
    updateLocalTime();
    setInterval(updateLocalTime, 60000);
    // --- Navbar Scroll Effect ---
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 60) {
            navbar.style.padding = '10px 40px';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
        } else {
            navbar.style.padding = '16px 40px';
            navbar.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });
    // --- Smooth Scroll for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    // --- Card Tilt Effect (subtle) ---
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    // --- Skill Tags Random Highlight ---
    const skillTags = document.querySelectorAll('.skill-tag');
    if (skillTags.length > 0) {
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * skillTags.length);
            const tag = skillTags[randomIndex];
            tag.style.background = '#FF6B00';
            tag.style.color = '#fff';
            tag.style.transform = 'translateY(-2px)';

            setTimeout(() => {
                tag.style.background = '';
                tag.style.color = '';
                tag.style.transform = '';
            }, 1200);
        }, 3000);
    }
});