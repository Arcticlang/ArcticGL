import Texture from "./gfx/Texture";
import { Vector2 } from "./math/Vector2";

export default class Assets {
    static loadImage(src: string): HTMLImageElement {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = src;
        return image;
    }

    private static async loadImageAsync(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = src;
            image.onload = function () {
                resolve(image);
            };
        });
    }

    static async loadTexture(src: string): Promise<Texture> {
        const image = await Assets.loadImageAsync(src);
        return new Texture(image);
    }

    static async loadTextureFromSheet(src: string, offset: Vector2, size: Vector2) {
        const texture = await Assets.loadTexture(src);
        texture.offset = offset;
        texture.size = size;
        return texture;
    }
}