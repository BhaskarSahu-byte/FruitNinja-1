var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver,gameOverImage;

var sword, swordImage;
var backscene,scene;

var alien_1,alien_2;

var fruit_1,fruit_2,fruit_3,fruit_4;

var fruit_group,alien_group;
var score;

function preload() {
swordImage = loadImage("sword.png");
scene = loadImage("scene.png");
  
alien_1 = loadImage("alien1.png");
alien_2 = loadImage("alien2.png"); 

fruit_1 = loadImage("fruit1.png");
fruit_2 = loadImage("fruit2.png");
fruit_3 = loadImage("fruit3.png");
fruit_4 = loadImage("fruit4.png");
  
gameOverImage = loadImage("gameover.png");
  
}

function setup() {
createCanvas(580, 400);

backscene = createSprite(290,200);  
backscene.addImage(scene);
backscene.scale=1.6;
  
sword = createSprite(290,200,20,50);
sword.addImage(swordImage);
sword.scale=0.5;
  
sword.setCollider("circle",0,0,70);
sword.debug = false;

//create Fruits and Aliens Groups
fruit_group = createGroup();
alien_group = createGroup();
  
gameOver = createSprite(150,300);
gameOver.addImage(gameOverImage);
  
score = 0;
}

function draw(){ 
  
if(gameState === PLAY) {
  gameOver.visible = false;

  //moving the sword
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  if(sword.isTouching(fruit_group)){
    fruit_group.destroyEach();
    score = score + 1;
  }
  
  alien();
  fruits();
  
  if(sword.isTouching(alien_group)){
    gameState = END;
  }
}
else if (gameState === END) {
    
  //stopping the sword
  sword.x = 0;
  sword.y = 0;
  
//set lifetime of the game objects so that they are never destroyed
  fruit_group.setLifetimeEach(-1);
  alien_group.setLifetimeEach(-1);
     
  fruit_group.setVelocityXEach(0);
  alien_group.setVelocityXEach(0);
  
  gameOver.visible = true;

}

drawSprites();

//displaying score
text("Score: "+ score,500,50); 
}

function alien(){
  if(frameCount % 150 === 0) {
    var alien = createSprite(580,200,20,20);
    alien.y = Math.round(random(75,375));
    alien.velocityX = -6;
    alien.debug = false;
    
        //generate random aliens
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: alien.addImage(alien_1);
              break;
      case 2: alien.addImage(alien_2);
              break;
    }
    //assign scale and lifetime to the alien           
    alien.scale = 1;
    alien.lifetime = 100;
    
    //add each obstacle to the group
    alien_group.add(alien);
  }
}

function fruits() {
 if(frameCount % 100 === 0){
   var fruit = createSprite(580,200,20,20);
   fruit.y = Math.round(random(75,375));
   fruit.velocityX = -6;
   fruit.debug = false;
          
   //generate random obstacles
   rand = Math.round(random(1,4));
   switch(rand) {
     case 1: fruit.addImage(fruit_1);
             break;
     case 2: fruit.addImage(fruit_2);
             break;
     case 3: fruit.addImage(fruit_3);
             break;
     case 4: fruit.addImage(fruit_4);
             break;
   }
   //assign scale and lifetime to the alien           
   fruit.scale = 0.18;
   fruit.lifetime = 100;
   
   //add each fruit to the group
   fruit_group.add(fruit);
 }
}