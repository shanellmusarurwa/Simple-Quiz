const questions = {
    easy: [
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
      },
      {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: "JavaScript"
      },
      {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HomeTool Markup Language", "Hyperlinks and Text Markup Language", "HyperText Management Language"],
        correct: "HyperText Markup Language"
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<stylesheet>"],
        correct: "<style>"
      },
      {
        question: "How can you make a list that lists the items with bullets?",
        options: ["<ol>", "<dl>", "<ul>", "<list>"],
        correct: "<ul>"
      },
      {
        question: "Which attribute is used to provide a unique identifier for an HTML element?",
        options: ["id", "class", "name", "key"],
        correct: "id"
      },
      {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<br>", "<lb>", "<break>", "<line>"],
        correct: "<br>"
      }
    ],
    medium: [
      {
        question: "What is the output of `2 + 2 + '2'` in JavaScript?",
        options: ["6", "22", "NaN", "Error"],
        correct: "22"
      },
      {
        question: "Which CSS property is used to change the text color?",
        options: ["font-style", "color", "text-decoration", "background-color"],
        correct: "color"
      },
      {
        question: "How do you select an element with id 'main' in CSS?",
        options: ["#main", ".main", "main", "*main"],
        correct: "#main"
      },
      {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        options: ["alt", "title", "src", "href"],
        correct: "alt"
      },
      {
        question: "How can you center a block element horizontally using CSS?",
        options: ["text-align: center;", "margin: center;", "margin-left: auto; margin-right: auto;", "position: center;"],
        correct: "margin-left: auto; margin-right: auto;"
      },
      {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct: "font-size"
      },
      {
        question: "In CSS, what does `display: block;` do?",
        options: ["Makes the element display as an inline element", "Makes the element display as a block element", "Hides the element", "Makes the element display inline-block"],
        correct: "Makes the element display as a block element"
      }
    ],
    hard: [
      {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Mozilla", "Microsoft", "Google"],
        correct: "Netscape"
      },
      {
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        options: [
          "<script href='app.js'>",
          "<script name='app.js'>",
          "<script src='app.js'>",
          "<script file='app.js'>"
        ],
        correct: "<script src='app.js'>"
      },
      {
        question: "Which of the following is a correct way to declare a variable in JavaScript?",
        options: [
          "var myVar = 5;",
          "myVar = 5;",
          "int myVar = 5;",
          "declare myVar = 5;"
        ],
        correct: "var myVar = 5;"
      },
      {
        question: "How can you add a comment in JavaScript?",
        options: [
          "// This is a comment",
          "<!-- This is a comment -->",
          "# This is a comment",
          "* This is a comment *"
        ],
        correct: "// This is a comment"
      },
      {
        question: "Which built-in method can be used to convert a string to a number in JavaScript?",
        options: [
          "parseInt()",
          "Number()",
          "Both parseInt() and Number()",
          "parseFloat()"
        ],
        correct: "Both parseInt() and Number()"
      },
      {
        question: "What is the output of the following code: `console.log(typeof NaN);`?",
        options: [
          "'undefined'",
          "'null'",
          "'number'",
          "'NaN'"
        ],
        correct: "'number'"
      },
      {
        question: "Which of the following methods can be used to find HTML elements by class name?",
        options: [
          "document.getElementsByClassName()",
          "document.getElementsByClass()",
          "document.querySelectorAll()",
          "document.queryClassName()"
        ],
        correct: "document.getElementsByClassName()"
      },
      {
        question: "What does the '===' operator do in JavaScript?",
        options: [
          "Compares only values",
          "Compares both values and types",
          "Assigns a value to a variable",
          "Checks if a variable is defined"
        ],
        correct: "Compares both values and types"
      },
      {
        question: "Which keyword is used to define a constant in JavaScript?",
        options: [
          "const",
          "let",
          "var",
          "constant"
        ],
        correct: "const"
      },
      {
        question: "How can you find the length of an array in JavaScript?",
        options: [
          "array.size",
          "array.length",
          "array.count",
          "array.length()"
        ],
        correct: "array.length"
      },
      {
        question: "What will the following code output: `console.log(typeof []);`?",
        options: [
          "'object'",
          "'array'",
          "'list'",
          "'undefined'"
        ],
        correct: "'object'"
      },
      {
        question: "Which method can be used to convert a JavaScript object to a JSON string?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.toString()",
          "JSON.convert()"
        ],
        correct: "JSON.stringify()"
      }
    ]
  };
  
  
  let selectedQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;
  const minScoreThreshold = 5; 
  
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('time');
  const leaderboardElement = document.getElementById('leaderboard');
  const difficultyContainer = document.getElementById('difficulty-container');
  
  function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    scoreElement.innerText = `Score: ${score}`;
    clearLowScores(); 
    showQuestion();
    loadLeaderboard(); 
  }
  
  function selectDifficulty(difficulty) {
    selectedQuestions = questions[difficulty];
    difficultyContainer.style.display = 'none';
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('btn');
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
    startTimer();
  }
  
  function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    clearInterval(timer);
    timeLeft = 10;
    timerElement.innerText = timeLeft;
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        selectAnswer();
      }
    }, 1000);
  }
  
  function selectAnswer(e) {
    if (e) {
      const selectedButton = e.target;
      const selectedAnswer = selectedButton.innerText;
      const currentQuestion = selectedQuestions[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.correct) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
      }
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      button.classList.add(
        button.innerText === selectedQuestions[currentQuestionIndex].correct ? 'correct' : 'wrong'
      );
    });
  
    if (selectedQuestions.length > currentQuestionIndex + 1) {
      nextButton.style.display = 'block';
    } else {
      nextButton.innerHTML = "Restart";
      nextButton.style.display = 'block';
      saveScore(score); 
    }
    clearInterval(timer);
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
  }
  
  function saveScore(score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    loadLeaderboard();
  }
  
  function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardElement.innerHTML = leaderboard.map(score => `<li>${score}</li>`).join('');
  }
  
  function clearLowScores() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard = leaderboard.filter(score => score >= minScoreThreshold);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }
  
  document.getElementById('easy-btn').addEventListener('click', () => selectDifficulty('easy'));
  document.getElementById('medium-btn').addEventListener('click', () => selectDifficulty('medium'));
  document.getElementById('hard-btn').addEventListener('click', () => selectDifficulty('hard'));
  nextButton.addEventListener('click', () => {
    if (selectedQuestions.length > currentQuestionIndex + 1) {
      nextQuestion();
    } else {
      difficultyContainer.style.display = 'block';
    }
  });
  
  
  difficultyContainer.style.display = 'block';
  