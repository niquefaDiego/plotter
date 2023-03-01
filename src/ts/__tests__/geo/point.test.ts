import { Point } from "../../geo/point";

test("Point.dist", () => {
  expect(new Point(1, 2).dist(new Point(2, 2))).toBeCloseTo(1, 12);
  expect(new Point(1, 2).dist(new Point(0, 3))).toBeCloseTo(Math.sqrt(2), 12);
  expect(new Point(-1.3, 3.1).dist(new Point(2.45, -2.14))).toBeCloseTo(6.443609237065823, 12);
  expect(new Point(-10000000, 0).dist(new Point(10000000, 0))).toBeCloseTo(20000000, 12);
  expect(new Point(0, -20000000).dist(new Point(0, 20000000))).toBeCloseTo(40000000, 12);
});
