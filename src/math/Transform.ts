import Camera from "../nodes/gfx/Camera";
import Matrix4x4 from "./Matrix4x4";
import { Vector2 } from "./Vector2";
import Vector3 from "./Vector3";

export type AlignmentType = "center" | "bottom-left";

export default class Transform {
	position: Vector2 = Vector2.ZERO;
	scale: Vector2 = Vector2.ONE;
	rotation: Vector3 = Vector3.ZERO;
	angle: number = 0;

	rotationAlignment: AlignmentType = "center";

	getTransformMatrix(): Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);

		let rotation = Matrix4x4.rotationXYZ(
			this.rotation.x,
			this.rotation.y,
			this.rotation.z
		);
		let scale = Matrix4x4.scale(this.scale);

		return translation
			.multiply(scale)
			.multiply(rotation);
	}

	getTransformMatrixWithAnchor(): Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);

		let rotation = Matrix4x4.rotationXYZ(
			this.rotation.x,
			this.rotation.y,
			this.rotation.z
		);
		let scale = Matrix4x4.scale(this.scale);

		let t1 =
			this.rotationAlignment == "center"
				? Matrix4x4.translation(this.scale.clone().divide(2, 2))
				: null!;
		let t2 =
			this.rotationAlignment == "center"
				? Matrix4x4.translation(
						this.scale.clone().mult(-1, -1).divide(2, 2)
				  )
				: null!;

		return translation
			.multiply(scale)
			.multiply(t1)
			.multiply(rotation)
			.multiply(t2);
	}

	clone() {
		const transform = new Transform();
		transform.position = this.position.clone();
		transform.scale = this.scale.clone();
		transform.rotation = this.rotation.clone();
		transform.angle = this.angle;
		this.rotationAlignment = this.rotationAlignment;
		return transform;
	}
}
