// ანიმაციების უტილიტები და ეფექტები
class AnimationController {
  constructor() {
    // ინიციალიზაცია: ვინახავთ ანიმაციებს და დამკვირვებლებს
    this.animations = new Map();
    this.observers = new Map();
    this.init();
  }

  init() {
    // ყველა ძირითადი ანიმაციის სისტემის ჩართვა
    this.setupScrollObserver(); // სკროლისას ანიმაციები
    this.setupParallaxEffects(); // პარალაქს ეფექტები
    this.setupHoverEffects(); // hover-ზე ეფექტები
  }

  setupScrollObserver() {
    // სკროლისას ელემენტების გამოჩენის ანიმაცია
    const observerOptions = {
      threshold: [0.1, 0.5, 0.9],
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target);
        }
      });
    }, observerOptions);

    // ვაკვირდებით ყველა ელემენტს, რომელსაც აქვს data-animate ატრიბუტი
    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    this.observers.set("scroll", observer);
  }

  setupParallaxEffects() {
    // პარალაქს ეფექტი: გვერდის გადახვევისას ფონის ან ობიექტების მოძრაობა
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupHoverEffects() {
    // ელემენტებზე hover ეფექტები

    // ნათება hover-ზე
    document.querySelectorAll(".hover-glow").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.addGlowEffect(element);
      });
      element.addEventListener("mouseleave", () => {
        this.removeGlowEffect(element);
      });
    });

    // "floating" ეფექტი hover-ზე
    document.querySelectorAll(".hover-float").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.style.transform = "translateY(-10px)";
        element.style.transition = "transform 0.3s ease";
      });
      element.addEventListener("mouseleave", () => {
        element.style.transform = "translateY(0)";
      });
    });
  }

  triggerAnimation(element) {
    // ელემენტზე შესაბამისი ანიმაციის გაშვება
    const animationType = element.dataset.animate;
    const delay = parseFloat(element.dataset.delay) || 0;

    setTimeout(() => {
      switch (animationType) {
        case "fadeInUp":
          this.fadeInUp(element);
          break;
        case "fadeInLeft":
          this.fadeInLeft(element);
          break;
        case "fadeInRight":
          this.fadeInRight(element);
          break;
        case "scaleIn":
          this.scaleIn(element);
          break;
        case "rotateIn":
          this.rotateIn(element);
          break;
        case "slideInUp":
          this.slideInUp(element);
          break;
        default:
          this.fadeInUp(element);
      }
    }, delay * 1000);
  }

  // სხვადასხვა ანიმაციის ფუნქციები:
  fadeInUp(element) {
    // ქვემოდან შემოსვლის ეფექტი
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  }

  fadeInLeft(element) {
    // მარცხნიდან შემოსვლის ეფექტი
    element.style.opacity = "0";
    element.style.transform = "translateX(-50px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
    });
  }

  fadeInRight(element) {
    // მარჯვნიდან შემოსვლის ეფექტი
    element.style.opacity = "0";
    element.style.transform = "translateX(50px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
    });
  }

  scaleIn(element) {
    // ზომაში გაზრდის ეფექტი
    element.style.opacity = "0";
    element.style.transform = "scale(0.8)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "scale(1)";
    });
  }

  rotateIn(element) {
    // შემობრუნებით შემოსვლის ეფექტი
    element.style.opacity = "0";
    element.style.transform = "rotate(-180deg) scale(0.8)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "rotate(0deg) scale(1)";
    });
  }

  slideInUp(element) {
    // ზემოთ ასვლის ეფექტი
    element.style.opacity = "0";
    element.style.transform = "translateY(100px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  }

  addGlowEffect(element) {
    // ელემენტზე ნათების ეფექტის დამატება
    const color = element.dataset.glowColor || "#00bfff";
    element.style.boxShadow = `0 0 30px ${color}`;
    element.style.transition = "box-shadow 0.3s ease";
  }

  removeGlowEffect(element) {
    // ნათების ეფექტის მოცილება
    element.style.boxShadow = "none";
  }

  // რაკეტის აფრენის ანიმაცია
  launchRocket(rocketElement) {
    if (!rocketElement) return;
    rocketElement.style.transition = "transform 3s ease-out";
    rocketElement.style.transform = "translateY(-100vh) rotate(10deg)";
    // ალი (flame) ეფექტი
    const flame = rocketElement.querySelector(".rocket-flame");
    if (flame) {
      flame.style.animation = "rocket-flame 0.1s ease-in-out infinite";
    }
    // ანიმაციის დასრულების შემდეგ დაბრუნება საწყის მდგომარეობაში
    setTimeout(() => {
      rocketElement.style.transition = "none";
      rocketElement.style.transform = "translateY(0) rotate(0deg)";
      if (flame) {
        flame.style.animation = "none";
      }
    }, 3000);
  }

  // პლანეტის ბრუნვის ანიმაცია
  rotatePlanet(planetElement, duration = 10) {
    if (!planetElement) return;
    planetElement.style.animation = `planet-spin ${duration}s linear infinite`;
  }

  // UFO-ს hover ანიმაცია
  animateUFO(ufoElement) {
    if (!ufoElement) return;
    ufoElement.style.animation = "ufo-hover 4s ease-in-out infinite";
    // შუქების ანიმაცია
    const lights = ufoElement.querySelectorAll(".light");
    lights.forEach((light, index) => {
      light.style.animation = `ufo-lights 2s ease-in-out infinite ${
        index * 0.5
      }s`;
    });
    // სხივის ანიმაცია
    const beam = ufoElement.querySelector(".ufo-beam");
    if (beam) {
      beam.style.animation = "beam-pulse 3s ease-in-out infinite";
    }
  }

  // ასტრონავტის "floating" ანიმაცია
  floatAstronaut(astronautElement) {
    if (!astronautElement) return;
    astronautElement.style.animation =
      "astronaut-float 6s ease-in-out infinite";
  }

  // გალაქტიკის სპირალური ანიმაცია
  spiralGalaxy(galaxyElement, duration = 30) {
    if (!galaxyElement) return;
    galaxyElement.style.animation = `galaxy-spiral ${duration}s linear infinite`;
  }

  // დროის ხაზის (timeline) ელემენტების თანმიმდევრული გამოჩენა
  revealTimeline() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-50px)";
      item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, index * 200);
    });
  }

  // ბარათის გადაბრუნების ანიმაცია
  flipCard(cardElement) {
    if (!cardElement) return;
    cardElement.style.transform = "rotateY(180deg)";
    cardElement.style.transition = "transform 0.6s ease";
  }

  // გალაქტიკის მასშტაბირების ეფექტი
  zoomGalaxy(containerElement, level = 1) {
    if (!containerElement) return;
    const scale = 1 + level * 0.5;
    containerElement.style.transform = `scale(${scale})`;
    containerElement.style.transition = "transform 0.8s ease";
  }

  // ნაწილაკების სისტემის შექმნა (particle effect)
  createParticles(container, count = 50) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.position = "absolute";
      particle.style.width = "2px";
      particle.style.height = "2px";
      particle.style.backgroundColor = "#fff";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      container.appendChild(particle);
      // ნაწილაკის ანიმაცია
      particle.animate(
        [
          { transform: "translateY(0px)", opacity: 1 },
          { transform: "translateY(-100px)", opacity: 0 },
        ],
        {
          duration: 2000 + Math.random() * 1000,
          easing: "ease-out",
          fill: "forwards",
        }
      ).onfinish = () => {
        particle.remove();
      };
    }
  }

  // მეტეორების წვიმის ეფექტი
  createMeteorShower(container) {
    if (!container) return;
    const createMeteor = () => {
      const meteor = document.createElement("div");
      meteor.className = "meteor";
      meteor.style.position = "absolute";
      meteor.style.width = "2px";
      meteor.style.height = "2px";
      meteor.style.backgroundColor = "#fff";
      meteor.style.boxShadow = "0 0 10px #fff";
      meteor.style.borderRadius = "50%";
      meteor.style.pointerEvents = "none";
      const startX = Math.random() * container.offsetWidth;
      const startY = -50;
      meteor.style.left = `${startX}px`;
      meteor.style.top = `${startY}px`;
      container.appendChild(meteor);
      // მეტეორის ანიმაცია
      meteor.animate(
        [
          { transform: "translateX(0px) translateY(0px)", opacity: 0 },
          { transform: "translateX(100px) translateY(100px)", opacity: 1 },
          { transform: "translateX(200px) translateY(200px)", opacity: 0 },
        ],
        {
          duration: 1000 + Math.random() * 500,
          easing: "ease-out",
          fill: "forwards",
        }
      ).onfinish = () => {
        meteor.remove();
      };
    };
    // მეტეორების შექმნა ინტერვალით
    const interval = setInterval(createMeteor, 2000);
    // 30 წამში გაჩერება
    setTimeout(() => {
      clearInterval(interval);
    }, 30000);
  }
}

// გვერდის ჩატვირთვისას ანიმაციების კონტროლერის ინიციალიზაცია
document.addEventListener("DOMContentLoaded", () => {
  window.animationController = new AnimationController();
});

// სხვა სკრიპტებისთვის კლასის გლობალურად ხელმისაწვდომობა
window.AnimationController = AnimationController;
