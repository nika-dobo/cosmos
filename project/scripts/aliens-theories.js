// Aliens and theories page functionality
// ამ კლასში იმართება უცხოპლანეტელების და თეორიების გვერდის ყველა ფუნქციონალი
class AlienTheoriesExplorer {
  constructor() {
    // ყველა UFO-ს მონაცემები
    this.ufos = [];
    // თეორიების ბარათების მასივი
    this.theories = [];
    // ამჟამად არჩეული თეორია
    this.currentTheory = null;

    // ყველა ფუნქციის ინიციალიზაცია
    this.init();
  }

  init() {
    // UFO-ების ანიმაციების ინიციალიზაცია
    this.initializeUFOAnimations();
    // თეორიის ბარათების დაყენება
    this.setupTheoryCards();
    // საცხოვრებელი ზონის ვიზუალიზაციის ინიციალიზაცია
    this.initializeHabitableZone();
    // ეგზოპლანეტების ანიმაციების დაყენება
    this.setupExoplanetAnimations();
  }

  initializeUFOAnimations() {
    // ვპოულობთ ყველა UFO ელემენტს
    const ufos = document.querySelectorAll(".ufo");

    ufos.forEach((ufo, index) => {
      // თითოეული UFO-სთვის ვინახავთ საწყის პოზიციას და ანიმაციის პარამეტრებს
      this.ufos.push({
        element: ufo,
        baseX: parseFloat(ufo.style.left) || 0,
        baseY: parseFloat(ufo.style.top) || 0,
        phase: index * Math.PI,
        speed: 0.02 + index * 0.01,
      });

      // ვიწყებთ UFO-ს ანიმაციას
      this.animateUFO(ufo, index);
    });

    // ვიწყებთ ყველა UFO-ს უწყვეტ მოძრაობას
    this.startUFOMovement();
  }

  animateUFO(ufo, index) {
    // UFO-ს ვაძლევთ hover ანიმაციას
    ufo.style.animation = `ufo-hover 4s ease-in-out infinite ${index * 2}s`;

    // UFO-ს შუქების ანიმაცია
    const lights = ufo.querySelectorAll(".light");
    lights.forEach((light, lightIndex) => {
      light.style.animation = `ufo-lights 2s ease-in-out infinite ${
        lightIndex * 0.5
      }s`;
    });

    // UFO-ს სხივის ანიმაცია
    const beam = ufo.querySelector(".ufo-beam");
    if (beam) {
      beam.style.animation = "beam-pulse 3s ease-in-out infinite";
    }
  }

  startUFOMovement() {
    // ყველა UFO-ს უწყვეტი მოძრაობის ფუნქცია
    const moveUFOs = () => {
      this.ufos.forEach((ufoData, index) => {
        const time = Date.now() * 0.001;
        // პოზიციის გამოთვლა ტალღისებურად
        const x =
          ufoData.baseX + Math.sin(time * ufoData.speed + ufoData.phase) * 50;
        const y =
          ufoData.baseY +
          Math.cos(time * ufoData.speed * 0.7 + ufoData.phase) * 20;

        ufoData.element.style.left = `${x}%`;
        ufoData.element.style.top = `${y}%`;
      });

      requestAnimationFrame(moveUFOs);
    };

    moveUFOs();
  }

  setupTheoryCards() {
    // ვპოულობთ ყველა თეორიის ბარათს
    const theoryCards = document.querySelectorAll(".theory-card");

    theoryCards.forEach((card, index) => {
      // ბარათს ვაძლევთ შემოსვლის ანიმაციას
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add("fade-in-up");

      // ბარათის გადაბრუნების ინტერაქცია
      card.addEventListener("click", () => {
        this.revealTheory(card);
      });
    });
  }

