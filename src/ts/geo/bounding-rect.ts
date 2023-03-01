import { Point } from "./point";

/**
 * Immutable class representing a rectangle with sides parallel to the X and Y axis.
 */
export class BoundingRect {
    private _sx: number;
    private _sy: number;
    private _bx: number;
    private _by: number;

    public sx(): number { return this._sx; }
    public sy(): number { return this._sy; }
    public bx(): number { return this._bx; }
    public by(): number { return this._by; }

    public width(): number { return this._bx - this._sx; }
    public height(): number { return this._by - this._sy; }

    public toString(): string {
      return `BoundingRect: (${this._sx},${this._sy}) -> (${this._bx}, ${this._by})`;
    }

    public merge(other: BoundingRect): BoundingRect
    {
        return new BoundingRect(
            Math.min(this._sx, other._sx),
            Math.min(this._sy, other._sy),
            Math.max(this._bx, other._bx),
            Math.max(this._by, other._by)
        );
    }

    public extendToCover(p: Point): BoundingRect {
      return new BoundingRect(
        Math.min(this._sx, p.x()),
        Math.min(this._sy, p.y()),
        Math.max(this._bx, p.x()),
        Math.max(this._by, p.y())
      );
    }
 
    public static FromPoint(point: Point): BoundingRect {
      return new BoundingRect(point.x(), point.y(), point.x(), point.y());
    }

    public static FromCoords(x1: number, y1: number, x2: number, y2: number): BoundingRect
    {
      let sx: number = x1;
      let sy: number = y1;
      let bx: number = x2;
      let by: number = y2;
      if (x1 > x2)
      {
        sx = x2;
        bx = x1;
      }
      if (y1 > y2)
      {
        sy = y2;
        by = y1;
      }
      return new BoundingRect(sx, sy, bx, by);
    }

    private constructor(sx: number, sy: number, bx: number, by: number) {
      this._sx = sx;
      this._sy = sy;
      this._bx = bx;
      this._by = by;
    }
  }