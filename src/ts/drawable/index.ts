import { BoundingRect } from "../geo";
import { Polyline, Shape } from "../shape";

interface Drawer<T extends Shape> {
    draw(shape: T): void;
}

interface DrawableShapeFactory {
    getDrawablePolyline(polyline: Polyline): DrawableShape<Polyline>;
}

class DrawableShape<T extends Shape> {
    private _shape: T;
    private _drawer: Drawer<T>;

    public constructor(shape: T, drawer: Drawer<T>) {
        this._shape = shape;
        this._drawer = drawer;
    }

    public draw() {
        this._drawer.draw(this._shape);
    }

    public scaleAndTranslate(from: BoundingRect, to: BoundingRect): void {
        this._shape.scaleAndTranslate(from, to);
    }
}

export { Drawer, DrawableShape, DrawableShapeFactory };
