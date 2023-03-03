import { CanvasPolylineDrawer } from "./polyline-drawer";
import { Drawer, DrawerFactory } from "../drawer";
import { Polyline } from "../shape";

export class CanvasDrawerFactory implements DrawerFactory {
    private _polylineDrawer: Drawer<Polyline>; 

    public constructor(canvasContext: CanvasRenderingContext2D) {
        this._polylineDrawer = new CanvasPolylineDrawer(canvasContext);
    }

    getPolylineDrawer(): Drawer<Polyline> {
        return this._polylineDrawer;
    }
}