  revealTheory(card) {
    // თუ უკვე გადაბრუნებულია, ვაბრუნებთ უკან
    if (card.classList.contains("flipped")) {
      card.classList.remove("flipped");
    } else {
      // სხვა გადაბრუნებული ბარათების დახურვა
      document.querySelectorAll(".theory-card.flipped").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("flipped");
        }
      });

      card.classList.add("flipped");

      // ვუკრავთ flip-ის ხმოვან ეფექტს
      this.playFlipSound();
    }
  }

  playFlipSound() {
    // ბარათის გადაბრუნების ხმოვანი ეფექტი
    if (!window.audioMuted) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.1
      );

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }

  initializeHabitableZone() {
    // საცხოვრებელი ზონის ვიზუალის ინიციალიზაცია
    const habitableZone = document.querySelector(".habitable-zone-visual");
    if (!habitableZone) return;

    // ზონებზე hover ეფექტები
    const zones = habitableZone.querySelectorAll(".zone");
    zones.forEach((zone) => {
      zone.addEventListener("mouseenter", () => {
        zone.style.opacity = "0.8";
        zone.style.transform = "scale(1.05)";
        zone.style.transition = "all 0.3s ease";
      });

      zone.addEventListener("mouseleave", () => {
        zone.style.opacity = "1";
        zone.style.transform = "scale(1)";
      });
    });

    // დედამიწის მსგავსი პლანეტის დაკლიკებისას ვაჩვენებთ ინფორმაციას
    const earthLike = habitableZone.querySelector(".earth-like");
    if (earthLike) {
      earthLike.addEventListener("click", () => {
        this.showHabitabilityInfo();
      });
    }
  }

  showHabitabilityInfo() {
    // საცხოვრებელი ზონის ფაქტორების ჩვენება მოდალში
    const info = `
            <div class="habitability-info">
                <h3>Habitable Zone Factors</h3>
                <ul>
                    <li>Distance from star (not too hot, not too cold)</li>
                    <li>Presence of liquid water</li>
                    <li>Protective atmosphere</li>
                    <li>Magnetic field to deflect radiation</li>
                    <li>Stable orbit and rotation</li>
                    <li>Appropriate planet size and mass</li>
                </ul>
                <p>These factors combine to create conditions suitable for life as we know it.</p>
            </div>
        `;

    this.showInfoModal("Habitable Zone", info);
  }

  setupExoplanetAnimations() {
    // ეგზოპლანეტების ბარათების ანიმაცია და hover ეფექტები
    const exoplanetCards = document.querySelectorAll(".exoplanet-card");

    exoplanetCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.3}s`;
      card.classList.add("fade-in-up");

      // hover-ზე პლანეტის ვიზუალის ანიმაცია
      card.addEventListener("mouseenter", () => {
        const planetVisual = card.querySelector(".planet-visual");
        if (planetVisual) {
          planetVisual.style.animationDuration = "5s";
          planetVisual.style.transform = "scale(1.1)";
        }
      });

      card.addEventListener("mouseleave", () => {
        const planetVisual = card.querySelector(".planet-visual");
        if (planetVisual) {
          planetVisual.style.animationDuration = "20s";
          planetVisual.style.transform = "scale(1)";
        }
      });
    });
  }

  showInfoModal(title, content) {
    // ინფორმაციული მოდალის ჩვენება
    // თუ არ არსებობს, ვქმნით
    let modal = document.getElementById("info-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "info-modal";
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="closeInfoModal()">&times;</span>
                    <h2 id="info-title"></h2>
                    <div id="info-details"></div>
                </div>
            `;
      document.body.appendChild(modal);
    }

    const titleElement = document.getElementById("info-title");
    const detailsElement = document.getElementById("info-details");

    if (titleElement && detailsElement) {
      titleElement.textContent = title;
      detailsElement.innerHTML = content;
      modal.style.display = "block";
    }
  }

  // SETI სიგნალის სიმულაცია
  simulateSETISignal() {
    const container = document.querySelector(".theories-section");
    if (!container) return;

    const signal = document.createElement("div");
    signal.className = "seti-signal";
    signal.style.position = "absolute";
    signal.style.top = "50%";
    signal.style.left = "0";
    signal.style.width = "100%";
    signal.style.height = "2px";
    signal.style.background =
      "linear-gradient(90deg, transparent, #00ff7f, transparent)";
    signal.style.opacity = "0";
    signal.style.pointerEvents = "none";

    container.appendChild(signal);

    // სიგნალის ანიმაცია
    signal.animate(
      [
        { opacity: 0, transform: "translateX(-100%)" },
        { opacity: 1, transform: "translateX(0%)" },
        { opacity: 0, transform: "translateX(100%)" },
      ],
      {
        duration: 3000,
        easing: "ease-in-out",
      }
    ).onfinish = () => {
      signal.remove();
    };

    // სიგნალის ხმოვანი ეფექტი
    this.playSignalSound();
  }

  playSignalSound() {
    // SETI სიგნალის ხმოვანი ეფექტი
    if (!window.audioMuted) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(1420, audioContext.currentTime); // Hydrogen line frequency
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        audioContext.currentTime + 0.1
      );
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2);
    }
  }

  // დრეიკის განტოლების კალკულატორი
  calculateDrakeEquation(params) {
    // პარამეტრების მიღება და შედეგის გამოთვლა
    const {
      starFormationRate = 1,
      fractionWithPlanets = 0.5,
      planetsPerStar = 2,
      fractionWithLife = 0.1,
      fractionWithIntelligence = 0.01,
      fractionWithCommunication = 0.01,
      civilizationLifetime = 10000,
    } = params;

    const result =
      starFormationRate *
      fractionWithPlanets *
      planetsPerStar *
      fractionWithLife *
      fractionWithIntelligence *
      fractionWithCommunication *
      civilizationLifetime;

    return Math.round(result);
  }

  showDrakeCalculator() {
    // დრეიკის განტოლების კალკულატორის მოდალის ჩვენება
    const calculatorHTML = `
            <div class="drake-calculator">
                <h3>Drake Equation Calculator</h3>
                <div class="calculator-inputs">
                    <label>Star formation rate: <input type="number" id="star-rate" value="1" step="0.1"></label>
                    <label>Fraction with planets: <input type="number" id="planet-fraction" value="0.5" step="0.1" max="1"></label>
                    <label>Planets per star: <input type="number" id="planets-per-star" value="2" step="0.1"></label>
                    <label>Fraction with life: <input type="number" id="life-fraction" value="0.1" step="0.01" max="1"></label>
                    <label>Fraction with intelligence: <input type="number" id="intelligence-fraction" value="0.01" step="0.001" max="1"></label>
                    <label>Fraction with communication: <input type="number" id="communication-fraction" value="0.01" step="0.001" max="1"></label>
                    <label>Civilization lifetime (years): <input type="number" id="civilization-lifetime" value="10000" step="1000"></label>
                </div>
                <button onclick="calculateDrake()" class="btn btn-primary">Calculate</button>
                <div id="drake-result" class="result"></div>
            </div>
        `;

    this.showInfoModal("Drake Equation", calculatorHTML);
  }
}

