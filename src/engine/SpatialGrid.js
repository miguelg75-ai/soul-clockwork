export class SpatialGrid {
  constructor(cell = 64) {
    this.cell = cell;
    this.grid = new Map();
  }

  clear() {
    this.grid.clear();
  }

  insert(x, y, poolIndex) {
    const col = Math.floor(x / this.cell);
    const row = Math.floor(y / this.cell);
    const key = col + "_" + row;
    let cellList = this.grid.get(key);
    if (!cellList) {
      cellList = [];
      this.grid.set(key, cellList);
    }
    cellList.push(poolIndex);
  }

  query(x, y, radius, outBuffer) {
    let foundCount = 0;
    const minCol = Math.floor((x - radius) / this.cell);
    const maxCol = Math.floor((x + radius) / this.cell);
    const minRow = Math.floor((y - radius) / this.cell);
    const maxRow = Math.floor((y + radius) / this.cell);

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const key = c + "_" + r;
        const cellList = this.grid.get(key);
        if (cellList) {
          for (let i = 0; i < cellList.length; i++) {
            outBuffer[foundCount++] = cellList[i];
          }
        }
      }
    }
    return foundCount;
  }
}
