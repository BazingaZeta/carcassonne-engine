import React from "react";
import { Tile } from "../core/models/Tile";
import Image from "next/image";

interface TileProps {
  tile: Tile;
}

const TileView: React.FC<TileProps> = ({ tile }) => {
  return (
    <div className="tile">
      <Image width={100} height={100} src={tile.image} alt="Tile" />
    </div>
  );
};

export default TileView;
