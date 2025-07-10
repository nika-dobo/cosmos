// Quiz and game functionality
class SpaceQuizManager {
  constructor() {
    // მიმდინარე ქვიზის ტიპი
    this.currentQuiz = null;
    // მიმდინარე კითხვა
    this.currentQuestion = 0;
    // ქულა
    this.score = 0;
    // არჩეული პასუხები (პერსონალობის ქვიზისთვის)
    this.answers = [];
    // ქვიზის მდგომარეობა (მენიუ, ქვიზი, შედეგები)
    this.gameState = "menu";
    // ასტეროიდების თამაშის ობიექტი
    this.asteroidGame = null;

    // ქვიზის კითხვების მონაცემები
    this.quizData = this.initializeQuizData();
    this.init();
  }

  init() {
    // ქვიზის არჩევის ღილაკების დაყენება და თამაშის canvas-ის ინიციალიზაცია
    this.setupQuizSelection();
    this.initializeGameCanvas();
  }

  initializeQuizData() {
    // აბრუნებს ქვიზის კითხვებსა და პასუხებს
    return {
      facts: {
        title: "Space Facts Quiz",
        questions: [
          {
            question: "Which planet is known as the Red Planet?",
            answers: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            explanation:
              "Mars is called the Red Planet due to iron oxide (rust) on its surface.",
          },
          {
            question: "What is the closest star to Earth?",
            answers: [
              "Alpha Centauri",
              "Sirius",
              "The Sun",
              "Proxima Centauri",
            ],
            correct: 2,
            explanation:
              "The Sun is our closest star, about 93 million miles away.",
          },
          {
            question:
              "How long does it take light from the Sun to reach Earth?",
            answers: ["8 minutes", "1 hour", "1 day", "1 second"],
            correct: 0,
            explanation:
              "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth.",
          },
          {
            question: "Which planet has the most moons?",
            answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correct: 1,
            explanation:
              "Saturn has 146 confirmed moons, more than any other planet.",
          },
          {
            question: "What is the largest planet in our solar system?",
            answers: ["Saturn", "Neptune", "Jupiter", "Uranus"],
            correct: 2,
            explanation:
              "Jupiter is the largest planet, with a mass greater than all other planets combined.",
          },
          {
            question: "What causes the Northern Lights (Aurora Borealis)?",
            answers: [
              "Solar wind particles",
              "Moon reflection",
              "Atmospheric pressure",
              "Earth's rotation",
            ],
            correct: 0,
            explanation:
              "The Northern Lights are caused by solar wind particles interacting with Earth's magnetic field.",
          },
          {
            question: "Which galaxy is closest to the Milky Way?",
            answers: [
              "Whirlpool Galaxy",
              "Andromeda Galaxy",
              "Triangulum Galaxy",
              "Sombrero Galaxy",
            ],
            correct: 1,
            explanation:
              "The Andromeda Galaxy is our nearest major galactic neighbor.",
          },
          {
            question: "What is a black hole's event horizon?",
            answers: [
              "The center of the black hole",
              "The point of no return",
              "The outer edge",
              "The accretion disk",
            ],
            correct: 1,
            explanation:
              "The event horizon is the boundary beyond which nothing can escape the black hole's gravity.",
          },
          {
            question: "How many Earth days does it take Mars to orbit the Sun?",
            answers: ["365 days", "687 days", "225 days", "88 days"],
            correct: 1,
            explanation:
              "Mars takes about 687 Earth days to complete one orbit around the Sun.",
          },
          {
            question: "What is the temperature at the core of the Sun?",
            answers: ["1 million°C", "15 million°C", "100,000°C", "5,778°C"],
            correct: 1,
            explanation:
              "The Sun's core temperature is approximately 15 million degrees Celsius.",
          },
        ],
      },
      "planet-personality": {
        title: "Which Planet Are You?",
        questions: [
          {
            question: "What's your ideal vacation?",
            answers: [
              "Hot desert adventure",
              "Icy mountain retreat",
              "Tropical beach",
              "Bustling city",
            ],
            traits: ["mars", "uranus", "earth", "jupiter"],
          },
          {
            question: "How do you handle pressure?",
            answers: [
              "I thrive under pressure",
              "I prefer low-pressure situations",
              "I need just the right amount",
              "I create my own pressure",
            ],
            traits: ["venus", "mars", "earth", "jupiter"],
          },
          {
            question: "What's your social style?",
            answers: [
              "I have many close friends",
              "I prefer a few deep relationships",
              "I'm a loner",
              "I'm the center of attention",
            ],
            traits: ["saturn", "earth", "mercury", "jupiter"],
          },
          {
            question: "How do you approach challenges?",
            answers: [
              "Head-on with force",
              "Carefully and methodically",
              "I adapt and flow",
              "I think outside the box",
            ],
            traits: ["mars", "saturn", "neptune", "uranus"],
          },
          {
            question: "What's your ideal day length?",
            answers: [
              "Short and intense",
              "Long and productive",
              "Just right",
              "I lose track of time",
            ],
            traits: ["mercury", "venus", "earth", "neptune"],
          },
          {
            question: "How do you express yourself?",
            answers: [
              "Boldly and dramatically",
              "Elegantly and beautifully",
              "Naturally and authentically",
              "Mysteriously and deeply",
            ],
            traits: ["jupiter", "venus", "earth", "neptune"],
          },
          {
            question: "What's your relationship with change?",
            answers: [
              "I resist change",
              "I embrace gradual change",
              "I adapt quickly",
              "I'm unpredictable",
            ],
            traits: ["saturn", "earth", "mars", "uranus"],
          },
          {
            question: "How do you view your role in the group?",
            answers: [
              "The leader",
              "The supporter",
              "The protector",
              "The innovator",
            ],
            traits: ["jupiter", "earth", "saturn", "uranus"],
          },
        ],
      },
    };
  }

