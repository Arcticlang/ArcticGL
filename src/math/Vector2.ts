import Vector3 from "./Vector3";

export class Vector2 {
    static get ZERO() { return new Vector2(0, 0); }
    static get ONE() { return new Vector2(1, 1); }
    
    static get UP() { return new Vector2(0, -1); }
    static get DOWN() { return new Vector2(0, 1); }
    static get LEFT() { return new Vector2(-1, 0); }
    static get RIGHT() { return new Vector2(1, 0); }

    static readonly DIRALL = [ Vector2.UP, Vector2.DOWN, Vector2.LEFT, Vector2.RIGHT ];
    
    static getDirection(d: Vector2) {
        if(Math.abs(d.x) >= Math.abs(d.y)) {
            return d.x < 0 ? Vector2.LEFT : Vector2.RIGHT;
        }

        return d.y < 0 ? Vector2.UP : Vector2.DOWN;
    }

    static opposite(dir: Vector2) {
        switch(dir) {
            case Vector2.UP: return Vector2.DOWN;
            case Vector2.DOWN: return Vector2.UP;
            case Vector2.LEFT: return Vector2.RIGHT;
            case Vector2.RIGHT: return Vector2.LEFT;
        }
        return dir;
    }
    
    private _x : number;
    private _y : number;

    constructor(x: number=0, y: number=undefined!) {
        this._x = x;
        this._y = y;
    }

    add(x: number|Vector2, y: number=0): Vector2 {
        if(x instanceof Vector2) {
            return this.add(x.x, x.y);
        }

        this.x += x;
        this.y += y;
        return this;
    }

    subtract(x: number|Vector2, y: number=0): Vector2 {
        if(x instanceof Vector2) {
            return this.subtract(x.x, x.y);
        }

        this.x -= x;
        this.y -= y;
        return this;
    }
    minus(x: number|Vector2, y: number=0): Vector2 {
        return this.subtract(x, y);
    }

    mult(x: number|Vector2, y: number=0): Vector2 {
        if(x instanceof Vector2) {
            return this.mult(x.x, x.y);
        }
        
        this.x *= x;
        this.y *= y;
        return this;
    }

    divide(x: number|Vector2, y: number=0): Vector2 {
        if(x instanceof Vector2) {
            return this.divide(x.x, x.y);
        }

        this.x /= x;
        this.y /= y;
        return this;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    distanceSquared(other: Vector2) {
        return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
    }

    distance(other: Vector2) {
        return Math.sqrt(this.distanceSquared(other));
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lesser(x: number|Vector2, y: number=0): boolean {
        if(x instanceof Vector2) {
            return this.lesser(x.x, x.y);
        }

        return this.x < x || this.y < y;
    }

    greater(x: number|Vector2, y: number=0): boolean {
        if(x instanceof Vector2) {
            return this.greater(x.x, x.y);
        }

        return this.x > x || this.y > y;
    }

    equals(x: number|Vector2, y: number=0): boolean {
        if(x instanceof Vector2) {
            return this.equals(x.x, x.y);
        }

        return this.x == x || this.y == y;
    }

    notEqual(x: number|Vector2, y: number=0): boolean {
        if(x instanceof Vector2) {
            return this.notEqual(x.x, x.y);
        }

        return this.x != x || this.y != y;
    }

    clone() {
        return new Vector2(this._x, this._y);
    }

    toVector3(z: number=0) {
        return new Vector3(this._x, this._y, z);
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

    *[Symbol.iterator]() {
        return [this._x, this._y];
    }

}