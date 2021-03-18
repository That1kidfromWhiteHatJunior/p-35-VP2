//Create variables here
var dog, sadDog, happyDog;
var database;
var foodStock, foodS;
var fedTime, lastFed;
var foodObj;
var feed, addFood
function preload()
{
	//load images here
sadDog = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog = createSprite(250, 300, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.5;
  feed = createButton("feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood= createButton("add Food");
  addFood.position(800, 95);
  feed.mousePressed(addFoods);
}


function draw() {  
 background(46, 139, 87);
 foodObj.display(); 
 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();
 });

 fill(255,255,254);
 textSize(15);

 if(lastFed>=12){
   text("LastFeed : " +lastFed%12 + " PM",350,30);
 } else if (lastFed ==0){
   text("LastFeed : 12 AM" , 350,30);
 }else{
   text("Last Feed : "+lastFed+"AM",350,30);
 }
 drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
}