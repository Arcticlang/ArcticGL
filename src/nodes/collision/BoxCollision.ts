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

    _preUpdate(): void {
        if(this.disabled) return;

        const boxCollisions = Node.getAllNodesOfType<BoxCollision>("BoxCollision");
        for(let boxCollision of boxCollisions) {
            this.boxCollision(boxCollision);
        }
    }

    private boxCollision(boxCollision: BoxCollision) {

    }

    private tileMapCollision(tileMap: TileMap) {
        const tileSize = tileMap.tileSize;

        const position = this.transform.position;

        const collisionWithTile = (x: number, y: number) => {
            return tileMap.getTile(new Vector2(x, y)) != null;
        }

        let tx = (position.x + this.size.x) / tileSize;
        if(!collisionWithTile(tx, (position.y) / tileSize) &&
            !collisionWithTile(tx, (position.y + this.size.y) / tileSize)) {
                                
            } else {
                position.x = tx * tileSize - this.size.x - 1;
            }
        
        tx = position.x / tileSize;
        if(!collisionWithTile(tx, (position.y) / tileSize) &&
            !collisionWithTile(tx, (position.y + this.size.y) / tileSize)) {
                                
            } else {
                position.x = tx * tileSize + tileSize;
            }

        let ty = position.y / tileSize;
        if(!collisionWithTile(position.x / tileSize, ty) &&
            !collisionWithTile(position.x + this.size.x, ty)) {
                                
            } else {
                position.y = ty * tileSize + tileSize;
            }
        
        ty = (position.y + this.size.y) / tileSize;
        if(!collisionWithTile(position.x / tileSize, ty) &&
            !collisionWithTile(position.x + this.size.x, ty)) {
                                
            } else {
                position.y = ty * tileSize - this.size.y - 1;
            }
    }

    get size() {
        return this._size;
    }

    set size(v: Vector2) {
        this._size = v;
    }

}