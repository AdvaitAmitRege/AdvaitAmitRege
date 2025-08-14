// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initCursor();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initSkillBars();
    initStatsCounter();
    initProjectHover();
});

// Custom Cursor
function initCursor() {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Disable cursor effects on mobile
    if (isMobile) {
        return;
    }
    
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    
    cursor.classList.add('cursor');
    follower.classList.add('cursor-follower');
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let speed = 0.3; // Increased speed
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        
        follower.style.left = `${posX}px`;
        follower.style.top = `${posY}px`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .nav-link, .skill-card, .project-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('active');
            playSound(783.99, 0.05); // G5 note
        });
        
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });
}

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
            menuToggle.classList.toggle('active');
            playSound(523.25, 0.1); // C5 note
        });
    }
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu if open
                    if (navigation.classList.contains('active')) {
                        navigation.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    playSound(523.25, 0.1); // C5 note
                }
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        // Header effect
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Reveal animations
        const revealElements = document.querySelectorAll('.fade-in');
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    });
}

// Animations
function initAnimations() {
    // Initialize hero title animation
    const heroLines = document.querySelectorAll('.hero-title .line');
    heroLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animationPlayState = 'running';
        }, index * 200);
    });
    
    // Initialize floating elements
    const elements = document.querySelectorAll('.element');
    elements.forEach(el => {
        // Randomize animation delays
        const delay = Math.random() * 5;
        el.style.animationDelay = `-${delay}s`;
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill, .skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || bar.dataset.percent;
                if (width) {
                    bar.style.width = `${width}%`;
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.count);
                let count = 0;
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(count);
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Project Hover Effects
function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createParticles(card, 10);
            playSound(659.25, 0.1); // E5 note
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showMessage('Please fill in all fields', 'error');
                playSound(349.23, 0.3); // F4 note (lower pitch for error)
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                playSound(349.23, 0.3); // F4 note (lower pitch for error)
                return;
            }
            
            // Simulate form submission
            showMessage('Message sent successfully!', 'success');
            playSound(1046.50, 0.3); // C6 note (higher pitch for success)
            
            // Reset form
            form.reset();
            
            // Add visual feedback
            createParticles(form, 20);
        });
    }
}

// Show Message Function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    // Add to form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(message, form);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Particle System
function createParticles(element, count) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        const distance = Math.random() * 50 + 50;
        
        // Position
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.position = 'fixed';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        // Animate
        const startTime = Date.now();
        const duration = 1000;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const x = centerX + Math.cos(angle) * distance * progress;
            const y = centerY + Math.sin(angle) * distance * progress;
            const opacity = 1 - progress;
            const currentSize = size * (1 - progress * 0.5);
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = opacity;
            particle.style.width = `${currentSize}px`;
            particle.style.height = `${currentSize}px`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Sound Effects
function playSound(frequency, duration, type = 'sine') {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Fail silently if audio context is not available
    }
}

// Keyboard Navigation (Game-like)
document.addEventListener('keydown', (e) => {
    // WASD navigation
    if (e.key === 'w' || e.key === 'W') {
        window.scrollBy(0, -50);
        playSound(523.25, 0.05); // C5 note
    } else if (e.key === 's' || e.key === 'S') {
        window.scrollBy(0, 50);
        playSound(587.33, 0.05); // D5 note
    } else if (e.key === 'a' || e.key === 'A') {
        // Add custom action for A key
        playSound(659.25, 0.05); // E5 note
    } else if (e.key === 'd' || e.key === 'D') {
        // Add custom action for D key
        playSound(698.46, 0.05); // F5 note
    }
});