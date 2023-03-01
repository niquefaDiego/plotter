import { Shape } from "../shape";

export interface Parser
{
    parse(text: string): Array<Shape>;
}
