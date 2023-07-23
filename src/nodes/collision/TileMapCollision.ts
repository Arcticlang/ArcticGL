import Node from "../Node";
import { Collidable } from "./Collidable";

export default class TileMapCollision extends Node implements Collidable {
    readonly type: string = "TileMapCollision";

    constructor(name: string) {
        super(name);
    }

    _preUpdate(): void {
        this.parent 
    }
}