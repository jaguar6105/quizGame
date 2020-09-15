var questionHeader = document.querySelector(".question");
var contentEl = document.querySelector(".content");
var homeNav = document.querySelector(".home");
var scoreNav = document.querySelector(".highScore");
var timeEl = document.querySelector(".time");

var question1 = [false, false, false, true];
var questionText;
var answer = []
var question2 = [false, true, false, false];
var question3 = [false, false, false, true];
var question4 = [true, false, false, false];
var question5 = [false, false, true, false];

var counter;
var score;
var allScores = [];

init();

homeScreen();

homeNav.addEventListener("click", homeScreen);
scoreNav.addEventListener("click", highScores);

var secondsLeft;
var timerInterval;

function setTime() {
    timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      emptyContent();
      scoreScreen();
    }

  }, 1000);
}

//clear main div of elements
function emptyContent() {
    while (contentEl.firstChild) {
        contentEl.removeChild(contentEl.firstChild);
    }
}

//opens home screen
function homeScreen() {
    emptyContent();
    
    clearInterval(timerInterval);

    score = 0;
    counter == -1;

    //fill question
    questionHeader.textContent = "Coding Quiz";


    // create p
    var text = document.createElement("p");
    text.textContent = "Answer the questions within the time limit."
    contentEl.appendChild(text);

    //create button
    var start = document.createElement("button");
    start.className = "btn btn-primary";
    start.textContent = "START";
    start.addEventListener("click", startQuiz);
    contentEl.appendChild(start);
}

//start quiz
function startQuiz() {

    //remove start page
    emptyContent();

    //render question buttons
    for (var i = 0; i < 4; i++) {

        var button = document.createElement("button");
        button.className = "btn btn-primary";

        button.id = "btn" + i;

        button.setAttribute("value", i);
        contentEl.appendChild(button);
    }


    counter = 1;
    secondsLeft = 6;
    setTime();
    questionScreen();
}


//individual question screen
function questionScreen() {

    getQuestion(counter);
    questionHeader.textContent = "Question " + counter + ": " + questionText;



    //generate button text
    for (var i = 0; i < 4; i++) {

        var button = document.querySelector("#btn" + i);

        button.textContent = answer[i];
    }
}

//if wrong
function incorrect() {
    counter++;
    score--;
    if (counter < 6) {
        questionScreen();
    }
    else {
        emptyContent();
        scoreScreen();
    }
}


//if right
function correct() {
    counter++;
    score++;
    if (counter < 6) {
        questionScreen();
    }
    else {
        emptyContent();
        scoreScreen();
    }
}

//get question arrays to fill button text
function getQuestion(counter) {

    if (counter == 1) {
        answer = ["orange", "yellow", "green", "blue"]
        questionText = "What color is the sky?";
        return question1;
    }
    else if (counter == 2) {
        answer = ["orange", "red", "yellow", "blue"]
        questionText = "What color is an apple?";

        return question2;
    }
    else if (counter == 3) {
        answer = ["orange", "red", "yellow", "blue"]
        questionText = "What color is water?";

        return question3;
    }
    else if (counter == 4) {
        answer = ["orange", "red", "yellow", "blue"]
        questionText = "What color is an orange?";

        return question4;
    }
    else if (counter == 5) {
        answer = ["orange", "red", "yellow", "blue"]
        questionText = "What color is an banana?";

        return question5;
    }

}

contentEl.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true && counter > 0 && counter < 6) {
        // Get its data-index value and remove the todo element from the list
        var index = element.getAttribute("value");
        var question = getQuestion(counter);
        if (question[index]) {
            correct()
        }
        else if (question[index] == false) {
            incorrect();
        }
    }
});



//creates save score screen
function scoreScreen() {
    clearInterval(timerInterval);
    score = score + secondsLeft;

    questionHeader.textContent = "Your score is " + score;

    var form = document.createElement("form");
    var textIn = document.createElement("input");
    var submit = document.createElement("input");

    textIn.setAttribute("type", "text");
    textIn.setAttribute("id", "initials");

    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "submit");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        allScores.push(textIn.value + " - " + score)
        localStorage.setItem("scores", JSON.stringify(allScores));

        contentEl.removeChild(form);
        highScores();
    });

    contentEl.appendChild(form);
    form.appendChild(textIn);
    form.appendChild(submit);
}

//initialize high scores
function init() {
    var test = localStorage.getItem("scores");
    if (test) {
        allScores = JSON.parse(test);
    }
}

//initializes high score screen
function highScores() {
    emptyContent();
    clearInterval(timerInterval);



    questionHeader.textContent = "High Scores";
    var list = document.createElement("ul");
    var home = document.createElement("button");
    var clearList = document.createElement("button");

    contentEl.appendChild(list);

    home.textContent = "Home screen";
    contentEl.appendChild(home);

    clearList.textContent = "Clear Scores";
    contentEl.appendChild(clearList);



    for (var i = 0; i < allScores.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.textContent = allScores[i];
        list.appendChild(scoreEl);
    }



    home.addEventListener("click", function () {
        emptyContent();

        homeScreen();
    });

    clearList.addEventListener("click", function () {
        for (var i = 0; i < allScores.length; i++) {
            var scoreEl = document.querySelector("li");

            list.removeChild(scoreEl);
        }
        allScores = [];
        localStorage.setItem("scores", JSON.stringify(allScores));
    });

}

