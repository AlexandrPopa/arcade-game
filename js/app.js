// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Multiplies any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  (this.x >= 505) ? this.x = 0: this.x += 70 * dt;
  //checks if collision has happened
  checkCollision(this.x, this.y);
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
  //Image for player
  this.sprite = 'images/char-boy.png';
  //Position for player
  this.x = 200;
  this.y = 300;
}
//Draws player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Handles the player movements.
Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case 'left':
      this.x -= 50;
      break;
    case 'right':
      this.x += 50;
      break;
    case 'up':
      this.y -= 50;
      break;
    case 'down':
      this.y += 50;
      break;
  }
}
//Updates the player position
Player.prototype.update = function() {
  switch (true) {
    case (this.y <= 0):
      alert('Congratulations! You won!');
      this.x = 200;
      this.y = 300;
      break;
    case (this.y >= 450):
      this.y = 450;
      break;
  }
  switch (true) {
    case (this.x <= 0):
      this.x = 0;
      break;
    case (this.x >= 400):
      this.x = 400;
      break;
  }
}

// Instantiates objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
for (var i = 0; i < 3; i++) {
  var enemy = new Enemy((Math.random() * 500), (i * 80 + 50));
  allEnemies.push(enemy);
};

//Check if enemy collided with player
function checkCollision(x, y) {
  if (x < player.x + 50 &&
    x + 50 > player.x &&
    y < player.y + 50 &&
    y + 50 > player.y) {
    player.x = 200;
    player.y = 300;
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
