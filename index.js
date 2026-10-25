const emojiDetails = [
  { description: "boat", emoji: "⛵" },
  { description: "thumbs up", emoji: "👍" },
  { description: "Rocket", emoji: "🚀" },
  { description: "Horse", emoji: "🐴" },
  { description: "cat", emoji: "🐈" },
];
let currrentEmojiIndex = 0;
let score = 0;
let seconds = 0;
let timer;
const descriptionEl = document.getElementById("description");
const guessInputEL = document.getElementById("guess-input");
const resultEl = document.getElementById("result");
const scoreEL = document.getElementById("score");
const timerEl = document.getElementById("timer");
const restartButtonEl = document.getElementById("restart-button");
const skipButtonEl = document.getElementById("SkipQuestion");
const submitButtonEl = document.getElementById("submitButton");

function displayEmoji() {
  descriptionEl.textContent = emojiDetails[currrentEmojiIndex].emoji;
  //
  seconds = 3;
  timerEl.textContent = `Time Left : ${seconds}s`;
  skipButtonEl.style.display = "block";
  submitButtonEl.style.display = "block";
  //
  startTimer();
}
function checkGuess() {
  clearInterval(timer);
  if (guessInputEL.value === "") {
    resultEl.textContent = "";
    //
    resultEl.textContent = " why dont you try the previous one !! 😢";
    scoreEL.textContent = `your Score is = ${score} /${emojiDetails.length} `;
    guessInputEL.focus();
    nextEmoji();
  } else {
    const expectedInput = emojiDetails[currrentEmojiIndex].description
      .trim()
      .toLowerCase();
    const givenInput = guessInputEL.value.trim().toLowerCase();
    if (expectedInput === givenInput) {
      resultEl.textContent = " congrats ! You got it right !";
      score++;
    } else {
      resultEl.textContent = "Sorry, better luck next time ";
    }
    guessInputEL.value = " ";
    guessInputEL.focus();
    nextEmoji();
  }
}
function nextEmoji() {
  currrentEmojiIndex++;
  if (currrentEmojiIndex % 2 != 0) {
    document.getElementsByTagName("h1").style.backgroundColor = "skyblue";
  } else {
    document.getElementsByTagName("h1").style.backgroundColor = "white";
  }
  if (currrentEmojiIndex === emojiDetails.length - 1) {
    submitButtonEl.textContent = "submit";
  }
  if (currrentEmojiIndex === emojiDetails.length) {
    resultEl.textContent = `Game Over! `;
    // Final Score: ${score}/${emojiDetails.length}`
    // scoreEL.style.display="none";
    timerEl.style.display = "none";
    endGame();
  }
  displayEmoji();
}

//  const ClickEventAfterinput =document.getElementById('guess-input');

guessInputEL.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayEmoji();
  scoreEL.textContent = `your Score is = ${score} /${emojiDetails.length} `;
  //
  // startTimer();
});
function startTimer() {
  //
  clearInterval(timer);
  timer = setInterval(() => {
    seconds--;
    timerEl.textContent = `Time Left : ${seconds}s`;
    if (seconds <= 0) {
      if (currrentEmojiIndex === emojiDetails.length) {
        endGame();
      } else {
        nextEmoji();
      }
    }
  }, 1000);
}
function endGame() {
  clearInterval(timer);
  descriptionEl.style.display = "none";
  guessInputEL.style.display = "none";
  // guessInputEL.disabled = true;
  restartButtonEl.style.display = "block";
  skipButtonEl.style.display = "none";
  submitButtonEl.style.display = "none";

  // timerEl.style.display='none';
}
restartButtonEl.addEventListener("click", restartTheGame);
skipButtonEl.addEventListener("click", checkGuess);
submitButtonEl.addEventListener("click", () => {
  if (guessInputEL.value != "") {
    checkGuess();
  }
});

function restartTheGame() {
  //
  clearInterval(timer);
  guessInputEL.style.display = "inline-block";
  descriptionEl.style.display = "block";
  // guessInputEL.disabled = false;
  currrentEmojiIndex = 0;
  score = 0;

  scoreEL.textContent = `your Score is ${score}`;
  resultEl.textContent = "";
  guessInputEL.value = "";
  submitButtonEl.textContent = "Next Question";
  restartButtonEl.style.display = "none";
  timerEl.style.display = "inline-block";
  displayEmoji();
  guessInputEL.focus();
}
