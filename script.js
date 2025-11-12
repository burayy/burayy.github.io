
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }


    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }


    if (navLinks.length > 0 && hamburger && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);


        const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-content');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }


    const heroName = document.querySelector('.hero-name');
    if (heroName && heroName.textContent.trim()) {

        const text = heroName.textContent.trim();
        if (text.length <= 30) {
            heroName.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    heroName.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
  
            setTimeout(typeWriter, 500);
        }
    }


    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
        function highlightActiveSection() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightActiveSection);
   
        highlightActiveSection();
    }


    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);


    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8892b0; font-size: 12px;');
