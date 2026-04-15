// Array Of Words
const words = [
  "Hello",
  "Programing",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Parading",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencie",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let level = document.querySelector(".level");
let levelEasy = document.querySelector(".level .easy");
let levelNormal = document.querySelector(".level .normal");
let levelHard = document.querySelector(".level .hard");
let finishMessage = document.querySelector(".finish");

// Default level
let currentLevel = null;

function setlevel(levelName) {
  let defaultLevelSeconds = lvls[levelName];

  // Setting Level Name + Seconds + Score
  lvlNameSpan.innerHTML = levelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words.length;

  // Saved Level
  currentLevel = levelName;

  localStorage.setItem("level", levelName);
}

// Get Level
let savedLevel = localStorage.getItem("level");
if (savedLevel) {
  setlevel(savedLevel);
  currentLevel = savedLevel;
}

levelEasy.onclick = function () {
  setlevel("Easy");
};

levelNormal.onclick = function () {
  setlevel("Normal");
};

levelHard.onclick = function () {
  setlevel("Hard");
};

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  if (!localStorage.getItem("level")) {
    alert("Please Select a Level First");
    return;
  }
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word Form Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remov Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compaer Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
          document.getElementById("good").play();
          timeLeftSpan.innerHTML = lvls[currentLevel];
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("You Won");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          document.getElementById("success").play();
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        document.getElementById("failed").play();
      }
    }
  }, 1000);
  // remove Level Div
  level.remove();
}
