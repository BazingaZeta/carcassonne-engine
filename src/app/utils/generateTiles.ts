import { Board } from "../core/models/Board";
import { Tile, FeatureType, TileSides } from "../core/models/Tile";

interface TileData {
  id: string;
  sides: TileSides;
  image: string; // Percorso dell'immagine
}

const tilesData: TileData[] = [
  {
    id: "START",
    sides: {
      top: FeatureType.CITY,
      right: FeatureType.ROAD,
      bottom: FeatureType.FIELD,
      left: FeatureType.FIELD,
    },
    image: "/tiles/START.jpg",
  },
];

export const createTiles = (): Tile[] => {
  return tilesData.map((data) => new Tile(data.id, data.sides, data.image));
};

export const initializeBoard = (): Board => {
  const board = new Board();
  const startTile = createTiles().find((tile) => tile.id === "START") as Tile;
  console.log("TILE", startTile);
  board.placeTile(startTile, { x: 0, y: 0 });
  return board;
};
