import { Vector2 } from "./Vector2";
import Vector3 from "./Vector3";

/**
Thanks to NamorvTech on GitHub & Youtube for your amazing tutorial series!
*/

export default class Matrix4x4 {
	static identity(): Matrix4x4 {
		return new Matrix4x4();
	}

	static orthographic(
		left: number,
		right: number,
		bottom: number,
		top: number,
		nearClip: number,
		farClip: number
	): Matrix4x4 {
		const m = new Matrix4x4();

		let lr = 1.0 / (left - right);
		let bt = 1.0 / (bottom - top);
		let nf = 1.0 / (nearClip - farClip);

		m._data[0] = -2.0 * lr;
		m._data[5] = -2.0 * bt;
		m._data[10] = 2.0 * nf;

		m._data[12] = (left + right) * lr;
		m._data[13] = (top + bottom) * bt;
		m._data[14] = (farClip + nearClip) * nf;

		return m;
	}

	static translation(position: Vector2 | Vector3) {
		const m = new Matrix4x4();

		m._data[12] = position.x;
		m._data[13] = position.y;
		m._data[14] = position instanceof Vector3 ? position.z : 0;

		return m;
	}

	/**
	 * Creates a rotation matrix on the X axis from the provided angle in radians.
	 * @param angleInRadians The angle in radians.
	 */
	public static rotationX(angleInRadians: number): Matrix4x4 {
		let m = new Matrix4x4();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m._data[5] = c;
		m._data[6] = s;
		m._data[9] = -s;
		m._data[10] = c;

		return m;
	}

	/**
	 * Creates a rotation matrix on the Y axis from the provided angle in radians.
	 * @param angleInRadians The angle in radians.
	 */
	static rotationY(angleInRadians: number): Matrix4x4 {
		let m = new Matrix4x4();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m._data[0] = c;
		m._data[2] = -s;
		m._data[8] = s;
		m._data[10] = c;

		return m;
	}

	/**
	 * Creates a rotation matrix on the Z axis from the provided angle in radians.
	 * @param angleInRadians The angle in radians.
	 */
	static rotationZ(angleInRadians: number): Matrix4x4 {
		let m = new Matrix4x4();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m._data[0] = c;
		m._data[1] = s;
		m._data[4] = -s;
		m._data[5] = c;

		return m;
	}

	/**
	 * Creates a rotation matrix from the provided angles in radians.
	 * @param xRadians The angle in radians on the X axis.
	 * @param yRadians The angle in radians on the Y axis.
	 * @param zRadians The angle in radians on the Z axis.
	 */
	static rotationXYZ(
		xRadians: number,
		yRadians: number,
		zRadians: number
	): Matrix4x4 {
		let rx = Matrix4x4.rotationX(xRadians);
		let ry = Matrix4x4.rotationY(yRadians);
		let rz = Matrix4x4.rotationZ(zRadians);

		// ZYX
		return Matrix4x4.multiply(Matrix4x4.multiply(rz, ry), rx);
	}

	static scale(scale: Vector2 | Vector3) {
		const m = new Matrix4x4();

		m._data[0] = scale.x;
		m._data[5] = scale.y;
		m._data[10] = scale instanceof Vector3 ? scale.z : 0;

		return m;
	}

	public static multiply(a: Matrix4x4, b: Matrix4x4): Matrix4x4 {
		const m = new Matrix4x4();

		let b00 = b._data[0 * 4 + 0];
		let b01 = b._data[0 * 4 + 1];
		let b02 = b._data[0 * 4 + 2];
		let b03 = b._data[0 * 4 + 3];
		let b10 = b._data[1 * 4 + 0];
		let b11 = b._data[1 * 4 + 1];
		let b12 = b._data[1 * 4 + 2];
		let b13 = b._data[1 * 4 + 3];
		let b20 = b._data[2 * 4 + 0];
		let b21 = b._data[2 * 4 + 1];
		let b22 = b._data[2 * 4 + 2];
		let b23 = b._data[2 * 4 + 3];
		let b30 = b._data[3 * 4 + 0];
		let b31 = b._data[3 * 4 + 1];
		let b32 = b._data[3 * 4 + 2];
		let b33 = b._data[3 * 4 + 3];
		let a00 = a._data[0 * 4 + 0];
		let a01 = a._data[0 * 4 + 1];
		let a02 = a._data[0 * 4 + 2];
		let a03 = a._data[0 * 4 + 3];
		let a10 = a._data[1 * 4 + 0];
		let a11 = a._data[1 * 4 + 1];
		let a12 = a._data[1 * 4 + 2];
		let a13 = a._data[1 * 4 + 3];
		let a20 = a._data[2 * 4 + 0];
		let a21 = a._data[2 * 4 + 1];
		let a22 = a._data[2 * 4 + 2];
		let a23 = a._data[2 * 4 + 3];
		let a30 = a._data[3 * 4 + 0];
		let a31 = a._data[3 * 4 + 1];
		let a32 = a._data[3 * 4 + 2];
		let a33 = a._data[3 * 4 + 3];

		m._data[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		m._data[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		m._data[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		m._data[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
		m._data[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
		m._data[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
		m._data[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
		m._data[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
		m._data[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
		m._data[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
		m._data[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
		m._data[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
		m._data[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
		m._data[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
		m._data[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
		m._data[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

		return m;
	}

	static inverse(m: Matrix4x4) {
		var a00 = m._data[0], a01 = m._data[1], a02 = m._data[2], a03 = m._data[3],
			a10 = m._data[4], a11 = m._data[5], a12 = m._data[6], a13 = m._data[7],
			a20 = m._data[8], a21 = m._data[9], a22 = m._data[10], a23 = m._data[11],
			a30 = m._data[12], a31 = m._data[13], a32 = m._data[14], a33 = m._data[15],

			b00 = a00 * a11 - a01 * a10,
			b01 = a00 * a12 - a02 * a10,
			b02 = a00 * a13 - a03 * a10,
			b03 = a01 * a12 - a02 * a11,
			b04 = a01 * a13 - a03 * a11,
			b05 = a02 * a13 - a03 * a12,
			b06 = a20 * a31 - a21 * a30,
			b07 = a20 * a32 - a22 * a30,
			b08 = a20 * a33 - a23 * a30,
			b09 = a21 * a32 - a22 * a31,
			b10 = a21 * a33 - a23 * a31,
			b11 = a22 * a33 - a23 * a32,

			det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) { 
			return null; 
		}
		det = 1.0 / det;

		m._data[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		m._data[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		m._data[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		m._data[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		m._data[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		m._data[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		m._data[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		m._data[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		m._data[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		m._data[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		m._data[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		m._data[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		m._data[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		m._data[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		m._data[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		m._data[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

		return m;
	}

	private _data: number[] = [];

	private constructor() {
		this._data = [
			1, 0, 0, 0, 
			0, 1, 0, 0,
			0, 0, 1, 0, 
			0, 0, 0, 1
		];
	}

	multiply(other: Matrix4x4) {
		if(other == null) return this;
		return Matrix4x4.multiply(this, other);
	}
	
	clone() {
		const m = new Matrix4x4();
		m._data = this._data;
		return m;
	}

	get data() {
		return this._data;
	}
}
