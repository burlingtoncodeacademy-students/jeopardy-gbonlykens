//--------- game variables ---------- //
let playerOneScore = +sessionStorage.getItem("playerOneScore");
let playerTwoScore = +sessionStorage.getItem("playerTwoScore");
let questionCount = 0;
let playerTurn = "Player One";
let guessPassed;
let incorrectAnswers;
let passCount = 0;
let clickedItem;
let clueFill;
let thisItem;
let playerAnswer;
let currentAnswer;
let timedOut = 0;

//--------- timer variables ---------- //
let timerCount = 300;
let secondCount = 10;
let speed = 1000;
let countDiv = document.getElementById("timer");
let guessTimerDiv = document.getElementById("guess-timer");
let minutes = timerCount / 60;
let seconds = (timerCount % 60) + "0";
let timerExpired;

//doc declares
let gameboard = document.getElementById("gameboard");
let clicked = Array.from(document.getElementsByClassName("clue-card"));
let disabledGuess = document.getElementById("roundTwoGuess");
let disabledPass = document.getElementById("roundTwoPass");
let turn = document.getElementById("player-turn");
let playerOne = document.getElementById("playerOne");
let playerTwo = document.getElementById("playerTwo");
let answerInput = document.getElementById("answerInput");
let playerGuess = document.getElementById("roundTwoGuess");
let playerPass = document.getElementById("roundTwoPass");
let roundTwoStart = document.getElementById("round-two");

