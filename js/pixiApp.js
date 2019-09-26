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

    return pixiApp;
}