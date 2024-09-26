// Valorant ajanlarının listesi
const agents = [
    'Brimstone', 'Phoenix', 'Sage', 'Sova', 'Viper', 'Cypher', 'Reyna', 'KillJoy',
    'Breach', 'Omen', 'Jett', 'Raze', 'Skye', 'Yoru', 'Astra', 'Kay/O', 'Chamber',
    'Neon', 'Harbor', 'Fade', 'Gekko', 'Deadlock', 'ISO', 'Clove', 'Vyse'
];

// Canvas ve çark için gerekli değişkenler
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const wheelRadius = 150;
const centerX = wheelRadius;
const centerY = wheelRadius;
let angle = 0;
let isSpinning = false;

// Çarkı çiz
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sliceAngle = (2 * Math.PI) / agents.length;

    for (let i = 0; i < agents.length; i++) {
        const startAngle = i * sliceAngle + angle;
        const endAngle = (i + 1) * sliceAngle + angle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = i % 2 === 0 ? '#ff4655' : '#0f1923';
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.fillText(agents[i], wheelRadius - 10, 0);
        ctx.restore();
    }
}

// Çarkı döndür
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const spinAngle = Math.random() * Math.PI * 2 + Math.PI * 10; // En az 5 tam tur
    const duration = 5000; // 5 saniye
    const start = Date.now();

    function animate() {
        const now = Date.now();
        const t = Math.min(1, (now - start) / duration);
        angle = easeOutCubic(t) * spinAngle;

        drawWheel();

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            const selectedIndex = Math.floor(agents.length - (angle / (2 * Math.PI) * agents.length) % agents.length);
            document.getElementById('result').textContent = `Seçilen Ajan: ${agents[selectedIndex]}`;
        }
    }

    animate();
}

// Yavaşlama efekti için easing fonksiyonu
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Sayfa yüklendiğinde çarkı çiz ve butona tıklama olayını ekle
window.onload = function() {
    canvas.width = wheelRadius * 2;
    canvas.height = wheelRadius * 2;
    drawWheel();
    document.getElementById('spin-button').addEventListener('click', spinWheel);
};