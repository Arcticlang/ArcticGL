import Scene from "./Scene";

export default class SceneManager {
    private static currentScene: Scene;

    static setScene(scene: Scene) {
        this.currentScene = scene;
    }

    static getScene() {
        return this.currentScene;
    }
}