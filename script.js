let Length = document.querySelector(".length");
let playBtn = document.querySelector(".play");
let Audio = document.querySelector(".music");
let startTime = document.querySelector(".start-time");
let endTime = document.querySelector(".end-time");

Audio.onloadedmetadata = function () {
  Length.max = Audio.duration;
  Length.value = Audio.currentTime;
  updateSeekTimes();
};

Audio.ontimeupdate = function () {
  Length.value = Audio.currentTime;
  updateSeekTimes();
};

function updateSeekTimes() {
  startTime.textContent = formatTime(Audio.currentTime);
  endTime.textContent = formatTime(Audio.duration);

  const progressPercentage = (Audio.currentTime / Audio.duration) * 100;

  Length.setAttribute("value", Audio.currentTime);

  Length.style.setProperty("--progress-width", `${progressPercentage}%`);
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("fa-pause")) {
    Audio.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  } else {
    Audio.play();
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }
});
setInterval(() => {
  Length.value = Audio.currentTime;
}, 500);

Length.addEventListener("change", () => {
  Audio.play();
  Audio.currentTime = Length.value;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
});
