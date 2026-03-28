let user = {email: "", xp: 0, level: 1};
let currentCardIndex = 0;
let currentLevelIndex = 0;
let data = null;

const loginSection = document.getElementById("login-section");
const mapSection = document.getElementById("map-section");
const cardSection = document.getElementById("card-section");
const videoSection = document.getElementById("video-section");
const flashcard = document.getElementById("flashcard");
const xpSpan = document.getElementById("xp");
const levelSpan = document.getElementById("level");
const levelsDiv = document.getElementById("levels");
const videoPlayer = document.getElementById("video-player");

fetch("data.json").then(res => res.json()).then(json => data = json);

document.getElementById("login-btn").onclick = () => {
  const email = document.getElementById("email").value;
  if(email) {
    user.email = email;
    loginSection.classList.add("hidden");
    mapSection.classList.remove("hidden");
    loadMap();
  }
};

function loadMap() {
  levelsDiv.innerHTML = "";
  data.levels.forEach((lvl, index) => {
    const btn = document.createElement("button");
    btn.textContent = "Level " + lvl.level;
    btn.onclick = () => startLevel(index);
    levelsDiv.appendChild(btn);
  });
}

function startLevel(index) {
  currentLevelIndex = index;
  currentCardIndex = 0;
  mapSection.classList.add("hidden");
  cardSection.classList.remove("hidden");
  showCard();
  loadVideo();
}

function showCard() {
  const card = data.levels[currentLevelIndex].cards[currentCardIndex];
  flashcard.querySelector(".front").textContent = card.question;
  flashcard.querySelector(".back").textContent = card.answer;
  flashcard.classList.remove("flipped");
}

flashcard.onclick = () => flashcard.classList.toggle("flipped");

document.getElementById("know-btn").onclick = () => {
  gainXP(20);
  nextCard();
};

document.getElementById("dont-know-btn").onclick = () => {
  nextCard();
};

function nextCard() {
  currentCardIndex++;
  if(currentCardIndex >= data.levels[currentLevelIndex].cards.length) {
    alert("انتهى هذا المستوى!");
    cardSection.classList.add("hidden");
    mapSection.classList.remove("hidden");
  } else {
    showCard();
  }
}

function gainXP(amount) {
  user.xp += amount;
  xpSpan.textContent = user.xp;
  checkLevelUp();
}

function checkLevelUp() {
  const lvlData = data.levels[currentLevelIndex];
  if(user.xp >= lvlData.xpNeeded) {
    user.level++;
    levelSpan.textContent = user.level;
  }
}

function loadVideo() {
  const videoSrc = data.levels[currentLevelIndex].video;
  if(videoSrc) {
    videoSection.classList.remove("hidden");
    videoPlayer.querySelector("source").src = videoSrc;
    videoPlayer.load();
  } else {
    videoSection.classList.add("hidden");
  }
}

// تغيير الثيم
document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};
