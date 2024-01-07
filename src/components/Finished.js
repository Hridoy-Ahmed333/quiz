function Finished({ points, maxPossiblePoint, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🎊";
  if (percentage >= 30 && percentage < 50) emoji = "😃";
  if (percentage >= 10 && percentage < 30) emoji = "☹";
  if (percentage > 0 && percentage < 10) emoji = "😭";
  if (percentage === 0) emoji = "🤢🤢🤢";
  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scorde <strong>{points}</strong> out of{" "}
        {maxPossiblePoint} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore is : {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        {" "}
        Re-start{" "}
      </button>
    </div>
  );
}

export default Finished;
