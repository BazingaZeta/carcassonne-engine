import React from "react";
import { Board } from "../core/models/Board";
import TileView from "./TileView";

interface BoardProps {
  board: Board;
}

const BoardView: React.FC<BoardProps> = ({ board }) => {
  console.log("board", board);
  return (
    <div className="board">
      {Array.from(board.grid.entries()).map(([position, tile]) => (
        <div key={position}>
          <TileView tile={tile} />
        </div>
      ))}
    </div>
  );
};

export default BoardView;
