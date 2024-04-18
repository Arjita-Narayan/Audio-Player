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
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
});

progress.oninput = function () {
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};
// Define a variable to store the current position of the song
let currentPosition = 0;

// Function to forward the song by 10 seconds
function forwardSong() {
  // Add 10 seconds to the current position
  currentPosition += 10;
  // Set the current position to the new value
  song.currentTime = currentPosition;
}

// Function to backward the song by 10 seconds
function backwardSong() {
  // Subtract 10 seconds from the current position
  currentPosition -= 10;
  // Set the current position to the new value
  song.currentTime = currentPosition;
}
function changeSpeed() {
  // Get the selected speed from the dropdown
  let speed = document.getElementById("speedSelect").value;
  // Set the playback rate of the song to the selected speed
  song.playbackRate = parseFloat(speed);
}
