import { useState, useEffect } from "react";
import "./game.styles.scss";
import { useParams } from "react-router-dom";

const initialNumbers = [4, 5, 2, 2, 7, 7, 3];
const Game = () => {
  const { selectedStart } = useParams();
  const [numbers, setNumbers] = useState(initialNumbers);
  const [points, setPoints] = useState(0);
  const [turn, setTurn] = useState(selectedStart);
  const [gameOver, setGameOver] = useState(false);
  const [playerNumbers, setPlayerNumbers] = useState([]);
  const [computerNumbers, setComputerNumbers] = useState([]);

  useEffect(() => {
    if (numbers.length === 1) {
      setGameOver(true);
    }
  }, [numbers]);

  const handleClick = (index) => {
    if (gameOver) return;

    const newNumbers = [...numbers];
    const pairSum = newNumbers[index] + newNumbers[index + 1];
    const chosenNumbers = [newNumbers[index], newNumbers[index + 1]];

    if (pairSum > 7) {
      newNumbers.splice(index, 2, 1);
      setPoints(points + 1);
    } else if (pairSum < 7) {
      newNumbers.splice(index, 2, 3);
      setPoints(points - 1);
    } else {
      newNumbers.splice(index, 2, 2);
      setPoints(points + 1);
    }

    setNumbers(newNumbers);
    if (turn === "1") {
      setPlayerNumbers([...playerNumbers, chosenNumbers]);
    } else {
      setComputerNumbers([...computerNumbers, chosenNumbers]);
    }
    setTurn(turn === "1" ? "2" : "1");
  };

  const evaluate = () => {
    return (points + numbers[0]) % 2 === 0 ? 1 : -1;
  };

  const minimax = (newNumbers, depth, maximizingPlayer) => {
    if (newNumbers.length === 1) {
      return evaluate();
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < newNumbers.length - 1; i++) {
        const numbersCopy = [...newNumbers];
        const pairSum = numbersCopy[i] + numbersCopy[i + 1];
        if (pairSum > 7) {
          numbersCopy.splice(i, 2, 1);
        } else if (pairSum < 7) {
          numbersCopy.splice(i, 2, 3);
        } else {
          numbersCopy.splice(i, 2, 2);
        }
        const evali = minimax(numbersCopy, depth + 1, false);
        maxEval = Math.max(maxEval, evali);
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < newNumbers.length - 1; i++) {
        const numbersCopy = [...newNumbers];
        const pairSum = numbersCopy[i] + numbersCopy[i + 1];
        if (pairSum > 7) {
          numbersCopy.splice(i, 2, 1);
        } else if (pairSum < 7) {
          numbersCopy.splice(i, 2, 3);
        } else {
          numbersCopy.splice(i, 2, 2);
        }
        const evali = minimax(numbersCopy, depth + 1, true);
        minEval = Math.min(minEval, evali);
      }
      return minEval;
    }
  };

  const computerMove = () => {
    let bestMoveIndex = -1;
    let bestMoveValue = -Infinity;

    for (let i = 0; i < numbers.length - 1; i++) {
      const newNumbers = [...numbers];
      const pairSum = newNumbers[i] + newNumbers[i + 1];
      if (pairSum > 7) {
        newNumbers.splice(i, 2, 1);
      } else if (pairSum < 7) {
        newNumbers.splice(i, 2, 3);
      } else {
        newNumbers.splice(i, 2, 2);
      }
      const moveValue = minimax(newNumbers, 0, false);
      if (moveValue > bestMoveValue) {
        bestMoveValue = moveValue;
        bestMoveIndex = i;
      }
    }

    handleClick(bestMoveIndex);
  };

  useEffect(() => {
    if (turn === "2" && !gameOver) {
      setTimeout(() => {
        computerMove();
      }, 1000);
    }
  }, [turn]);

  useEffect(() => {
    if (selectedStart === "2") {
      computerMove();
    }
  }, [selectedStart]);

  const resetGame = () => {
    setNumbers(initialNumbers);
    setPoints(0);
    setTurn(selectedStart);
    setGameOver(false);
    setPlayerNumbers([]);
    setComputerNumbers([]);
  };

  const winner = (points + numbers[0]) % 2 === 0 ? "Player" : "Computer";

  return (
    <div className="game">
      <h1>Game</h1>
      <div className="game-board">
        <div className="game-numbers">
          {numbers.map((number, index) => (
            <span key={index} onClick={() => handleClick(index)}>
              {number}
            </span>
          ))}
        </div>
      </div>
      <div className="game-info">
        <div className="game-chosen-numbers">
          <div className="numbers">
            <h3>Player:</h3>
            <span>
              {playerNumbers.map((pair) => pair.join("-")).join(", ")}
            </span>
          </div>
          <div className="numbers">
            <h3>Computer:</h3>
            <span>
              {computerNumbers.map((pair) => pair.join("-")).join(", ")}
            </span>
          </div>
        </div>
        <div className="game-points">
          <h3>Total points:</h3>
          <span>{points}</span>
        </div>
        <div className="game-turn">
          <h3>Current turn:</h3>
          <span>{turn === "1" ? "Player" : "Computer"}</span>
        </div>
      </div>
      {gameOver && (
        <div className="game-result">
          <h2>Game Over</h2>
          <p>{winner} wins!</p>
          <button className="game-btn" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
