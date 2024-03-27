import { useState, Fragment } from "react";
import { MathJax } from "better-react-mathjax";
import './App.css'

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const shuffleQuestionsArray = (array) => {
  return shuffleArray(array).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
};

let math = [
  {
    question: 'The circles whose equations are `x^2 + y^2 + c^2 = 2ax` and `x^2 + y^2 + c^2 - 2by = 0` will touch one another externally if',
    options: ['`1/b^2 + 1/c^2 = 1/a^2`', '`1/c^2 + 1/a^2 = 1/b^2`', '`1/a^2 + 1/b^2 = 1/c^2`', 'None'],
    correctAnswer: '`1/a^2 + 1/b^2 = 1/c^2`',
  },

  {
    // id: 1,
    question:
      "The number of solutions of the equation `sin x + sin 5x = sin 3x` lying in the interval `[0, pi]` is",
    options: ["4", "6", "5", "2"],
    correctAnswer: "6",
  },
  {
    // id: 2,
    question:
      "The point of intersection of circle `x^2 + y^2 + 10x - 12y + 51 = 0` and the line `3y + x = 5` is",
    options: ["(-6, 3)", "(3, -6)", "(6, -3)", "(-3, 6)"],
    correctAnswer: "(-6, 3)",
  },
  {
    // id: 3,
    question: "In an acute angle `Delta ABC` the least value of `sec A + sec B + sec C` is",
    options: ["6", "8", "3", "2"],
    correctAnswer: "6",
  },
  {
    // id: 4,
    question: 'Let `P = {theta: sin theta - cos theta = sqrt 2 cos theta}` and `Q = {theta: sin theta + cos theta = sqrt 2 sin theta}` be two sets. Then',
    options: ['`P sub Q` and `Q - P != phi`', '`P cancel(sub) Q`', '`Q cancel(sub) P`', '`P = Q`'],
    correctAnswer: '`P = Q`',
  },

  {
    // id: 5,
    question:
      "If `tan x/2 = tan y/3 = tan z/5` and `x + y + z = pi`, then the value of `tan^2 x + tan^2 y + tan^2 z` is",
    options: ["`38/3`", "38", "114", "None"],
    correctAnswer: "`38/3`",
  },
];

// const shuffledQuestions = math
const shuffledQuestions = shuffleQuestionsArray(math);

function App() {
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(math.length).fill("")
  );

  const handleChange = (event, questionIndex) => {
    const selectedAnswer = event.target.value;
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedAnswer;

      return newAnswers;
    });
  };

  return (
    <>
      <div>
        <ol >
          {shuffledQuestions.map((questions, questionIndex) => (
            <div className="mb4 " key={questionIndex}>
              <li >{questions.question}</li>
              <ol type="a" className="pa0 mt1 flex flex-wrap   gap-2">
                {questions.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center gap-1 mb1">
                    <input
                      type="radio"
                      name={`${questions.question.substring(0, 10)} ${questions.options[0]}`}
                      // name={questions.id}
                      onChange={(event) => handleChange(event, questionIndex)}
                      value={option}
                    />
                    <MathJax inline={true}>{option}</MathJax>
                  </li>
                ))}
                {selectedAnswers[questionIndex] === questions.correctAnswer && (
                  <div className="green">
                    correct{" "}
                    <MathJax inline={true}>{questions.correctAnswer}</MathJax>
                  </div>
                )}
              </ol>
            </div>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
