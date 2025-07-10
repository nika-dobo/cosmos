// About page functionality
// ამ კლასში ინახება და იმართება About გვერდის ყველა ფუნქციონალი
class AboutPageManager {
  constructor() {
    // ასტრონავტის ელემენტი
    this.astronaut = null;
    // საკონტაქტო ფორმის ელემენტი
    this.contactForm = null;
    // სოციალური ბმულების მასივი
    this.socialLinks = [];

    // ყველა ფუნქციის ინიციალიზაცია
    this.init();
  }

  init() {
    // ასტრონავტის ანიმაციის ჩართვა
    this.initializeAstronautAnimation();
    // საკონტაქტო ფორმის დაყენება
    this.setupContactForm();
    // სოციალური ბმულების ინიციალიზაცია
    this.initializeSocialLinks();
    // გუნდის წევრების ინტერაქციების დაყენება
    this.setupTeamMemberInteractions();
    // კონტენტის ანიმაციების ინიციალიზაცია
    this.initializeContentAnimations();
  }

  initializeAstronautAnimation() {
    // ასტრონავტის DOM ელემენტის მოძებნა
    const astronaut = document.getElementById("floating-astronaut");
    if (!astronaut) return;

    this.astronaut = astronaut;

    // ასტრონავტზე მაუსის მიყვანისას ანიმაციის აჩქარება და ზომის გაზრდა
    astronaut.addEventListener("mouseenter", () => {
      astronaut.style.animationDuration = "3s";
      astronaut.style.transform = "scale(1.1)";
      astronaut.style.transition = "transform 0.3s ease";
    });

    // მაუსის მოცილებისას ანიმაციის ნელი რეჟიმი და ზომის დაბრუნება
    astronaut.addEventListener("mouseleave", () => {
      astronaut.style.animationDuration = "6s";
      astronaut.style.transform = "scale(1)";
    });

    // ასტრონავტზე დაკლიკებისას boost ეფექტის ჩართვა
    astronaut.addEventListener("click", () => {
      this.triggerAstronautBoost();
    });
  }

  triggerAstronautBoost() {
    if (!this.astronaut) return;

    // ასტრონავტის სწრაფი მოძრაობის ეფექტი
    this.astronaut.style.animation = "none";
    this.astronaut.style.transform = "translateY(-50px) scale(1.2)";
    this.astronaut.style.transition = "transform 0.5s ease";

    // ნაწილაკების (particle) ეფექტის შექმნა
    this.createAstronautParticles();

    // boost-ის ხმოვანი ეფექტი
    this.playBoostSound();

    // 0.5 წამში ანიმაციის დაბრუნება საწყის მდგომარეობაში
    setTimeout(() => {
      this.astronaut.style.animation =
        "astronaut-float 6s ease-in-out infinite";
      this.astronaut.style.transform = "scale(1)";
    }, 500);
  }

  createAstronautParticles() {
    // ასტრონავტის გარშემო ნაწილაკების შექმნა boost-ზე
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

      // ნაწილაკის საწყისი პოზიციის გამოთვლა ასტრონავტის მიხედვით
      const astronautRect = this.astronaut.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      particle.style.left = `${
        astronautRect.left - containerRect.left + astronautRect.width / 2
      }px`;
      particle.style.top = `${
        astronautRect.top - containerRect.top + astronautRect.height / 2
      }px`;

      container.appendChild(particle);

      // ნაწილაკის ანიმაცია სხვადასხვა მიმართულებით გაფრენის ეფექტით
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
    // boost-ის ხმოვანი ეფექტის დაკვრა, თუ ხმა გამორთული არაა
    if (!window.audioMuted) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // ვცვლით სიხშირეს დროში, რომ მივიღოთ "boost" ეფექტი
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        880,
        audioContext.currentTime + 0.3
      );

