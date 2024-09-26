// Valorant ajanlarının listesi
const agents = [
    'Brimstone', 'Phoenix', 'Sage', 'Sova', 'Viper', 'Cypher', 'Reyna', 'KillJoy',
    'Breach', 'Omen', 'Jett', 'Raze', 'Skye', 'Yoru', 'Astra', 'Kay/O', 'Chamber',
    'Neon', 'Harbor', 'Fade', 'Gekko', 'Deadlock', 'ISO', 'Clove', 'Vyse'
];

// Canvas ve çark için gerekli değişkenler
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const wheelRadius = 145;
const centerX = 150;
const centerY = 150;
let currentAngle = 0;
let isSpinning = false;

// Çarkı çiz
function drawWheel(angle) {
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

    // Çarkın dış çerçevesini çiz
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Merkez noktayı çiz
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
}

// Çarkı döndür
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const minSpins = 5; // Minimum dönüş sayısı
    const maxSpins = 10; // Maksimum dönüş sayısı
    const spinAngle = (Math.random() * (maxSpins - minSpins) + minSpins) * 2 * Math.PI;
    const duration = 5000; // 5 saniye
    const start = Date.now();

    function animate() {
        const now = Date.now();
        const t = Math.min(1, (now - start) / duration);
        currentAngle = easeOutCubic(t) * spinAngle;

        drawWheel(currentAngle);

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            const selectedIndex = Math.floor(currentAngle / (2 * Math.PI) * agents.length) % agents.length;
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
document.addEventListener('DOMContentLoaded', function() {
    canvas.width = 300;
    canvas.height = 300;
    drawWheel(0);
    document.getElementById('spin-button').addEventListener('click', spinWheel);
});