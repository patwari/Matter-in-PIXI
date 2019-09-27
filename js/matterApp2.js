function initMatterApp2(canvas) {

    //Setup Matter JS
    var engine = Matter.Engine.create();
    var world = engine.world;
    // remove gravity
    world.gravity.y = 0;
    world.gravity.x = 100;

    var render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 800,
            height: 800,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });

    /** ====================================================< MAIN CODE >==================================================== */
    /**
     * Phase of Spin: 
     * 0 = Not spinning
     * 1 = spin starting
     * 2 = constant speed
     * 3 = spin stopping
     */
    let spinPhase = 0;
    let timer;

    let velocityPhases = [0.001, 0.1, 0.25];

    let gears = window.gears = addGear();
    let key = window.key = addKey();

    let constraint = applyGearConstraint(gears);
    let constraint_2 = applyKeyConstraint(key);
    // Matter.Body.setMass(key, 1);

    Matter.World.add(world, [gears, constraint]);
    Matter.World.add(world, [key, constraint_2]);

    Matter.Events.on(engine, 'beforeUpdate', onBeforeUpdate);
    Matter.Events.on(engine, 'collisionStart', onCollision);

    /** ====================================================</ MAIN CODE >==================================================== */
    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    /** ====================================================< Utility Functions >==================================================== */
    function addGear() {
        var gearsVerticesArray = [-27, -360.5, 33, -359.5, 62.5, -283, 118, -257.5, 182, -306.5, 219, -292.5, 247, -264.5, 228, -170.5, 256, -141.5, 336, -142.5, 360.5, -87, 287.5, -20, 355, 107.5, 334, 141.5, 254, 138.5, 215.5, 186, 234.5, 280, 182.5, 309, 118.5, 261, 60, 274.5, 17, 359.5, -42.5, 353, -65.5, 274, -104.5, 261, -188.5, 309, -223.5, 289, -245.5, 256, -220.5, 179, -264, 139.5, -344, 137.5, -361.5, 79, -288.5, 12, -289.5, -28, -356.5, -73, -354.5, -113, -330, -142.5, -250, -139.5, -217.5, -191, -233.5, -283, -180, -307.5, -116, -259.5, -77, -270.5, -28, -360.5];
        var gearsStr = "";
        var gearsFactor = 0.4;
        gearsVerticesArray.forEach(element => {
            let modd = element * gearsFactor;
            gearsStr += modd.toString() + " ";
        });

        var gearsVertices = Matter.Vertices.fromPath(gearsStr);
        var gears = Matter.Bodies.fromVertices(500, 600, gearsVertices, {
            isStatic: false,
            angularVelocity: 0,
            label: "game_gear",
            render: {
                fillStyle: "#228465",
                strokeStyle: "#356554",
                lineWidth: 1
            }
        }, true);

        return gears;
    }

    function addKey() {
        var keyVerticesArray = [-716, -581.5, -396, -516.5, -170.5, -276, -17, -363.5, 54, -211.5, 1014, -219.5, 1147, -146.5, 1195.5, -43, 969, 158.5, 849, 161.5, 778.5, 103, 638.5, 213, 548, 213.5, 434, 113.5, 297.5, 228, 179.5, 139, 60, 131.5, 9.5, 324, -152.5, 251, -423, 529.5, -597, 579.5, -806, 560.5, -969, 479.5, -1113.5, 325, -1191.5, 129, -1199.5, -81, -1050.5, -408, -908, -519.5, -717, -581.5];
        var keyStr = "";
        var keyFactor = 0.1;
        keyVerticesArray.forEach(element => {
            let modd = element * keyFactor;
            keyStr += modd.toString() + " ";
        });

        var keyVertices = Matter.Vertices.fromPath(keyStr);
        var key = Matter.Bodies.fromVertices(275, 600, keyVertices, {
            isStatic: false,
            label: "game_key",
            density: 0.000001,
            render: {
                fillStyle: "#995473",
                strokeStyle: "#457812",
                lineWidth: 1
            }
        }, true);

        key.inertia = Infinity;

        // key.restitution = 0.5;

        return key;
    }

    // apply pivots for gear and key
    function applyGearConstraint(gears) {
        return Matter.Constraint.create({
            pointA: { x: 550, y: 600 },
            bodyB: gears,
            length: 0
        });
    }
    // apply pivots for gear and key
    function applyKeyConstraint(key) {
        return Matter.Constraint.create({
            pointA: { x: 235, y: 600 },
            bodyB: key,
            pointB: { x: -50, y: 0 },
            length: 0
        });
    }

    function startSpin() {
        if (spinPhase !== 0) { return; }
        Matter.Body.setAngularVelocity(gears, velocityPhases[2]);
        spinPhase = 1;
    }

    function onBeforeUpdate(event) {
        if (spinPhase === 1 && gears.angularVelocity < velocityPhases[1] && gears.angularVelocity > velocityPhases[0]) {
            spinPhase = 2;

            if (!timer) {
                timer = setTimeout(() => {

                    document.dispatchEvent(new CustomEvent("RESPONSE_RECEIVED", { detail: { amount: Math.floor(Math.random() * 1000) } }));

                    spinPhase = 3;
                    timer = null;
                    Matter.Body.setAngularVelocity(gears, velocityPhases[1]);
                }, 4000);
            }
        }
        if (gears.angularVelocity < velocityPhases[0]) {
            onSpinComplete();
        }

        if (spinPhase !== 2) { return; }
        // body is static so must manually update velocity for friction to work
        // make compound body rotate constantly
        Matter.Body.setAngularVelocity(gears, velocityPhases[1]);
        // Matter.Body.setDensuitt
        // Matter.Body.rotate(gears, 0.02);
    }

    function onSpinComplete() {
        if (spinPhase === 0) { return; }

        spinPhase = 0;
        let txt = getTextElement();
        txt.text = "";
        txt.visible = false;
    }

    function onCollision(event) {
        if (Array.isArray(event.pairs)) {
            event.pairs.forEach(evt => {
                document.dispatchEvent(new CustomEvent("COLLIDED", { detail: { bodyA: evt.bodyA, bodyB: evt.bodyB } }));
            });
        }
    }

    function getSpinPhase() {
        return spinPhase;
    }

    /** return data and controllers. */
    return {
        renderer: render,
        engine,
        world,
        render,
        canvas: render.canvas,
        getSpinPhase,
        startSpin
    }
};