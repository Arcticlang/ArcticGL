import { Vector2 } from "../math/Vector2";
import Texture from "./Texture";

export default class SpriteSheet {
	private _source: Texture;
	private _textures: Texture[];

	constructor(source: Texture) {
		this._source = source;
		this._textures = [];
	}

	splitBySize(size: Vector2) {
		this._textures = [];

		const image = this._source.image;

        for (let y = 0; y < image.height / size.y; y++) {
            for (let x = 0; x < image.width / size.x; x++) {
                this._textures.push(
                    this._source.getSubImage(new Vector2(x, y).mult(size), size)
                );
            }
        }
		
	}

	get source() {
		return this._source;
	}

	get textures() {
		return this._textures;
	}
}
