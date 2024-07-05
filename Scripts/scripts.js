document.addEventListener("DOMContentLoaded", () => {
    // Nebula background setup
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    function drawNebula() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let gradient = ctx.createRadialGradient(
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

    // Side menu functionality
    const menuIcon = document.getElementById("menuIcon");
    const closeBtn = document.getElementById("closeBtn");
    const sideMenu = document.getElementById("sideMenu");

    menuIcon.addEventListener("click", () => {
        sideMenu.style.width = "250px";
    });

    closeBtn.addEventListener("click", () => {
        sideMenu.style.width = "0";
    });

    // Stylized holomap setup
    const solarCanvas = document.getElementById("solarCanvas");
    const solarCtx = solarCanvas.getContext("2d");
    solarCanvas.width = window.innerWidth;
    solarCanvas.height = window.innerHeight;

    function resizeSolarCanvas() {
        solarCanvas.width = window.innerWidth;
        solarCanvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeSolarCanvas);

    let planets = [
        { color: "green", orbitRadius: 100, size: 8, angle: 0, speed: 0.01 },
        { color: "red", orbitRadius: 200, size: 10, angle: 0, speed: 0.008 },
        { color: "blue", orbitRadius: 300, size: 12, angle: 0, speed: 0.006 },
        { color: "purple", orbitRadius: 400, size: 14, angle: 0, speed: 0.004 }
    ];

    function drawSolarSystem() {
        solarCtx.clearRect(0, 0, solarCanvas.width, solarCanvas.height);

        // Draw the sun
        solarCtx.beginPath();
        solarCtx.arc(solarCanvas.width / 2, solarCanvas.height / 2, 30, 0, Math.PI * 2);
        solarCtx.fillStyle = "yellow";
        solarCtx.fill();

        planets.forEach(planet => {
            planet.angle += planet.speed;
            const x = solarCanvas.width / 2 + planet.orbitRadius * Math.cos(planet.angle);
            const y = solarCanvas.height / 2 + planet.orbitRadius * Math.sin(planet.angle);

            solarCtx.beginPath();
            solarCtx.arc(x, y, planet.size, 0, Math.PI * 2);
            solarCtx.fillStyle = planet.color;
            solarCtx.fill();
        });

        requestAnimationFrame(drawSolarSystem);
    }

    drawSolarSystem();
});
