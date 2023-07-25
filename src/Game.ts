import REGL from "regl";
import "./nodes/Node";
import Color from "./color/Color";
import Renderer from "./gfx/Renderer";
import SceneManager from "./scene/SceneManager";
import Camera from "./nodes/gfx/Camera";
import GameData from "./GameData";
import { Vector2 } from "./math/Vector2";

export type GameOptions = {
	title: string;
	width?: number;
	height?: number;
	clearColor?: Color;
};

export var regl: REGL.Regl;

export default class Game {
	options: GameOptions;

	domRenderer!: HTMLCanvasElement;

    private renderer!: Renderer;

	constructor(options: GameOptions) {
		this.options = options;

		this.domRenderer = document.createElement(
			"canvas"
		) as HTMLCanvasElement;

		GameData.ticks = 0;
		GameData.width = this.options.width || innerWidth;
		GameData.height = this.options.height || innerHeight;

		this.domRenderer.width = GameData.width;
		this.domRenderer.height = GameData.height;

		const camera = new Camera("Main Camera");
		camera.transform.position = new Vector2(-(GameData.width / 2), -(GameData.height / 2));
		Camera.mainCamera = camera;
	}

	run() {
		document.title = this.options.title;
		document.body.appendChild(this.domRenderer);

		regl = REGL(this.domRenderer);

        this.renderer = new Renderer(this.domRenderer, regl);

		const update = () => {
            this.tick();
			this.render();
            requestAnimationFrame(update.bind(this));
        }
        update();

        // regl._gl.viewport(-1, 1, 1, -1);
	}

	private render() {
		this.clearScreen();

		this.renderer.treeSearch(SceneManager.getScene());
		this.renderer.drawAllSprites();
	}

	private tick() {
		GameData.ticks++;
		this.renderer.updateViewProjection();

		const nodes = SceneManager.getScene().children;
		
		for(let [_, node] of nodes) {
			node._updateAll();
			node._children.forEach(child => child._updateAll());
		}
	}

	clearScreen() {
		regl.clear({
			color: (this.options.clearColor || Color.BLACK)
				.roundToFloat()
				.toRGBAArray(),
		});
	}

	get width(): number {
		return this.domRenderer.width;
	}

	get height(): number {
		return this.domRenderer.height;
	}
}
