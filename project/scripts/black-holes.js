// Black hole simulation and effects
class BlackHoleSimulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.blackHole = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: 30,
            mass: 1000
        };
        this.gravityStrength = 1;
        this.animationId = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createInitialParticles();
        this.start();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Update black hole position
        this.blackHole.x = this.canvas.width / 2;
        this.blackHole.y = this.canvas.height / 2;
    }
    
    createInitialParticles() {
        for (let i = 0; i < 50; i++) {
            this.addRandomParticle();
        }
    }
    
    addRandomParticle() {
        const particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            mass: Math.random() * 5 + 1,
            color: this.getParticleColor(),
            trail: [],
            absorbed: false
        };
        
        // Ensure particle isn't too close to black hole
        const distance = Math.sqrt(
            Math.pow(particle.x - this.blackHole.x, 2) + 
            Math.pow(particle.y - this.blackHole.y, 2)
        );
        
        if (distance < this.blackHole.radius * 3) {
            particle.x = this.blackHole.x + (Math.random() - 0.5) * 200;
            particle.y = this.blackHole.y + (Math.random() - 0.5) * 200;
        }
        
        this.particles.push(particle);
    }
    
    getParticleColor() {
        const colors = ['#ffffff', '#ffcc00', '#ff6600', '#cc0000', '#0066cc'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            if (particle.absorbed) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Calculate gravitational force
            const dx = this.blackHole.x - particle.x;
            const dy = this.blackHole.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Check if particle is absorbed
            if (distance < this.blackHole.radius) {
                particle.absorbed = true;
                this.createAbsorptionEffect(particle);
                continue;
            }
            
            // Apply gravitational force
            const force = (this.blackHole.mass * particle.mass * this.gravityStrength) / (distance * distance);
            const forceX = force * (dx / distance);
            const forceY = force * (dy / distance);
            
            particle.vx += forceX / particle.mass * 0.01;
            particle.vy += forceY / particle.mass * 0.01;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Update trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 20) {
                particle.trail.shift();
            }
            
            // Remove particles that go off screen
            if (particle.x < -100 || particle.x > this.canvas.width + 100 ||
                particle.y < -100 || particle.y > this.canvas.height + 100) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    createAbsorptionEffect(particle) {
        // Create visual effect when particle is absorbed
        const effect = {
            x: particle.x,
            y: particle.y,
            radius: 0,
            maxRadius: 20,
            opacity: 1,
            color: particle.color
        };
        
        // Animate the effect
        const animate = () => {
            effect.radius += 2;
            effect.opacity -= 0.05;
            
            if (effect.radius < effect.maxRadius && effect.opacity > 0) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    draw() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw black hole
        this.drawBlackHole();
        
        // Draw particles and trails
        this.particles.forEach(particle => {
            this.drawParticleTrail(particle);
            this.drawParticle(particle);
        });
        
        // Draw accretion disk
        this.drawAccretionDisk();
        
        // Draw event horizon
        this.drawEventHorizon();
    }
    
    drawBlackHole() {
        const gradient = this.ctx.createRadialGradient(
            this.blackHole.x, this.blackHole.y, 0,
            this.blackHole.x, this.blackHole.y, this.blackHole.radius
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.blackHole.x, this.blackHole.y, this.blackHole.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawAccretionDisk() {
        const time = Date.now() * 0.001;
        const diskRadius = this.blackHole.radius * 3;
        
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2 + time;
            const radius = diskRadius + Math.sin(time + i) * 10;
            const x = this.blackHole.x + Math.cos(angle) * radius;
            const y = this.blackHole.y + Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, ${100 + Math.sin(time + i) * 50}, 0, 0.8)`;
            this.ctx.fill();
        }
    }
    
    drawEventHorizon() {
        const time = Date.now() * 0.001;
        const horizonRadius = this.blackHole.radius * 2;
        
        this.ctx.beginPath();
        this.ctx.arc(this.blackHole.x, this.blackHole.y, horizonRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time * 2) * 0.2})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    drawParticleTrail(particle) {
        if (particle.trail.length < 2) return;
        
        this.ctx.beginPath();
        this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        
        for (let i = 1; i < particle.trail.length; i++) {
            this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        }
        
        this.ctx.strokeStyle = particle.color + '40';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.mass, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.fill();
        
        // Add glow effect
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = particle.color;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.updateParticles();
        this.draw();
        
        // Add new particles occasionally
        if (Math.random() < 0.02 && this.particles.length < 100) {
            this.addRandomParticle();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    addParticle() {
        if (this.particles.length < 150) {
            this.addRandomParticle();
        }
    }
    
    reset() {
        this.particles = [];
        this.createInitialParticles();
    }
    
    updateGravity(strength) {
        this.gravityStrength = parseFloat(strength);
    }
}

// Initialize black hole page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('black-holes') || window.spaceExplorer?.currentPage === 'black-holes') {
        initializeBlackHolePage();
    }
});

let blackHoleSimulation;

function initializeBlackHolePage() {
    // Initialize black hole simulation
    const canvas = document.getElementById('blackHoleCanvas');
    if (canvas) {
        blackHoleSimulation = new BlackHoleSimulation('blackHoleCanvas');
    }
    
    // Initialize info cards animation
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
    
    // Initialize black hole gallery
    const galleryCards = document.querySelectorAll('.black-hole-card');
    galleryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        card.classList.add('fade-in-up');
    });
}

// Control functions
function addParticle() {
    if (blackHoleSimulation) {
        blackHoleSimulation.addParticle();
    }
}

function resetSimulation() {
    if (blackHoleSimulation) {
        blackHoleSimulation.reset();
    }
}

function updateGravity(strength) {
    if (blackHoleSimulation) {
        blackHoleSimulation.updateGravity(strength);
    }
}

// Black hole facts and information
const blackHoleFacts = [
    "Black holes bend space and time around them",
    "Nothing can escape from inside a black hole's event horizon",
    "Black holes can have the mass of millions of suns",
    "Time slows down near black holes due to gravitational time dilation",
    "Black holes eventually evaporate through Hawking radiation",
    "The first image of a black hole was captured in 2019",
    "Stellar black holes form when massive stars collapse",
    "Supermassive black holes exist at the centers of galaxies"
];

function getRandomBlackHoleFact() {
    return blackHoleFacts[Math.floor(Math.random() * blackHoleFacts.length)];
}

// Export functions for global use
window.blackHoleExplorer = {
    addParticle,
    resetSimulation,
    updateGravity,
    getRandomBlackHoleFact
};