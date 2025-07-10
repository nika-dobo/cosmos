// ვარსკვლავური ფონური ანიმაცია
class StarField {
  constructor() {
    // Canvas და კონტექსტი
    this.canvas = null;
    this.ctx = null;
    // ვარსკვლავების მასივი
    this.stars = [];
    // ვარსკვლავების რაოდენობა
    this.numStars = 200;
    // ანიმაციის id
    this.animationId = null;

    this.init();
  }

  init() {
    // Canvas-ის შექმნა, ვარსკვლავების გენერაცია და ანიმაციის დაწყება
    this.createCanvas();
    this.createStars();
    this.animate();
    this.handleResize();
  }

  createCanvas() {
    // ვარსკვლავური ფონისთვის canvas-ის შექმნა და DOM-ში დამატება
    const starfieldDiv = document.getElementById("starfield");
    if (!starfieldDiv) return;

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "-1";

    this.ctx = this.canvas.getContext("2d");
    this.resize();

    starfieldDiv.appendChild(this.canvas);
  }

  createStars() {
    // ვარსკვლავების მასივის გენერაცია
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  resize() {
    // Canvas-ის ზომის განახლება ფანჯრის ზომის მიხედვით
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleResize() {
    // ფანჯრის ზომის ცვლილებისას ვარსკვლავების განახლება
    window.addEventListener("resize", () => {
      this.resize();
      this.createStars();
    });
  }

  updateStars() {
    // ვარსკვლავების პოზიციის და ნათების განახლება
    const time = Date.now() * 0.001;

    this.stars.forEach((star) => {
      // პოზიციის განახლება
      star.x += star.vx;
      star.y += star.vy;

      // ეკრანის გარშემო გადატანა (wrap around)
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;

      // ნათების (twinkle) ეფექტი
      star.opacity =
        0.3 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5;
    });
  }

  drawStars() {
    // ვარსკვლავების დახატვა და ნათების ეფექტი
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stars.forEach((star) => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.fill();

      // ნათების ეფექტი უფრო კაშკაშა ვარსკვლავებისთვის
      if (star.opacity > 0.7) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`;
        this.ctx.fill();
      }
    });
  }

  addShootingStars() {
    // შემთხვევითი შუთინგ-სტარის დამატება
    if (Math.random() < 0.001) {
      const shootingStar = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height * 0.5,
        vx: (Math.random() + 2) * 5,
        vy: (Math.random() + 1) * 2,
        length: Math.random() * 20 + 10,
        opacity: 1,
        decay: 0.01,
      };

      this.drawShootingStar(shootingStar);
    }
  }

  drawShootingStar(star) {
    // შუთინგ-სტარის დახატვა გრადიენტით
    const gradient = this.ctx.createLinearGradient(
      star.x,
      star.y,
      star.x - star.length,
      star.y - star.length * 0.5
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    this.ctx.beginPath();
    this.ctx.moveTo(star.x, star.y);
    this.ctx.lineTo(star.x - star.length, star.y - star.length * 0.5);
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  animate() {
    // ანიმაციის მთავარი ციკლი
    this.updateStars();
    this.drawStars();
    this.addShootingStars();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    // ანიმაციის გაჩერება და canvas-ის წაშლა
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// გვერდის ჩატვირთვისას ვარსკვლავური ფონური ანიმაციის ინიციალიზაცია
document.addEventListener("DOMContentLoaded", () => {
  new StarField();
});

// გაფართოებული ვარსკვლავური ფონური ანიმაცია ნისლეულით (nebula)
class AdvancedStarField extends StarField {
  constructor() {
    super();
    this.nebulae = [];
    this.createNebulae();
  }

  createNebulae() {
    // ნისლეულის (nebula) ობიექტების გენერაცია
    for (let i = 0; i < 3; i++) {
      this.nebulae.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 200 + 100,
        color: this.getNebulaColor(),
        opacity: Math.random() * 0.1 + 0.05,
        drift: (Math.random() - 0.5) * 0.1,
      });
    }
  }

  getNebulaColor() {
    // ნისლეულის ფერის შემთხვევითი არჩევა
    const colors = [
      "rgba(0, 191, 255, 0.1)",
      "rgba(138, 43, 226, 0.1)",
      "rgba(0, 255, 127, 0.1)",
      "rgba(255, 107, 53, 0.1)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  drawNebulae() {
    // ნისლეულის დახატვა გრადიენტით
    this.nebulae.forEach((nebula) => {
      const gradient = this.ctx.createRadialGradient(
        nebula.x,
        nebula.y,
        0,
        nebula.x,
        nebula.y,
        nebula.radius
      );
      gradient.addColorStop(0, nebula.color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      this.ctx.beginPath();
      this.ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // ნისლეულის მოძრაობა (drift)
      nebula.x += nebula.drift;
      if (nebula.x > this.canvas.width + nebula.radius) {
        nebula.x = -nebula.radius;
      }
    });
  }

  animate() {
    // გაფართოებული ანიმაციის ციკლი ნისლეულით
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawNebulae();
    this.updateStars();
    this.drawStars();
    this.addShootingStars();

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// გლობალური კლასების ექსპორტი სხვა სკრიპტებისთვის
window.StarField = StarField;
window.AdvancedStarField = AdvancedStarField;
