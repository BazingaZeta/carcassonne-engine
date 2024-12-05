import { Tile, FeatureType } from "./Tile";

interface Position {
  x: number;
  y: number;
}

class Board {
  public grid: Map<string, Tile>;
  private startTile: Tile;

  constructor() {
    this.grid = new Map();
    // Creiamo una tessera iniziale
    this.startTile = new Tile(
      "START",
      {
        top: FeatureType.CITY,
        right: FeatureType.ROAD,
        bottom: FeatureType.FIELD,
        left: FeatureType.ROAD,
      },
      "/tiles/START.jpg"
    );

    // Posizioniamo la tessera iniziale al centro
    this.placeTile(this.startTile, { x: 0, y: 0 });
  }

  // Converte le coordinate in una chiave stringa
  private positionToKey(pos: Position): string {
    return `${pos.x},${pos.y}`;
  }

  // Verifica se una posizione è vuota
  private isPositionEmpty(pos: Position): boolean {
    return !this.grid.has(this.positionToKey(pos));
  }

  // Trova le posizioni adiacenti libere
  getAdjacentEmptyPositions(pos: Position): Position[] {
    const adjacentPositions: Position[] = [
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 },
    ];

    return adjacentPositions.filter(
      (adjPos) => this.isPositionEmpty(adjPos) && this.hasAdjacentTile(adjPos)
    );
  }

  // Verifica se ci sono tessere adiacenti
  private hasAdjacentTile(pos: Position): boolean {
    const adjacentPositions: Position[] = [
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 },
    ];

    return adjacentPositions.some((adjPos) =>
      this.grid.has(this.positionToKey(adjPos))
    );
  }

  // Metodo per piazzare una tessera
  placeTile(tile: Tile, pos: Position): boolean {
    // Verifica se la posizione è vuota
    if (!this.isPositionEmpty(pos)) {
      return false;
    }

    // Verifica compatibilità con tessere adiacenti
    const adjacentPositions: Position[] = [
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 },
    ];

    for (const adjPos of adjacentPositions) {
      const adjTile = this.grid.get(this.positionToKey(adjPos));
      if (adjTile) {
        // Determina il lato opposto
        let side: "top" | "right" | "bottom" | "left";
        if (adjPos.x === pos.x + 1) side = "left";
        else if (adjPos.x === pos.x - 1) side = "right";
        else if (adjPos.y === pos.y + 1) side = "top";
        else side = "bottom";

        // Verifica compatibilità
        if (!tile.canPlaceNextTo(adjTile, side)) {
          return false;
        }
      }
    }

    // Piazza la tessera
    this.grid.set(this.positionToKey(pos), tile);
    return true;
  }

  // Ottiene una tessera in una posizione specifica
  getTileAt(pos: Position): Tile | undefined {
    return this.grid.get(this.positionToKey(pos));
  }

  // Restituisce tutte le tessere
  getAllTiles(): Tile[] {
    return Array.from(this.grid.values());
  }

  // Calcola il punteggio totale del tabellone
  calculateTotalScore(): number {
    return this.getAllTiles().reduce(
      (total, tile) => total + tile.calculatePoints(),
      0
    );
  }
}

export { Board };
export type { Position };
