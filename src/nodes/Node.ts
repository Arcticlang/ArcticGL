import Transform from "../math/Transform";
import SceneManager from "../scene/SceneManager";
import { BaseNode } from "./interfaces/BaseNode";
import { ChildableNode } from "./interfaces/ChildableNode";

export class _Node implements BaseNode {
    private _name: string;
    _children: Map<string, ChildableNode>;

    constructor(name: string) {
        this._name = name;
        this._children = new Map();
    }

    begin(): void {}

	_preUpdate(): void {}
	update(): void {};
	_postUpdate(): void {
        for(let [_, node] of this._children) {
            node._updateAll();
        }
    }

    end(): void {}

    _updateAll() {
        this._preUpdate();
        this.update();
        this._postUpdate();
    }

    addChild(child: Node) {
        this._children.set(child.name, child);
        child.begin();
    }

	removeChild(child: Node | number) {
        if(typeof child == "number") {
            const c = new Array(...this._children.values())[child];
            this._children.delete(c.name);
            c.end();
            return;
        }
        this._children.delete(child.name);
        child.end();
	}

    getChild<T extends Node>(child: string) {
        if(!this._children.get(child)) return;
        return this._children.get(child) as T;
    }

    get children() {
		return this._children;
	}

    get name() {
        return this._name;
    }

    set name(v: string) {
        this._name = v;
    }

}

export default class Node extends _Node {
    static getAllNodesOfType<T extends Node>(type: string) {
        let nodes: T[] = [];

        const treeSearch = (node: _Node) => {
            if(node instanceof Node && node.type == type) {
                nodes.push(node as T);
            }
            node.children.forEach(child => treeSearch(child as Node), this);
        }
        treeSearch(SceneManager.getScene());

        return nodes;
    }

	readonly type: string = "Node";

	private _parent: Node;

    private _transform: Transform;
    transform: Transform;

	constructor(name: string) {
        super(name);
		this._parent = null!;

        this.transform = new Transform();
        this._transform = this.transform.clone();
	}

    _postUpdate(): void {
        this._transform = this.transform.clone();
    }

    remove() {
        this.end();
        this._parent.removeChild(this);
        this.children.forEach((child) => {
            child.remove();
        });
    }

	get parent() {
		return this._parent;
	}

	set parent(v: Node) {
        this._parent.removeChild(this);

        this._parent = v;
        this._parent.addChild(this);
	}

    get trueTransform() {
        return this._transform;
    }

}
