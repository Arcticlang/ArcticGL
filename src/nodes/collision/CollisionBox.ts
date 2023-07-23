import { Vector2 } from "../../math/Vector2";
import Node from "../Node";
import { Collidable } from "./Collidable";

export default class CollisionBox extends Node implements Collidable {
    readonly type: string = "CollisionBox";

    private _size!: Vector2;

    constructor(name: string, size: Vector2) {
        super(name);

        this._size = size;
    }

    _preUpdate(): void {
        
    }

    get size() {
        return this._size;
    }

    set size(v: Vector2) {
        this._size = v;
    }

}