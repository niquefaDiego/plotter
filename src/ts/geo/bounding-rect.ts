
export class BoundingRect {
    private _sx: number;
    private _sy: number;
    private _bx: number;
    private _by: number;

    public sx(): number { return this._sx; }
    public sy(): number { return this._sy; }
    public bx(): number { return this._bx; }
    public by(): number { return this._by; }

    public toString(): string {
      return `BoundingRect: (${this._sx},${this._sy}) -> (${this._bx}, ${this._by})`;
    }

    public static merge(a: BoundingRect, b: BoundingRect): BoundingRect
    {
        return new BoundingRect(
            Math.min(a.sx(), b.sx()),
            Math.min(a.sy(), b.sy()),
            Math.max(a.bx(), b.bx()),
            Math.max(a.by(), b.by())
        );
    }
  
    public constructor(x1: number, y1: number, x2: number, y2: number )
    {
      if (x1 < x2)
      {
        this._sx = x1;
        this._bx = x2;
      }
      else
      {
        this._sx = x2;
        this._bx = x1;
      }
      if (y1 < y2)
      {
        this._sy = y1;
        this._by = y2;
      }
      else
      {
        this._sy = y2;
        this._by = y1;
      }
    }
  }