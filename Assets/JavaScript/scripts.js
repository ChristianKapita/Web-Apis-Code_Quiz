//Questions , choises & answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        title:
            "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

// Globals variables - track quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//Globals variables - reference to DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

//Function to start the quiz
function generateQuiz(){
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;
  showQuestion();
  
}

//Function to get question from the array questuions
function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
      choiceNode.textContent = i + 1 + ". " + choice;
      choiceNode.onclick = checkChoice;
      choicesEl.appendChild(choiceNode);
    });
  }

  //function to check user choise
  function checkChoice(){
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = "Wrong!";
      feedbackEl.style.color="Red";
     
    } 
    else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color="lightgreen";
  }
  // Display feedback for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 4000);

  // Next question
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    showQuestion();
  }
}

//Function to end the quiz
function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

//set up timing 
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  }

//Function to save scores
function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "scores.html";
  }
}

//function to check if user pressed Enter 
function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
//call function highScore() yo save score when user click on submit button
submitBtn.onclick = saveHighscore;

//call function generateQuiz() to start the quiz when user click on start 
startBtn.onclick = generateQuiz;

//call function  checkForEnter() to check key pressed submitting max
initialsEl.onkeyup=checkForEnter;

