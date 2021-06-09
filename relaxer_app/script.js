const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);   // after "holdTime" do whats in the setTimeout - 'Breathe Out!' 
  }, breatheTime);  // after "breatheTime" do whats in the setTimeout - 'Hold'
}

// call this function every 7.5s
setInterval(breathAnimation, totalTime);
