import { BoundingRect } from "../../geo";

export interface Shape {
    getMinimumBoundingRect(): BoundingRect;
    scaleAndTranslate(from: BoundingRect, to: BoundingRect): Shape;
}
