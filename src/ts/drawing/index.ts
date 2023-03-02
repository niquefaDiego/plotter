import { Drawer, DrawerFactory } from "../drawer";
import { BoundingRect } from "../geo";
import { Polyline, Shape } from "../shape";

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

    public getShape(): T {
        return this._shape;
    }
}

class Drawing {
    private _drawerFactory: DrawerFactory;
    private _shapesToDraw: Array<DrawableShape<Shape>> = [];

    public constructor(drawerFactory: DrawerFactory) {
        this._drawerFactory = drawerFactory;
    }

    public addPolyline(polyline: Polyline): void {
        this._shapesToDraw.push(new DrawableShape<Polyline>(polyline, this._drawerFactory.getPolylineDrawer()));
    }

    public draw(drawingBoundingBox: BoundingRect) {
        if (this._shapesToDraw.length == 0) {
            console.log("Nothing to draw");
            return;
        }

        var shapesBoundingBox: BoundingRect = this._shapesToDraw[0].getShape().getMinimumBoundingRect();
        for (let i = 0; i < this._shapesToDraw.length; i += 1) {
            shapesBoundingBox = shapesBoundingBox.merge(this._shapesToDraw[1].getShape().getMinimumBoundingRect());
        }

        this._shapesToDraw.forEach(shape => shape.getShape().scaleAndTranslate(
            shapesBoundingBox,
            drawingBoundingBox
        ));

        this._shapesToDraw.forEach(shape => shape.draw());
    } 
}

export { DrawableShape, Drawing };
