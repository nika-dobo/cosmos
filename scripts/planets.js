// პლანეტების მონაცემები და ფუნქციონალი
const planetData = {
  sun: {
    name: "The Sun",
    type: "Star",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Temperature</h4>
                    <p>5,778 K (surface)</p>
                </div>
                <div class="info-item">
                    <h4>Mass</h4>
                    <p>1.989 × 10³⁰ kg</p>
                </div>
                <div class="info-item">
                    <h4>Radius</h4>
                    <p>696,340 km</p>
                </div>
                <div class="info-item">
                    <h4>Age</h4>
                    <p>4.6 billion years</p>
                </div>
            </div>
            <p>The Sun is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. It is the most important source of energy for life on Earth.</p>
        `,
  },
  mercury: {
    name: "Mercury",
    type: "Terrestrial Planet",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>57.9 million km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>4,879 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>59 Earth days</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>88 Earth days</p>
                </div>
            </div>
            <p>Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations and no atmosphere to retain heat.</p>
        `,
  },
  venus: {
    name: "Venus",
    type: "Terrestrial Planet",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>108.2 million km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>12,104 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>243 Earth days</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>225 Earth days</p>
                </div>
            </div>
            <p>Venus is the hottest planet in our solar system with surface temperatures reaching 900°F (475°C). It has a thick, toxic atmosphere composed mainly of carbon dioxide.</p>
        `,
  },
  earth: {
    name: "Earth",
    type: "Terrestrial Planet",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>149.6 million km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>12,756 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>24 hours</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>365.25 days</p>
                </div>
            </div>
            <p>Earth is the only known planet with life. It has liquid water, a protective atmosphere, and a suitable temperature range for life to thrive.</p>
        `,
  },
  mars: {
    name: "Mars",
    type: "Terrestrial Planet",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>227.9 million km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>6,792 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>24 hours 37 minutes</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>687 Earth days</p>
                </div>
            </div>
            <p>Mars is known as the Red Planet due to iron oxide on its surface. It has polar ice caps and evidence suggests it once had liquid water.</p>
        `,
  },
  jupiter: {
    name: "Jupiter",
    type: "Gas Giant",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>778.5 million km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>142,984 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>9 hours 56 minutes</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>12 Earth years</p>
                </div>
            </div>
            <p>Jupiter is the largest planet in our solar system. It's a gas giant with a Great Red Spot storm that has been raging for centuries and has over 80 moons.</p>
        `,
  },
  saturn: {
    name: "Saturn",
    type: "Gas Giant",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>1.43 billion km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>120,536 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>10 hours 42 minutes</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>29 Earth years</p>
                </div>
            </div>
            <p>Saturn is famous for its prominent ring system. It's less dense than water and has over 80 moons, including Titan, which has a thick atmosphere.</p>
        `,
  },
  uranus: {
    name: "Uranus",
    type: "Ice Giant",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>2.87 billion km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>51,118 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>17 hours 14 minutes</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>84 Earth years</p>
                </div>
            </div>
            <p>Uranus is tilted on its side and rotates like a rolling ball. It has a faint ring system and is composed mainly of water, methane, and ammonia ices.</p>
        `,
  },
  neptune: {
    name: "Neptune",
    type: "Ice Giant",
    details: `
            <div class="planet-info">
                <div class="info-item">
                    <h4>Distance from Sun</h4>
                    <p>4.5 billion km</p>
                </div>
                <div class="info-item">
                    <h4>Diameter</h4>
                    <p>49,528 km</p>
                </div>
                <div class="info-item">
                    <h4>Day Length</h4>
                    <p>16 hours 6 minutes</p>
                </div>
                <div class="info-item">
                    <h4>Year Length</h4>
                    <p>165 Earth years</p>
                </div>
            </div>
            <p>Neptune is the windiest planet with speeds reaching 1,200 mph. It's deep blue color comes from methane in its atmosphere, and it has 14 known moons.</p>
        `,
  },
};

