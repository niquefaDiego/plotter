import { CanvasPolylineDrawer } from "./polyline-drawer";
import { Drawer, DrawerFactory } from "../drawer";
import { Polyline } from "../shape";

export class CanvasDrawerFactory implements DrawerFactory {
    private _polylineDrawer: Drawer<Polyline>; 

    public constructor(canvas: HTMLCanvasElement) {
        this._polylineDrawer = new CanvasPolylineDrawer(canvas);
    }

    getPolylineDrawer(): Drawer<Polyline> {
        return this._polylineDrawer;
    }
}