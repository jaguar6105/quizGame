var questionHeader = document.querySelector(".question");
var contentEl = document.querySelector(".content");

var question1 = [false, false, false, true];
var question2 = [false, true, false, false];
var question3 = [false, false, false, true];
var question4 = [true, false, false, false];
var question5 = [false, false, true, false];

var counter;
var score;

homeScreen();

//opens home screen
function homeScreen() {
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
    var buttons = document.querySelector(".btn");
    var summary = document.querySelector("p");
    contentEl.removeChild(buttons);
    contentEl.removeChild(summary);

    //render question buttons
    for (var i = 0; i < 4; i++) {
    
        var button = document.createElement("button");
        button.className = "btn btn-primary";

        button.id = "btn"+i;
        
        button.setAttribute("value", i);
        contentEl.appendChild(button);
    }


    counter = 1;
    questionScreen();
}


//individual question screen
function questionScreen() {
    questionHeader.textContent = "Question " + counter;

    var question = getQuestion(counter);


    //generate button text
    for (var i = 0; i < 4; i++) {
    
        var button = document.querySelector("#btn"+i);
    
        button.textContent = question[i];
  /*      if(question[i]) {
            button.addEventListener("click", correct);
        }
        else {
            button.addEventListener("click", incorrect);
        }*/
      }
}

//if wrong
function incorrect() {
    counter++;
    console.log("Wrong");
    if(counter < 6) {
        questionScreen();
    }
}


//if right
function correct() {
    counter++;
    console.log("correct");
    if(counter < 6) {
        questionScreen();
    }
}

function getQuestion(counter) {

    if(counter == 1) {
        return question1;
    }
    else if(counter == 2) {
        return question2;
    }
    else if(counter == 3) {
        return question3;
    }
    else if(counter == 4) {
        return question4;
    }
    else if(counter == 5) {
        return question5;
    }

}

contentEl.addEventListener("click", function(event) {
    var element = event.target;
  
    // If that element is a button...
    if (element.matches("button") === true  && counter > 0 && counter<6) {
      // Get its data-index value and remove the todo element from the list
      var index = element.getAttribute("value");
      var question = getQuestion(counter);
        if(question[index]) {
            correct()
        }
        else if (question[index] == false) {
            incorrect();
        }
    }
  });


