import { Drawing } from "../drawing";

export interface Parser
{
    parse(text: string, drawing: Drawing): void;
}
