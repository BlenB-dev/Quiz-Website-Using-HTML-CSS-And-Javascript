const startBtn = document.querySelector(".start-btn");
const popupinfo = document.querySelector(".popup-info");
const exitbtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");
const resultBox = document.querySelector(".result-box");
const tryAgain = document.querySelector(".tryAgain-btn");
const home_btn = document.querySelector(".goHome-btn");
const home_page = document.querySelector(".home");

function showQuestions(index) {
  const questionText = document.querySelector(".question-text");

  questionText.textContent = `${questions[index].numb}.${questions[index].questions}`;
  let optionTag = `<div class="option">
                <span>${questions[index].options[0]}</span>
              </div>
              <div class="option">
                <span>${questions[index].options[1]}</span>
              </div>
              <div class="option">
                <span>${questions[index].options[2]}</span>
              </div>
              <div class="option">
                <span>${questions[index].options[3]}</span>
              </div>`;
  optionList.innerHTML = optionTag;
  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
function optionSelected(answer) {
  let userAnswer = answer.textContent.trim();
  let correctAnswer = questions[questionCount].answers.trim();
  let alloptions = optionList.children.length;
  if (userAnswer == correctAnswer) {
    console.log("answers is correct");
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");
    for (let i = 0; i < alloptions; i++) {
      if (optionList.children[i].textContent.trim() == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  for (let i = 0; i < alloptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("active");
}

startBtn.addEventListener("click", function () {
  popupinfo.classList.add("active");
  main.classList.add("active");
});
exitbtn.addEventListener("click", function () {
  popupinfo.classList.remove("active");
  main.classList.remove("active");
});
continueBtn.addEventListener("click", function () {
  quizSection.classList.add("active");
  popupinfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(0);
  questionCounter(1);
});
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);
    questionNumber++;
    questionCounter(questionNumber);
    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};
function questionCounter(index) {
  const questionTotal = document.querySelector(".questions-total");
  questionTotal.textContent = ` ${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.innerHTML = `Score : ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");

  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue} % `;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(29, 19, 48, 1) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
tryAgain.addEventListener("click", function () {
  resultBox.classList.remove("active");
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  questionCount = 0;
  questionNumber = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumber);
  headerScore();
});
home_btn.addEventListener("click", function () {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");
  questionCount = 0;
  questionNumber = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumber);
  headerScore();
});
