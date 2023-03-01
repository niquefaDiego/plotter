import { Polyline } from "../shape";
import { Drawer } from "../drawer";

export class CanvasPolylineDrawer implements Drawer<Polyline> {
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    public draw(polyline: Polyline): void {
        // TODO:
    }
}