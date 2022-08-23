import { subjectQuestions, personalityQuestions } from "../js/data.js";

//assessment
//changing questions and keeping scores

const assessmentQuestion = document.querySelector(".question");
const answerOptions = document.querySelectorAll("[name='answer']");
const previousQuestionBtn = document.querySelector(".btn--previous");
const nextQuestionBtn = document.querySelector(".btn--next");
const getResultBtn = document.querySelector(".btn--get-results");

const label = document.querySelectorAll("label");

let assessmentAnswers = [];
let questionNumber = 0;
let questions = subjectQuestions; //changed

window.addEventListener("load", () => {
  // questions = subjectQuestions;
  renderQuestion();
});
answerOptions.forEach((option) =>
  option.addEventListener("change", answerQuestionHandler)
);
previousQuestionBtn.addEventListener("click", getPreviousQuestion);
nextQuestionBtn.addEventListener("click", getNextQuestion);

function renderQuestion() {
  // questionArray = questions
  if (
    !questions[0].hasOwnProperty("tag") &&
    questionNumber == questions.length
  ) {
    localStorage.setItem("subjects", JSON.stringify(assessmentAnswers));

    questions = shuffleFisherYates(personalityQuestions);
    questionNumber = 0;
    assessmentAnswers = [];
    [
      label[0].innerText,
      label[1].innerText,
      label[2].innerText,
      label[3].innerText,
      label[4].innerText,
    ] = [
      "very accurate",
      "accurate",
      "neutral",
      "moderately inaccurate",
      "very inaccurate",
    ];

    [];
  }
  if (assessmentAnswers.length == 40) {
    localStorage.setItem("personality-type", JSON.stringify(assessmentAnswers));
    nextQuestionBtn.style.display = "none";
    getResultBtn.style.display = "flex";
    return;
  }

  assessmentQuestion.textContent =
    questions[questionNumber].question || questions[questionNumber]; //changed
}

function answerQuestionHandler(e) {
  if (assessmentAnswers.length == questions.length) return;

  //to check if the question has been answered previously and the answer is being edited
  let index = assessmentAnswers.findIndex(
    (answer) =>
      answer.tag.toLowerCase() == assessmentQuestion.textContent.toLowerCase()
  );

  if (index != -1) {
    assessmentAnswers[index] = {
      tag: questions[questionNumber].hasOwnProperty("tag") //try using typeof it might not give you that error
        ? questions[questionNumber].tag
        : questions[questionNumber],
      answer: e.target.value,
    };
  } else {
    assessmentAnswers.push({
      tag: questions[questionNumber].hasOwnProperty("tag")
        ? questions[questionNumber].tag
        : questions[questionNumber],
      answer: e.target.value,
    });
  }

  questionNumber++;

  setTimeout(() => {
    renderQuestion();

    // checks if question has already been answered to
    // render the check on radio button for next question
    if (!!assessmentAnswers[questionNumber]) {
      answerOptions.forEach((option) => {
        if (option.value == assessmentAnswers[questionNumber].answer) {
          option.checked = true;
        }
      });
      return;
    }
    answerOptions.forEach((option) => (option.checked = false));
  }, 500);

  // previous.style.setProperty("display", "flex");

  console.log(assessmentAnswers);
}

function getPreviousQuestion() {
  // next.style.setProperty("display", "flex");

  if (questionNumber <= 0) return;
  questionNumber--;
  renderQuestion();

  answerOptions.forEach((option) => {
    if (option.value == assessmentAnswers[questionNumber].answer) {
      option.checked = true;
    }
  });

  // if (questionNumber == 0) {
  //   previous.style.setProperty("visibility", "hidden");
  //   return;
  // }
}

function getNextQuestion() {
  if (
    assessmentAnswers.length == 0 ||
    questionNumber == assessmentAnswers.length
  )
    return;
  questionNumber++;

  // if (questionNumber >= assessmentAnswers.length) {
  //   next.style.setProperty("visibility", "hidden");
  //   return;
  // }
  renderQuestion();

  //to uncheck the radio btns for the current question that wasn't answered
  if (!assessmentAnswers[questionNumber]) {
    answerOptions.forEach((option) => (option.checked = false));
    return;
  }
  answerOptions.forEach((option) => {
    if (option.value == assessmentAnswers[questionNumber].answer) {
      option.checked = true;
    }
  });
}

//shuffle function
function shuffleFisherYates(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}
//very accurate, accurate, neutral, moderately inaccurate, very inaccurate
