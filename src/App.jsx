import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import x_icon from "./assets/X.png";
import o_icon from "./assets/O.png";

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winninCombo, setWinninCombo] = useState(null);

  const winningCombinations = [
    //horizontals
    { indexes: [0, 1, 2], orientation: "horizontal" },
    { indexes: [3, 4, 5], orientation: "horizontal" },
    { indexes: [6, 7, 8], orientation: "horizontal" },

    //Verticals
    { indexes: [0, 3, 6], orientation: "vertical" },
    { indexes: [1, 4, 7], orientation: "vertical" },
    { indexes: [2, 5, 8], orientation: "vertical" },

    //Diagonals
    { indexes: [0, 4, 8], orientation: "diagonal-1" },
    { indexes: [2, 4, 6], orientation: "diagonal-2" },
  ];

  const handleClick = (index) => {
    if (gameData[index] !== 0) return;
    if (winninCombo) return;

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[index] = turn;

      return newGameData;
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    checkWinner();
    checkEndGame();
  }, [gameData]);

  const checkEndGame = () => {
    if (gameData.every((item) => item !== 0)) {
      alert("Sem mais opções de jogadas");
      resetGame();
    }
  };

  const resetGame = () => {
    window.location.reload(false);
  };

  const checkWinner = () => {
    let winner = null;

    for (let combinations of winningCombinations) {
      let { indexes } = combinations;
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        winner = "Player 1";
      }

      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = "Player 2";
      }

      if (winner) {
        setWinninCombo(combinations);
        break;
      }
    }
  };

  return (
    <>
      <div className={styles["board-game"]}>
        {gameData.map((value, index) => (
          <span
            onClick={() => handleClick(index)}
            key={index}
            className={
              winninCombo?.indexes.includes(index)
                ? styles[winninCombo?.orientation]
                : undefined
            }
          >
            {value === 1 && (
              <img src={x_icon} alt="X" className={styles.icons} />
            )}
            {value === 2 && (
              <img src={o_icon} alt="O" className={styles.icons} />
            )}
          </span>
        ))}
      </div>
      {winninCombo ? (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h3>Game Over</h3>
            <button onClick={resetGame}>Restart Game?</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
