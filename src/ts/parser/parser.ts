import { DrawableShape } from "../drawable";
import { Shape } from "../shape";

export interface Parser
{
    parse(text: string): Array<DrawableShape<Shape>>;
}
