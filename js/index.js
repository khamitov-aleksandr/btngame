// Get point counter
const counter = document.querySelector(".js-counter");
// Get text for timer
const timer = document.querySelector(".js-timer");
const countDownTime = 20;  // Default countdown time
let totalPoint = 0;
let level = 1;
let time = countDownTime;

// Create const for instruction
const instruction = document.querySelector(".js-description");
// Create const for buttons with class 'color-button'
const optionButtons = document.querySelectorAll(".color-button");

// Create array for task types
let coloursOrText = ['text', 'color'];
// Create array of colours
const coloursAll = ["Red", "Blue", "Green", "Aqua", "Yellow", "Grey", "Brown", "Purple", "Pink", "Orange", "Black"];
let coloursSelected = coloursAll.slice(0, 3);

// Get the start button
const start = document.querySelector(".start-button");
// Get the restart button
const restart = document.querySelector(".start-again-button");
// Get the link to wikipedia
const link = document.querySelector(".link-description");

// Add event for for start button
start.addEventListener("click", startFunction);
// Add event for for restart button
restart.addEventListener("click", reset);

// Get task and response texts
const taskText = document.querySelector(".game-task");
const responseText = document.querySelector(".game-response");

// Get task type text
const taskDescription = document.querySelector("span");
// Get task color
const taskColor = document.querySelector("em");

// Set text and colors
setColors()

function setColors(){
    // A function for setting button colours
    let colours = coloursSelected.sort(() => Math.random() - 0.5).slice(0, 3);
    taskDescription.innerHTML = coloursOrText[Math.floor(Math.random() * coloursOrText.length)];
    // change text inside of em 
    taskColor.innerHTML = colours[Math.floor(Math.random() * colours.length)];
    // shiuffle (sort) text of colours and colours 
    let shuffledColoursTexts = colours.slice();
    let shuffledColours = colours.sort(() => Math.random() - 0.5).slice();
    for (let n = 0; n < colours.length; n++) {
        // change the text inside of buttons
        optionButtons[n].innerHTML = shuffledColoursTexts[n];
        // change  style colours for the text inside of buttons
        optionButtons[n].style.color = shuffledColours[n];
        // add events for each colorful bottons
        optionButtons[n].addEventListener("click", checkColours);
    }
}

// create a function for timer
function timerFunction() {
    let seconds = time;
    seconds = seconds < 10 ? "0" + seconds: seconds;
    timer.innerHTML = `${seconds} seconds`;
    if (time == 0) {
        clearInterval(myInterval);
        restart.classList.remove("hide");
        responseText.classList.remove("hide");
        taskText.classList.add("hide");
        counter.classList.add("hide");
        timer.classList.add("hide");
        responseText.innerHTML = `Time is over! <br> Your point is: ${totalPoint}. <br><br> Do u wanna try again?`;
        for (let l = 0; l < optionButtons.length; l++){
            optionButtons[l].classList.add("hide");
        }
    }
    timer.style.color = (time <= 3) ? "red" : "black";
    time--;
}

taskText.classList.add("hide");

// create a function for start button
function startFunction() {
    restart.classList.add("hide");
    timer.classList.remove("hide");
    instruction.classList.add("hide");
    myInterval = setInterval (timerFunction, 1000);
    timerFunction();
    start.classList.add("hide");
    link.classList.add("hide");
    taskText.classList.remove("hide");
    counter.classList.remove("hide");
    totalPoint = 0;
    counter.innerHTML = `Point: ${totalPoint}`;
    for (let l = 0; l < optionButtons.length; l++) {
        optionButtons[l].classList.remove("hide");
    }
}

// create a function witch will check is event.target (text with color in task) === pressed button with color
const isAnswerCorrect = (guessType, event) => {
    return guessType === 'text' ?
        event.target.innerHTML === taskColor.innerHTML:
        event.target.style.color === taskColor.innerHTML.toLowerCase();
}

// create a function witch will check is answer is correct or not
function checkColours() {
    // Answer is correct
    if (isAnswerCorrect(taskDescription.innerHTML, event)) {
        time = countDownTime - level * 2 < 3 ? 3 : countDownTime - level * 2;
        level += 1;
        totalPoint += 5;
        // Add one more color
        if (level + 1 < coloursAll.length) {
            coloursSelected.push(coloursAll[level + 1]);
        }
        // Set text and colors
        setColors()
        counter.classList.remove("hide");
        counter.innerHTML = `Point: ${totalPoint}`;
    } 
    else { // Answer is wrong
        clearInterval(myInterval);
        for (let v = 0; v < optionButtons.length; v++) {
            optionButtons[v].classList.add("hide");
        }
        restart.classList.remove("hide");
        responseText.classList.remove("hide");
        responseText.innerHTML = `Not correct! <br> Your point is: ${totalPoint}. <br><br> Do u wanna try again?`;
        taskText.classList.add("hide");
        counter.classList.add("hide");
        timer.classList.add("hide");
    }
}

// crate a function for restart button
function reset() {
    responseText.innerHTML = "";
    taskText.classList.remove("hide");
    restart.classList.remove("hide");
    totalPoint = 0;
    time = countDownTime;
    startFunction()
}