var basicText1, basicText2;
var _killCount = 0;

function initPixiApp(canvas) {
    let pixiApp = new PIXI.Application({
        view: canvas,
        resizeTo: window,
        antialias: false,
        transparent: true,
        autoDensity: true,
        resolution: window.devicePixelRatio, // 2 in case of retinas
    });

    /** background - PIXI */
    const bgTexture = PIXI.Texture.from("https://picsum.photos/" + innerWidth + "/" + innerHeight);
    const bgImage = new PIXI.Sprite(bgTexture);
    bgImage.alpha = 0.75;
    pixiApp.stage.addChild(bgImage);

    /** Add text */
    basicText1 = new PIXI.Text("");
    // basicText1.anchor.set(0.5, 0);
    basicText1.position.set(10, 60);
    pixiApp.stage.addChild(basicText1);

    /** Add text02 */
    basicText2 = new PIXI.Text("");
    basicText2.position.set(10, 85);
    pixiApp.stage.addChild(basicText2);

    increaseKillCount(0);

    return pixiApp;
}


function increaseKillCount(count) {
    if (count === undefined || count === null) { count = 1; }
    _killCount += count;
    basicText1.text = "Wick's kill count: " + _killCount.toString();
}

function updateCollisionText(one, two) {
    basicText2.text = one + " :: " + two;
}
