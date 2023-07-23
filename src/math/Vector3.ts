import { Vector2 } from "./Vector2";

export default class Vector3 {
    static get ZERO() {return new Vector3(0, 0, 0)}

    private _x : number;
    private _y : number;
    private _z : number;

    constructor(x: number=0, y: number=undefined!, z: number=undefined!) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    add(x: number|Vector3, y: number=0, z: number=0): Vector3 {
        if(x instanceof Vector3) {
            return this.add(x.x, x.y, x.z);
        }

        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }

    subtract(x: number|Vector3, y: number=0, z: number=0): Vector3 {
        if(x instanceof Vector3) {
            return this.subtract(x.x, x.y, x.z);
        }

        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }
    minus(x: number|Vector3, y: number=0, z: number=0): Vector3 {
        return this.subtract(x, y, z);
    }

    mult(x: number|Vector3, y: number=0, z: number=0): Vector3 {
        if(x instanceof Vector3) {
            return this.mult(x.x, x.y, x.z);
        }
        
        this.x *= x;
        this.y *= y;
        this.z *= z;
        return this;
    }

    divide(x: number|Vector3, y: number=0, z: number=0): Vector3 {
        if(x instanceof Vector3) {
            return this.divide(x.x, x.y, x.z);
        }

        this.x /= x;
        this.y /= y;
        this.z /= z;
        return this;
    }

    set(x: number, y: number, z: number=0) {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }

    distanceSquared(other: Vector3) {
        return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2) + Math.pow(this.z - other.z, 2);
    }

    distance(other: Vector3) {
        return Math.sqrt(this.distanceSquared(other));
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    lesser(x: number|Vector3, y: number=0, z: number=0): boolean {
        if(x instanceof Vector3) {
            return this.lesser(x.x, x.y, x.z);
        }

        return this.x < x || this.y < y || this.z < z;
    }

    greater(x: number|Vector3, y: number=0, z: number=0): boolean {
        if(x instanceof Vector3) {
            return this.greater(x.x, x.y);
        }

        return this.x > x || this.y > y || this.z > z;
    }

    equals(x: number|Vector3, y: number=0, z: number=0): boolean {
        if(x instanceof Vector3) {
            return this.equals(x.x, x.y, x.z);
        }

        return this.x == x || this.y == y || this.z == z;
    }

    notEqual(x: number|Vector3, y: number=0, z: number=0): boolean {
        if(x instanceof Vector3) {
            return this.notEqual(x.x, x.y, x.z);
        }

        return this.x != x || this.y != y || this.z != z;
    }

    clone() {
        return new Vector3(this._x, this._y, this._z);
    }

    toVector2() {
        return new Vector2(this._x, this._y);
    }

    get y() : number {
        return this._y;
    }

    set y(v : number) {
        this._y = v;
    }

    get x() : number {
        return this._x;
    }

    set x(v : number) {
        this._x = v;
    }

    get z() : number {
        return this._z;
    }

    set z(v : number) {
        this._z = v;
    }

    *[Symbol.iterator]() {
        return [this._x, this._y, this._z];
    }
}