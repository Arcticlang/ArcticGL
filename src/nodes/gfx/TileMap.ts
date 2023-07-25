import Node from "../Node";
import Tileset from "../../gfx/Tileset";
import Texture from "../../gfx/Texture";
import { Vector2 } from "../../math/Vector2";
import Color from "../../color/Color";

export default class TileMap extends Node {
    readonly type: string = "TileMap";

    collisionDisabled: boolean = false;

    private _size: Vector2;

    private _tileSize: number;
    private _tileset: Tileset;
    private _tiles: Texture[];

    private _tint: Color;

    constructor(name: string, tileset: Tileset) {
        super(name);

        this._size = new Vector2(256, 256);

        this._tileSize = 16;
        this._tileset = tileset;
        this._tiles = new Array(this._size.x * this._size.y);

        this._tint = Color.WHITE;
    }

    setTile(position: Vector2, tileId: number) {
        this._tiles[this.getTilePosition(position)] = this._tileset.getTile(tileId);
    } 

    getTile(position: Vector2) {
        return this._tiles[this.getTilePosition(position)];
    }

    private getTilePosition(position: Vector2) {
        return position.y * this._size.x + position.x;
    }

    get tileset() {
        return this._tileset;
    }

    set tileset(v: Tileset) {
        this._tileset = v;
    }

    get tiles() {
        return this._tiles;
    }

    get size() {
        return this._size;
    }

    get tint() {
        return this._tint;
    }
    
    set tint(v: Color) {
        this._tint = v;
    }

    get tileSize() {
        return this._tileSize;
    }
    
    set tileSize(v: number) {
        this._tileSize = v;
    }

}