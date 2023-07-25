import REGL, { DrawCommand, Regl } from "regl";
import Matrix4x4 from "../math/Matrix4x4";
import Sprite from "../nodes/gfx/Sprite";
import { _Node } from "../nodes/Node";
import { BaseNode } from "../nodes/interfaces/BaseNode";
import Texture from './Texture';
import { RGBA } from "../color/ColorResolveable";
import { Vector2 } from "../math/Vector2";
import Camera from "../nodes/gfx/Camera";
import Transform from '../math/Transform';
import TileMap from "../nodes/gfx/TileMap";

type DrawTexture = {
	texCoord: REGL.Buffer;
	projection: number[];
	model: number[];
	diffuse: REGL.Texture2D;
	tint: RGBA;
	drawingOrder: number;
};

export default class Renderer {
	private gl: Regl;

	private projection: Matrix4x4;
	private viewProjection: Matrix4x4;

	private drawTexturedSquare: DrawCommand;
	private drawTextures: DrawTexture[];

	constructor(canvas: HTMLCanvasElement, regl: Regl) {
		this.gl = regl;

		this.projection = Matrix4x4.orthographic(
			0,
			canvas.width,
			0,
			canvas.height,
			-1,
			1000
		);
		this.viewProjection = Matrix4x4.identity();

		this.drawTextures = [];

		this.drawTexturedSquare = regl({
			vert: `
            precision mediump float;

            attribute vec2 position;
            attribute vec2 texCoord;

            uniform mat4 projection;
            uniform mat4 model;

			varying vec2 v_texCoord;

			vec2 normalizeCoords(vec2 position) {
				return position * vec2(1, -1);
			}

            void main() {
                gl_Position = projection * model * vec4(normalizeCoords(position), 0, 1);
				v_texCoord = texCoord;
            }`,

			frag: `
            precision mediump float;

            uniform vec4 tint;
			uniform sampler2D diffuse;

			varying vec2 v_texCoord;

            void main() {
                gl_FragColor = tint * texture2D(diffuse, v_texCoord);
            }`,

			attributes: {
				position: regl.buffer([
					[0, 0],
					[0, 1],
					[1, 1],
	
					[1, 1],
					[1, 0],
					[0, 0],
				]),
				// @ts-ignore
				texCoord: regl.prop("texCoord"),
			},

			uniforms: {
				// @ts-ignore
				projection: regl.prop("projection"),
				// @ts-ignore
				model: regl.prop("model"),

				// @ts-ignore
				diffuse: regl.prop("diffuse"),
				// @ts-ignore
				tint: regl.prop("tint"),
			},

			count: 6,
		});
	}

	treeSearch(node: BaseNode) {
		if (node instanceof Sprite) {
			this.renderSprite(node);
		} else if (node instanceof TileMap) {
			this.renderTileMap(node);
		}

		node._children.forEach((node) => this.treeSearch(node), this);
	}

	renderTileMap(tileMap: TileMap) {
		const transform = tileMap.trueTransform.clone();

		for(let x = 0; x < tileMap.size.x; x++) {
			for(let y = 0; y < tileMap.size.y; y++) {
				const position = new Vector2(x, y);

				const texture = tileMap.getTile(position);
				if(!texture) continue;

				const image = texture.image;

				if(!image) return;

				const texCoord = this.getTexCoord(texture);

				const tileTransform = transform.clone();
				tileTransform.scale = new Vector2(tileMap.tileSize, tileMap.tileSize);
				tileTransform.position.add(position.clone().set(position.x, -position.y).mult(tileMap.tileSize, tileMap.tileSize));

				this.drawTextures.push({
					texCoord,
		
					projection: this.viewProjection.data,
					model: tileTransform.getTransformMatrix().data,
		
					diffuse: this.gl.texture({ data: image }),
					tint: tileMap.tint.roundToFloat().toRGBAArray(),

					drawingOrder: tileMap.transform.zIndex
				});
			}
		}
	}

	renderSprite(sprite: Sprite) {
		const transform = sprite.trueTransform;

		const texture = sprite.texture;
		const image = texture.image;

		if (!image) return;

		const texCoord = this.getTexCoord(texture);

		this.drawTextures.push({
			texCoord,

			projection: this.viewProjection.data,
			model: transform.getTransformMatrix().data,

			diffuse: this.gl.texture({ data: image }),
			tint: sprite.tint.roundToFloat().toRGBAArray(),

			drawingOrder: sprite.transform.zIndex
		});
	}

	drawAllSprites() {
		this.drawTextures.sort((a, b) => a.drawingOrder + b.drawingOrder);
		this.drawTexturedSquare(this.drawTextures);
		this.drawTextures = [];
	}

	getTexCoord(texture: Texture) {
		const image = texture.image;

		const texScale = new Vector2(image.width, image.height);

		const { offset, size } = texture;

		const texOffset = offset.clone().divide(texScale);
		const texSize = size.clone().divide(texScale);

		return this.gl.buffer([
			texOffset.x, texOffset.y,
			texOffset.x, texOffset.y + texSize.y,
			texOffset.x + texSize.x, texOffset.y + texSize.y,

			texOffset.x + texSize.x, texOffset.y + texSize.y,
			texOffset.x + texSize.x, texOffset.y,
			texOffset.x, texOffset.y,
		]);
	}

	updateViewProjection() {
		const cameraMatrix = this.makeCameraMatrix(Camera.mainCamera.transform);
		let viewMatrix = Matrix4x4.inverse(cameraMatrix)!;
		this.viewProjection = Matrix4x4.multiply(this.projection, viewMatrix);
	}

	private makeCameraMatrix(camera: Transform) {
		let cameraMatrix = Matrix4x4.identity();
		cameraMatrix = Matrix4x4.multiply(
			cameraMatrix,
			Matrix4x4.translation(camera.position)
		);
		return cameraMatrix;
	}
}
