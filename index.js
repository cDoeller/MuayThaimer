const buttonElement = document.getElementById("start-button");
const currentTimeElement = document.getElementById("current-time");
const currentRoundElement = document.getElementById("current-round");
const timerContainerElement = document.getElementById("time-display");

let maxSeconds = 0;
let currentSeconds = 0;
let maxBreakTime = 0;
let cuurentBreakTime = 0;
let maxRounds = 0;
let currentRounds = 1;

let timerIsRunning = false;

let timerInterval;
let breakInterval;

// START CLICK
buttonElement.addEventListener("click", () => {
  if (!timerIsRunning) {
    // switch timer
    timerIsRunning = true;
    // assign the values
    const minutesInput = document.getElementById("set-time-input");
    const breakInput = document.getElementById("set-break-input");
    const roundsInput = document.getElementById("set-rounds-input");
    maxSeconds = minutesInput.value;
    currentSeconds = maxSeconds;
    maxBreakTime = breakInput.value;
    cuurentBreakTime = maxBreakTime;
    maxRounds = roundsInput.value;
    // set elements
    timerContainerElement.style.backgroundColor = "grey";
    currentRoundElement.innerHTML = "Round: " + currentRounds.toString();
    currentTimeElement.innerHTML = "GO";
    // start the timer (break first)
    startBreak();
  }
});

// start the ** MAIN ** timer function
function startTimer() {
  // bg color red
  timerContainerElement.style.backgroundColor = "red";
  // update round element
  currentRoundElement.innerHTML = "Round: " + currentRounds.toString();
  // BEEP
  beepStart();
  // start the interval
  timerInterval = setInterval(() => {
    // check if round over
    if (!RoundIsOver()) {
      // update html timer
      currentTimeElement.innerHTML = currentSeconds.toString();
      // decrease seconds
      currentSeconds--;
    } else {
      // round is over
      // 0. reset interval
      clearInterval(timerInterval);
      // 1. beep
      beepRoundEnd();
      // 2. check all rounds are over?
      // no: decrease round count
      // no: start break
      // yes: restart all
      if (fightIsOver()) {
        resetAll();
      } else {
        // increase rounds and show on screen
        currentRounds++;
        currentRoundElement.innerHTML = "Round: " + currentRounds.toString();
        // start break
        startBreak();
      }
    }
  }, 1000);
}

function RoundIsOver() {
  if (currentSeconds === 0) {
    console.log("round is over");
    currentTimeElement.innerHTML = currentSeconds.toString();
    currentSeconds = maxSeconds;
    return true;
  } else {
    return false;
  }
}

function startBreak() {
  console.log("starting break");
  // bg color green
  timerContainerElement.style.backgroundColor = "green";
  // update screen with break
  currentRoundElement.innerHTML = "BREAK";
  // start break interval
  breakInterval = setInterval(() => {
    if (!breakIsOver()) {
      // show break on screen and decrease
      currentTimeElement.innerHTML = cuurentBreakTime.toString();
      cuurentBreakTime--;
    } else {
      // reset break interval
      clearInterval(breakInterval);
      // restart timer
      startTimer();
    }
  }, 1000);
}

function breakIsOver() {
  if (cuurentBreakTime === 0) {
    console.log("break is over");
    currentTimeElement.innerHTML = cuurentBreakTime.toString();
    cuurentBreakTime = maxBreakTime;
    return true;
  } else {
    return false;
  }
}

function fightIsOver() {
  if (currentRounds == maxRounds) {
    console.log("figt is over");
    return true;
  } else {
    return false;
  }
}

function resetAll() {
  console.log("resetting all");
  timerIsRunning = false;
  clearInterval(timerInterval);
  clearInterval(breakInterval);
  maxSeconds = 0;
  currentSeconds = 0;
  maxBreakTime = 0;
  cuurentBreakTime = 0;
  maxRounds = 0;
  currentRounds = 1;
  timerContainerElement.style.backgroundColor = "grey";
  currentRoundElement.innerHTML = "FINISHED";
  currentTimeElement.innerHTML = ":-)";
}

function beepRoundEnd() {
  console.log("round end beep");
  const sound = new Audio("/sounds/end.mp3");
  sound.play();
}

function beepStart() {
  console.log("break end beep");
  const sound = new Audio("/sounds/start.mp3");
  sound.play();
}
