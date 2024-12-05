// Definizione delle possibili features di una tessera
enum FeatureType {
  CITY = "CITY",
  ROAD = "ROAD",
  MONASTERY = "MONASTERY",
  FIELD = "FIELD",
}

// Rappresenta i lati di una tessera
interface TileSides {
  top: FeatureType;
  right: FeatureType;
  bottom: FeatureType;
  left: FeatureType;
}

class Tile {
  private id: string;
  private sides: TileSides;
  private rotation: number; // 0, 90, 180, 270 gradi
  private hasMeeple: boolean;

  constructor(id: string, sides: TileSides) {
    this.id = id;
    this.sides = sides;
    this.rotation = 0;
    this.hasMeeple = false;
  }

  // Ruota la tessera di 90 gradi in senso orario
  rotate(): void {
    this.rotation = (this.rotation + 90) % 360;

    // Ruota anche i lati
    const { top, right, bottom, left } = this.sides;
    this.sides = {
      top: left,
      right: top,
      bottom: right,
      left: bottom,
    };
  }

  // Verifica se può essere posizionata accanto a un'altra tessera
  canPlaceNextTo(
    otherTile: Tile,
    side: "top" | "right" | "bottom" | "left"
  ): boolean {
    // Logica di compatibilità dei lati
    switch (side) {
      case "top":
        return this.sides.top === otherTile.sides.bottom;
      case "right":
        return this.sides.right === otherTile.sides.left;
      case "bottom":
        return this.sides.bottom === otherTile.sides.top;
      case "left":
        return this.sides.left === otherTile.sides.right;
    }
  }

  // Calcola i punti per questa tessera
  calculatePoints(): number {
    // Logica base di calcolo punti
    // Da implementare con regole specifiche di Carcassonne
    return 0;
  }

  // Getter e setter
  getId(): string {
    return this.id;
  }

  getRotation(): number {
    return this.rotation;
  }

  placeMeeple(): void {
    this.hasMeeple = true;
  }

  removeMeeple(): void {
    this.hasMeeple = false;
  }
}

// // Esempio di creazione di una tessera
// const cityRoadTile = new Tile("CR01", {
//   top: FeatureType.CITY,
//   right: FeatureType.ROAD,
//   bottom: FeatureType.FIELD,
//   left: FeatureType.FIELD,
// });

export { Tile, FeatureType };
