import Node from "../Node";
import Texture from "../../gfx/Texture";
import Color from "../../color/Color";

export default class Sprite extends Node {
    readonly type: string = "Sprite";

    private _texture: Texture;
    private _tint: Color;

    constructor(name: string, texture: Texture=null!, tint: Color=Color.WHITE) {
        super(name);

        this._texture = texture || new Texture();
        this._tint = tint;
    }

    get texture() {
        return this._texture;
    }

    set texture(v: Texture) {
        this._texture = v;
    }

    get tint() {
        return this._tint;
    }
    
    set tint(v: Color) {
        this._tint = v;
    }

}