import { RGB, RGBA } from "./ColorResolveable";

export default class Color {
    static get BLACK() { return new Color(0, 0, 0, 255); } 
    static get WHITE() { return new Color(255, 255, 255, 255); } 

	private _r: number;
	private _g: number;
	private _b: number;
	private _a: number;

	constructor(r: number, g: number, b: number, a: number = 255) {
		this._r = r;
		this._g = g;
		this._b = b;
		this._a = a;
	}

	toRGBAArray(): RGBA {
		return [this._r, this._g, this._b, this._a];
	}

	toRGBArray(): RGB {
		return [this._r, this._g, this._b];
	}

	roundToFloat() {
		return new Color(
			this._r / 255,
			this._g / 255,
			this._b / 255,
			this._a / 255
		);
	}

	get r(): number {
		return this._r;
	}

	set r(v: number) {
		this._r = v;
	}

	get g(): number {
		return this._g;
	}

	set g(v: number) {
		this._g = v;
	}

	get b(): number {
		return this._b;
	}

	set b(v: number) {
		this._b = v;
	}

	get a(): number {
		return this._a;
	}

	set a(v: number) {
		this._a = v;
	}
}
