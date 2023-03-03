

/**
 * Immutable class representing a 2D point.
 */
export class Point {
  private _x: number;
  private _y: number;

  public x(): number { return this._x; }
  public y(): number { return this._y; }

  public toString(): string {
    return `(${this._x},${this._y})`;
  }

  public dist(other: Point): number {
    return Math.sqrt(
      (other._x-this._x)*(other._x-this._x) + 
      (other._y-this._y)*(other._y-this._y)
    );
  }

  public constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }
}