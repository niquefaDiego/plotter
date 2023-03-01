import { Point } from "./point";
import { BoundingRect } from "./bounding-rect";

function scaleAndTranslate(p: Point, from: BoundingRect, to: BoundingRect): Point {
    return new Point(
        ((p.x() - from.sx()) / from.width()) * to.width() + to.sx(),
        ((p.y() - from.sy()) / from.height()) * to.height() + to.sy()
    );
}

export {
    scaleAndTranslate
};