//functions to disable and enable pass and guess buttons
function disableButtons() {
    disabledGuess.disabled = true;
    disabledPass.disabled = true;
  }
  // allowing buttons
  function enableButtons() {
    disabledGuess.disabled = false;
    disabledPass.disabled = false;
  }
  
  //functions for disabling and enabling pass button only
  function disablePassBtn() {
    disabledPass.disabled = true;
  }
  
  // allowing pass button
  function enablePassBtn() {
    disabledPass.disabled = false;
  }
  
  //functions to disable and enable clicks after tile is chosen
  function disableClicks() {
    gameboard.style.pointerEvents = "none";
  }
  
  function enableClicks() {
    gameboard.style.pointerEvents = "auto";
  }

  let findItem = (arr) =>
  arr.find((item) => Object.values(item).includes(clickedItem));

  //styles text of the question in the square when clicked on
  function clueStyling(fill) {
    fill.clueFill.fontFamily = "monospace";
    fill.clueFill.fontSize = "14.5px";
    fill.clueFill.color = "white";
    fill.clueFill.textAlign = "center";
}
// -------------------------- Game Start ------------------------- //
  JeopardyStart();

  function JeopardyStart() {
      // alert message after game start
      alert(`Player 1 Starts! Have fun!`);

      // player turn and player scores
      turn.textContent = `Turn: ${playerTurn}`;
      playerOne.textContent = `Player One Score: ${playerOneScore}`;
      playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;

      // disabling buttons until someone picks a square
    disableButtons();

    // ------------- Round One Timer ----------- //
    // after game start and alert message, 5 minute round countdown begins
    //round timer: 5 minutes
roundTimer(timerCount);

function roundTimer(count) {
  interval = setInterval(Countdown, speed);

  function Countdown() {
    countDiv.textContent = `Round: ${minutes.toString()}: ${seconds.toString()}`;
    count--;
    minutes = Math.floor(count / 60);
    seconds = count % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    //takes players to round two if timer runs out
    if (count < 0) {
      clearInterval(interval);
      // to be displayed when clock hits 0
      alert("ROUND ONE OUT OF TIME!");
      // moves player's scores to the next round
      sessionStorage.setItem("playerOneScore", playerOneScore);
      sessionStorage.setItem("playerTwoScore", playerTwoScore);
      // specifies where it's moved to
      document.location = "round-2.html";
    }
  }
}
// -------------- Question Timer ------------ //
// timer for each player to read and answer their question
function guessTimer(count) {
    tick = setInterval(CountdownFive, speed);

    function CountdownFive() {

      guessTimerDiv.textContent = count;
      count--;

      //pass turn if guessTimer runs out
      if (count < 0) {
        timedOut++;
        // clears timer if previous player's timer hits 0
        clearInterval(tick);
        guessTimerDiv.textContent = "";

        //prevents other player from getting second chance if timer runs out and they previously passed
        if (playerTurn === "Player One" && guessPassed === true) {

          playerOneScore -= thisItem.amount;
          playerOne.textContent = `Player One Score: ${playerOneScore}`;
          playerTurn = "Player Two";
          guessTimerDiv.textContent = "";
          clueFill.textContent = "";
          questionCount++;
          turn.textContent = `Turn: ${playerTurn}`;
          enableClicks();
          disableButtons();

        } else if (playerTurn === "Player Two" && guessPassed === true) {
          playerTwoScore -= thisItem.amount;
          playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
          playerTurn = "Player One";
          guessTimerDiv.textContent = "";
          clueFill.textContent = "";
          questionCount++;
          turn.textContent = `Turn: ${playerTurn}`;
          enableClicks();
          disableButtons();
        }

        //gives other player a chance to answer if timer runs out and nobody has passed
        if (playerTurn === "Player One" && guessPassed === false) {
          disablePassBtn();
          playerOneScore -= thisItem.amount;
          playerOne.textContent = `Player One Score: ${playerOneScore}`;
          playerTurn = "Player Two";
          turn.textContent = `Turn: ${playerTurn}`;
          answerInput.value = "";
          // clears timer
          clearInterval(tick);
          guessTimer(secondCount);

        } else if (playerTurn === "Player Two" && guessPassed === false) {
          disablePassBtn();
          playerTwoScore -= thisItem.amount;
          playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
          playerTurn = "Player One";
          turn.textContent = `Turn: ${playerTurn}`;
          answerInput.value = "";
          // clears timer
          clearInterval(tick);
          guessTimer(secondCount);
        }

        //if both players time out, the last player who answered correctly
        if (timedOut === 2) {
          clearInterval(tick);
          guessTimerDiv.textContent = "";
          clueFill.textContent = "";
          questionCount++;
          answerInput.value = "";
          enableClicks();
          disableButtons();
          timedOut = 0;
        }
      }
    }
  }
// --------------- Grabbing Clicked on Clue -------------//
   //loops through array and finds the matching id of tile clicked and then assigns it to a variable
   getCLue();
   function getCLue() {
     //
     clicked.forEach((element) => {
       element.addEventListener("click", function () {
         clickedItem = this.categoryId;
         clueFill = document.getElementById(clickedItem);
 
         thisItem = findItem(roundTwoClues);
         styler(questionFill);
         clueFill.textContent = thisItem.question;
         enableButtons();
         disableClicks();
         guessTimer(secondCount);
         guessPassed = false;
         timerExpired = false;
         incorrectAnswers = 0;
         timedOut = 0;
         console.log(thisItem);
       });
     });
   }
// -------------- Player Passed Question ----------- //
   // after clue is obtained, if player doesn't know or doesn't want to answer, they will hit *pass* button, then goes to other player to steal the answer

  playerPass.addEventListener("click", () => {
    if (playerTurn === "Player One") {
      passCount++;
      playerTurn = "Player Two";
      turn.textContent = `Turn: ${playerTurn}`;
      clearInterval(tick);
      guessPassed = true;
      guessTimer(secondCount);
    } else if (playerTurn === "Player Two") {
      passCount++;
      playerTurn = "Player One";
      turn.textContent = `Turn: ${playerTurn}`;
      clearInterval(tick);
      guessPassed = true;
      guessTimer(secondCount);
    }
    if (passCount === 2) {
      clearInterval(tick);
      guessTimerDiv.textContent = "";
      clueFill.textContent = "";
      questionCount + enableClicks();
      disableButtons();
      passCount = 0;
    }
  });
// -------------- Player Guessed an Answer ------------- //
   //assigns player's answer to variable & checks it against correct answer
   playerGuess.addEventListener("click", () => {
    enableButtons();

    playerAnswer = answerInput.value.toLowerCase();
    currentAnswer = thisItem.answer.toLowerCase();

    //checks to see if player's answer is correct
    if (currentAnswer === playerAnswer) {
      passCount = 0;
      clearInterval(tick);
      guessTimerDiv.textContent = "";
      //clears question and answer and enables clicks for next turn
      answerInput.value = "";
      clueFill.textContent = "";
      questionCount++;

      if (playerTurn === "Player One" && timedOut === 1) {
        playerOneScore += thisItem.amount;
        playerOne.textContent = `Player One Score: ${playerOneScore}`;
        disableButtons();
        enableClicks();
      } else if (playerTurn === "Player Two" && timedOut === 1) {
        playerTwoScore += thisItem.amount;
        playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
        disableButtons();
        enableClicks();
      }
      //updates score for current player if answer is correct
      if (playerTurn === "Player One") {
        playerOneScore += thisItem.amount;
        playerOne.textContent = `Player One Score: ${playerOneScore}`;
        disableButtons();
        enableClicks();
      } else if ((playerTurn = "Player Two")) {
        playerTwoScore += thisItem.amount;
        playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
        disableButtons();
        enableClicks();
      }
    }

       //updates score for current player if answer is incorrect
       if (currentAnswer !== playerAnswer) {
        clearInterval(tick);
        guessTimerDiv.textContent = "";
        //clears question and answer and enables clicks for next turn
        answerInput.value = "";
  
        //updates score for current player if answer is incorrect
        if (playerTurn === "Player One" && passCount === 1) {
          playerOneScore -= thisItem.amount;
          playerOne.textContent = `Player One Score: ${playerOneScore}`;
          playerTurn = "Player Two";
          turn.textContent = `Turn: ${playerTurn}`;
          clueFill.textContent = "";
          questionCount++;
          disableButtons();
          enableClicks();

            // updating score & turn for player 2
        } else if (playerTurn === "Player Two" && passCount === 1) {
          playerTwoScore -= thisItem.amount;
          playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
          playerTurn = "Player One";
          turn.textContent = `Turn: ${playerTurn}`;
          clueFill.textContent = "";
          questionCount++;
          disableButtons();
          enableClicks();

        } else if (playerTurn === "Player One") {
          incorrectAnswers++;
          playerOneScore -= thisItem.amount;
          playerOne.textContent = `Player One Score: ${playerOneScore}`;
          playerTurn = "Player Two";
          turn.textContent = `Turn: ${playerTurn}`;
          disablePassBtn();

        } else if (playerTurn === "Player Two") {
          incorrectAnswers++;
          playerTwoScore -= thisItem.amount;
          playerTwo.textContent = `Player Two Score: ${playerTwoScore}`;
          playerTurn = "Player One";
          turn.textContent = `Turn: ${playerTurn}`;
          disablePassBtn();
        }
  
        //if both player are incorrect then that card is tossed
        if (incorrectAnswers === 2) {
          clueFill.textContent = "";
          questionCount++;
          answerInput.textContent = "";
          disableButtons();
          enableClicks();
          clearInterval(tick);
        }
      }
    });

    questionCount++;
    //ends round if all tiles have been selected. transfers scores to next round
    if (questionCount === 30) {
      alert("Round Two is now over! Next Round: Final Jeopardy.");
      sessionStorage.setItem("playerOneScore", playerOneScore);
      sessionStorage.setItem("playerTwoScore", playerTwoScore);
      document.location = "final-jeopardy.html";
    }
  // transfer of player scores to round two
    finalJeopardy.addEventListener("click", (evt) => {
      sessionStorage.setItem("playerOneScore", playerOneScore);
      sessionStorage.setItem("playerTwoScore", playerTwoScore);
      document.location = "final-jeopardy.html";
    });


  }
