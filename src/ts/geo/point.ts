
export class Point {
  public x: number;
  public y: number;

  public toString(): string {
    return `(${this.x},${this.y})`;
  }

  public dist(other: Point): number {
    return Math.sqrt((other.x-this.x)*(other.x-this.x)+(other.y-this.y)*(other.y-this.y));
  }

  public constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}