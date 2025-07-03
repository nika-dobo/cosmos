// About page functionality
class AboutPageManager {
  constructor() {
    this.astronaut = null;
    this.contactForm = null;
    this.socialLinks = [];

    this.init();
  }

  init() {
    this.initializeAstronautAnimation();
    this.setupContactForm();
    this.initializeSocialLinks();
    this.setupTeamMemberInteractions();
    this.initializeContentAnimations();
  }

  initializeAstronautAnimation() {
    const astronaut = document.getElementById("floating-astronaut");
    if (!astronaut) return;

    this.astronaut = astronaut;

    // Add interactive hover effect
    astronaut.addEventListener("mouseenter", () => {
      astronaut.style.animationDuration = "3s";
      astronaut.style.transform = "scale(1.1)";
      astronaut.style.transition = "transform 0.3s ease";
    });

    astronaut.addEventListener("mouseleave", () => {
      astronaut.style.animationDuration = "6s";
      astronaut.style.transform = "scale(1)";
    });

    // Add click interaction
    astronaut.addEventListener("click", () => {
      this.triggerAstronautBoost();
    });
  }

  triggerAstronautBoost() {
    if (!this.astronaut) return;

    // Create boost effect
    this.astronaut.style.animation = "none";
    this.astronaut.style.transform = "translateY(-50px) scale(1.2)";
    this.astronaut.style.transition = "transform 0.5s ease";

    // Create particle effect
    this.createAstronautParticles();

    // Play boost sound
    this.playBoostSound();

    // Reset after animation
    setTimeout(() => {
      this.astronaut.style.animation =
        "astronaut-float 6s ease-in-out infinite";
      this.astronaut.style.transform = "scale(1)";
    }, 500);
  }

