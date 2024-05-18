let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  } else {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
}

song.addEventListener("play", function () {
  updateProgress();
});

function updateProgress() {
  progress.value = song.currentTime;
  if (!song.paused) {
    requestAnimationFrame(updateProgress);
  }
}

progress.oninput = function () {
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

function forwardSong() {
  song.currentTime += 10;
}

function backwardSong() {
  song.currentTime -= 10;
}

function changeSpeed() {
  let speed = document.getElementById("speedSelect").value;
  song.playbackRate = parseFloat(speed);
}

function handleFileSelect(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  song.src = URL.createObjectURL(selectedFile);

  const songTitle = document.getElementById("songTitle");
  songTitle.textContent = selectedFile.name;

  song.pause();
  song.currentTime = 0;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch(function (error) {
        console.log("Service Worker registration failed:", error);
      });
  });
}
