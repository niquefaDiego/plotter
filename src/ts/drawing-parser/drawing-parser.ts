import { Drawing } from "../drawing";

export interface DrawingParser
{
    parse(text: string, drawing: Drawing): void;
}
