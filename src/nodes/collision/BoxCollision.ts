import { Vector2 } from "../../math/Vector2";
import SceneManager from "../../scene/SceneManager";
import Node from "../Node";
import TileMap from "../gfx/TileMap";
import { AABB } from "./AABB";
import { Collidable } from "./Collidable";

export default class BoxCollision extends Node implements Collidable {
    readonly type: string = "BoxCollision";

    private disabled: boolean = false;
    private _size!: Vector2;

    constructor(name: string, size: Vector2) {
        super(name);

        this._size = size;
    }

    _postUpdate(): void {
        if(this.disabled) return;

        const tileMaps = Node.getAllNodesOfType<TileMap>("TileMap");
        for(let tileMap of tileMaps) {
            this.tileMapCollision(tileMap);
        }
    }

    private boxCollision(boxCollision: BoxCollision) {

    }

    private tileMapCollision(tileMap: TileMap) {
        const tileSize = tileMap.tileSize;

        const position = this.transform.position;
        const truePosition = this.trueTransform.position;

        console.log(Math.floor(position.x / tileSize), Math.floor(position.y / tileSize));
        console.log(position.x, position.y);

        const collisionWithTile = (x: number, y: number) => {
            const tile = tileMap.getTile(new Vector2(x, y));
            return tile != null;
        }

        if(collisionWithTile(Math.floor(position.x / tileSize), Math.floor(position.y / tileSize))) {
            console.log("COLLISIONS");
            truePosition.set(position.x, position.y);
        }
    }

    get size() {
        return this._size;
    }

    set size(v: Vector2) {
        this._size = v;
    }

}