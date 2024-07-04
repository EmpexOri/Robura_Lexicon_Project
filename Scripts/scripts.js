document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Nebula animation
    let nebulaParticles = [];

    function initNebula() {
        nebulaParticles = [];
        for (let i = 0; i < 100; i++) {
            nebulaParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 5,
                color: `rgba(${Math.floor(Math.random() * 150)}, 0, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5})`,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2
            });
        }
    }
    initNebula();

    function drawNebula() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        // Draw nebula particles
        nebulaParticles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        // Move particles
        nebulaParticles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
        });

        requestAnimationFrame(drawNebula);
    }
    drawNebula();

    // Planetary orbits
    let angle1 = 0;
    let angle2 = 0;
    let angle3 = 0;
    let angle4 = 0;

    function drawPlanet(x, y, radius, color1, color2) {
        const gradient = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }

    function drawSun(x, y, radius) {
        const gradient = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FF8C00');

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFA500';
        ctx.stroke();
    }

    function drawPlanets() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the sun at the center
        const sunX = canvas.width / 2;
        const sunY = canvas.height / 2;
        drawSun(sunX, sunY, 80);

        // Draw first planet (Green and Purple)
        const x1 = sunX + 200 * Math.cos(angle1);
        const y1 = sunY + 200 * Math.sin(angle1);
        drawPlanet(x1, y1, 40, '#32CD32', '#8A2BE2');

        // Draw second planet (Red and White)
        const x2 = sunX + 300 * Math.cos(angle2);
        const y2 = sunY + 300 * Math.sin(angle2);
        drawPlanet(x2, y2, 50, '#FF6347', '#FFFFFF');

        // Draw third planet (Blue and Silver)
        const x3 = sunX + 400 * Math.cos(angle3);
        const y3 = sunY + 400 * Math.sin(angle3);
        drawPlanet(x3, y3, 35, '#1E90FF', '#C0C0C0');

        // Draw fourth planet (Red and White)
        const x4 = sunX + 500 * Math.cos(angle4);
        const y4 = sunY + 500 * Math.sin(angle4);
        drawPlanet(x4, y4, 45, '#DC143C', '#FFFFFF');

        // Update angles for next frame
        angle1 += 0.01;
        angle2 += 0.008;
        angle3 += 0.006;
        angle4 += 0.004;

        requestAnimationFrame(drawPlanets);
    }

    drawPlanets();

    // Menu toggle
    const menuIcon = document.getElementById('menuIcon');
    const closeBtn = document.getElementById('closeBtn');
    const sideMenu = document.getElementById('sideMenu');

    menuIcon.addEventListener('click', () => {
        sideMenu.style.width = '250px';
    });

    closeBtn.addEventListener('click', () => {
        sideMenu.style.width = '0';
    });
});