      // ვაკონტროლებთ ხმის სიმძლავრეს, რომ ნელ-ნელა ჩაქრეს
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      // ვიწყებთ ხმის დაკვრას და ვაჩერებთ 0.3 წამში
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  }

  setupContactForm() {
    // საკონტაქტო ფორმის მოძებნა და ინიციალიზაცია
    const form = document.getElementById("contact-form");
    if (!form) return;

    this.contactForm = form;

    // ფორმის გაგზავნისას ვალიდაციის და შეტყობინების ჩვენება
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // ველების რეალურ დროში ვალიდაცია
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
    // ველის მნიშვნელობის შემოწმება და შეცდომის შეტყობინების ჩვენება
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // წაშალე ძველი შეცდომის სტილი
    field.classList.remove("error");

    switch (field.type) {
      case "email":
        // ვამოწმებთ ელფოსტის ველის სწორ ფორმატს
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "text":
        // ტექსტური ველი უნდა იყოს მინიმუმ 2 სიმბოლო
        if (value.length < 2) {
          isValid = false;
          errorMessage = "This field must be at least 2 characters long";
        }
        break;
      case "textarea":
        // textarea ველი უნდა იყოს მინიმუმ 10 სიმბოლო
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
    // ველის ქვეშ შეცდომის შეტყობინების ჩვენება
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    errorElement.style.color = "#ff6b35";
    errorElement.style.fontSize = "0.8rem";
    errorElement.style.marginTop = "0.25rem";

    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    // ველის შეცდომის სტილის და შეტყობინების წაშლა
    field.classList.remove("error");
    const errorMessage = field.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  handleFormSubmission(form) {
    // ფორმის გაგზავნისას ყველა ველის ვალიდაცია
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

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

    // გაგზავნის პროცესის იმიტაცია და შეტყობინების ჩვენება
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    setTimeout(() => {
      this.showFormMessage(
        "Thank you for your message! We'll get back to you soon.",
        "success"
      );
      form.reset();

      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // წარმატების ხმოვანი ეფექტი
      this.playSuccessSound();
    }, 2000);
  }

  showFormMessage(message, type) {
    // ფორმის შეტყობინების ჩვენება (წარმატება ან შეცდომა)
    const existingMessage = this.contactForm.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

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

    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  playSuccessSound() {
    // წარმატების ხმოვანი ეფექტი (ფორმის წარმატებით გაგზავნისას)
    if (!window.audioMuted) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // რამდენიმე ნოტი, რომ წარმატების ხმა გამოვიდეს
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3);

      // ვაკონტროლებთ ხმის სიმძლავრეს, რომ ნელ-ნელა ჩაქრეს
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.4
      );

      // ვიწყებთ ხმის დაკვრას და ვაჩერებთ 0.4 წამში
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    }
  }

  initializeSocialLinks() {
    // სოციალური ბმულების hover ანიმაცია
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
      // ვინახავთ ბმულს მასივში
      this.socialLinks.push(link);

      // მაუსის მიყვანისას ბმული ოდნავ მაღლა და იზრდება
      link.addEventListener("mouseenter", () => {
        link.style.transform = "translateY(-10px) scale(1.05)";
        link.style.transition = "transform 0.3s ease";
      });

      // მაუსის მოცილებისას ბმული უბრუნდება საწყის მდგომარეობას
      link.addEventListener("mouseleave", () => {
        link.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  setupTeamMemberInteractions() {
    // გუნდის წევრებზე hover ეფექტები
    const teamMembers = document.querySelectorAll(".team-member");

    teamMembers.forEach((member) => {
      const avatar = member.querySelector(".member-avatar");
      const description = member.querySelector(".member-description");

      if (avatar && description) {
        // მაუსის მიყვანისას ავატარი იზრდება და აღწერა ჩანს
        member.addEventListener("mouseenter", () => {
          avatar.style.transform = "scale(1.1) rotate(5deg)";
          avatar.style.transition = "transform 0.3s ease";
          description.style.opacity = "1";
          description.style.transform = "translateY(0)";
        });

        // მოცილებისას უბრუნდება საწყის მდგომარეობას
        member.addEventListener("mouseleave", () => {
          avatar.style.transform = "scale(1) rotate(0deg)";
          description.style.opacity = "0.8";
          description.style.transform = "translateY(5px)";
        });
      }
    });
  }

  initializeContentAnimations() {
    // კონტენტის ბარათების ანიმაცია გვერდის გადახვევისას
    const contentCards = document.querySelectorAll(".content-card");

    // IntersectionObserver-ით ვამოწმებთ, როდის გამოჩნდება ბარათი ეკრანზე
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

    // ყველა ბარათს ვაძლევთ საწყის მდგომარეობას და ვაკვირდებით
    contentCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      card.style.transition = `opacity 0.8s ease ${
        index * 0.2
      }s, transform 0.8s ease ${index * 0.2}s`;
      observer.observe(card);
    });

    // გუნდის წევრების ანიმაცია
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

  // Easter egg: კონამის კოდი
  initializeKonamiCode() {
    // კონამის კოდის კომბინაციის შემოწმება
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
    // საიდუმლო ეფექტის ჩართვა კონამის კოდის შეყვანისას
    const container = document.querySelector(".main-content");
    if (!container) return;

    // ასტრონავტისთვის ცისარტყელას ეფექტი
    if (this.astronaut) {
      this.astronaut.style.filter = "hue-rotate(0deg)";
      this.astronaut.style.animation =
        "astronaut-float 1s ease-in-out infinite, hue-rotate 2s linear infinite";
    }

    // კონფეტის ეფექტი
    this.createConfetti();

    // საიდუმლო შეტყობინების ჩვენება
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
    // კონფეტის ნაწილაკების შექმნა საიდუმლო ეფექტისთვის
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

// გვერდის ინიციალიზაცია მხოლოდ მაშინ, თუ ეს არის about გვერდი
document.addEventListener("DOMContentLoaded", function () {
  if (window.spaceExplorer && window.spaceExplorer.currentPage === "about") {
    initializeAboutPage();
  }
});

let aboutPageManager;

// About გვერდის ინიციალიზაციის ფუნქცია
function initializeAboutPage() {
  aboutPageManager = new AboutPageManager();
  aboutPageManager.initializeKonamiCode();
}

// გლობალური ფუნქცია სოციალური ბმულების გასახსნელად
function openSocial(platform) {
  // სხვადასხვა სოციალური პლატფორმის ბმულები
  const urls = {
    twitter: "https://x.com/SpaceX",
    facebook: "https://www.facebook.com/groups/spacextap?locale=ru_RU",
    instagram: "https://www.instagram.com/spacex/",
    youtube: "https://www.youtube.com/@SpaceX",
  };

  // თუ პლატფორმა არსებობს, ვხსნით ახალ ფანჯარაში
  if (urls[platform]) {
    window.open(urls[platform], "_blank");
  }
}

// ფორმის ვალიდაციისთვის საჭირო CSS სტილები
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

// სტილების დამატება დოკუმენტში
const styleSheet = document.createElement("style");
styleSheet.textContent = aboutPageStyles;
document.head.appendChild(styleSheet);

// გლობალური ფუნქციების ექსპორტი
window.aboutPageExplorer = {
  openSocial,
};
