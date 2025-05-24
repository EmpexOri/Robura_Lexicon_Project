// Nebula Canvas Setup
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Solar System Canvas Setup
const solarCanvas = document.getElementById("solarCanvas");
const solarCtx = solarCanvas.getContext("2d");
solarCanvas.width = window.innerWidth;
solarCanvas.height = window.innerHeight;

// Colors
const glowColor = 'rgba(122, 95, 255, 0.4)';
const sunColor = '#FFF1D0';

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    solarCanvas.width = window.innerWidth;
    solarCanvas.height = window.innerHeight;
});

// -------------------- NEBULA --------------------
let time = 0;
function drawNebula() {
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.2
    );
    gradient.addColorStop(0, 'rgba(122,95,255,0.15)');
    gradient.addColorStop(1, 'rgba(11,12,26,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pulse = Math.sin(time * 0.002) * 0.5 + 0.5;
    const alpha = 0.03 + pulse * 0.04;

    ctx.fillStyle = `rgba(122, 95, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 300 + Math.sin(time * 0.001) * 40, 0, Math.PI * 2);
    ctx.fill();

    time++;
}

// -------------------- STARS --------------------
const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: 0.01 + Math.random() * 0.02
}));

function drawStars() {
    for (const star of stars) {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) {
            star.delta *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    }
}

// -------------------- SOLAR SYSTEM --------------------
const sun = { x: solarCanvas.width / 2, y: solarCanvas.height / 2, radius: 30 };

const planets = [
    { color: "#7A5FFF", orbitRadius: 100, size: 8, angle: 0, speed: 0.01 },
    { color: "#5A4B81", orbitRadius: 180, size: 10, angle: 0, speed: 0.008 },
    { color: "#4B9AFF", orbitRadius: 260, size: 12, angle: 0, speed: 0.006 },
    { color: "#9B7AFF", orbitRadius: 340, size: 14, angle: 0, speed: 0.004 }
];

function drawSolarSystem() {
    // Clear with partial transparency for trails
    solarCtx.fillStyle = "rgba(11, 12, 26, 0.2)";
    solarCtx.fillRect(0, 0, solarCanvas.width, solarCanvas.height);

    // Draw Sun
    const sunGradient = solarCtx.createRadialGradient(
        sun.x, sun.y, 0,
        sun.x, sun.y, sun.radius * 4
    );
    sunGradient.addColorStop(0, sunColor);
    sunGradient.addColorStop(1, 'rgba(255, 241, 208, 0)');
    solarCtx.fillStyle = sunGradient;
    solarCtx.beginPath();
    solarCtx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    solarCtx.fill();

    // Draw Planets
    planets.forEach(planet => {
        planet.angle += planet.speed;
        const x = sun.x + Math.cos(planet.angle) * planet.orbitRadius;
        const y = sun.y + Math.sin(planet.angle) * planet.orbitRadius;

        // Glow
        solarCtx.shadowBlur = 10;
        solarCtx.shadowColor = planet.color;

        solarCtx.beginPath();
        solarCtx.arc(x, y, planet.size, 0, Math.PI * 2);
        solarCtx.fillStyle = planet.color;
        solarCtx.fill();

        solarCtx.shadowBlur = 0; // Reset
    });
}

// -------------------- ANIMATE --------------------
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNebula();
    drawStars();
    drawSolarSystem();
    requestAnimationFrame(animate);
}

animate();
