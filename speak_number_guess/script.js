const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

// may very by browser
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  // input from the microphone
  const msg = e.results[0][0].transcript;   // [0][0] two arrays in and first values of those

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';   // appennds so the game keeps going
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';   // append so can see the number guessed along w/ this message
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;   // 1 - 99 so add 1
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service (so game continues after a guess)
recognition.addEventListener('end', () => recognition.start());

// since created after dom is made we add eventListener to a parent
document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {  // this is why we gave the button an id
    window.location.reload();
  }
});