// გლობალური ცვლადები
let animationsPaused = false; // ანიმაციები გაჩერებულია თუ არა
let currentZoom = 1; // მიმდინარე მასშტაბი

// გვერდის ჩატვირთვისას პლანეტების გვერდის ინიციალიზაცია
document.addEventListener("DOMContentLoaded", function () {
  initializePlanetsPage();
});

function initializePlanetsPage() {
  // პლანეტებზე hover ეფექტების დამატება
  document.querySelectorAll(".planet").forEach((planet) => {
    planet.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(-50%) scale(1.3)";
      this.style.boxShadow = "0 0 30px currentColor";
      this.style.zIndex = "100";
    });
    planet.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(-50%) scale(1)";
      this.style.boxShadow = "none";
      this.style.zIndex = "auto";
    });
  });

  // მზეზე hover ეფექტი
  const sun = document.querySelector(".sun");
  if (sun) {
    sun.addEventListener("mouseenter", function () {
      this.style.transform = "translate(-50%, -50%) scale(1.1)";
      this.style.boxShadow = "0 0 50px #ffcc00";
    });
    sun.addEventListener("mouseleave", function () {
      this.style.transform = "translate(-50%, -50%) scale(1)";
      this.style.boxShadow = "0 0 40px #ffcc00";
    });
  }

  // ორბიტების ანიმაციების ინიციალიზაცია
  startOrbitalAnimations();
}

function startOrbitalAnimations() {
  // ყველა ორბიტის ანიმაციის გაშვება
  const orbits = document.querySelectorAll(".orbit");
  orbits.forEach((orbit) => {
    orbit.style.animationPlayState = "running";
  });
}

function stopOrbitalAnimations() {
  // ყველა ორბიტის ანიმაციის გაჩერება
  const orbits = document.querySelectorAll(".orbit");
  orbits.forEach((orbit) => {
    orbit.style.animationPlayState = "paused";
  });
}

function showPlanetInfo(planetId) {
  // პლანეტის დეტალების მოდალის ჩვენება
  const modal = document.getElementById("planet-modal");
  const planetName = document.getElementById("planet-name");
  const planetDetails = document.getElementById("planet-details");

  if (modal && planetName && planetDetails && planetData[planetId]) {
    const planet = planetData[planetId];
    planetName.textContent = planet.name;
    planetDetails.innerHTML = planet.details;

    modal.style.display = "block";

    // მოდალის შემოსვლის ანიმაცია
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.style.transform = "scale(0.8)";
      modalContent.style.opacity = "0";
      modalContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";

      setTimeout(() => {
        modalContent.style.transform = "scale(1)";
        modalContent.style.opacity = "1";
      }, 10);
    }
  }
}

function closePlanetModal() {
  // მოდალის დახურვა
  const modal = document.getElementById("planet-modal");
  if (modal) {
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.style.transform = "scale(0.8)";
      modalContent.style.opacity = "0";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    } else {
      modal.style.display = "none";
    }
  }
}

function toggleAnimation() {
  // ორბიტების ანიმაციის გაჩერება/გაშვება
  animationsPaused = !animationsPaused;
  const statusElement = document.getElementById("animation-status");

  if (animationsPaused) {
    stopOrbitalAnimations();
    if (statusElement) statusElement.textContent = "Resume";
  } else {
    startOrbitalAnimations();
    if (statusElement) statusElement.textContent = "Pause";
  }
}

function resetView() {
  // მზის სისტემის მასშტაბის და ანიმაციების დაბრუნება საწყის მდგომარეობაზე
  const solarSystem = document.querySelector(".solar-system-container");
  if (solarSystem) {
    solarSystem.style.transform = "scale(1)";
    solarSystem.style.transition = "transform 0.5s ease";
  }
  currentZoom = 1;
  if (animationsPaused) {
    toggleAnimation();
  }
}

