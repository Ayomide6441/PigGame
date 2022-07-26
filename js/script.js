("use stict");
function changeText(theClass, newText) {
  document.querySelector(theClass).textContent = newText;
}

const diceEl = document.querySelector(".dice-img");
let playing = true;
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];

document.querySelector(".roll-dice").addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      changeText(
        ".control-text",
        `Player ${activePlayer + 1} rolled a ${dice}`
      );
      currentScore += dice;
      changeText(`.current-score-${activePlayer}`, `${currentScore} points`);
    } else {
      changeText(
        ".control-text",
        `Oops! player ${activePlayer + 1} rolled a ${dice} and lost his points`
      );
      document.querySelector(".player-1-box").classList.toggle("active");
      document.querySelector(".player-0-box").classList.toggle("active");
      currentScore = 0;
      changeText(`.current-score-${activePlayer}`, `${currentScore} points`);
      activePlayer = activePlayer === 0 ? 1 : 0;
    }
  }
});

document.querySelector(".hold").addEventListener("click", function () {
  if (score[activePlayer] + currentScore >= 100) {
    score[activePlayer] += currentScore;
    playing = false;
    changeText(`.total-score-${activePlayer}`, `${score[activePlayer]} points`);
    currentScore = 0;
    document
      .querySelector(`.player-${activePlayer}-box`)
      .classList.add("bggreen");
    changeText(
      ".control-text",
      `Hurray player ${activePlayer + 1} is the winner!`
    );
  } else {
    changeText(".control-text", `Player ${activePlayer + 1} held his points`);
    document.querySelector(".player-1-box").classList.toggle("active");
    document.querySelector(".player-0-box").classList.toggle("active");
    score[activePlayer] += currentScore;
    changeText(`.total-score-${activePlayer}`, `${score[activePlayer]} points`);
    currentScore = 0;
    changeText(`.current-score-${activePlayer}`, `${currentScore} points`);
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});

document.querySelector(".new-game").addEventListener("click", function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  diceEl.src = `dice-6.png`;
  document.querySelector(".player-1-box").classList.remove("active");
  document.querySelector(".player-0-box").classList.add("active");
  document.querySelector(`.player-0-box`).classList.remove("bggreen");
  document.querySelector(`.player-1-box`).classList.remove("bggreen");
  changeText(`.total-score-0`, `0 points`);
  changeText(`.total-score-1`, `0 points`);
  changeText(`.current-score-1`, `0 points`);
  changeText(`.current-score-0`, `0 points`);
  changeText(".control-text", `Roll the dice and enjoy!`);
});
