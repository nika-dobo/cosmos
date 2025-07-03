// Galaxy exploration and visualization
class GalaxyExplorer {
  constructor() {
    // მიმდინარე მასშტაბი (zoom)
    this.currentZoom = 1;
    // მაქსიმალური მასშტაბი
    this.maxZoom = 4;
    // მინიმალური მასშტაბი
    this.minZoom = 0.5;
    // მასშტაბის ცვლილების ნაბიჯი
    this.zoomStep = 0.5;
    // ვარსკვლავური კვალის ელემენტების მასივი
    this.starTrails = [];
    // გალაქტიკების მონაცემები
    this.galaxyData = this.initializeGalaxyData();

    this.init();
  }

  init() {
    // მასშტაბის კონტროლების დაყენება
    this.setupZoomControls();
    // ვარსკვლავური კვალის შექმნა
    this.createStarTrails();
    // გალაქტიკის ანიმაციების ინიციალიზაცია
    this.initializeGalaxyAnimations();
  }

  initializeGalaxyData() {
    // გალაქტიკების შესახებ მონაცემების დაბრუნება
    return {
      "milky-way": {
        name: "Milky Way",
        type: "Barred Spiral Galaxy",
        details: `
                    <div class="galaxy-stats">
                        <div class="stat-item">
                            <h4>Diameter</h4>
                            <p>100,000 light-years</p>
                        </div>
                        <div class="stat-item">
                            <h4>Stars</h4>
                            <p>100-400 billion</p>
                        </div>
                        <div class="stat-item">
                            <h4>Age</h4>
                            <p>13.6 billion years</p>
                        </div>
                        <div class="stat-item">
                            <h4>Distance from Earth</h4>
                            <p>We're inside it!</p>
                        </div>
                    </div>
                    <p>Our home galaxy, the Milky Way, is a barred spiral galaxy containing our solar system. It's part of the Local Group of galaxies and will eventually collide with the Andromeda Galaxy.</p>
                `,
      },
      andromeda: {
        name: "Andromeda Galaxy",
        type: "Spiral Galaxy",
        details: `
                    <div class="galaxy-stats">
                        <div class="stat-item">
                            <h4>Diameter</h4>
                            <p>220,000 light-years</p>
                        </div>
                        <div class="stat-item">
                            <h4>Stars</h4>
                            <p>1 trillion</p>
                        </div>
                        <div class="stat-item">
                            <h4>Age</h4>
                            <p>10 billion years</p>
                        </div>
                        <div class="stat-item">
                            <h4>Distance from Earth</h4>
                            <p>2.5 million light-years</p>
                        </div>
                    </div>
                    <p>The Andromeda Galaxy is the nearest major galaxy to the Milky Way and is approaching us at about 250,000 mph. It will collide with our galaxy in about 4.5 billion years.</p>
                `,
      },
      whirlpool: {
        name: "Whirlpool Galaxy",
        type: "Grand Design Spiral Galaxy",
        details: `
                    <div class="galaxy-stats">
                        <div class="stat-item">
                            <h4>Diameter</h4>
                            <p>76,000 light-years</p>
                        </div>
                        <div class="stat-item">
                            <h4>Stars</h4>
                            <p>100 billion</p>
                        </div>
                        <div class="stat-item">
                            <h4>Age</h4>
                            <p>400 million years</p>
                        </div>
                        <div class="stat-item">
                            <h4>Distance from Earth</h4>
                            <p>23 million light-years</p>
                        </div>
                    </div>
                    <p>The Whirlpool Galaxy is a classic spiral galaxy with prominent spiral arms. It's interacting with a smaller companion galaxy, which has helped define its distinctive spiral structure.</p>
                `,
      },
    };
  }

