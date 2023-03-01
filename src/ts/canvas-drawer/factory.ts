import { CanvasPolylineDrawer } from "./polyline";
import { Drawer, DrawerFactory } from "../drawer";
import { Polyline } from "../shape";

export class CanvasDrawerFactory implements DrawerFactory {
    private _polylineDrawer: Drawer<Polyline>; 

    public CanvasDrawer(canvas: HTMLCanvasElement) {
        this._polylineDrawer = new CanvasPolylineDrawer(canvas);        
    }

    getPolylineDrawer(): Drawer<Polyline> {
        return this._polylineDrawer;
    }
}