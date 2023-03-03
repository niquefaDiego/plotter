import { Polyline } from "../shape";
import { Drawer } from "../drawer";

export class CanvasPolylineDrawer implements Drawer<Polyline> {
    private _canvasContext: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this._canvasContext = canvasContext;
    }

    public draw(polyline: Polyline): void {
        const ctx = this._canvasContext;
      
        for (let i = 0; i+1 < polyline.countPoints(); i++) {
          const a = polyline.getPoint(i);
          const b = polyline.getPoint(i+1);
          ctx.beginPath();
          ctx.moveTo(a.x(), a.y());
          ctx.lineTo(b.x(), b.y());
          ctx.stroke();
        }
    }
}
