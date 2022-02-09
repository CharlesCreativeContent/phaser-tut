const gameState = {
  active: true
};
let currentDirection = null;
let blockSize = 50; //px//
let monsterFear = 0.9999;
let userData = {};
let map = [];
let game;
let pointer;
let touchX;
let touchY;

let getImage = (number) => {
  return `https://img.pokemondb.net/sprites/black-white/anim/shiny/${pokemon}.gif`;
};
let routes = {
  "Pallet Town": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 2, 2, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 2, 1, 2, 0, 1, 1, 1, 1, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,3 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,2,2,1,1,1,1,1,1,1,1,1,3 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 1, 1, 2, 2, 1, 2, 2,1,1,1,1,1,2,2,2,2,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2,1,1,1,1,1,2,2,2,2,2,1,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 1, 1,1,1,1,1,1,2,2,2,2,2,1,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1,2,1,1,1,1,2,1,2,2,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2,1,1,1,1,1,2,2,2,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 1, 2, 1, 1, 1, 1,1,1,1,1,1,2,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,0,0,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,2,1,2,1,1,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,2,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,1,1,1,1,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,2,2,2,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,1,1,1,2,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,0,1,1,1,0,0,1,0,0,2,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,0,1,1,1,0,0,1,0,0,2,2,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,1,1,2,2,2,2,2,2,2,2,2,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,0,0,1,1,2,2,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1,0,0,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ]
  ],

  "Route 1": [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ]
};
map = routes["Pallet Town"];

const mapHeight = blockSize * map.length;
const mapWidth = blockSize * map[0].length;
console.log(mapWidth / blockSize);

//given coordinates
//returns block element in map
//or 0 if nothing found
function getBlock(x, y) {
  if (x < 0 || y < 0 || x >= mapWidth || y >= mapHeight) return 0;

  let xBlock = Math.round(x / blockSize);
  let yBlock = Math.round(y / blockSize);
  return map[yBlock][xBlock];
}

let getX = () => gameState.player.x;
let getY = () => gameState.player.y;
let getPlayerLocation = () => [getX(), getY()];
let getCurrentBlock = () => getBlock(getX(), getY());

function verifyNextStep(direction) {
  if (direction === null) return 0;
  let [nextStepX, nextStepY] = getPlayerLocation();
  if (direction === 3) {
    nextStepY -= 5;
  } else if (direction === 2) {
    nextStepX += 5;
  } else if (direction === 1) {
    nextStepX -= 5;
  } else {
    nextStepY += 5;
  }
  return getBlock(nextStepX, nextStepY);
}

//function that triggers a monster attack
function checkForMonsters() {
  let monsterFear = 0.99;
  let dice = Math.random();
  if (dice > monsterFear) {
    console.log("Battle");
  }
}

function openDoor() {
  console.log(getBlock(getX(), getY()), getX(), getY());
  console.log("Door Open");
}

function lookAround() {
  let curretBlock = getCurrentBlock();
  if (curretBlock === 2) checkForMonsters();
  if (curretBlock === 3) openDoor();
}

//Grabs User Data from server to play Game
async function getUserData(stat) {
  //fetch user data from server
  var response;
  if (stat) {
    response = await fetch("/userData/" + stat);
    userData[stat] = await response.json().stat;
  } else {
    response = await fetch("/userData");
    userData = await response.json();
  }
}

//Grabs User Map from server to play Game
async function getMap() {
  //fetch map from server
  var response = await fetch("/userMap");
  map = await response.json();
}
let move = [
  function () {
    gameState.player.anims.play("runDown", true);
    gameState.player.y += 5;
  },
  function () {
    gameState.player.anims.play("runLeft", true);
    gameState.player.x -= 5;
  },
  function () {
    gameState.player.anims.play("runRight", true);
    gameState.player.x += 5;
  },
  function () {
    gameState.player.anims.play("runUp", true);
    gameState.player.y -= 5;
  }
];

//handles mouse clicks
function mouseClicks() {}

//runs controls for user animation
function userAnimation() {
  if (gameState.player) {
    if (gameState.cursors.down.isDown) {
      currentDirection = 0;
    } else if (gameState.cursors.left.isDown) {
      currentDirection = 1;
    } else if (gameState.cursors.right.isDown) {
      currentDirection = 2;
    } else if (gameState.cursors.up.isDown) {
      currentDirection = 3;
    } else if (
      gameState.cursors.right.isUp ||
      gameState.cursors.left.isUp ||
      gameState.cursors.down.isUp ||
      gameState.cursors.up.isUp
    ) {
      gameState.player.setFrame(4 * currentDirection);
      currentDirection = null;
    }
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.spritesheet("hero", "https://i.imgur.com/baFUS0O.png", {
      frameWidth: 48,
      frameHeight: 72
    });
    this.load.image("route", "https://i.imgur.com/oiPvHhM.png");
    this.load.image("town", "https://i.imgur.com/Yeqwe2b.png");
    this.load.image("red", "https://i.imgur.com/Yd6IZX8.png");
    this.load.image("blue", "https://i.imgur.com/hRSixq4.png");
    this.load.image("green", "https://i.imgur.com/SVykqtk.png");
  }

  create() {
    function standardBlockSize(image) {
      image.setDisplaySize(blockSize, blockSize)
      image.setAlpha(0.5);
    }
    let addImageToMap = (x, y, imageName) =>
      this.add.image(x * blockSize, y * blockSize, imageName);
    function addStandardOpaqueImage(x, y, imageName){
      let currentImage = addImageToMap(x, y, imageName)
      standardBlockSize(currentImage)
      return currentImage
    }
    //creates background for map
    let background = this.add.image(0, 0, "route");
    background.setOrigin(0).setScale(2.5);

    //creates walking map for user
    function paintMap(){
    map.forEach((row, y) => {
      row.forEach((num, x) => {
        if (num === 1) addStandardOpaqueImage(x, y, "green");
        if (num == 2) addStandardOpaqueImage(x, y, "red");
        if (num == 3) addStandardOpaqueImage(x, y, "blue");
      });
    });
    }
    
    //Turns on viual walking map for development
    //paintMap()

    //Turns on key inputs
    gameState.cursors = this.input.keyboard.createCursorKeys();

    gameState.player = this.add.sprite(500, 2200, "hero");

    //sets up camera
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);

    this.anims.create({
      key: "runDown",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 0,
        end: 3
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "runLeft",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 4,
        end: 7
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "runRight",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 8,
        end: 11
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "runUp",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 12,
        end: 15
      }),
      frameRate: 7,
      repeat: -1
    });
  }
  update() {
    //Initializes movement for keyboard and mouse
    userAnimation();

    mouseClicks();

    if (move[currentDirection] && verifyNextStep(currentDirection)) {
      move[currentDirection]();
      lookAround();
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    parent: "phaser-example",
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  transparent: true,
  roundPixels: false,
  audio: { noAudio: false },
  physics: {
    default: "arcade",
    arcade: {
      enableBody: true
    }
  },
  scene: [MainScene]
};

game = new Phaser.Game(config);
