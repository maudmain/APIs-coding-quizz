// declare variables with querySelector
let startButton = document.querySelector("#start-button");
let timerElement = document.querySelector("#time");
let scores = document.querySelector(".scores");
let questionContainer = document.querySelector("#questions");


// declare variables needed
let time;
let timer;
let questionCounter;
let score;

questionsDOM = [];

/* the startGame function is called when the start button is clicked 
- the first question will appear (call transition function)
- timer starts (call setTimer function)
*/
function startGame() {

    questionCounter = -1; // starts at -1 so the first question is index 0

    // ?? 
    questionsArray.forEach(q => {
        questionsDOM.push({
            element: createQuestionDiv(q),
            question: q,
            answer: null
        })
    })

   
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
        optionDiv.class = "choices";
        questionDiv.appendChild(optionDiv);

        // create a button for each answer
        let answerButton = document.createElement("button");
        answerButton.textContent = o.answer;
        optionDiv.appendChild(answerButton)

        //create the option element with data-state  isCorrect = true
        //nullish-coalescing operator to be used to bypass the undefined or null results
        answerButton.dataset.isCorrect = o.isCorrect ?? false

        // add eventListener for the answer button and pass the reference to the function
        answerButton.addEventListener("click", answerClick);

    });

    return questionDiv;

}
/* when the user click an answer
- move to next question
- remove time if incorrect answer
*/
function answerClick(event) {
    let currentQuestion = questionsDOM[questionCounter];


    if (event.target.dataset.isCorrect === 'true') {
        event.target.className = "correct";
        currentQuestion.answer = true;
       

    } else {
        event.target.className = "incorrect";
        currentQuestion.answer = false;
        time -= 5;


    }
    transition();
}

// set a timer
function setTimer() {
    time = questionsArray.length * 7;
    let timer = setInterval(function () {
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
startButton.addEventListener("click", () => { startGame() });

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
    score = 0;
    questionsDOM.forEach(q => {
        q.element.className = "question";
        if (q.answer === true) {
            score++;
        }
        q.element.querySelectorAll("button").forEach(b => b.removeEventListener("click", answerClick) );
    });
    alert("you're score is " + score);
}

// end-screen to be displayed instead of start-screen



// scores to be stored localy and retrieve on the highscores page

