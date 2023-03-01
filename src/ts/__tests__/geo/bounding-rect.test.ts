import { BoundingRect } from "../../geo/bounding-rect";

test("BoundingRect.constructor(x1, y1, x2, y2)", () => {
    const r0 = new BoundingRect(0, 1, 2, 3);
    expect(r0.sx()).toEqual(0);
    expect(r0.sy()).toEqual(1);
    expect(r0.bx()).toEqual(2);
    expect(r0.by()).toEqual(3);

    const r1 = new BoundingRect(0, -1, -2, -3);
    expect(r1.sx()).toEqual(-2);
    expect(r1.sy()).toEqual(-3);
    expect(r1.bx()).toEqual(0);
    expect(r1.by()).toEqual(-1);
});

test("BoundingRect.merge", () => {
  const r0 = BoundingRect.merge(
    new BoundingRect(0, 1, 10, 12),
    new BoundingRect(4, 5, 20, 30)
  );
  expect(r0.sx()).toEqual(0);
  expect(r0.sy()).toEqual(1);
  expect(r0.bx()).toEqual(20);
  expect(r0.by()).toEqual(30);

  const r1 = BoundingRect.merge(
    new BoundingRect(-10, -11, 30 ,-101),
    new BoundingRect(2, 40,-100, 3)
  );
  expect(r1.sx()).toEqual(-100);
  expect(r1.sy()).toEqual(-101);
  expect(r1.bx()).toEqual(30);
  expect(r1.by()).toEqual(40);
});
