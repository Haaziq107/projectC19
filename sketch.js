//Global Variables
var monkey, monkeyImage;

var ground, ground_running;

var banana, banana_running;

var jungle, jungle_running;

var gameover, gameover_running;

var restari, restart_running;

var stonesGroup, bananasGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var stoneImage;

function preload() {
  ground_running = loadImage("ground.jpg");

  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  gameover_running = loadImage("gameOver.png");

  restart_running = loadImage("restart.png");

  banana_running = loadImage("Banana.png");

  stoneImage = loadImage("stone.png");

  jungle_running = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 300);
  jungle = createSprite(50, 0, 600, 300);
  jungle.addImage("jungle", jungle_running);
  // jungle.scale=0.5;
  jungle.x = jungle.width / 2;
  jungle.velocityX = -2;


  score = 0

  player = createSprite(50, 260, 85, 75);
  player.addAnimation("monkey", monkeyImage);
  player.scale = 0.1;

  gameover = createSprite(200, 200, 97, 50);
  gameover.addImage("gameover", gameover_running);
  gameover.scale = 0.5;
  gameover.visible = false;


  ground = createSprite(200, 260, 400, 10);

  ground.visible = false;

  bananasGroup = new Group();
  stonesGroup = new Group();
}

function draw() {
  stroke("white");
  textSize(20);
  text("Score: " + score, 250, 100);
  fill("white");

  background(255);
  if (gameState === PLAY) {

    if (keyDown("space") && player.y > 161) {
      player.velocityY = -10;
    }

    switch (score) {
      case 10:  player.scale=0.12;
        break;

        case 20:  player.scale=0.14;
        break;
        
        case 30:  player.scale=0.16;
        break;
        
        case 40:  player.scale=0.18;
        break;
        
    }

    player.velocityY = player.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (jungle.x < 50) {
      jungle.x = jungle.width / 2;
    }
    spawnBanana();
    spawnstone();

    if (bananasGroup.isTouching(player)) {
      score = score + 2;
      bananasGroup.destroyEach();
    }

    if (stonesGroup.isTouching(player)) {
      gameState = END;
    }
  } else
  if (gameState === END) {
    gameover.visible = true;
    stonesGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    player.velocityY = 0;
    bananasGroup.setVelocityXEach(0);
    stonesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    score = 0;
  }
  player.collide(ground);
  drawSprites();
  text("Score: " + score, 250, 100);
}


function spawnBanana() {
  if (frameCount % 80 === 0) {
    var Banana = createSprite(600, 220, 40, 10);
    Banana.y = Math.round(random(80, 120));
    Banana.addImage(banana_running);
    Banana.scale = 0.05;
    Banana.velocityX = -3;
    Banana.lifetime = 200;
    bananasGroup.add(Banana);
  }

}

function spawnstone() {
  if (frameCount % 200 === 0) {
    var stone = createSprite(600, 265, 10);
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -9;
    stone.lifetime = 200;
    stonesGroup.add(stone);
  }

}