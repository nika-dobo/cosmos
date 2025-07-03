// გლობალური ცვლადები
let audioMuted = true; // ხმოვანი ეფექტები გამორთულია თუ არა
let currentPage = "home"; // მიმდინარე გვერდი

// აპლიკაციის ინიციალიზაცია გვერდის ჩატვირთვისას
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // ნავიგაციის ინიციალიზაცია (ჰამბურგერის მენიუ და ლინკები)
  initializeNavigation();
  // აუდიოს კონტროლის ინიციალიზაცია
  initializeAudioControl();
  // სკროლის ანიმაციების ინიციალიზაცია
  initializeScrollAnimations();
  // რბილი (smooth) გადახვევის ინიციალიზაცია
  initializeSmoothScrolling();
  // მიმდინარე გვერდის განსაზღვრა
  setCurrentPage();
  // კონკრეტული გვერდისთვის სპეციფიური ფუნქციონალის ჩართვა
  initializePageSpecific();
}

function initializeNavigation() {
  // ჰამბურგერის მენიუს და ნავიგაციის ლინკების დაყენება
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // მენიუს დახურვა ლინკზე დაკლიკებისას
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
}

function initializeAudioControl() {
  // აუდიოს ჩართვა/გამორთვის ღილაკის და ხმის ხატულის დაყენება
  const audioToggle = document.getElementById("audio-toggle");
  const audioIcon = document.getElementById("audio-icon");
  const backgroundMusic = document.getElementById("background-music");

  if (audioToggle && audioIcon) {
    audioToggle.addEventListener("click", function () {
      audioMuted = !audioMuted;

      if (audioMuted) {
        audioIcon.textContent = "🔇";
        if (backgroundMusic) {
          backgroundMusic.pause();
        }
      } else {
        audioIcon.textContent = "🔊";
        if (backgroundMusic) {
          // სივრცის ხმოვანი ეფექტის ჩართვა
          playSpaceAmbient();
        }
      }
    });
  }
}

function playSpaceAmbient() {
  // სივრცის ფონური ხმოვანი ეფექტის დაკვრა
  if (!audioMuted) {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 2);
      gainNode.gain.linearRampToValueAtTime(
        0.02,
        audioContext.currentTime + 10
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 10);
    } catch (error) {
      console.log("Audio context not available");
    }
  }
}

function initializeScrollAnimations() {
  // სკროლისას ელემენტების გამოჩენის ანიმაცია
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  // ვაკვირდებით ელემენტებს, რომლებსაც აქვთ შესაბამისი კლასი
  document
    .querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

function initializeSmoothScrolling() {
  // რბილი გადახვევა ანქორ ლინკებზე დაკლიკებისას
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function setCurrentPage() {
  // განსაზღვრავს რომელი გვერდია აქტიური მისამართის მიხედვით
  const path = window.location.pathname;
  const filename = path.split("/").pop() || "index.html";

  if (filename.includes("planets")) currentPage = "planets";
  else if (filename.includes("black-holes")) currentPage = "black-holes";
  else if (filename.includes("galaxies")) currentPage = "galaxies";
  else if (filename.includes("space-history")) currentPage = "space-history";
  else if (filename.includes("aliens-theories"))
    currentPage = "aliens-theories";
  else if (filename.includes("quiz")) currentPage = "quiz";
  else if (filename.includes("about")) currentPage = "about";
  else currentPage = "home";
}

function initializePageSpecific() {
  // კონკრეტული გვერდისთვის სპეციფიური ინიციალიზაცია
  switch (currentPage) {
    case "home":
      initializeHomePage();
      break;
    case "planets":
      // პლანეტების გვერდის ინიციალიზაცია planets.js-ში
      break;
    case "black-holes":
      // შავი ხვრელების გვერდის ინიციალიზაცია black-holes.js-ში
      break;
    case "galaxies":
      // გალაქტიკების გვერდის ინიციალიზაცია galaxies.js-ში
      break;
    case "space-history":
      // ისტორიის გვერდის ინიციალიზაცია space-history.js-ში
      break;
    case "aliens-theories":
      // უცხოპლანეტელების გვერდის ინიციალიზაცია aliens-theories.js-ში
      break;
    case "quiz":
      // ქვიზის გვერდის ინიციალიზაცია quiz.js-ში
      break;
    case "about":
      // About გვერდის ინიციალიზაცია about.js-ში
      break;
  }
}

function initializeHomePage() {
  // რაკეტის ანიმაციის ინიციალიზაცია
  const rocket = document.getElementById("rocket");
  if (rocket) {
    // სკროლისას რაკეტის პარალაქს ანიმაცია
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;

      if (rocket) {
        rocket.style.transform = `translateY(-${parallax}px)`;
      }
    });
  }

  // მისიის ბარათების ანიმაცია
  const missionCards = document.querySelectorAll(".mission-card");
  missionCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add("fade-in-up");
  });

  // გამორჩეული ბარათების ანიმაცია
  const featuredCards = document.querySelectorAll(".featured-card");
  featuredCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.3}s`;
    card.classList.add("fade-in-up");
  });
}

// დამხმარე ფუნქციები
function startExploration() {
  // გადახვევა მისიის სექციამდე ან პლანეტების გვერდზე გადასვლა
  const missionSection = document.getElementById("mission");
  if (missionSection) {
    missionSection.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "planets.html";
  }
}

function scrollToSection(sectionId) {
  // გადახვევა მითითებულ სექციამდე
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// პარალაქს ეფექტი ფონის ელემენტებისთვის
function initializeParallax() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// DOM ჩატვირთვისას პარალაქსის ინიციალიზაცია
document.addEventListener("DOMContentLoaded", initializeParallax);

// სკროლის ოპტიმიზირებული დამმუშავებელი (debounce)
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

// ოპტიმიზირებული სკროლის დამმუშავებელი
const optimizedScrollHandler = debounce(function () {
  const scrolled = window.pageYOffset;

  // ნავბარის ფონის განახლება
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (scrolled > 50) {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.9)";
    }
  }

  // პარალაქს ელემენტების განახლება
  const parallaxElements = document.querySelectorAll(".parallax");
  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// კლავიატურით ნავიგაცია (Escape ღილაკი მოდალების დასახურად)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // ყველა ღია მოდალის დახურვა
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
  }
});

// გლობალური ფუნქციების ექსპორტი სხვა სკრიპტებისთვის
window.spaceExplorer = {
  startExploration,
  scrollToSection,
  currentPage,
  audioMuted,
};
