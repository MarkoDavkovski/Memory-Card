import "../styles/scoreboard.css";

const ScoreBoard = ({ currScore, bestScore }) => {
  return (
    <>
      <section className="scoreboard-section">
        <div className="current-score">
          Current Score: <strong>{currScore}</strong>
        </div>
        <div className="best-score">
          Best Score: <strong>{bestScore}</strong>{" "}
        </div>
      </section>
    </>
  );
};

export default ScoreBoard;
