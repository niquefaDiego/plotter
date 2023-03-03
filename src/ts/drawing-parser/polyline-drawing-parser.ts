import { Drawing } from "../drawing";
import { Point } from "../geo";
import { Polyline } from "../shape";
import { DrawingParser } from "./drawing-parser";

export class PolylineDrawingParser implements DrawingParser
{
    public parse(text: string, drawing: Drawing): void {
        const numbers: Array<number> = [];

        for (const line of text.split('\n'))
          for (const token of line.split(' '))
            if (token)
              numbers.push(+token);
      
        if (numbers.length % 2 != 0) {
          throw new Error("ERROR: write an even number of numbers")
        }
      
        if (numbers.length == 0) {
            throw new Error("ERROR: need at least a pair of numbers")
        }
      
        const points: Point[] = [];
        for (let i = 0; i < numbers.length; i += 2) {
          points.push(new Point(numbers[i], numbers[i+1]));
        }

        drawing.addPolyline(new Polyline(points));
    }
}