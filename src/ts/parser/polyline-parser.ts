import { Point } from "../geo";
import { Polyline } from "../shape";
import { Parser } from "./parser";

export class PolylineParser implements Parser
{
    public parse(text: string): Array<Polyline> {
        return [ new Polyline([new Point(0, 0)]) ];
    }
}