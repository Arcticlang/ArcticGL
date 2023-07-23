import './style.css';
import Game from './Game';
import Assets from './Assets';
import Color from './color/Color';
import SpriteSheet from './gfx/SpriteSheet';
import { Vector2 } from './math/Vector2';
import Scene from './scene/Scene';
import SceneManager from './scene/SceneManager';
import TileMap from './nodes/gfx/TileMap';
import Tileset from './gfx/Tileset';
import Sprite from './nodes/gfx/Sprite';
import Texture from './gfx/Texture';


const game = new Game({
    title: "Test",
    width: 1920 / 2,
    height: 1080 / 2,
    clearColor: new Color(33, 33, 35)
});

let playerSheet: SpriteSheet;
let tileSheet: SpriteSheet;
let tileset: Tileset;
let testTexture: Texture;
const loadAssets = async () => {
    tileSheet = new SpriteSheet(await Assets.loadTexture("data/tileset.png"));
    tileSheet.splitBySize(new Vector2(16, 16));

    tileset = new Tileset(tileSheet);

    playerSheet = new SpriteSheet(await Assets.loadTexture("data/player-sprites.png"));
    playerSheet.splitBySize(new Vector2(16, 16));

    testTexture = await Assets.loadTexture("data/image.png");
}

const map1 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 0, 0, 0, 0, 0,
    0, 1, 2, 2, 2, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,
    0, 4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,
    0, 4, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0,
    0, 7, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 0,
    0, 0, 7, 8, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const main = async () => {
    await loadAssets();

    const scene = new Scene("Game");

    const tileMap = new TileMap("Tiles", tileset);
    tileMap.transform.position.y += 450;
    tileMap.tileSize = 32;
    loadMap(tileMap, new Vector2(15, 15), map1);

    const player = new Sprite("Player");
    player.transform.scale = new Vector2(32, 32);
    player.transform.position = new Vector2(100, 600);
    player.texture = testTexture;
    console.log(playerSheet.textures[1]);

    scene.addChild(player);
    scene.addChild(tileMap);

    SceneManager.setScene(scene);
    game.run();
}

const loadMap = async (tileMap: TileMap, size: Vector2, map: number[]) => {
    for(let x = 0; x < size.x; x++) {
        for(let y = 0; y < size.y; y++) {
            let tileId = map[y * size.x + x];
            tileMap.setTile(new Vector2(x, y), tileId);
        }
    }
}

main();