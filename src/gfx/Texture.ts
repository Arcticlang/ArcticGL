import { regl } from "../Game";
import Assets from "../Assets";
import REGL from 'regl';
import { Vector2 } from "../math/Vector2";

export default class Texture {
    private _image!: HTMLImageElement;
    private _offset!: Vector2;
    private _size!: Vector2;

    constructor(image?: HTMLImageElement, offset: Vector2=Vector2.ZERO) {
        if(image) {
            this._image = image;

            this._offset = offset;
            this._size = new Vector2(this._image.width, this._image.height);
        }
    }

    getSubImage(offset: Vector2, size: Vector2) {
        const texture = this.clone();
        texture.offset = offset;
        texture.size = size;
        return texture;
    }

    clone() {
        return new Texture(this._image, this._offset);
    }

    get width() {
        return this._size.x;
    }

    get height() {
        return this._size.y;
    }

    get image() {
        return this._image; 
    }

    set image(v: HTMLImageElement) {
        this._image = v;
    }

    get offset() {
        return this._offset;
    }

    set offset(val: Vector2) {
        this._offset = val;
    }

    get size() {
        return this._size;
    }

    set size(val: Vector2) {
        this._size = val;
    }

}