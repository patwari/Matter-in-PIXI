function initMatterApp3(canvas) {

    //Setup Matter JS
    var engine = Matter.Engine.create();
    var world = engine.world;

    var render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 500,
            height: 500,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });

    //Add a ball
    var ball = Matter.Bodies.circle(250, 250, 50, {
        density: 0.04,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    Matter.World.add(world, ball);

    //Add a floor
    var floor = Matter.Bodies.rectangle(250, 520, 500, 40, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, floor);

    /** Add an arrow */
    var arrowVertices = Matter.Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50');
    var arrow = Matter.Bodies.fromVertices(60, 0, arrowVertices, {
        render: {
            fillStyle: "#FF6B6B",
            strokeStyle: "#C44D58",
            lineWidth: 1
        }
    }, true)
    Matter.World.add(world, arrow);

    //Make interactive
    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: true
            },
            stiffness: 0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);


    return {
        renderer: render,
        engine,
        world: engine.world,
        render,
        mouseConstraint,
        canvas: render.canvas,
    }
};