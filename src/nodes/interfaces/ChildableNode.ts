import Node from "../Node";
import { UpdateableNode } from "./UpdateableNode";

export interface ChildableNode extends UpdateableNode {
    parent: Node;

    remove(): void;
}