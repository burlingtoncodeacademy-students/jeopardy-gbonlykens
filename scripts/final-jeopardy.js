// get the two players' current scores from the last round in session storage
let playerOneScore = +sessionStorage.getItem("playerOneScore");
let playerTwoScore = +sessionStorage.getItem("playerTwoScore");

// doc declares (players)
let playerOne = document.getElementById("playerOne");
let playerTwo = document.getElementById("playerTwo");

// doc declare (final jeopardy question)
let finalQuestion = document.getElementById("finalQuestion");

// doc declares (wagers)
let playerOneWagerInput = document.getElementById("playerOneWager");
let playerTwoWagerInput = document.getElementById("playerTwoWager");

//doc declares (final wager submits)
let playerOneWagerSubmit = document.getElementById("playerOneWagerSubmit");
let playerTwoWagerSubmit = document.getElementById("playerTwoWagerSubmit");

// doc declares (final answers)
let playerOneAnswerInput = document.getElementById("playerOneAnswerInput");
let playerTwoAnswerInput = document.getElementById("playerTwoAnswerInput");

// doc declares (answer submits)
let playerOneAnswerSubmit = document.getElementById("playerOneAnswerSubmit");
let playerTwoAnswerSubmit = document.getElementById("playerTwoAnswerSubmit");

let finalJeopardyQuestion = {
    id: "finalQuestion",
    categoryID: "Body of Water",
    question: "A stretch of salt water seperated from the sea by a sandbar, coral reef, or barrier reef is what?",
    answer: "lagoon"
}

// ------------- Final Jeopardy --------------- //
finalJeopardyStart();
finalJeopardyStart() {
    // disabling final answer guess input button until after wager is submitted
  playerOneAnswerInput.ariaDisabled = true;
  playerTwoWagerInput.disabled = true;

  playerOneAnswerSubmit.ariaDisabled = true;
  playerTwoAnswerInput.disabled = true;

  playerTwoWagerSubmit.ariaDisabled = true;
  playerTwoAnswerSubmit.ariaDisabled = true;

    // before players make their wagers
  finalQuestion.textContent = "Enter your wager. Make sure it does not exceed the amount you currently have.";
  playerOne.textContent = `Player One Score: ${playerOneScore}`;
  playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;

  // player one's wager is assigned to var
  playerOneWagerSubmit.addEventListener("click", (evt) => {
      // preventing default action
      evt.preventDefault();
      // wager amount stored in playerOneWager variable
      playerOneWager = +playerOneWagerInput.value;
        // player one enabled, player two disabled for now
      playerOneWagerInput.disabled = true;
      playerTwoWagerInput.disabled = false;

      playerOneWagerSubmit.disabled = true;
      playerTwoWagerSubmit.disabled = false;
  });

  // player two's wager is assigned to var
  playerTwoWagerSubmit.addEventListener("click", (evt) => {
    // preventing default action
    evt.preventDefault();
    // wager amount stored in playerTwoWager variable
    playerTwoWager = +playerTwoWagerInput.value;
     
    finalQuestion.textContent = finalJeopardyQuestion.question;

    playerTwoWagerSubmit.disabled = true;

    playerTwoWagerInput.disabled = true;
    playerOneAnswerInput.disabled = false;

    playerOneAnswerSubmit.disabled = false;
    playerTwoAnswerSubmit.disabled = true;
});

// player one answer submission
playerOneAnswerSubmit.addEventListener("click", (evt) => {
    evt.preventDefault();
    // variable to store player one's answer input 
    playerOneAnswer = playerOneAnswerInput.value.toLowerCase();
// only disable player one
    playerOneAnswerSubmit.disabled = true;
    playerTwoAnswerSubmit.disabled = false;

    playerOneAnswerInput.disabled = true;
    playerTwoAnswerInput.disabled = false;
});

// now player two's answer and storing into variable
playerTwoAnswerSubmit.addEventListener("click", (evt) => {
    // prevent default action
    evt.preventDefault();
    // player two's answer stored in playertwoanswer variable
    playerTwoAnswer = playerTwoAnswerInput.value.toLowerCase();
    // won't be needing that anymore
    playerTwoAnswerSubmit.disabled = true;
    EndOfGamePlayerScores();
});

function EndOfGamePlayerScores() {
    // check player one answer and adjust score accordingly + or -
    if (playerOneAnswer === finalJeopardyQuestion.answer) {
        playerOneScore += playerOneWager;
        playerOne.textContent = `Player One Score: ${playerOneScore}`;
        // if wrong take wager away from score & display new score
    } else {
        playerOneScore -= playerOneWager;
        playerOne.textContent = `Player One Score: ${playerOneScore}`
    }
// same checking logic for player 2
// if answer is right add wager to player score
    if (playerTwoAnswer === finalJeopardyQuestion.answer) {
        playerTwoScore += playerTwoWager;
        playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
        // else take away player two wager from score
    } else {
        playerOneScore -= playerOneWager;
        playerOne.textContent = `Player Two Score: ${playerTwoScore}`;
     }
    };
}


