import { useState } from "react";
import styles from "./style.module.scss";

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  return (
    <div className={styles["board-game"]}>
      {gameData.map((value, index) => (
        <span>{value}</span>
      ))}
    </div>
  );
}

export default App;
