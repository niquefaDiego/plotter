import { BoundingRect, Point } from "../../geo";

test("BoundingRect.FromCoords(x1, y1, x2, y2)", () => {
    const r0 = BoundingRect.FromCoords(0, 1, 2, 3);
    expect(r0.sx()).toEqual(0);
    expect(r0.sy()).toEqual(1);
    expect(r0.bx()).toEqual(2);
    expect(r0.by()).toEqual(3);

    const r1 = BoundingRect.FromCoords(0, -1, -2, -3);
    expect(r1.sx()).toEqual(-2);
    expect(r1.sy()).toEqual(-3);
    expect(r1.bx()).toEqual(0);
    expect(r1.by()).toEqual(-1);
});

test("BoundingRect.merge", () => {
  const r0 = BoundingRect.FromCoords(0, 1, 10, 12).merge(
    BoundingRect.FromCoords(4, 5, 20, 30)
  );
  expect(r0.sx()).toEqual(0);
  expect(r0.sy()).toEqual(1);
  expect(r0.bx()).toEqual(20);
  expect(r0.by()).toEqual(30);

  const r1 = BoundingRect.FromCoords(-10, -11, 30 ,-101).merge(
    BoundingRect.FromCoords(2, 40,-100, 3)
  );
  expect(r1.sx()).toEqual(-100);
  expect(r1.sy()).toEqual(-101);
  expect(r1.bx()).toEqual(30);
  expect(r1.by()).toEqual(40);
});

test("BoundingRect.extendToCover", () => {
  const r0 = (BoundingRect.FromCoords(10, 10, 20, 20)).extendToCover(new Point(-10, 100));
  expect(r0.sx()).toEqual(-10);
  expect(r0.sy()).toEqual(10);
  expect(r0.bx()).toEqual(20);
  expect(r0.by()).toEqual(100);

  const r1 = (BoundingRect.FromCoords(10, 10, 20, 20)).extendToCover(new Point(100, -10));
  expect(r1.sx()).toEqual(10);
  expect(r1.sy()).toEqual(-10);
  expect(r1.bx()).toEqual(100);
  expect(r1.by()).toEqual(20);

  const r2 = (BoundingRect.FromCoords(10, 10, 20, 20)).extendToCover(new Point(15, 15));
  expect(r2.sx()).toEqual(10);
  expect(r2.sy()).toEqual(10);
  expect(r2.bx()).toEqual(20);
  expect(r2.by()).toEqual(20);
});