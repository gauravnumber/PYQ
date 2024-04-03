import { useState, Fragment } from "react";
import { MathJax } from "better-react-mathjax";
import "./App.css";

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
    question: 'If A and B are two events and `P (A uu B)` = 5/6, `P(A nn B)` = 1/3, P(B) = 1/2, then A and B are two events which are',
    options: ['Dependent', 'Independent', 'Mutually exclusive', 'Equally likely'],
    correctAnswer: 'Independent',
  },

  {
    question: 'A bird is flying in a straight line with velocity vector `10 hat i + 6 hat j + hat k`, measured in km/hr. If starting point is (1, 2, 3), how much time does it take to reach a point in space that is 13 metre high from ground ?',
    options: ['600 seconds', '360 seconds', '36 seconds', '60 seconds'],
    correctAnswer: '36 seconds',
  },

  {
    question: 'Force `4 hat i - 3 hat j + 7 hat k` and `-2 hat i + 2 hat j - 8 hat k` are acting on a particle and displace it from the point (5, 7, 1) to (2, 5,-6), then the work done by the force is',
    options: ['25', '9', '15', '7'],
    correctAnswer: 'no option',
  },

  {
    question: 'The vector `vec a = alpha hat i + 2 hat j + beta hat k` lies in the plane of the vectors `vec b = hat i + hat j` and `vec c = hat j + hat k` and bisects the angle between `vec b` and `vec c` . Then, which one of the following gives possible values of `alpha` and `beta`?',
    options: ['`alpha = 2, beta = 2`', '`alpha = 1, beta = 2`', '`alpha = 2, beta = 1`', '`alpha = 1, beta = 1`'],
    correctAnswer: '`alpha = 1, beta = 1`',
  },

  {
    question: 'If a, b and c are unit vectors, then `|a - b|^2 + |b - c|^2 + |c - a|^2` does not exceed',
    options: ['4', '9', '8', '6'],
    correctAnswer: '6',
  },

  {
    question: '`f(x) = x + |x|` is continuous for',
    options: ['`x in (-oo, oo)`', '`x in (-oo, oo) - {0}`', 'Only `x > 0`', 'No value of x'],
    correctAnswer: '`x in (-oo, oo)`',
  },

  {
    question: 'Differential co-efficient of `log_10 x` w.r. to `log_x 10` is',
    options: ['`-(log x)^2/(log 10)^2`', '`(log_10 x)^2/(log 10)^2`', '`(log_x 10)^2/(log 10)^2`', '`-(log 10)^2/(log x)^2`'],
    correctAnswer: '`-(log x)^2/(log 10)^2`',
  },


  {
    question: '`(d^2x)/dy^2` equals',
    options: ['`((d^2y)/dx^2)^-1`', '`-((d^2y)/dx^2)^-1 (dy/dx)^-3`', '`((d^2y)/dx^2) (dy/dx)^-2`', '`-((d^2y)/dx^2) (dy/dx)^-3`'],
    correctAnswer: '`-((d^2y)/dx^2) (dy/dx)^-3`',
  },

  {
    question: 'If `f(x) = sin^5 x + sin^3` and `g(x) = cos^6 x + sin^3 x`, then the value of `int_0^(pi/2) [f(x) + f(-x)][g(x) + g(-x)]dx`',
    options: ['0', '`> 1`', '0 and 1', 'less than 0'],
    correctAnswer: '0',
  },

  {
    question: 'If `lim_(x -> oo) (1 + a/x + b/x^2)^(2x) = e^2`, then the value of a and b are',
    options: ['`a in R`', '`a = 1, b in R`', '`a in R, b in R`', '`a = 1, b = 2`'],
    correctAnswer: '`a = 1, b in R`',
  },

  {
    question: 'The number of natural numbers which are smaller than `2 xx 10^8` and which contain only the digits 1 and 2 is ',
    options: ['786', '666', '766', '1066'],
    correctAnswer: '766',
  },

  {
    question: 'IN a survey where 100 students reported which subjected they like, 32 students in total liked Mathematics, 38 students liked Business and 30 students liked Literature. Moreover 7 students liked both Mathematics and Literature, 10 students liked both Mathematics and Business, 8 students liked both Business and Literature, 5 students liked all three subjects. Then the number of people who liked exactly one subject is',
    options: ['60', '65', '70', '78'],
    correctAnswer: '65',
  },

  {
    question:
      "A student council has 10 members. From this one President, one Vice-President, one Secretary, one JointSecretary and two Executive Committe members have to be elected. In how many ways this can be done ?",
    options: ["151200", "75600", "37800", "18900"],
    correctAnswer: "75600",
  },

  {
    question: "Which of the following functions is inverse of itself ?",
    options: [
      "`f(x) = (1 - x)/(1 + x)`",
      "`f(x) = 3^log x`",
      "`f(x) = 3^x(x + 1)`",
      "None",
    ],
    correctAnswer: "`f(x) = (1 - x)/(1 + x)`",
  },

  {
    question:
      "9 balls are to be placed in 9 boxes and 5 of the balls cannot fit into 3 small boxes. The number of ways of arranging one ball in each of the boxes is",
    options: ["18720", "18270", "17280", "12780"],
    correctAnswer: "17280",
  },

  {
    question:
      "If A = `[[0,5], [0,0]]` and `f(x) = 1 + x + x^2 + ... + x^16`, then f(A) =",
    options: [
      "0",
      "`[[1, 5], [0, 1]]`",
      "`[[1, 5], [0, 0]]`",
      "`[[0, 5], [1,1]]`",
    ],
    correctAnswer: "`[[1, 5], [0, 1]]`",
  },

  {
    question: "The area enclosed between the curves `y^2 = x` and `y = |x| is`",
    options: ["2/3 sq. unit", "1 sq. unit", "1/6 sq. unit", "1/3 sq. unit"],
    correctAnswer: "1/6 sq. unit",
  },
  {
    question:
      "Equation of the line perpendicular to `x - 2y = 1` and passing through (1, 1) is",
    options: ["x + 2y = 3", "x + y = 2", "y = 2x + 3", "y = -2x + 3"],
    correctAnswer: "y = -2x + 3",
  },

  {
    question:
      "Equation of a common tangent with positive slope to the circle `x^2 + y^2 - 8x = 0` as well as to the hyperbola `x^2/9 - y^2/4 = 1` is",
    options: [
      "` 2x - sqrt 5 y - 20 = 0 `",
      "` 2x - sqrt 5 y + 4 = 0 `",
      "`3x - 4y + 8 = 0`",
      "`4x - 3y + 4 = 0`",
    ],
    correctAnswer: "` 2x - sqrt 5 y + 4 = 0 `",
  },

  {
    question:
      "The locus of the orthocenter of the triangle formed by the lines `(1 + p)x - py + p(1 + p) = 0`, `(1 + q)x - qy + q(1 + q) = 0` and `y = 0` where `p != q`, is",
    options: ["a hyperbola", "a parabola", "an ellipse", "a straight line"],
    correctAnswer: "no option",
  },

  {
    question:
      "The circles whose equations are `x^2 + y^2 + c^2 = 2ax` and `x^2 + y^2 + c^2 - 2by = 0` will touch one another externally if",
    options: [
      "`1/b^2 + 1/c^2 = 1/a^2`",
      "`1/c^2 + 1/a^2 = 1/b^2`",
      "`1/a^2 + 1/b^2 = 1/c^2`",
      "None",
    ],
    correctAnswer: "`1/a^2 + 1/b^2 = 1/c^2`",
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
    question:
      "In an acute angle `Delta ABC` the least value of `sec A + sec B + sec C` is",
    options: ["6", "8", "3", "2"],
    correctAnswer: "6",
  },
  {
    // id: 4,
    question:
      "Let `P = {theta: sin theta - cos theta = sqrt 2 cos theta}` and `Q = {theta: sin theta + cos theta = sqrt 2 sin theta}` be two sets. Then",
    options: [
      "`P sub Q` and `Q - P != phi`",
      "`P cancel(sub) Q`",
      "`Q cancel(sub) P`",
      "`P = Q`",
    ],
    correctAnswer: "`P = Q`",
  },

  {
    // id: 5,
    question:
      "If `tan x/2 = tan y/3 = tan z/5` and `x + y + z = pi`, then the value of `tan^2 x + tan^2 y + tan^2 z` is",
    options: ["`38/3`", "38", "114", "None"],
    correctAnswer: "`38/3`",
  },
];

// const shuffledQuestions = math;
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
        <ol>
          {shuffledQuestions.map((questions, questionIndex) => (
            <div className="mb4 " key={questionIndex}>
              <li>{questions.question}</li>
              <ol type="a" className="pa0 mt1 flex flex-wrap   gap-2">
                {questions.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center gap-1 mb1">
                    <input
                      type="radio"
                      name={`${questions.question.substring(0, 10)} ${questions.options[0]
                        }`}
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
