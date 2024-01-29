import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="border border-white bg-white h-24 w-24 m-2 leading-9 text-lg rounded-lg shadow-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
function Board({ xIsnext, squares, onPlay }) {
  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player is: " + (xIsnext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsnext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="w-min">
          <h3 className=" text-center text-yellow-400 font-semibold text-3xl mb-3">
            {status}
          </h3>
          <div className="border border-white p-6 rounded-lg">
            <div className=" flex">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className=" flex">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className=" flex">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
        </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsnext, setXisNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXisNext(!xIsnext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(move){
    setCurrentMove(move);
    setXisNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move #${move}`;
    } else {
      description = `Go to start the game}`;
    }
    return (
      <li key={move}>
        <button onClick={()=> jumpTo(move)}>{`--> ${description}`}</button>
      </li>
    );
  });

  return (
    <div className="h-screen">
      <div className=" flex items-center gap-4 justify-center h-full">
        <Board xIsnext={xIsnext} squares={currentSquares} onPlay={handlePlay} />
        <div>
          <h4 className=" font-bold text-2xl underline mb-2 text-yellow-300">History</h4>
          <ol className=" text-yellow-100">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
