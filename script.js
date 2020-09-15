var questionHeader = document.querySelector(".question");
var contentEl = document.querySelector(".content");

homeScreen();

//opens home screen
function homeScreen() {
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

function startQuiz() {
    console.log("button pressed");
}