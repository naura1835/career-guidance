const displayResult = document.querySelector(".anneyong");
const subjectResultArray = JSON.parse(localStorage.getItem("subjects")) || [];
const personalityTypeResult = JSON.parse(
  localStorage.getItem("personality-type") || []
);

console.log(subjectResultArray);
console.log(personalityTypeResult);

const types = personalityTypeResult
  .map((result) => parseInt(result.answer))
  .reduce((obj, { tag, answer }) => {
    if (!obj[tag]) {
      obj[tag] = 0;
    }
    obj[tag] += answer;
    return obj;
  }, {});

const type1 = types["extraversion"] > types["introversion"] ? "E" : "I";
const type2 = types["sensing"] > types["intuition"] ? "S" : "N";
const type3 = types["feeling"] > types["thinking"] ? "F" : "T";
const type4 = types["judging"] > types["perceiving"] ? "J" : "P";

const personalityTypeString = type1 + type2 + type3 + type4;

console.log(personalityTypeString);

const subjectResults = subjectResultArray.reduce((accum, prev) => {
  if (!accum[prev.tag]) {
    accum[prev.tag] = parseInt(prev.answer);
  }
  return accum;
}, {});

// const data = {
//   agric: subjectResults["Agricultural science"],
//   biology: subjectResult["Biology"],
//   chemistry: subjectResults["Chemistry"],
//   economics: subjectResults["Economics"],
//   geography: subjectResults["Geography"],
//   mathematics: subjectResults["Mathematics"],
//   physics: subjectResults["Physics"],
//   personality: personalityTypeString,
// };
// its working just need to change databse val to reflect values in input
const data = {
  agric: 8,
  biology: 8,
  chemistry: 8,
  economics: 8,
  geography: 8,
  mathematics: 8,
  physics: 8,
  personality: "INTP",
};

console.log(data);

fetch("https://career-guidance-api.herokuapp.com/api/courses/result", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