// გვერდის ინიციალიზაცია მხოლოდ მაშინ, თუ ეს არის aliens-theories გვერდი
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.spaceExplorer &&
    window.spaceExplorer.currentPage === "aliens-theories"
  ) {
    initializeAliensTheoriesPage();
  }
});

let alienTheoriesExplorer;

// გვერდის ინიციალიზაციის ფუნქცია
function initializeAliensTheoriesPage() {
  alienTheoriesExplorer = new AlienTheoriesExplorer();
}

// გლობალური ფუნქციები
function revealTheory(card) {
  if (alienTheoriesExplorer) {
    alienTheoriesExplorer.revealTheory(card);
  }
}

function closeInfoModal() {
  // ინფორმაციული მოდალის დახურვა
  const modal = document.getElementById("info-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

function calculateDrake() {
  // დრეიკის განტოლების კალკულაციის ფუნქცია
  if (!alienTheoriesExplorer) return;

  const params = {
    starFormationRate: parseFloat(document.getElementById("star-rate").value),
    fractionWithPlanets: parseFloat(
      document.getElementById("planet-fraction").value
    ),
    planetsPerStar: parseFloat(
      document.getElementById("planets-per-star").value
    ),
    fractionWithLife: parseFloat(
      document.getElementById("life-fraction").value
    ),
    fractionWithIntelligence: parseFloat(
      document.getElementById("intelligence-fraction").value
    ),
    fractionWithCommunication: parseFloat(
      document.getElementById("communication-fraction").value
    ),
    civilizationLifetime: parseFloat(
      document.getElementById("civilization-lifetime").value
    ),
  };

  const result = alienTheoriesExplorer.calculateDrakeEquation(params);
  const resultElement = document.getElementById("drake-result");

  if (resultElement) {
    resultElement.innerHTML = `
            <h4>Estimated number of communicating civilizations: ${result}</h4>
            <p>This is a rough estimate based on the parameters you provided. The actual number could vary significantly.</p>
        `;
  }
}

// უცხოპლანეტელების თეორიების ფაქტები
const alienTheoriesFacts = [
  "The Drake Equation was formulated by Frank Drake in 1961",
  "The Fermi Paradox asks 'Where is everybody?' given the high probability of alien life",
  "SETI has been searching for extraterrestrial signals since 1960",
  "The 'Wow! Signal' detected in 1977 remains unexplained",
  "Over 5,000 exoplanets have been discovered to date",
  "The habitable zone is also called the 'Goldilocks zone'",
  "Some scientists believe we may be living in a 'zoo' maintained by aliens",
  "The Great Filter hypothesis suggests most life doesn't survive to become spacefaring",
];

function getRandomAlienFact() {
  // აბრუნებს შემთხვევით ფაქტს უცხოპლანეტელების თეორიებიდან
  return alienTheoriesFacts[
    Math.floor(Math.random() * alienTheoriesFacts.length)
  ];
}

// მოდალის დახურვა ეკრანის ცარიელ ადგილას დაკლიკებისას
window.addEventListener("click", function (event) {
  const modal = document.getElementById("info-modal");
  if (event.target === modal) {
    closeInfoModal();
  }
});

// გლობალური ფუნქციების ექსპორტი
window.alienTheoriesExplorer = {
  revealTheory,
  closeInfoModal,
  calculateDrake,
  getRandomAlienFact,
};
