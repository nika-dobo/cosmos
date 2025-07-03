// Global variables
let audioMuted = true;
let currentPage = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize audio control
    initializeAudioControl();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Set current page
    setCurrentPage();
    
    // Initialize page-specific functionality
    initializePageSpecific();
}

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

function initializeAudioControl() {
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const backgroundMusic = document.getElementById('background-music');
    
    if (audioToggle && audioIcon) {
        audioToggle.addEventListener('click', function() {
            audioMuted = !audioMuted;
            
            if (audioMuted) {
                audioIcon.textContent = '🔇';
                if (backgroundMusic) {
                    backgroundMusic.pause();
                }
            } else {
                audioIcon.textContent = '🔊';
                if (backgroundMusic) {
                    // Create a simple audio context for space sounds
                    playSpaceAmbient();
                }
            }
        });
    }
}

function playSpaceAmbient() {
    if (!audioMuted) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 2);
            gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 10);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 10);
        } catch (error) {
            console.log('Audio context not available');
        }
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe elements with scroll reveal classes
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        observer.observe(el);
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename.includes('planets')) currentPage = 'planets';
    else if (filename.includes('black-holes')) currentPage = 'black-holes';
    else if (filename.includes('galaxies')) currentPage = 'galaxies';
    else if (filename.includes('space-history')) currentPage = 'space-history';
    else if (filename.includes('aliens-theories')) currentPage = 'aliens-theories';
    else if (filename.includes('quiz')) currentPage = 'quiz';
    else if (filename.includes('about')) currentPage = 'about';
    else currentPage = 'home';
}

function initializePageSpecific() {
    // Add page-specific initialization based on current page
    switch (currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'planets':
            // Planet-specific initialization will be in planets.js
            break;
        case 'black-holes':
            // Black hole-specific initialization will be in black-holes.js
            break;
        case 'galaxies':
            // Galaxy-specific initialization will be in galaxies.js
            break;
        case 'space-history':
            // History-specific initialization will be in space-history.js
            break;
        case 'aliens-theories':
            // Aliens-specific initialization will be in aliens-theories.js
            break;
        case 'quiz':
            // Quiz-specific initialization will be in quiz.js
            break;
        case 'about':
            // About-specific initialization will be in about.js
            break;
    }
}

function initializeHomePage() {
    // Initialize rocket animation
    const rocket = document.getElementById('rocket');
    if (rocket) {
        // Add rocket launch animation on scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (rocket) {
                rocket.style.transform = `translateY(-${parallax}px)`;
            }
        });
    }
    
    // Initialize mission cards animation
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
    
    // Initialize featured cards animation
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        card.classList.add('fade-in-up');
    });
}

// Utility functions
function startExploration() {
    // Scroll to mission section or navigate to planets page
    const missionSection = document.getElementById('mission');
    if (missionSection) {
        missionSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = 'planets.html';
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Parallax effect for background elements
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeParallax);

// Debounced scroll handler for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const scrolled = window.pageYOffset;
    
    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrolled > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    }
    
    // Update parallax elements
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Export functions for use in other scripts
window.spaceExplorer = {
    startExploration,
    scrollToSection,
    currentPage,
    audioMuted
};