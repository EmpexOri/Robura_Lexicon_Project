document.addEventListener("DOMContentLoaded", () => {
    // === Canvas Setup ===
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");

    const solarCanvas = document.getElementById("solarCanvas");
    const solarCtx = solarCanvas.getContext("2d");

    function resizeCanvases() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        solarCanvas.width = width;
        solarCanvas.height = height;
    }

    resizeCanvases();
    window.addEventListener("resize", resizeCanvases);

    // === Nebula Background ===
    function drawNebula() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, canvas.width / 6,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(75,0,130,0.6)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(drawNebula);
    }

    drawNebula();

    // === Side Menu ===
    const menuIcon = document.getElementById("menuIcon");
    const closeBtn = document.getElementById("closeBtn");
    const sideMenu = document.getElementById("sideMenu");

    if (menuIcon && closeBtn && sideMenu) {
        menuIcon.addEventListener("click", () => {
            sideMenu.classList.add("open");
        });

        closeBtn.addEventListener("click", () => {
            sideMenu.classList.remove("open");
        });
    }

    // === Stylized Holomap (Solar System) ===
    const planets = [
        { color: "green", orbitRadius: 100, size: 8, angle: 0, speed: 0.01 },
        { color: "red", orbitRadius: 200, size: 10, angle: 0, speed: 0.008 },
        { color: "blue", orbitRadius: 300, size: 12, angle: 0, speed: 0.006 },
        { color: "purple", orbitRadius: 400, size: 14, angle: 0, speed: 0.004 }
    ];

    function drawSolarSystem() {
        solarCtx.clearRect(0, 0, solarCanvas.width, solarCanvas.height);

        const centerX = solarCanvas.width / 2;
        const centerY = solarCanvas.height / 2;

        // Draw Sun
        solarCtx.beginPath();
        solarCtx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        solarCtx.fillStyle = "yellow";
        solarCtx.fill();

        // Draw Planets
        planets.forEach(planet => {
            planet.angle += planet.speed;

            const x = centerX + planet.orbitRadius * Math.cos(planet.angle);
            const y = centerY + planet.orbitRadius * Math.sin(planet.angle);

            solarCtx.beginPath();
            solarCtx.arc(x, y, planet.size, 0, Math.PI * 2);
            solarCtx.fillStyle = planet.color;
            solarCtx.fill();
        });

        requestAnimationFrame(drawSolarSystem);
    }

    drawSolarSystem();
});
