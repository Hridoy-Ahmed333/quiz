function ProgressComponent({
  index,
  numQuestions,
  points,
  maxPossiblePoint,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{maxPossiblePoint}
        </strong>
      </p>
    </header>
  );
}

export default ProgressComponent;
