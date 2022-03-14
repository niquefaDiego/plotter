
export class Point {
  x: number;
  y: number;

  toString(): string {
    return `(${this.x},${this.y})`;
  }
  dist(other: Point): number {
    return Math.sqrt((other.x-this.x)*(other.x-this.x)+(other.y-this.y)*(other.y-this.y));
  }

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}