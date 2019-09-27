/** default visibility of matterjs apps. */
var guiSettings = {
    layer_01: true,
    layer_02: true,
    layer_03: true
};

function initDatGui() {
    var gui = new dat.GUI();
    var visibleFolder = gui.addFolder("Matterjs apps visiblility", true);

    visibleFolder.add(guiSettings, 'layer_01').onChange(guiChangeHandler);
    visibleFolder.add(guiSettings, 'layer_02').onChange(guiChangeHandler);
    visibleFolder.add(guiSettings, 'layer_03').onChange(guiChangeHandler);

    /**
     * show/hide matterjs apps based on the selection.
     */
    function guiChangeHandler() {
        matterSprite.visible = guiSettings.layer_01;
        matterSprite2.visible = guiSettings.layer_02;
        matterSprite3.visible = guiSettings.layer_03;
    }

    /** force manually change it once. */
    guiChangeHandler();

    return {
        guiChangeHandler
    }
}
