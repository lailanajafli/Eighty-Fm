document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu-icon");
    const navBar = document.querySelector(".navBar");
    const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

const showSlide = (index) => {
slides.forEach((slide, i) => {
  slide.classList.toggle("active", i === index);
  dots[i].classList.toggle("active", i === index);
});
};

document.querySelector(".next").addEventListener("click", () => {
currentIndex = (currentIndex + 1) % slides.length;
showSlide(currentIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
currentIndex = (currentIndex - 1 + slides.length) % slides.length;
showSlide(currentIndex);
});

dots.forEach((dot, index) => {
dot.addEventListener("click", () => {
  currentIndex = index;
  showSlide(currentIndex);
});
});

setInterval(() => {
currentIndex = (currentIndex + 1) % slides.length;
showSlide(currentIndex);
}, 5000);

    menuIcon.addEventListener("click", () => {
      navBar.classList.toggle("active");
    });
  });




// audio
const canvas = document.getElementById("waveformCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const barWidth = 2;
const barGap = 1;
let animationFrameId;
let isPlaying = false;

const audio = document.getElementById("podcastAudio");
const totalBars = Math.floor(canvasWidth / (barWidth + barGap));
let heights = [];

// Başlangıçta rastgele yükseklikleri ayarla
function initializeHeights() {
heights = Array.from({ length: totalBars }, () => Math.random() * (canvasHeight * 0.8) + (canvasHeight * 0.3));
}

// Dalgaları çiz
function drawWaveform(animated = false) {
ctx.clearRect(0, 0, canvasWidth, canvasHeight);

const time = Date.now() * 0.009; // Zaman çarpanı, hızı kontrol eder

for (let i = 0; i < totalBars; i++) {
// Her bir çubuğun yüksekliğini zamanla değiştirme
const barHeight = heights[i] + Math.sin(time + i) * 5; // Yavaş dalgalanma için daha az dalgalanma ekle

const x = i * (barWidth + barGap);
const y = (canvasHeight - barHeight) / 2;

ctx.fillStyle = "#ffffff";
ctx.fillRect(x, y, barWidth, barHeight);
}

if (isPlaying && animated) {
animationFrameId = requestAnimationFrame(() => drawWaveform(true));
}
}

function togglePlay() {
if (audio.paused) {
audio.play();
isPlaying = true;
drawWaveform(true); // Animasyonu başlat
document.getElementById("playButton").textContent = "Pause";
} else {
audio.pause();
isPlaying = false;
cancelAnimationFrame(animationFrameId); // Animasyonu durdur
drawWaveform(false); // Dalgaları sabit olarak göster
document.getElementById("playButton").textContent = "Listen Live";
}
}

// Sayfa yüklendiğinde dalgaları göster
initializeHeights(); // Yükseklikleri başlat
drawWaveform(false); // İlk başta dalgaları göster
