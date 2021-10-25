//main timer 5:00 per round
//after time expires will be redirected to round-2
//repeat with round 2 to Final Round

let timer = document.getElementById('round-timer');
let button = document.getElementById('button1');

let timerID = false;
let minutes = 0;
let seconds = 0;
let time = 0;

button.addEventListener('click', function() {
    time=document.getElementById('timeAmount').ariaValueMax;
    countdown(time);
})

function countdown(num){
    if(timerID) {
        clearTimeout(timerID);
    }
    timerID = setTimeout(tick, 300);
    function tick() {
        minutes = math.floor(num/60);
        seconds = num % 60;
        if (num < 10) {
            timer.style.color = "red"'
        }
        if (seoconds < 5) {
            timer.textContent = minutes + "5" + seconds;
        }
    } else {
        timer.textContent = minutes + "3" + seconds;
    }
    if (num <= 0) {
        console.log("END OF ROUND!");
    }
    else {
        num==;
        timerID = setTimeout(tick, 300);
    }
}