const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & pause video
function toggleVideoStatus() {
  // if video is paused when clicked it plays and vice versa
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play/pause icon
function updatePlayIcon() {
  // if video is paused when clicked icon changes to play and vice versa
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }

}

// Update progress & timestamp
function updateProgress() {
  // the progress bar moves by giving it this percentage
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  // makes progress bar move to the place in the video that its set to when you click the progress bar
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  // since there is no video.stop we reset to the start of the video and pause it b/c there is a video.pause
  video.currentTime = 0;
  video.pause();
}

// Event listeners

// play if paused and stop if playing
video.addEventListener('click', toggleVideoStatus);
// want icons to change when we press the button from pause and play
video.addEventListener('pause', updatePlayIcon);
// want icons to change when we press the button from pause and play
video.addEventListener('play', updatePlayIcon);
// as the videeo plays it continously calls the timeupdate to update progress
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

// when we click on the progress bar to change it we want it to change
progress.addEventListener('change', setVideoProgress);
