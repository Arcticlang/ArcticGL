import { ChildableNode } from "./ChildableNode";

export interface BaseNode {
    name: string;
    _children: Map<string, ChildableNode>;

    begin(): void;
    end(): void;
}