  setupQuizSelection() {
    // ქვიზის არჩევის ღილაკების დაყენება (მაგალითად, ღილაკზე დაკლიკებისას startQuiz გამოიძახება)
  }

  startQuiz(quizType) {
    // ქვიზის დაწყება არჩეული ტიპით
    this.currentQuiz = quizType;
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];

    // ქვიზის UI-ს მართვა
    const quizSelection = document.querySelector(".quiz-selection");
    const quizContainer = document.getElementById("quiz-container");
    const gameContainer = document.getElementById("game-container");
    const resultsContainer = document.getElementById("results-container");

    if (quizSelection) quizSelection.style.display = "none";
    if (quizContainer) quizContainer.style.display = "block";
    if (gameContainer) gameContainer.style.display = "none";
    if (resultsContainer) resultsContainer.style.display = "none";

    // ქვიზის სათაურის დაყენება
    const quizTitle = document.getElementById("quiz-title");
    if (quizTitle) {
      quizTitle.textContent = this.quizData[quizType].title;
    }

    this.displayQuestion();
  }

  displayQuestion() {
    // მიმდინარე კითხვის და პასუხების ჩვენება
    const quizData = this.quizData[this.currentQuiz];
    const question = quizData.questions[this.currentQuestion];

    // პროგრესის განახლება
    const progress =
      ((this.currentQuestion + 1) / quizData.questions.length) * 100;
    const progressBar = document.getElementById("progress-bar");
    const questionCounter = document.getElementById("question-counter");
    const scoreDisplay = document.getElementById("score-display");

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (questionCounter)
      questionCounter.textContent = `Question ${this.currentQuestion + 1} of ${
        quizData.questions.length
      }`;
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${this.score}`;

    // კითხვის ტექსტი
    const questionText = document.getElementById("question-text");
    if (questionText) questionText.textContent = question.question;

    // პასუხების ვარიანტები
    const answersContainer = document.getElementById("answers-container");
    if (answersContainer) {
      answersContainer.innerHTML = "";

      question.answers.forEach((answer, index) => {
        const answerElement = document.createElement("div");
        answerElement.className = "answer-option";
        answerElement.textContent = answer;
        answerElement.addEventListener("click", () => this.selectAnswer(index));
        answersContainer.appendChild(answerElement);
      });
    }

    // შემდეგი კითხვის ღილაკის დამალვა
    const nextButton = document.getElementById("next-button");
    if (nextButton) nextButton.style.display = "none";
  }

  selectAnswer(answerIndex) {
    // პასუხის არჩევის ლოგიკა
    const quizData = this.quizData[this.currentQuiz];
    const question = quizData.questions[this.currentQuestion];
    const answerOptions = document.querySelectorAll(".answer-option");

    // ყველა პასუხის გათიშვა
    answerOptions.forEach((option) => {
      option.classList.add("disabled");
    });

    // არჩეული პასუხის მონიშვნა
    answerOptions[answerIndex].classList.add("selected");

    if (this.currentQuiz === "facts") {
      // სწორი პასუხის შემოწმება
      const isCorrect = answerIndex === question.correct;

      if (isCorrect) {
        answerOptions[answerIndex].classList.add("correct");
        this.score += 10;
        this.playCorrectSound();
      } else {
        answerOptions[answerIndex].classList.add("incorrect");
        answerOptions[question.correct].classList.add("correct");
        this.playIncorrectSound();
      }

      // ახსნა-განმარტების ჩვენება
      const explanation = document.createElement("div");
      explanation.className = "explanation";
      explanation.innerHTML = `<p><strong>Explanation:</strong> ${question.explanation}</p>`;
      explanation.style.marginTop = "1rem";
      explanation.style.padding = "1rem";
      explanation.style.background = "rgba(255, 255, 255, 0.05)";
      explanation.style.borderRadius = "8px";
      explanation.style.color = "var(--space-light-gray)";

      const answersContainer = document.getElementById("answers-container");
      if (answersContainer) answersContainer.appendChild(explanation);
    } else {
      // პერსონალობის ქვიზისთვის მხოლოდ პასუხის traits ვამატებთ
      this.answers.push(question.traits[answerIndex]);
    }

    // ქულის განახლება
    const scoreDisplay = document.getElementById("score-display");
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${this.score}`;

    // შემდეგი კითხვის ღილაკის ჩვენება
    const nextButton = document.getElementById("next-button");
    if (nextButton) nextButton.style.display = "block";
  }

  nextQuestion() {
    // შემდეგ კითხვაზე გადასვლა ან შედეგების ჩვენება
    this.currentQuestion++;

    if (
      this.currentQuestion >= this.quizData[this.currentQuiz].questions.length
    ) {
      this.showResults();
    } else {
      this.displayQuestion();
    }
  }

  showResults() {
    // შედეგების ჩვენება ქვიზის დასრულებისას
    const quizContainer = document.getElementById("quiz-container");
    const resultsContainer = document.getElementById("results-container");

    if (quizContainer) quizContainer.style.display = "none";
    if (resultsContainer) resultsContainer.style.display = "block";

    const resultsTitle = document.getElementById("results-title");
    const resultsDetails = document.getElementById("results-details");

    if (this.currentQuiz === "facts") {
      // ფაქტების ქვიზის შედეგები
      const percentage = Math.round(
        (this.score / (this.quizData[this.currentQuiz].questions.length * 10)) *
          100
      );
      if (resultsTitle) resultsTitle.textContent = `Quiz Complete!`;
      if (resultsDetails) {
        resultsDetails.innerHTML = `
                    <div class="score-display">${this.score} / ${
          this.quizData[this.currentQuiz].questions.length * 10
        }</div>
                    <p>You scored ${percentage}%!</p>
                    <p>${this.getScoreMessage(percentage)}</p>
                `;
      }
    } else {
      // პერსონალობის ქვიზის შედეგები
      const planetResult = this.calculatePersonalityResult();
      if (resultsTitle)
        resultsTitle.textContent = `You are ${planetResult.name}!`;
      if (resultsDetails) {
        resultsDetails.innerHTML = `
                    <div class="personality-result">
                        <div class="planet-visual planet-${
                          planetResult.id
                        }"></div>
                        <h3>${planetResult.name}</h3>
                        <p>${planetResult.description}</p>
                        <div class="personality-traits">
                            <h4>Your Traits:</h4>
                            <ul>
                                ${planetResult.traits
                                  .map((trait) => `<li>${trait}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                    </div>
                `;
      }
    }
  }

  calculatePersonalityResult() {
    // პასუხების მიხედვით ყველაზე ხშირი trait-ის პოვნა
    const traitCounts = {};
    this.answers.forEach((trait) => {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    });

    // ყველაზე ხშირი trait-ის პოვნა
    const mostCommonTrait = Object.keys(traitCounts).reduce((a, b) =>
      traitCounts[a] > traitCounts[b] ? a : b
    );

    // პლანეტების პერსონალობის აღწერები
    const planetPersonalities = {
      mercury: {
        id: "mercury",
        name: "Mercury",
        description:
          "You are quick, adaptable, and efficient. Like Mercury, you move fast and get things done!",
        traits: ["Quick-thinking", "Adaptable", "Efficient", "Direct"],
      },
      venus: {
        id: "venus",
        name: "Venus",
        description:
          "You are beautiful, elegant, and have a strong presence. Like Venus, you shine brightly!",
        traits: ["Elegant", "Charismatic", "Strong-willed", "Beautiful"],
      },
      earth: {
        id: "earth",
        name: "Earth",
        description:
          "You are balanced, nurturing, and full of life. Like Earth, you support and sustain others!",
        traits: ["Balanced", "Nurturing", "Life-giving", "Stable"],
      },
      mars: {
        id: "mars",
        name: "Mars",
        description:
          "You are bold, adventurous, and determined. Like Mars, you are ready for action!",
        traits: ["Bold", "Adventurous", "Determined", "Energetic"],
      },
      jupiter: {
        id: "jupiter",
        name: "Jupiter",
        description:
          "You are a natural leader, protective, and influential. Like Jupiter, you have a commanding presence!",
        traits: ["Leadership", "Protective", "Influential", "Generous"],
      },
      saturn: {
        id: "saturn",
        name: "Saturn",
        description:
          "You are disciplined, wise, and structured. Like Saturn, you bring order and beauty!",
        traits: ["Disciplined", "Wise", "Structured", "Patient"],
      },
      uranus: {
        id: "uranus",
        name: "Uranus",
        description:
          "You are unique, innovative, and unpredictable. Like Uranus, you march to your own beat!",
        traits: ["Innovative", "Unique", "Independent", "Revolutionary"],
      },
      neptune: {
        id: "neptune",
        name: "Neptune",
        description:
          "You are mysterious, intuitive, and deep. Like Neptune, you have hidden depths!",
        traits: ["Mysterious", "Intuitive", "Deep", "Spiritual"],
      },
    };

    return planetPersonalities[mostCommonTrait] || planetPersonalities.earth;
  }

  getScoreMessage(percentage) {
    // შედეგის მიხედვით შეტყობინების დაბრუნება
    if (percentage >= 90) return "Outstanding! You're a true space expert! 🚀";
    if (percentage >= 80)
      return "Excellent! You know your way around the cosmos! ⭐";
    if (percentage >= 70)
      return "Great job! You have solid space knowledge! 🌟";
    if (percentage >= 60) return "Good work! Keep exploring the universe! 🌍";
    if (percentage >= 50)
      return "Not bad! There's more to discover out there! 🔭";
    return "Keep learning! The universe has many secrets to reveal! 📚";
  }

  playCorrectSound() {
    // სწორი პასუხის ხმოვანი ეფექტი
    if (!window.spaceExplorer?.audioMuted) {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          659,
          audioContext.currentTime + 0.1
        );
        oscillator.frequency.setValueAtTime(
          784,
          audioContext.currentTime + 0.2
        );

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log("Audio context not available");
      }
    }
  }

  playIncorrectSound() {
    // არასწორი პასუხის ხმოვანი ეფექტი
    if (!window.spaceExplorer?.audioMuted) {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.type = "sawtooth";

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.5
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log("Audio context not available");
      }
    }
  }

  restartQuiz() {
    // ქვიზის თავიდან დაწყება (მენიუზე დაბრუნება)
    const quizSelection = document.querySelector(".quiz-selection");
    const quizContainer = document.getElementById("quiz-container");
    const gameContainer = document.getElementById("game-container");
    const resultsContainer = document.getElementById("results-container");

    if (quizSelection) quizSelection.style.display = "block";
    if (quizContainer) quizContainer.style.display = "none";
    if (gameContainer) gameContainer.style.display = "none";
    if (resultsContainer) resultsContainer.style.display = "none";

    this.currentQuiz = null;
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
  }

  shareResults() {
    // შედეგების გაზიარება (Web Share API ან კლიპბორდი)
    if (navigator.share) {
      navigator.share({
        title: "Space Explorer Quiz Results",
        text: `I just completed the Space Explorer quiz and scored ${this.score} points!`,
        url: window.location.href,
      });
    } else {
      // fallback: კლიპბორდში კოპირება
      const text = `I just completed the Space Explorer quiz and scored ${this.score} points! Check it out at ${window.location.href}`;
      navigator.clipboard.writeText(text).then(() => {
        alert("Results copied to clipboard!");
      });
    }
  }

  initializeGameCanvas() {
    // ასტეროიდების თამაშის canvas-ის ინიციალიზაცია
    const canvas = document.getElementById("gameCanvas");
    if (canvas) {
      this.asteroidGame = new AsteroidDodgeGame(canvas);
    }
  }
}

// Asteroid Dodge Game
class AsteroidDodgeGame {
  constructor(canvas) {
    // თამაშის canvas და კონტექსტი
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.gameState = "stopped";
    this.score = 0;
    this.lives = 3;
    // მოთამაშის პარამეტრები
    this.player = {
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      speed: 5,
    };
    // ასტეროიდები და power-up-ები
    this.asteroids = [];
    this.powerUps = [];
    this.keys = {};

    this.init();
  }

  init() {
    // კლავიატურის კონტროლების დაყენება და ზომის ინიციალიზაცია
    this.setupControls();
    this.resize();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    // Canvas-ის ზომის დაყენება და მოთამაშის პოზიციის განახლება
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.player.x = this.canvas.width / 2;
    this.player.y = this.canvas.height - 50;
  }

  setupControls() {
    // კლავიატურის ღილაკების დამუშავება
    document.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      e.preventDefault();
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
      e.preventDefault();
    });
  }

  start() {
    // თამაშის დაწყება
    this.gameState = "playing";
    this.score = 0;
    this.lives = 3;
    this.asteroids = [];
    this.powerUps = [];
    this.player.x = this.canvas.width / 2;
    this.player.y = this.canvas.height - 50;

    const startButton = document.getElementById("start-game-button");
    const pauseButton = document.getElementById("pause-game-button");

    if (startButton) startButton.style.display = "none";
    if (pauseButton) pauseButton.style.display = "block";

    this.gameLoop();
  }

  pause() {
    // თამაშის პაუზა/გაგრძელება
    const pauseButton = document.getElementById("pause-game-button");

    if (this.gameState === "playing") {
      this.gameState = "paused";
      if (pauseButton) pauseButton.textContent = "Resume";
    } else if (this.gameState === "paused") {
      this.gameState = "playing";
      if (pauseButton) pauseButton.textContent = "Pause";
      this.gameLoop();
    }
  }

  gameLoop() {
    // თამაშის მთავარი ციკლი
    if (this.gameState !== "playing") return;

    this.update();
    this.draw();

    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // მოთამაშის მოძრაობა
    if (this.keys["ArrowLeft"] || this.keys["a"] || this.keys["A"]) {
      this.player.x = Math.max(0, this.player.x - this.player.speed);
    }
    if (this.keys["ArrowRight"] || this.keys["d"] || this.keys["D"]) {
      this.player.x = Math.min(
        this.canvas.width - this.player.width,
        this.player.x + this.player.speed
      );
    }
    if (this.keys["ArrowUp"] || this.keys["w"] || this.keys["W"]) {
      this.player.y = Math.max(0, this.player.y - this.player.speed);
    }
    if (this.keys["ArrowDown"] || this.keys["s"] || this.keys["S"]) {
      this.player.y = Math.min(
        this.canvas.height - this.player.height,
        this.player.y + this.player.speed
      );
    }

    // ასტეროიდების დამატება
    if (Math.random() < 0.02) {
      this.asteroids.push({
        x: Math.random() * this.canvas.width,
        y: -20,
        width: 20 + Math.random() * 20,
        height: 20 + Math.random() * 20,
        speed: 2 + Math.random() * 3,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    // power-up-ების დამატება
    if (Math.random() < 0.005) {
      this.powerUps.push({
        x: Math.random() * this.canvas.width,
        y: -20,
        width: 15,
        height: 15,
        speed: 1,
        type: "life",
      });
    }

    // ასტეროიდების განახლება და შეჯახების შემოწმება
    for (let i = this.asteroids.length - 1; i >= 0; i--) {
      const asteroid = this.asteroids[i];
      asteroid.y += asteroid.speed;
      asteroid.rotation += asteroid.rotationSpeed;

      // ეკრანს გასული ასტეროიდის წაშლა და ქულის დამატება
      if (asteroid.y > this.canvas.height) {
        this.asteroids.splice(i, 1);
        this.score += 1;
      }
      // მოთამაშესთან შეჯახება
      else if (this.checkCollision(this.player, asteroid)) {
        this.asteroids.splice(i, 1);
        this.lives--;
        this.playHitSound();

        if (this.lives <= 0) {
          this.gameOver();
        }
      }
    }

    // power-up-ების განახლება და შეჯახების შემოწმება
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      powerUp.y += powerUp.speed;

      if (powerUp.y > this.canvas.height) {
        this.powerUps.splice(i, 1);
      } else if (this.checkCollision(this.player, powerUp)) {
        this.powerUps.splice(i, 1);
        this.lives++;
        this.playPowerUpSound();
      }
    }

    // UI განახლება
    const gameScore = document.getElementById("game-score");
    const gameLives = document.getElementById("game-lives");

    if (gameScore) gameScore.textContent = `Score: ${this.score}`;
    if (gameLives) gameLives.textContent = `Lives: ${this.lives}`;
  }

  checkCollision(rect1, rect2) {
    // მართკუთხედების შეჯახების შემოწმება
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  draw() {
    // ეკრანის გასუფთავება და ყველა ობიექტის დახატვა
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // ვარსკვლავების დახატვა
    this.drawStars();

    // მოთამაშის დახატვა და ნათება
    this.ctx.fillStyle = "#00bfff";
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );

    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "#00bfff";
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
    this.ctx.shadowBlur = 0;

    // ასტეროიდების დახატვა
    this.asteroids.forEach((asteroid) => {
      this.ctx.save();
      this.ctx.translate(
        asteroid.x + asteroid.width / 2,
        asteroid.y + asteroid.height / 2
      );
      this.ctx.rotate(asteroid.rotation);
      this.ctx.fillStyle = "#8b4513";
      this.ctx.fillRect(
        -asteroid.width / 2,
        -asteroid.height / 2,
        asteroid.width,
        asteroid.height
      );
      this.ctx.restore();
    });

    // power-up-ების დახატვა და ნათება
    this.powerUps.forEach((powerUp) => {
      this.ctx.fillStyle = "#00ff7f";
      this.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);

      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = "#00ff7f";
      this.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      this.ctx.shadowBlur = 0;
    });
  }

  drawStars() {
    // ვარსკვლავების დახატვა ფონზე
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % this.canvas.width;
      const y = (i * 17 + Date.now() * 0.01) % this.canvas.height;
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  playHitSound() {
    // ასტეროიდთან შეჯახების ხმოვანი ეფექტი
    if (!window.spaceExplorer?.audioMuted) {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.type = "sawtooth";

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log("Audio context not available");
      }
    }
  }

  playPowerUpSound() {
    // power-up-ის აღების ხმოვანი ეფექტი
    if (!window.spaceExplorer?.audioMuted) {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          880,
          audioContext.currentTime + 0.1
        );

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (error) {
        console.log("Audio context not available");
      }
    }
  }

  gameOver() {
    // თამაშის დასრულება და შედეგის ჩვენება
    this.gameState = "stopped";

    const startButton = document.getElementById("start-game-button");
    const pauseButton = document.getElementById("pause-game-button");

    if (startButton) startButton.style.display = "block";
    if (pauseButton) pauseButton.style.display = "none";

    alert(`Game Over! Final Score: ${this.score}`);
  }
}

// ქვიზის გვერდის ინიციალიზაცია
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname.includes("quiz") ||
    window.spaceExplorer?.currentPage === "quiz"
  ) {
    initializeQuizPage();
  }
});

let spaceQuizManager;

function initializeQuizPage() {
  // ქვიზის გვერდის ინიციალიზაცია
  spaceQuizManager = new SpaceQuizManager();
}

// გლობალური ფუნქციები ქვიზის და თამაშის სამართავად
function startQuiz(quizType) {
  if (quizType === "asteroid-dodge") {
    // თამაშის container-ის ჩვენება
    const quizSelection = document.querySelector(".quiz-selection");
    const quizContainer = document.getElementById("quiz-container");
    const gameContainer = document.getElementById("game-container");
    const resultsContainer = document.getElementById("results-container");

    if (quizSelection) quizSelection.style.display = "none";
    if (quizContainer) quizContainer.style.display = "none";
    if (gameContainer) gameContainer.style.display = "block";
    if (resultsContainer) resultsContainer.style.display = "none";
  } else if (spaceQuizManager) {
    spaceQuizManager.startQuiz(quizType);
  }
}

function nextQuestion() {
  if (spaceQuizManager) {
    spaceQuizManager.nextQuestion();
  }
}

function restartQuiz() {
  if (spaceQuizManager) {
    spaceQuizManager.restartQuiz();
  }
}

function shareResults() {
  if (spaceQuizManager) {
    spaceQuizManager.shareResults();
  }
}

function startGame() {
  if (spaceQuizManager && spaceQuizManager.asteroidGame) {
    spaceQuizManager.asteroidGame.start();
  }
}

function pauseGame() {
  if (spaceQuizManager && spaceQuizManager.asteroidGame) {
    spaceQuizManager.asteroidGame.pause();
  }
}

// გლობალური ფუნქციების ექსპორტი
window.spaceQuizExplorer = {
  startQuiz,
  nextQuestion,
  restartQuiz,
  shareResults,
  startGame,
  pauseGame,
};
