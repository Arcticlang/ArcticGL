import { Vector2 } from "../../math/Vector2";

export function AABB(aPos: Vector2, aSize: Vector2, bPos: Vector2, bSize: Vector2) {
    return aPos.x < bPos.x + aSize.x &&
        aPos.x + aSize.x > bPos.x &&
        aPos.y < bPos.y + bSize.y &&
        aPos.y + aSize.y > bPos.y;
}