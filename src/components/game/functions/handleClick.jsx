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
export default handleClick;
