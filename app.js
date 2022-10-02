
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