import { Polyline, Shape } from "../shape";

interface Drawer<T extends Shape> {
    draw(shape: T): void;
}

interface DrawerFactory {
    getPolylineDrawer(): Drawer<Polyline>;
}

export { Drawer, DrawerFactory };
