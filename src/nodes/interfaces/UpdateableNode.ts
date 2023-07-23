import { BaseNode } from "./BaseNode";

export interface UpdateableNode extends BaseNode {
    _updateAll(): void;
    _preUpdate(): void;
    update(): void;
    _postUpdate(): void;
}