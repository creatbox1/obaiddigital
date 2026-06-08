document.addEventListener('DOMContentLoaded', function() {
    initCursorSmoke();
    initAdStats();
    initGSAP();
    initParallax();
    initNavigation();
    initButtonGlow();
    initFAQ();
});

function initAdStats() {
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statValues.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateValue(stat, 0, target, 2000);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const dashboardCard = document.querySelector('.dashboard-card');
    if (dashboardCard) observer.observe(dashboardCard);
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isCurrency = element.textContent.includes('$');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeProgress);
        
        if (isCurrency) {
            element.textContent = '$' + current.toLocaleString();
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

function initCursorSmoke() {
    const smoke1 = document.querySelector('.cursor-smoke');
    const smoke2 = document.querySelector('.cursor-smoke-2');
    const smoke3 = document.querySelector('.cursor-smoke-3');
    
    let mouseX = 0, mouseY = 0;
    let pos1 = { x: 0, y: 0 };
    let pos2 = { x: 0, y: 0 };
    let pos3 = { x: 0, y: 0 };
    let isMoving = false;
    let hideTimeout;
    
    function hideSmoke() {
        isMoving = false;
        if (smoke1) smoke1.style.opacity = '0';
        if (smoke2) smoke2.style.opacity = '0';
        if (smoke3) smoke3.style.opacity = '0';
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
            if (smoke1) smoke1.style.opacity = '0.9';
            if (smoke2) smoke2.style.opacity = '0.9';
            if (smoke3) smoke3.style.opacity = '0.9';
        }
        
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideSmoke, 150);
    });
    
    function animate() {
        pos1.x += (mouseX - pos1.x) * 0.15;
        pos1.y += (mouseY - pos1.y) * 0.15;
        pos2.x += (mouseX - pos2.x) * 0.1;
        pos2.y += (mouseY - pos2.y) * 0.1;
        pos3.x += (mouseX - pos3.x) * 0.05;
        pos3.y += (mouseY - pos3.y) * 0.05;
        
        if (smoke1) {
            smoke1.style.left = pos1.x + 'px';
            smoke1.style.top = pos1.y + 'px';
        }
        if (smoke2) {
            smoke2.style.left = pos2.x + 'px';
            smoke2.style.top = pos2.y + 'px';
        }
        if (smoke3) {
            smoke3.style.left = pos3.x + 'px';
            smoke3.style.top = pos3.y + 'px';
        }
        
        requestAnimationFrame(animate);
    }
    animate();
}

function initCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-up').forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

function initParallax() {
    const heroCards = document.getElementById('heroCards');
    const heroSection = document.getElementById('hero');

    if (!heroCards || !heroSection) return;

    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(heroCards, {
            duration: 0.5,
            x: x,
            y: y,
            ease: 'power2.out'
        });
    });
}

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navIcons = document.querySelectorAll('.nav-icon');

    if (sections.length === 0 || navIcons.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navIcons.forEach(icon => {
            icon.classList.remove('active');
            if (icon.getAttribute('data-section') === current) {
                icon.classList.add('active');
            }
        });
    });

    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const sectionId = icon.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initButtonGlow() {
    const buttons = document.querySelectorAll('.neon-btn-primary');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                boxShadow: '0 0 40px rgba(255, 42, 42, 0.6)',
                duration: 0.3
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                boxShadow: '0 0 20px rgba(255, 42, 42, 0.4)',
                duration: 0.3
            });
        });
    });
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}