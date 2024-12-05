import React from "react";
import BoardComponent from "./components/BoardView";
import { initializeBoard } from "./utils/generateTiles";

const IndexPage = () => {
  const board = initializeBoard();

  return (
    <div>
      <BoardComponent board={board} />
    </div>
  );
};

export default IndexPage;
