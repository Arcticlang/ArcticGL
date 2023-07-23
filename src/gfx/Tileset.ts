import SpriteSheet from "./SpriteSheet";
import Texture from "./Texture";

export default class Tileset {
	private _sprites: Texture[];

	constructor(sprites: Texture[] | SpriteSheet) {
		this._sprites =
			sprites instanceof SpriteSheet ? sprites.textures : sprites;
        this._sprites.unshift(null!);
	}

    getTile(id: number) {
        return this._sprites[id];
    }

    get sprites() {
        return this.sprites;
    }

    set sprites(v: Texture[]) {
        this._sprites = v;
    }
}
