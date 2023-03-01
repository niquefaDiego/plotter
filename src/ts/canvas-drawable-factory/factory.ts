import { CanvasPolylineDrawer } from "./polyline-drawer";
import { Drawer, DrawableShapeFactory, DrawableShape } from "../drawable";
import { Polyline } from "../shape";

export class CanvasDrawableFactory implements DrawableShapeFactory {
    private _polylineDrawer: Drawer<Polyline>; 

    public constructor(canvas: HTMLCanvasElement) {
        this._polylineDrawer = new CanvasPolylineDrawer(canvas);
    }

    getDrawablePolyline(polyline: Polyline): DrawableShape<Polyline> {
        return new DrawableShape(polyline, this._polylineDrawer);
    }
}