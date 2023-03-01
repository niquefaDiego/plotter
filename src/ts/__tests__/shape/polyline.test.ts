import { BoundingRect, Point } from "../../geo";
import { Polyline } from "../../shape";

test("Polyline.constructor(Array<Point>)", () => {
    const p0 = new Polyline([new Point(3, 4)]);
    const r0 = p0.getMinimumBoundingRect();
    expect(r0.sx()).toEqual(3);
    expect(r0.sy()).toEqual(4);
    expect(r0.bx()).toEqual(3);
    expect(r0.by()).toEqual(4);

    const p1 = new Polyline([new Point(3, 4), new Point(5, 2)]);
    const r1 = p1.getMinimumBoundingRect();
    expect(r1.sx()).toEqual(3);
    expect(r1.sy()).toEqual(2);
    expect(r1.bx()).toEqual(5);
    expect(r1.by()).toEqual(4);

    const p2 = new Polyline([new Point(3, 4), new Point(5, 2), new Point(0, 10)]);
    const r2 = p2.getMinimumBoundingRect();
    expect(r2.sx()).toEqual(0);
    expect(r2.sy()).toEqual(2);
    expect(r2.bx()).toEqual(5);
    expect(r2.by()).toEqual(10);
});


test("Polyline.scaleAndTranslate()", () => {
    const p0 = (new Polyline([new Point(13, 14), new Point(12, 19), new Point(7, 29)]))
        .scaleAndTranslate(
            BoundingRect.FromCoords(10, 5, 20, 30),
            BoundingRect.FromCoords(100, 50, 200, 300)
        );
    expect(p0.countPoints()).toEqual(3);
    expect(p0.getPoint(0).x()).toBeCloseTo(130, 12);
    expect(p0.getPoint(0).y()).toBeCloseTo(140, 12);
    expect(p0.getPoint(1).x()).toBeCloseTo(120, 12);
    expect(p0.getPoint(1).y()).toBeCloseTo(190, 12);
    expect(p0.getPoint(2).x()).toBeCloseTo(70, 12);
    expect(p0.getPoint(2).y()).toBeCloseTo(290, 12);
});