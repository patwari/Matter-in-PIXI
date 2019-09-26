function initMatterApp(canvas) {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies;

    var engine = Engine.create();

    var render = Render.create({
        engine: engine,
        canvas: canvas,
        options: {
            background: 'transparent',
            width: 800,
            height: 400,
            wireframes: false
        }
    });

    var IMAGES = {
        CIRCLE: {
            sprite: {
                texture: '../images/sprite0.png'
            }
        },
        CIRCLE_2: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: '../images/p7shaded.png'
            }
        },
        RECT: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: '../images/F5S1.png'
            }
        },
        RECT_2: {
            sprite: {
                texture: '../images/button_left_idle.png'
            }
        }
    }

    var boxA = Bodies.rectangle(400, 200, 80, 80, { render: IMAGES.RECT });
    var ballA = Bodies.circle(380, 100, 40, { render: IMAGES.CIRCLE });
    var ballB = Bodies.circle(460, 10, 40, { render: IMAGES.CIRCLE_2 });
    var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });

    World.add(engine.world, [boxA, ballA, ballB, ground]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true
                }
            }
        });

    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Engine.run(engine);

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    /** ======================================================================================= */
    Matter.Events.on(engine, 'collisionStart', function (event) {
        if (Array.isArray(event.pairs)) {
            event.pairs.forEach(evt => {
                let a = evt.bodyA;
                let b = evt.bodyB;

                console.log("PATWARI :: collision", a, b);
            });
        }
        else {
            let a = event.pairs.bodyA;
            let b = event.pairs.bodyB;

            console.log("PATWARI :: collision", a, b);
        }

    });

    return {
        renderer: render,
        engine,
        world: engine.world,
        render,
        mouse,
        runner: runner,
        canvas: render.canvas,
        stop: function () {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    }
}