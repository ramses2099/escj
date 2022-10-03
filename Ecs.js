//private
function hashCode(str){
    let hash = 5381, i = str.length;
    while(i) hash = (hash * 33) ^ str.charCodeAt(--i);
    return hash >>> 0;
}

function randomID(){
    return (+new Date()) + (Math.random() * 100000000 | 0) + (++randomID.nextID);
}randomID.nextID = 0;

let ECS = {}; 
ECS.Components ={};

//components
ECS.Components.Health = function ( value ){
    value = value || 50;
    this.value = value;
    return this;
}
ECS.Components.Health.prototype.name = 'health';

ECS.Components.Position = function ( pos = {} ){
    this.x = pos.x || 0;
    this.y = pos.y || 0;
    return this;
}
ECS.Components.Position.prototype.name = 'position';

ECS.Components.Dimension = function ( dim = {} ){
    this.w = dim.w || 0;
    this.h = dim.h || 0;
    return this;
}
ECS.Components.Dimension.prototype.name = 'dimension';

//components

//entity
ECS.Entity = function(name="", comList = null){
    this.id = randomID();
    this.name = (name != null )? name : `NPC-${this.id}`;
    this.active = true;
    this.com = {};
    console.log('Create enttiy : %s', this.name);
    if(comList)this.addByArray(comList);
    return this;
}
//
ECS.Entity.prototype.getCom = function (){    
    console.log('Entity.getCom List Component');
    return this.com;
}   
//
ECS.Entity.prototype.getComByName = function (name){    
    console.log('Entity.getComByName Component %s :', name);
    return this.com;
} 
//
ECS.Entity.prototype.addCom = function (c){    
    this.com[c.name] = c;
    console.log('Entity.addCom Component : %s ', c.name);
    return this;
}   
//
ECS.Entity.prototype.addByArray = function(arr){
    for (let i = 0; i < arr.length; i++) {
        let c = arr[i];
        this.addCom( c );            
    }
    return this;
}
//
ECS.Entity.prototype.removeCom = function(name){       
    if(this.com[name]){
        delete this.com[name];
        console.log('Entity.removeCom name : ', name);
    }else{
        console.log('Entity.removeCom name not found : ', name);
    }
    return this;
}

export { ECS };