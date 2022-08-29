// Get point counter
const counter = document.querySelector(".p-counter");
// Get text for timer
const timer = document.querySelector(".p-timer");
const countDownTime = 20;  // Default countdown time
let totalPoint = 0;
let level = 1;
let time = countDownTime;

// Create const for instruction
const instruction = document.getElementsByClassName("description")[0];
// Create const for buttons with class 'color-button'
const optionButtons = document.querySelectorAll(".color-button");

// Create array for task types
coloursOrText = ['text', 'color'];
// Create array of colours
const coloursAll = ["Red", "Blue", "Green", "Aqua", "Yellow", "Grey", "Brown", "Purple", "Pink", "Orange", "Black"];
let coloursSelected = coloursAll.slice(0, 3);

// Get the start button
const start = document.getElementsByClassName("start-button")[0];
// Get the restart button
const restart = document.getElementsByClassName("start-again-button")[0];
// Get the link to wikipedia
const link = document.getElementsByClassName("link-description")[0];

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

// crate a function for timer
function timerFunction() {
    let seconds = time;
    seconds = seconds < 10 ? "0" + seconds: seconds;
    timer.innerHTML = `${seconds} seconds`;
    if (time == 0) {
        clearInterval(myInterval);
        restart.style.display = "inline-block";
        restart.classList.remove("hide");
        responseText.classList.remove("hide");
        taskText.style.display = "none";
        counter.classList.add("hide");
        timer.classList.add("hide");
        responseText.innerHTML = `Time is over! <br> Your point is: ${totalPoint}. <br><br> Do u wanna try again?`;
        for (let l = 0; l < optionButtons.length; l++){
            optionButtons[l].classList.add("hide");
            optionButtons[l].style.display = "none";
        }
    }
    timer.style.color = (time <= 3) ? "red" : "black";
    time--;
}

taskText.style.display = "none";

// create a function for start button
function startFunction() {
    restart.classList.add("hide");
    timer.classList.remove("hide");
    instruction.classList.add("hide");
    myInterval = setInterval (timerFunction, 1000);
    timerFunction();
    start.classList.add("hide");
    link.style.display = "none";
    start.style.display = "none";
    taskText.style.display = "block";
    taskText.classList.remove("hide");
    counter.classList.remove("hide");
    totalPoint = 0;
    counter.innerHTML = `Point: ${totalPoint}`;
    for (let l = 0; l < optionButtons.length; l++) {
        optionButtons[l].classList.remove("hide");
        optionButtons[l].style.display = "inline-block";
    }
}
// create a function witch will check is event.target (text with color in task) == pressed button with color
function checkColours() {
    // Answer is correct
    if (((event.target.innerHTML == taskColor.innerHTML) && (taskDescription.innerHTML == 'text')) 
        || ((event.target.style.color == taskColor.innerHTML.toLowerCase()) && (taskDescription.innerHTML == 'color')))
    {
        time = countDownTime - level * 2 < 3 ? 3 : countDownTime - level * 2;
        level += 1;
        totalPoint += 5;
        // Add one more color
        if (level + 1 < coloursAll.length)
            coloursSelected.push(coloursAll[level + 1]);
        // Set text and colors
        setColors()
        counter.classList.remove("hide");
        counter.innerHTML = `Point: ${totalPoint}`;
    } 
    else { // Answer is wrong
        clearInterval(myInterval);
        for (let v = 0; v < optionButtons.length; v++) {
            optionButtons[v].style.display = "none";
        }
        restart.style.display = "inline-block";
        restart.classList.remove("hide");
        responseText.classList.remove("hide");
        responseText.innerHTML = `Not correct! <br> Your point is: ${totalPoint}. <br><br> Do u wanna try again?`;
        taskText.style.display = "none";
        counter.classList.add("hide");
        timer.classList.add("hide");
    }
}

// crate a function for restart button
function reset() {
    responseText.innerHTML = "";
    taskText.style.display = "inline-block";
    restart.style.display = "none";
    totalPoint = 0;
    time = countDownTime;
    startFunction()
}