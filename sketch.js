
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
monkey = createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  //console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
}


function draw() {
background(225);
  
  stroke("black");
  fill("black");
 textSize(20);
  text("survival Time:"+ score ,100,50)
  
  
  
if(gameState === PLAY){

  ground.velocityX = -4;
   score = score + Math.round(getFrameRate()/60);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -10;
     //console.log(monkey.y);
    }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
     spawnobstacles();
  spawnbananas();

  
  monkey.velocityY = monkey.velocityY + 1;
  
}
  
  if(gameState === END){
    
   monkey.velocityY = 0;
   monkey.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
   ground.velocityX = 0;
   FoodGroup.setVelocityXEach(0);
    
    
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
 }
     
  monkey.collide(ground);
  
  
  drawSprites();
  
}

function spawnbananas(){
  
  if(frameCount % 80 === 0){
     banana = createSprite(350,250,10,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,220));
    banana.velocityX = -3;
    banana.lifetime = 85;
    
    FoodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,310,40,40);
      obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
   // console.log(obstacle.y);
    obstacle.lifetime = 80;
    
    obstacleGroup.add(obstacle);

  
  }
  
}




