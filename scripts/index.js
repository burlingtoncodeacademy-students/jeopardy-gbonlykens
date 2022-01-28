// let's begin
let startGame = document.getElementById("start-game");
playerCount = "Multiplayer Game";

startGame.addEventListener("click", (evt) => {
    document.location = "round-1.html#" + playerCount;
    evt.preventDefault();
});