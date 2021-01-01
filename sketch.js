//Create variables here
var dog, happyDog, database, foodS, foodStock,dogSprite;
var fedTime, lastFed, foodObj;

function preload()
{
  //load images here
  dogSprite=loadImage("pic2/Dog.png");
  happyDog=loadImage("pic2/happydog.png"); 
}

function setup() {
  createCanvas(500, 500);

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock();
      FeedTime:hour();
    });
  }

  function addFoods(){
    FoodS++;
    database.ref('/').update({
      Food:foodS
    });
  }

  feed=createSprite("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Button");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  dog=createSprite(250,250,20,10);
  dog.addImage("dog",dogSprite);

  foodStock=database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  fill(255,255,254);
  textSize(15);

  if (lastFed>=12){
    text("Last Feed:"+lastFed%12+"PM",350,30);  
  }
  else(lastFed===0){
    text("Last Feed:12 AM",350,30);
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30);
  }

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("happy dog",happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("green");
  text("Note:Press UP_ARROW Key to feed dog",250,200);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if (x<=0){
    x=0;
  }
  else{
    x=x+1;
  }
  database.ref('/').update({
    FoodS.x;
  })
}


