const questions=[
  {
    question: "Yara is ?",
    answers:[
      {text:"pretty", correct: true},
      {text:"mid", correct: false},
      {text:"huh", correct: false},
      {text:"no", correct: false},
    ]
  },
  {
    question: "yay?",
    answers:[
      {text:"pretty", correct: false},
      {text:"mid", correct: false},
      {text:"nay", correct: true},
      {text:"no", correct: false},
    ]
  },
  {
    question: "ABC... ?",
    answers:[
      {text:"D", correct: false},
      {text:"M", correct: false},
      {text:"N", correct: false},
      {text:"O", correct: true},
    ]
  }
];
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-button");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML= "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML= questionNo + " ." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button =document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct= answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}
function resetState(){
  nextButton.style.display= "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);

  }
}

function selectAnswer(e){
  const selectedOption=e.target;
  const isCorrect = selectedOption.dataset.correct === "true";
  if(isCorrect){
    selectedOption.classList.add("correct");
    score++;
  }else{
    selectedOption.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;

  });
  nextButton.style.display= "block";
}
function showScore(){
  resetState();
  questionElement.innerHTML= "You scored " + score + " out of " + questions.length +"!";
  nextButton.innerHTML= "Play Again";
  nextButton.style.display="block";
}
function handeleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else {
    showScore();
  }
}
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handeleNextButton();
  }else{
    startQuiz();
  }
});
startQuiz();
