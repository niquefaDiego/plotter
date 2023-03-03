import { BoundingRect, Point, Utils as GeoUtils } from "../geo";
import { Shape } from "./shape";

export class Polyline implements Shape {
    private _boundingRect: BoundingRect;
    private _points: Array<Point>;

    public constructor(points: Array<Point>) {
        if (points.length == 0) {
            throw new Error("Polyline requires at least 1 point");
        }

        this._boundingRect = BoundingRect.FromPoint(points[0]);
        for (let i = 1; i < points.length; i += 1)
            this._boundingRect = this._boundingRect.extendToCover(points[i]);
        this._points = [...points];
    }

    public getMinimumBoundingRect(): BoundingRect {
        return this._boundingRect;
    }

    public scaleAndTranslate(from: BoundingRect, to: BoundingRect): void {
        for (let i = 0; i < this._points.length; i += 1)
            this._points[i] = GeoUtils.scaleAndTranslate(this._points[i], from, to);
    }

    public countPoints(): number {
        return this._points.length;
    }

    public getPoint(index: number): Point {
        return this._points[index];
    }
}