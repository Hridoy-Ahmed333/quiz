import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressComponent from "./ProgressComponent";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUS = 30;

const initialState = {
  questions: [],
  //state can be loading, active, ready, error, finishied
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secRem: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secRem: state.questions.length * SECS_PER_QUS,
      };
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        status: "active",
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + currentQuestion.points
            : state.points + 0,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        secRem: 10,
      };
    case "tick":
      return {
        ...state,
        secRem: state.secRem - 1,
        status: state.secRem === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Error");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secRem },
    dispatch,
  ] = useReducer(reducer, initialState);
  // console.log(state);
  const numQuestions = questions.length;
  const maxPossiblePoint = questions.reduce(
    (prev, curr) => prev + curr?.points,
    0
  );
  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressComponent
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoint={maxPossiblePoint}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secRem={secRem} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
      </Main>
      {status === "finished" && (
        <Finished
          points={points}
          maxPossiblePoint={maxPossiblePoint}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
////npm run server
