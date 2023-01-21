// declare variables with querySelector
let startButton = document.querySelector("#start-button");
let timerElement = document.querySelector(".timer");
let scores = document.querySelector(".scores");
let questionContainer = document.querySelector("#questions");

// declare variables needed
let timer;
let timerCount;

questionsDOM = [];


function startGame() {

    questionsArray.forEach(q => {
        questionsDOM.push({
            element: createQuestionDiv(q),
            question: q,
            answer: null
        })
    })
};

function createQuestionDiv(question) {
    let questionDiv = document.createElement("div");
    let questionTitle = document.createElement("h2");
    questionDiv.appendChild(questionTitle);
    questionContainer.appendChild(questionDiv);
    questionTitle.textContent = question.title;

    question.options.forEach(o => {
        let optionDiv = document.createElement("div");
        optionDiv.class = "choices";
        questionDiv.appendChild(optionDiv);

        // create a button for each answer
        let answerButton =document.createElement ("button");
        answerButton.textContent = o.answer;
        optionDiv.appendChild(answerButton)

        //create the option element with data-state  isCorrect = true
        //nullish-coalescing operator to be used to bypass the undefined or null results
        answerButton.dataset.isCorrect = o.isCorrect ?? false

        // add eventListener for the answer button and pass the reference to the function
        answerButton.addEventListener("click",answerClick );
      
    });



    return questionDiv;

}
function answerClick (event){
    event.target.className = "correct";


};



startGame();