// მასშტაბის ფუნქციონალი
function zoomIn() {
  // მასშტაბის გაზრდა
  const solarSystem = document.querySelector(".solar-system-container");
  if (solarSystem && currentZoom < 3) {
    currentZoom += 0.5;
    solarSystem.style.transform = `scale(${currentZoom})`;
    solarSystem.style.transition = "transform 0.5s ease";
  }
}

function zoomOut() {
  // მასშტაბის შემცირება
  const solarSystem = document.querySelector(".solar-system-container");
  if (solarSystem && currentZoom > 0.5) {
    currentZoom -= 0.5;
    solarSystem.style.transform = `scale(${currentZoom})`;
    solarSystem.style.transition = "transform 0.5s ease";
  }
}

// პლანეტების შედარების ფუნქცია
function comparePlanets(planet1, planet2) {
  // აბრუნებს ზომის, მანძილის და ტემპერატურის შედარებას
  const comparison = {
    size: compareSizes(planet1, planet2),
    distance: compareDistances(planet1, planet2),
    temperature: compareTemperatures(planet1, planet2),
  };
  return comparison;
}

function compareSizes(planet1, planet2) {
  // პლანეტების დიამეტრის შედარება
  const sizes = {
    mercury: 4879,
    venus: 12104,
    earth: 12756,
    mars: 6792,
    jupiter: 142984,
    saturn: 120536,
    uranus: 51118,
    neptune: 49528,
  };
  const size1 = sizes[planet1];
  const size2 = sizes[planet2];
  if (size1 > size2) {
    return `${planet1} is ${(size1 / size2).toFixed(
      2
    )} times larger than ${planet2}`;
  } else {
    return `${planet2} is ${(size2 / size1).toFixed(
      2
    )} times larger than ${planet1}`;
  }
}

// საგანმანათლებლო ფაქტები პლანეტებზე
const planetFacts = {
  mercury: [
    "Mercury has no atmosphere to retain heat",
    "A day on Mercury is longer than its year",
    "Mercury has water ice in its polar craters",
  ],
  venus: [
    "Venus rotates backwards compared to most planets",
    "Venus is the hottest planet in our solar system",
    "The surface pressure on Venus is 90 times that of Earth",
  ],
  earth: [
    "Earth is the only known planet with life",
    "71% of Earth's surface is covered by water",
    "Earth's atmosphere is 21% oxygen",
  ],
  mars: [
    "Mars has the largest volcano in the solar system",
    "Mars has seasons similar to Earth",
    "Mars has two small moons: Phobos and Deimos",
  ],
  jupiter: [
    "Jupiter has over 80 moons",
    "Jupiter's Great Red Spot is a storm larger than Earth",
    "Jupiter acts as a shield, protecting inner planets from asteroids",
  ],
  saturn: [
    "Saturn could float on water if there was an ocean big enough",
    "Saturn's rings are made of ice and rock particles",
    "Saturn has 146 confirmed moons",
  ],
  uranus: [
    "Uranus rotates on its side",
    "Uranus has faint rings",
    "Uranus is the coldest planet in our solar system",
  ],
  neptune: [
    "Neptune has the strongest winds in the solar system",
    "Neptune takes 165 Earth years to orbit the Sun",
    "Neptune was the first planet discovered through mathematics",
  ],
};

function getRandomFact(planetId) {
  // აბრუნებს შემთხვევით ფაქტს არჩეული პლანეტისთვის
  const facts = planetFacts[planetId];
  if (facts && facts.length > 0) {
    return facts[Math.floor(Math.random() * facts.length)];
  }
  return "No facts available for this celestial body.";
}

// მოდალის დახურვა ეკრანის ცარიელ ადგილას დაკლიკებისას
window.addEventListener("click", function (event) {
  const modal = document.getElementById("planet-modal");
  if (event.target === modal) {
    closePlanetModal();
  }
});

// გლობალური ფუნქციების ექსპორტი სხვა სკრიპტებისთვის
window.planetExplorer = {
  showPlanetInfo,
  closePlanetModal,
  toggleAnimation,
  resetView,
  zoomIn,
  zoomOut,
  getRandomFact,
};
