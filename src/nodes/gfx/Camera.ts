/// <reference path="../Node.ts"/>


import Node from "../Node";
import Matrix4x4 from "../../math/Matrix4x4";

export default class Camera extends Node {
	static mainCamera = new Camera("Main Camera");

	readonly type: string = "Camera";

	private _viewMatrix: Matrix4x4;

	constructor(name: string) {
		super(name);

		this._viewMatrix = Matrix4x4.identity();
	}

    _postUpdate(): void {
        this._viewMatrix = Matrix4x4.translation(this.transform.position);
        this._viewMatrix = Matrix4x4.inverse(this._viewMatrix)!;
    }

	get viewMatrix() {
		return this._viewMatrix;
	}

	set viewMatrix(v: Matrix4x4) {
		this._viewMatrix = v;
	}

}
