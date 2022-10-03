import { ECS } from "./Ecs.js";

//canvas element
/** @type {HTMLCanvasElement} */
const canvas =  document.getElementById('canvas1');
//canvas api
/** @type {CanvasRenderingContext2D} */ 
const ctx = canvas.getContext('2d');

//width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//add event
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


//*-------------------------------------------------------------------------------------*//
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

//setinitialState
function setInitState(){
    let com1 = new ECS.Components.Health();
    let com2 = new ECS.Components.Position({x:49,y:89});
    //
    let e = new ECS.Entity(null);
    e.addByArray([com1,com2]);

    let e2 = new ECS.Entity("Player", [com1, com2, new ECS.Components.Dimension()]);

    console.log(JSON.stringify(e, null, 4));
    console.log(JSON.stringify(e2, null, 4));

}

//update game logic
function update(dt){
   

}
//draw game object
function draw(dt){
    //clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
  
    
}

let fps = 30;
let delta = 0; //delta time
let lastTime = window.performance.now();
let currentTime =0;
let interval = 1000/fps;


//Immediately-Invoked Function Expression (IIFE)
;(()=>{
    function main(){
        currentTime = window.performance.now();
        delta = (currentTime - lastTime);

        if(delta > interval){

            //update
            update(delta);
            //render
            draw(delta);

            //
            lastTime = currentTime - (delta%interval);
        }

        window.requestAnimationFrame(main);
    }
   
    //setInitState
    setInitState();

    main(); //Start the cycle
})();