var questionSet = ["questionSetOne", "questionSetTwo", "questionSetThree"];
var answerSet = ["answerSetOne", "answerSetTwo", "answerSetThree"];

//variables

var highscore = 0;
var initials = "";
if(localStorage.getItem(highscore) !== undefined) {
    highscore = localStorage.getItem(highscore);
    initials = localStorage.getItem(initials)
}
var questionNumber = 0;
var score = 0;
var timeLeft = 20;
var timerId = undefined; 
var answers = ["0", "function (functionName)() {};", "no", "Visual Studio Code"];

var questionSetZero = "what number do indexes start at?";
var choicesSetZero = ["0", "1", "2", "-1"]

var questionSetOne = "How do you declare a function in JS";
var choicesSetOne = ["var (varname) === function() {};", "function (functionName)() = {};", "function (functionName)() {};", "public static void (functionName)() {};"];

var questionSetTwo = "will (0.1 + 0.2 === 0.3) return true";
var choicesSetTwo = ["yes", "no", "maybe?", "i don't know", "can you repeat the question?"];

var questionSetThree = "What does VSC stand for?";
var choicesSetThree = ["Very Strange Code", "Visual Studio Code", "Velociraptors Shouldn't Code", "Vacantly Staring at Code"];

//variables for quick referencing
var questionContainer = $("#question_div");
var answerButton = $(".answerButton");

//Functions


function timer() {
    if (timeLeft < 0) {
        clearInterval(timerId);
        endQuiz();
    } else {
        $("#countdownTimer").text(timeLeft + " seconds remaining");
        timeLeft--;
    }
}
//resets quiz, sets highscore and gets initials.
function endQuiz() {
    score = timeLeft;

    if (score > highscore) {
        highscore = score;
        initials = prompt("You got a highscore! Enter your initials below: ");
        localStorage.setItem("highscore", highscore);
        localStorage.setItem("initials", initials);
        
    }
    
    questionContainer.empty();
    $(".main").attr("style", "visibility: visible");
    $("#header").text("Retake the quiz?");
    questionContainer.text("HighScore: " + highscore + " (" + initials + ")");
    questionNumber = 0;
    score = 0;
    timeLeft = -1;
}

//sets the questions.
function generateQuestions(questionSetNumber, answerSetNumber) {
    $(".main").attr("style", "visibility: collapse"); 
    questionContainer.empty();
    var questionTitle = $("<h2>");
    questionTitle.text(questionSetNumber);
    questionContainer.append(questionTitle);

    //questions
    for(i = 0; i < 4; i++) {
        var choiceButton = $("<button>");
        choiceButton.addClass("choiceButton");
        choiceButton.text(answerSetNumber[i]);
        questionContainer.append(choiceButton);
    };

    //when choosing a score
    $(".choiceButton").on("click", function() {
        if (answers[questionNumber] === this.textContent) {
        } else {
            timeLeft -= 10;
        }

        questionNumber++;

        if (questionNumber === 1) {
            generateQuestions(questionSetOne, choicesSetOne);
        } else if (questionNumber === 2) {
            generateQuestions(questionSetTwo, choicesSetTwo);
        } else if (questionNumber === 3) {
            generateQuestions(questionSetThree, choicesSetThree);
        } else {
            endQuiz();
        }
    });
};

//begin quiz
$("#confirm").on("click", function() {
    timeLeft = 20;
    timerId = setInterval(timer, 1000);
    generateQuestions(questionSetZero, choicesSetZero);
});

//deny quiz
$("#deny").on("click", function() {
    window.close();
})