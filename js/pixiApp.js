var basicText1, basicText2;
var _killCount = 0;
var tempText;

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

    PIXI.sound.add('boing', 'https://raw.githubusercontent.com/pixijs/pixi-sound/master/examples/resources/boing.mp3');

    /** foreground image */
    const playButton = createButton();
    playButton.anchor.set(0.5, 1.2);
    pixiApp.stage.addChild(playButton);

    pixiApp.playButton = playButton;

    addText(pixiApp);

    window.addEventListener('resize', resize);
    function resize() {
        playButton.position.set(innerWidth / 2, innerHeight);
        tempText.position.set(innerWidth / 2, innerHeight * 0.1);
    };
    resize();

    return pixiApp;
}

function playSound() {
    PIXI.sound.play('boing');
}

function increaseKillCount(count) {
    if (count === undefined || count === null) { count = 1; }
    _killCount += count;
    basicText1.text = "Wick's kill count: " + _killCount.toString();
}

function updateCollisionText(one, two) {
    basicText2.text = one + " :: " + two;
}

function addText(pixiApp) {
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        miterLimit: 3,
        wordWrapWidth: 440,
    });

    tempText = new PIXI.Text("SAMPLE", style);
    tempText.anchor.set(0.5);
    tempText.visible = false;
    pixiApp.stage.addChild(tempText);
}

function getTextElement() {
    return tempText;
}