  createAstronautParticles() {
    const container = document.querySelector(".astronaut-container");
    if (!container) return;

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.className = "astronaut-particle";
      particle.style.position = "absolute";
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.backgroundColor = "#00bfff";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";

      const astronautRect = this.astronaut.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      particle.style.left = `${
        astronautRect.left - containerRect.left + astronautRect.width / 2
      }px`;
      particle.style.top = `${
        astronautRect.top - containerRect.top + astronautRect.height / 2
      }px`;

      container.appendChild(particle);

      // Animate particle
      const angle = (i / 10) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      particle.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
          },
          {
            transform: `translate(${targetX}px, ${targetY}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        }
      ).onfinish = () => {
        particle.remove();
      };
    }
  }

  playBoostSound() {
    if (!window.audioMuted) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        880,
        audioContext.currentTime + 0.3
      );

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  }

  setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    this.contactForm = form;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // Add real-time validation
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("focus", () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Remove existing error styling
    field.classList.remove("error");

    switch (field.type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "text":
        if (value.length < 2) {
          isValid = false;
          errorMessage = "This field must be at least 2 characters long";
        }
        break;
      case "textarea":
        if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters long";
        }
        break;
    }

    if (!isValid) {
      field.classList.add("error");
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    // Remove existing error message
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    errorElement.style.color = "#ff6b35";
    errorElement.style.fontSize = "0.8rem";
    errorElement.style.marginTop = "0.25rem";

    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove("error");
    const errorMessage = field.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isFormValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showFormMessage("Please correct the errors above.", "error");
      return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      this.showFormMessage(
        "Thank you for your message! We'll get back to you soon.",
        "success"
      );
      form.reset();

      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Play success sound
      this.playSuccessSound();
    }, 2000);
  }

  showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = this.contactForm.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement("div");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.padding = "1rem";
    messageElement.style.borderRadius = "8px";
    messageElement.style.marginTop = "1rem";
    messageElement.style.textAlign = "center";

    if (type === "success") {
      messageElement.style.backgroundColor = "rgba(0, 255, 127, 0.1)";
      messageElement.style.border = "1px solid #00ff7f";
      messageElement.style.color = "#00ff7f";
    } else {
      messageElement.style.backgroundColor = "rgba(255, 107, 53, 0.1)";
      messageElement.style.border = "1px solid #ff6b35";
      messageElement.style.color = "#ff6b35";
    }

    this.contactForm.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  playSuccessSound() {
    if (!window.audioMuted) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.4
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    }
  }

  initializeSocialLinks() {
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
      this.socialLinks.push(link);

      link.addEventListener("mouseenter", () => {
        link.style.transform = "translateY(-10px) scale(1.05)";
        link.style.transition = "transform 0.3s ease";
      });

      link.addEventListener("mouseleave", () => {
        link.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  setupTeamMemberInteractions() {
    const teamMembers = document.querySelectorAll(".team-member");

    teamMembers.forEach((member) => {
      const avatar = member.querySelector(".member-avatar");
      const description = member.querySelector(".member-description");

      if (avatar && description) {
        member.addEventListener("mouseenter", () => {
          avatar.style.transform = "scale(1.1) rotate(5deg)";
          avatar.style.transition = "transform 0.3s ease";
          description.style.opacity = "1";
          description.style.transform = "translateY(0)";
        });

        member.addEventListener("mouseleave", () => {
          avatar.style.transform = "scale(1) rotate(0deg)";
          description.style.opacity = "0.8";
          description.style.transform = "translateY(5px)";
        });
      }
    });
  }

  initializeContentAnimations() {
    // Animate content cards on scroll
    const contentCards = document.querySelectorAll(".content-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.3 }
    );

    contentCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      card.style.transition = `opacity 0.8s ease ${
        index * 0.2
      }s, transform 0.8s ease ${index * 0.2}s`;
      observer.observe(card);
    });

    // Animate team members
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach((member, index) => {
      member.style.opacity = "0";
      member.style.transform = "translateY(50px)";
      member.style.transition = `opacity 0.8s ease ${
        index * 0.3
      }s, transform 0.8s ease ${index * 0.3}s`;
      observer.observe(member);
    });
  }

  // Easter egg: Konami code
  initializeKonamiCode() {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  activateEasterEgg() {
    // Create special effect
    const container = document.querySelector(".main-content");
    if (!container) return;

    // Add rainbow effect to astronaut
    if (this.astronaut) {
      this.astronaut.style.filter = "hue-rotate(0deg)";
      this.astronaut.style.animation =
        "astronaut-float 1s ease-in-out infinite, hue-rotate 2s linear infinite";
    }

    // Create confetti effect
    this.createConfetti();

    // Show easter egg message
    const message = document.createElement("div");
    message.textContent = "🚀 You found the secret space code! 🌟";
    message.style.position = "fixed";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.background = "rgba(0, 191, 255, 0.9)";
    message.style.color = "white";
    message.style.padding = "2rem";
    message.style.borderRadius = "15px";
    message.style.fontSize = "1.5rem";
    message.style.zIndex = "10000";
    message.style.textAlign = "center";

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
      if (this.astronaut) {
        this.astronaut.style.filter = "none";
        this.astronaut.style.animation =
          "astronaut-float 6s ease-in-out infinite";
      }
    }, 5000);
  }

  createConfetti() {
    const colors = ["#ff6b35", "#00bfff", "#00ff7f", "#8a2be2", "#ffd700"];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.top = "-10px";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";

      document.body.appendChild(confetti);

      confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(${
              window.innerHeight + 20
            }px) rotate(720deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 3000 + Math.random() * 2000,
          easing: "ease-out",
        }
      ).onfinish = () => {
        confetti.remove();
      };
    }
  }
}

// Initialize about page
document.addEventListener("DOMContentLoaded", function () {
  if (window.spaceExplorer && window.spaceExplorer.currentPage === "about") {
    initializeAboutPage();
  }
});

let aboutPageManager;

function initializeAboutPage() {
  aboutPageManager = new AboutPageManager();
  aboutPageManager.initializeKonamiCode();
}

// Global functions
function openSocial(platform) {
  const urls = {
    twitter: "https://x.com/SpaceX",
    facebook: "https://www.facebook.com/groups/spacextap?locale=ru_RU",
    instagram: "https://www.instagram.com/spacex/",
    youtube: "https://www.youtube.com/@SpaceX",
  };

  if (urls[platform]) {
    window.open(urls[platform], "_blank");
  }
}

// Add CSS for form validation
const aboutPageStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff6b35;
        box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
    }
    
    @keyframes hue-rotate {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .astronaut-particle {
        box-shadow: 0 0 10px currentColor;
    }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = aboutPageStyles;
document.head.appendChild(styleSheet);

// Export functions for global use
window.aboutPageExplorer = {
  openSocial,
};