  setupZoomControls() {
    // მასშტაბის კონტროლების დაყენება (მაგალითად მაუსის ბორბალი)
    const zoomContainer = document.getElementById("zoom-container");
    if (!zoomContainer) return;

    // მაუსის ბორბალით მასშტაბირება
    zoomContainer.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    });
  }

  createStarTrails() {
    // ვარსკვლავური კვალის ელემენტების შექმნა
    const trailContainer = document.getElementById("star-trails");
    if (!trailContainer) return;

    for (let i = 0; i < 10; i++) {
      const trail = document.createElement("div");
      trail.className = "star-trail";
      trail.style.position = "absolute";
      trail.style.width = "2px";
      trail.style.height = "2px";
      trail.style.backgroundColor = "#fff";
      trail.style.borderRadius = "50%";
      trail.style.opacity = "0";

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      trail.style.left = `${x}%`;
      trail.style.top = `${y}%`;

      trailContainer.appendChild(trail);
      this.starTrails.push(trail);

      // ვარსკვლავური კვალის ანიმაცია
      this.animateStarTrail(trail, i);
    }
  }

  animateStarTrail(trail, index) {
    // ვარსკვლავური კვალის ანიმაციის ფუნქცია
    const duration = 3000 + index * 500;
    const delay = index * 200;

    setTimeout(() => {
      trail.style.transition = `opacity 0.5s ease, transform ${duration}ms linear`;
      trail.style.opacity = "1";
      trail.style.transform = "translateX(100px)";

      setTimeout(() => {
        trail.style.opacity = "0";
        trail.style.transform = "translateX(200px)";

        // თავიდან იწყებს ანიმაციას
        setTimeout(() => {
          trail.style.transition = "none";
          trail.style.transform = "translateX(0)";
          trail.style.opacity = "0";
          this.animateStarTrail(trail, index);
        }, 500);
      }, duration);
    }, delay);
  }

  initializeGalaxyAnimations() {
    // გალაქტიკის ბარათების ანიმაცია
    const galaxyCards = document.querySelectorAll(".galaxy-card");
    galaxyCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add("fade-in-up");
    });

    // შოუ-ქეისის ელემენტების ანიმაცია
    const showcaseItems = document.querySelectorAll(".showcase-item");
    showcaseItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.3}s`;
      item.classList.add("fade-in-up");
    });
  }

  zoomIn() {
    // მასშტაბის გაზრდა
    if (this.currentZoom < this.maxZoom) {
      this.currentZoom += this.zoomStep;
      this.updateZoom();
    }
  }

  zoomOut() {
    // მასშტაბის შემცირება
    if (this.currentZoom > this.minZoom) {
      this.currentZoom -= this.zoomStep;
      this.updateZoom();
    }
  }

  resetZoom() {
    // მასშტაბის დაბრუნება საწყის მნიშვნელობაზე
    this.currentZoom = 1;
    this.updateZoom();
  }

  updateZoom() {
    // მასშტაბის განახლება ყველა გალაქტიკის ფენაზე
    const galaxyLayers = document.querySelectorAll(".galaxy-layer");
    galaxyLayers.forEach((layer, index) => {
      const layerZoom = this.currentZoom + index * 0.1;
      layer.style.transform = `scale(${layerZoom})`;
    });

    // ვარსკვლავური კვალის ინტენსივობის განახლება მასშტაბის მიხედვით
    this.updateStarTrailsForZoom();
  }

  updateStarTrailsForZoom() {
    // ვარსკვლავური კვალის ინტენსივობის და რაოდენობის განახლება მასშტაბის მიხედვით
    const trailContainer = document.getElementById("star-trails");
    if (!trailContainer) return;

    const intensity = this.currentZoom / this.maxZoom;
    trailContainer.style.opacity = intensity;

    // თუ მასშტაბი დიდია, ვამატებთ მეტ კვალს
    if (this.currentZoom > 2 && this.starTrails.length < 20) {
      this.createAdditionalStarTrails();
    }
  }

  createAdditionalStarTrails() {
    // დამატებითი ვარსკვლავური კვალის შექმნა მაღალი მასშტაბისთვის
    const trailContainer = document.getElementById("star-trails");
    if (!trailContainer) return;

    for (let i = 0; i < 5; i++) {
      const trail = document.createElement("div");
      trail.className = "star-trail";
      trail.style.position = "absolute";
      trail.style.width = "1px";
      trail.style.height = "1px";
      trail.style.backgroundColor = "#00bfff";
      trail.style.borderRadius = "50%";
      trail.style.opacity = "0";

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      trail.style.left = `${x}%`;
      trail.style.top = `${y}%`;

      trailContainer.appendChild(trail);
      this.starTrails.push(trail);

      this.animateStarTrail(trail, this.starTrails.length - 1);
    }
  }

  showGalaxyDetails(galaxyId) {
    // გალაქტიკის დეტალების მოდალის ჩვენება
    const modal = document.getElementById("galaxy-modal");
    const galaxyName = document.getElementById("galaxy-name");
    const galaxyDetails = document.getElementById("galaxy-details");

    if (modal && galaxyName && galaxyDetails && this.galaxyData[galaxyId]) {
      const galaxy = this.galaxyData[galaxyId];
      galaxyName.textContent = galaxy.name;
      galaxyDetails.innerHTML = galaxy.details;

      modal.style.display = "block";

      // მოდალის შემოსვლის ანიმაცია
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.style.transform = "scale(0.8)";
        modalContent.style.opacity = "0";
        modalContent.style.transition =
          "transform 0.3s ease, opacity 0.3s ease";

        setTimeout(() => {
          modalContent.style.transform = "scale(1)";
          modalContent.style.opacity = "1";
        }, 10);
      }
    }
  }

  closeGalaxyModal() {
    // გალაქტიკის დეტალების მოდალის დახურვა
    const modal = document.getElementById("galaxy-modal");
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
}

// გვერდის ჩატვირთვისას გალაქტიკის გვერდის ინიციალიზაცია
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname.includes("galaxies") ||
    window.spaceExplorer?.currentPage === "galaxies"
  ) {
    initializeGalaxyPage();
  }
});

let galaxyExplorer;

function initializeGalaxyPage() {
  // გალაქტიკის გვერდის ინიციალიზაცია
  galaxyExplorer = new GalaxyExplorer();
}

// კონტროლის ფუნქციები (გლობალურად ხელმისაწვდომი)
function zoomIn() {
  if (galaxyExplorer) {
    galaxyExplorer.zoomIn();
  }
}

function zoomOut() {
  if (galaxyExplorer) {
    galaxyExplorer.zoomOut();
  }
}

function resetZoom() {
  if (galaxyExplorer) {
    galaxyExplorer.resetZoom();
  }
}

function showGalaxyDetails(galaxyId) {
  if (galaxyExplorer) {
    galaxyExplorer.showGalaxyDetails(galaxyId);
  }
}

function closeGalaxyModal() {
  if (galaxyExplorer) {
    galaxyExplorer.closeGalaxyModal();
  }
}

// გალაქტიკის ფაქტები და ინფორმაცია
const galaxyFacts = [
  "There are over 100 billion galaxies in the observable universe",
  "Galaxies can contain anywhere from millions to trillions of stars",
  "The Milky Way and Andromeda are on a collision course",
  "Most galaxies have supermassive black holes at their centers",
  "Galaxy collisions can trigger massive star formation",
  "The most distant galaxies are over 13 billion light-years away",
  "Elliptical galaxies are the most common type in the universe",
  "Dark matter makes up about 85% of a galaxy's mass",
];

function getRandomGalaxyFact() {
  // აბრუნებს შემთხვევით ფაქტს გალაქტიკების შესახებ
  return galaxyFacts[Math.floor(Math.random() * galaxyFacts.length)];
}

// მოდალის დახურვა ეკრანის ცარიელ ადგილას დაკლიკებისას
window.addEventListener("click", function (event) {
  const modal = document.getElementById("galaxy-modal");
  if (event.target === modal) {
    closeGalaxyModal();
  }
});

// გლობალური ფუნქციების ექსპორტი
window.galaxyExplorer = {
  zoomIn,
  zoomOut,
  resetZoom,
  showGalaxyDetails,
  closeGalaxyModal,
  getRandomGalaxyFact,
};
