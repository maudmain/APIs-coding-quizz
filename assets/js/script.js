// declare variables with querySelector
let startButton = document.querySelector("#start-button");
let timerElement = document.querySelector("#time");
let scores = document.querySelector(".scores");
let questionContainer = document.querySelector("#questions");
let startScreenDiv = document.querySelector("#start-screen");
let endScreenDiv = document.querySelector("#end-screen");
let finalScoreSpan = document.querySelector("#final-score");
let InitialsInput = document.querySelector("#initials");
let submitButton = document.querySelector("#submit");
let highScoreChart = document.querySelector("#highscores");
let clearButton = document.querySelector("#clear");
let correctAnswerAudio =document.querySelector("#correctAnswerAudio");
let incorrectAnswerAudio =document.querySelector("#incorrectAnswerAudio");

// declare variables needed
let time;
let timer;
let questionCounter;
let score;

questionsDOM = [];

// we need to retrieve the highscore from local storage (JSON.parse the string representation of the array)
highScoresArray = JSON.parse(window.localStorage.getItem("highScores")) ?? [];

/* the startGame function is called when the start button is clicked 
- the first question will appear (call transition function)
- timer starts (call setTimer function)
*/
function startGame() {

    questionCounter = -1; // starts at -1 so the first question is index 0

    // for each question in the array, declares a function where currentValue is q which is executed for every element in the array
    questionsArray.forEach(q => {
        //push the object into the array to keep them in scope (global scope, if not the object would disappear but not the elements)
        questionsDOM.push({
            //object attribute (key: value pairs)
            element: createQuestionDiv(q), // value = function result
            question: q, //question is assigned to the value of q
            answer: null //  placeholder to receive the answer
        })
    })
    startScreenDiv.className = "hide";

    setTimer();
    transition();
};


// function to create a div element for each question
function createQuestionDiv(question) {
    let questionDiv = document.createElement("div");
    let questionTitle = document.createElement("h2");

    //set all questionDiv to class hide
    questionDiv.className = "question hide";

    questionDiv.appendChild(questionTitle);
    questionContainer.appendChild(questionDiv);
    questionTitle.textContent = question.title;

    question.options.forEach(o => {
        let optionDiv = document.createElement("div");
        optionDiv.className = "choices";
        questionDiv.appendChild(optionDiv);

        // create a button for each answer
        let answerButton = document.createElement("button");
        answerButton.textContent = o.answer;
        optionDiv.appendChild(answerButton)

        //create the option element with data-state  isCorrect = true
        //nullish-coalescing operator to be used to bypass the undefined or null results
        answerButton.dataset.isCorrect = o.isCorrect ?? false

        // add eventListener for the answer button and pass the reference to the function
        answerButton?.addEventListener("click", answerClick);
    });
    return questionDiv;
}

/* when the user click an answer
- move to next question
- remove time if incorrect answer
*/
// button background color set for debugging purposes
function answerClick(event) {
    let currentQuestion = questionsDOM[questionCounter];

    if (event.target.dataset.isCorrect === 'true') {
        event.target.className = "correct";
        currentQuestion.answer = true;
        correctAnswerAudio.play();
        

    } else {
        event.target.className = "incorrect";
        currentQuestion.answer = false;
        time -= 5;
        incorrectAnswerAudio.play();
    }
    transition();
}

// set a timer
function setTimer() {
    time = questionsArray.length * 7;
    timer = setInterval(function () {
        time--;
        timerElement.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            timerElement.textContent = "Time Off. Game over";
            endGame();
        }
    }, 1000);
}

// add eventListener for startGame when clicking the button (not on page loading)
startButton?.addEventListener("click", () => { startGame() });

// transition function
// hide the current question once answer and move to the next one ()
function transition() {
    if (questionCounter >= 0) {
        let currentQuestion = questionsDOM[questionCounter];
        currentQuestion.element.className = "question hide";
    }
    questionCounter++;

    if (questionCounter < questionsDOM.length) {
        let newQuestion = questionsDOM[questionCounter];
        newQuestion.element.className = "question";
    } else {
        endGame();
    }
}

// function endGame
function endGame() {
    clearInterval(timer);
    score = 0;
    questionsDOM.forEach(q => {
        q.element.className = "question hide";
        if (q.answer === true) {
            score++;
        }
        q.element.querySelectorAll("button").forEach(b => b.removeEventListener("click", answerClick));
    });

    // end-screen to be displayed, change class
    endScreenDiv.className = "";
    finalScoreSpan.textContent = score;
}

// scores to be stored localy and retrieve on the highscores page
submitButton?.addEventListener("click", function (event) {
    event.preventDefault();
    //create and array to hold the initials and scores
    let initials = InitialsInput.value;
    highScoresArray.push({
        initials: initials,
        score: score
    })
    // set the local storage
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));
})

// set the highscores chart
if (highScoreChart) {
    highScoresArray.forEach(hs => {
        let scoreEntry = document.createElement("li");
        scoreEntry.textContent = hs.initials + " with " + hs.score + " points";
        highScoreChart.appendChild(scoreEntry);
    })
}

// clear the data from the highscore page
function clearData() {
    localStorage.clear();
    highScoreChart.innerHTML = "";
}
clearButton?.addEventListener("click", clearData);


