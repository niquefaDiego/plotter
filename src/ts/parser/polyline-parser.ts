import { DrawableShape, DrawableShapeFactory } from "../drawable";
import { Point } from "../geo";
import { Polyline } from "../shape";
import { Parser } from "./parser";

export class PolylineParser implements Parser
{
    private _factory: DrawableShapeFactory;
    public constructor(drawableShapeFactory: DrawableShapeFactory) {
        this._factory = drawableShapeFactory;
    }

    public parse(text: string): Array<DrawableShape<Polyline>> {
        return [ this._factory.getDrawablePolyline(new Polyline([new Point(0, 0)])) ];
    }
}