import { useEffect } from "react";

function Timer({ dispatch, secRem }) {
  const mins = Math.floor(secRem / 60);
  const secs = secRem % 60;
  //dispatch({ type: "tick" });
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 ? "0" : ""}
      {mins}:{secs < 10 ? "0" : ""}
      {secs}
    </div>
  );
}

export default Timer;
