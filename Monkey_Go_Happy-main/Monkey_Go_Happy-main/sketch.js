var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg;
var foodGroup,obstaclesGroup;
var score = 0;
var stoneImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = createGroup();
  obstaclesGroup = createGroup();
}

function draw() { 
  background(0);

  textSize(20);
  fill("red");
  text("score:"+score,600,100);

  if(score >= 5){
    text("excellent",370,50);
  }
  if(score < 5){
    text("try more",370,50);
  }
  if(score >= 10){
    text("very nice",370,50);
  }
  if(score >= 15){
    text("marvelous",370,50);
  }
  if(score >= 20){
    text("fantastic",370,50);
  }
  if(score >= 25){
    text("incredible",370,50);
  }
  if(score >= 30){
    text("The Best",370,50);
  }

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+1;
      player.scale += 0.01;
    }
    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }
    spawnFood();
    spawnObstacles();
  }
   
  if(gameState === END){
    text("GAME OVER",345,200);
  }

  player.collide(ground);
  drawSprites();
}

function spawnFood(){

 if(frameCount%90 === 0){
   var banana = createSprite(600,250,10,10);
   banana.y = random(120,200);
   banana.addImage(bananaImg);
   banana.velocityX = -4;
   banana.lifetime = 300;
   banana.scale = 0.05;
   player.depth = banana.depth + 1;
   foodGroup.add(banana);
}

}

function spawnObstacles(){

  if(frameCount% 200 === 0){
    var obstacle = createSprite(400,375,10,10);
    obstacle.addImage(stoneImg);
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    obstacle.scale = 0.3;
    player.depth = obstacle.depth + 1;
    obstaclesGroup.add(obstacle);
  }

}