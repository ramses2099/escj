import { ECS } from "./Ecs.js";

//canvas element
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
//canvas api
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

//width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//add event
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//*-------------------------------------------------------------------------------------*//
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

let entities = {};
let systems = [];

//setinitialState
function setInitState() {
    let com1 = new ECS.Components.Health();
    let com2 = new ECS.Components.Position({ x: 49, y: 89 });
    //
    let e = new ECS.Entity(null);
    e.addByArray([com1, com2]);

    let e2 = new ECS.Entity("Player", [
        com1,
        com2,
        new ECS.Components.Dimension(null),
        new ECS.Components.Shape(),
        new ECS.Components.FillStyle("#36911F"),
    ]);

    let e3 = new ECS.Entity(null, [
        com1,
        new ECS.Components.Position({ x: 256, y: 449 }),
        new ECS.Components.Dimension(null),
        new ECS.Components.Shape("strokeRect"),
        new ECS.Components.FillStyle("#36911F"),
    ]);

    let e4 = new ECS.Entity(null, [
        com1,
        new ECS.Components.Position({ x: 500, y: 449 }),
        new ECS.Components.Dimension({w:50,h:1}),
        new ECS.Components.Shape("arc"),
        new ECS.Components.FillStyle(),
    ]);
    //console.log(JSON.stringify(e, null, 4));
    //console.log(JSON.stringify(e2, null, 4));

    entities[e.id] = e;
    entities[e2.id] = e2;
    entities[e3.id] = e3;
    entities[e4.id] = e4;

    //system
    systems.push(ECS.Systems.Render);
}

//update game logic
function update(dt) { }
//draw game object
function draw(dt) {
    //clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //systems
    for (let i = 0; i < systems.length; i++) {
        systems[i](ctx, entities);
    }
}

let fps = 30;
let delta = 0; //delta time
let lastTime = window.performance.now();
let currentTime = 0;
let interval = 1000 / fps;

//Immediately-Invoked Function Expression (IIFE)
(() => {
    function main() {
        currentTime = window.performance.now();
        delta = currentTime - lastTime;

        if (delta > interval) {
            //update
            update(delta);
            //render
            draw(delta);

            //
            lastTime = currentTime - (delta % interval);
        }

        window.requestAnimationFrame(main);
    }

    //setInitState
    setInitState();

    main(); //Start the cycle
})();
