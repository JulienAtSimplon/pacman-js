// ### Characters parts ###
import { GameOver, Victory } from "./gaming";
import { heightFloor, foodHeight, foodWidth } from "./stages/stage1";

// General constants
const step = 5;
const stepGhost = 5;
const sizePacman = 50;
const heightGhost = 40;
const widthGhost = 35;
const wallDistance = 2;
const maxFood = 88;
const foodAte = [];
const angleDirection = {
  ArrowUp: -90,
  ArrowDown: 90,
  ArrowLeft: 180,
  ArrowRight: 0,
};
const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const ghostLimitStraightLine = 100;
const colorsGhost = ['cyan', '#f5b041', '#e74c3c', '#e8daef'];

// Classes of characters
class Character {
    constructor(originalX, originalY, wallsInfo) {
      this.posX = originalX;
      this.posY = originalY;
      this.direction = 'ArrowRight';
      this.wallsInfo = wallsInfo;
      return this;
    }
  
    getDirection = () => this.direction;
    
    setDirection = direction => {
      this.direction = direction;
    }
    getPosX = () => this.posX;
    getPosY = () => {
      return this.posY;
    };
    setPosX = posX => {
      this.posX = posX;
    }
    setPosY = posY => {
      this.posY = posY;
    }
    detectLimitVerticalFloor = nextVerticalMove => {
      if(nextVerticalMove <= 0 || (nextVerticalMove + 50) >= heightFloor )
        return false;
      return true;
    }
    detectLimitHorizontalFloor = nextHorizontalMove => {
      if((nextHorizontalMove - 25) <= 0 || (nextHorizontalMove + 25) >= 700 )
        return false;
      return true;
    }
    detectVerticalWalls = (nextVerticalMove, nextHorizontalMove) => {
      let ok = true;
      this.wallsInfo.forEach(wall => {
        if(
          (nextVerticalMove <= (heightFloor - wall.top + wallDistance) && nextVerticalMove >= (heightFloor - wall.top)) ||
          ((nextVerticalMove + 50) >= (heightFloor - wall.top - wall.height - wallDistance ) && ((nextVerticalMove + 50) <= ((heightFloor - wall.top - wall.height))))
        ) {
          if(
            ((nextHorizontalMove + 25) >= wall.left && (nextHorizontalMove - 25) <= (wall.left + wall.width))
          ) {
            ok = false;
          }
        }
      })
      return ok;
    }
    detectHorizontalWalls = (nextHorizontalMove, nextVerticalMove) => {
      let ok = true;
      this.wallsInfo.forEach(wall => {
        if(
          (((nextHorizontalMove + 25) >= (wall.left - wallDistance)) && ((nextHorizontalMove + 25) <= wall.left )) ||
          (((nextHorizontalMove - 25) >= (wall.left + wall.width)) && ((nextHorizontalMove - 25) <= (wall.left + wall.width + wallDistance))) 
        ) {
          if(
            ((nextVerticalMove + 25) <= (heightFloor - wall.top)) && (nextVerticalMove >= (heightFloor - wall.top - wall.height))
          ) {
            ok = false;
          }
        }
      })
      return ok;
    }
  
    handleMove = (move, step) => {
      switch (move) {
        case 'ArrowUp':
          if(this.detectLimitVerticalFloor(this.posY + step)  && this.detectVerticalWalls(this.posY + step, this.posX)) {
            this.posY = this.posY + step;
            this.direction = 'ArrowUp';
          }
          break;
        case 'ArrowDown':
          if(this.detectLimitVerticalFloor(this.posY - step)  && this.detectVerticalWalls(this.posY - step, this.posX)) {
            this.posY =  this.posY - step;
            this.direction = 'ArrowDown';
          }
          break;
        case 'ArrowRight':
          if(this.detectLimitHorizontalFloor(this.posX + step) && this.detectHorizontalWalls(this.posX + step, this.posY)) {
            this.posX = this.posX + step;
            this.direction = 'ArrowRight';
          }
          break;
        case 'ArrowLeft':
          if(this.detectLimitHorizontalFloor(this.posX - step) && this.detectHorizontalWalls(this.posX - step, this.posY)) {
            this.posX = this.posX - step;
            this.direction = 'ArrowLeft';
          }
          break;
        default:
          break;
      }
    }
  }
  
class PacMan extends Character {
    constructor (originalX, originalY, wallsInfo, foods) {
      const _super = super(originalX, originalY, wallsInfo);
      this._super = _super;
      this.foodsInfo = foods;
      this.countFoods = 0;
      // Pac Body
      this.pac = document.createElement('div');
      this.pac.setAttribute('id', 'pacman');
      this.pac.style.width = `${sizePacman}px`;
      this.pac.style.height = `${sizePacman}px`;
      this.pac.style.borderRadius = '25px';
      this.pac.style.border = 'solid 2px black';
      this.pac.style.backgroundColor = 'yellow';
      this.pac.style.position = 'absolute';
      this.pac.style.left = `${this.posX - 25}px`;
      this.pac.style.bottom = `${this.posY}px`;
      // Pac Mouth
      const mouth = document.createElement('div');
      mouth.style.backgroundColor = "black";
      mouth.style.position = "absolute";
      mouth.style.width = "100%";
      mouth.style.height = "100%";
      mouth.style.clipPath = "polygon(100% 74%, 44% 48%, 100% 21%)";
      mouth.style.animationName = "eat";
      mouth.style.animationDuration = "0.7s";
      mouth.style.animationIterationCount = "infinite";
      this.pac.appendChild(mouth);
      this.initialization(this);
    }
  
    initialization = (_self) => {
      document.addEventListener('keydown', function(event) {
        if (directions.includes(event.key)){
          _self._super.handleMove(event.key, step)
          _self.updatePosition();
        }
      });
    }
  
    getPacMan = () => this.pac;
  
    getCountFood = () => this.countFoods;
  
    eatFood = () => {
      this.foodsInfo.forEach((f, i) => {
        // // We check if pac eat food vertically
        if (Math.abs((heightFloor - f.top + foodHeight) - this.posY) <= 3 ||
            Math.abs(this.posY + sizePacman - (heightFloor - f.top)) <= 3) {
          // We check if pacman is align with food laterally
          if(Math.abs(this.posX - f.left) < 10) {
            const foodEl = document.getElementById(f.id);
            if (foodEl) {
              foodEl.style.display = 'none';
              if (!foodAte.includes(f.id)) {
                this.countFoods += 1;
                foodAte.push(f.id);
              }
              if (this.countFoods === maxFood) {
                Victory();
              }
            }
          }
        }
  
        // We check if pac eat food laterally
        if (Math.abs(this.posX + sizePacman - f.left) <= 3 ||
            Math.abs(f.left + foodWidth - this.posX) <= 3) {
          // We check if pacman is align with food vertically
          if(Math.abs(this.posY - (heightFloor - f.top)) <= 40) {
            const foodEl = document.getElementById(f.id);
            if (foodEl) {
              foodEl.style.display = 'none';
              if (!foodAte.includes(f.id)) {
                this.countFoods += 1;
                foodAte.push(f.id);
              }
              if (this.countFoods === maxFood) {
                Victory();
              }
            }
          }
        }
  
      });
    }
  
    updatePosition = () => {
      this.pac.style.transform = `rotate(${angleDirection[this.direction]}deg)`;
      this.pac.style.left = `${this.posX - 25}px`;
      this.pac.style.bottom = `${this.posY}px`;
      this.eatFood();
    }
  }
  
class Ghost extends Character {
    constructor (originalX, originalY, wallsInfo, pacman) {
      const _super = super(originalX, originalY, wallsInfo);
      this._super = _super;
      this.pac = pacman;
      this.countTop = 0;
      this.countRight = 0;
      this.switchLeft = false;
      this.switchTop = false;
      this.intervalId = null;
      this.biasDirectionX = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowRight" : "ArrowLeft";
      this.biasDirectionY = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowUp" : "ArrowDown";
      // Ghost
      // Take random color
      const i = Math.floor(Math.random() * 4);
      const eyes = document.createElement('div');
      eyes.style.height = "20px";
      eyes.style.width = `${widthGhost}px`;
      eyes.style.display = 'flex';
      eyes.style.justifyContent = 'space-around';
      eyes.style.alignItems = 'flex-end';
      const eye = document.createElement('div');
      eye.style.backgroundColor = '#fff';
      eye.style.height = '15px';
      eye.style.width = '15px';
      eye.style.borderRadius = '100%';
      eye.style.display = 'flex';
      eye.style.justifyContent = 'flex-start';
      eye.style.alignItems = 'center';
      const iris = document.createElement('div');
      iris.style.backgroundColor = 'blue';
      iris.style.height = '7px';
      iris.style.width = '7px';
      iris.style.borderRadius = '100%';
      eye.appendChild(iris);
      eyes.appendChild(eye);
      const eye2 = eye.cloneNode();
      const iris2 = iris.cloneNode();
      eye2.appendChild(iris2);
      eyes.appendChild(eye2);
      const tail = document.createElement('div');
      tail.style.backgroundRepeat = 'repeat-x';
      tail.style.bottom = '-10px';
      tail.style.height = '10px';
      tail.style.position = 'absolute';
      tail.style.width = '35px';
      tail.style.background = `linear-gradient(-45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%, linear-gradient( 45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%`;
      tail.style.backgroundSize = "10px 10px, 10px 10px";
      this.ghost = document.createElement('div');
      this.ghost.setAttribute('class', 'ghost');
      this.ghost.style.height = `${heightGhost}px`;
      this.ghost.style.width = `${widthGhost}px`;
      this.ghost.style.borderRadius = '30% 30% 0 0'
      this.ghost.style.backgroundColor = colorsGhost[i];
      this.ghost.style.position = 'absolute';
      this.ghost.style.left = `${this.posX - 25}px`;
      this.ghost.style.bottom = `${this.posY}px`;
      this.ghost.appendChild(eyes);
      this.ghost.appendChild(tail);
      this.initialization(this);
    }
  
    initialization = (_self) => {
      _self.intervalId = setInterval(() => {
        function getRandomMove() {
          let randomIndex = Math.floor(Math.random() * 4);
          // incorporing bias
          const rand1 = Math.floor(Math.random() * 100);
          const rand2 = Math.floor(Math.random() * 100);
          randomIndex = (randomIndex === 2 && rand1 % 2 === 0) ? 3 : randomIndex;
          randomIndex = (randomIndex === 1 && rand2 % 2 === 0) ? 0 : randomIndex;
          let randomMove = directions[randomIndex];
          if(randomMove === 'ArrowUp' || randomMove === 'ArrowDown') {
            if(_self.countTop < ghostLimitStraightLine && !_self.switchTop) {
              randomMove = _self.biasDirectionY;
              _self.countTop += 1;
            } else if (_self.countTop == ghostLimitStraightLine && !_self.switchTop) {
              _self.countTop = 0;
              _self.switchTop = true;
            }
            if(_self.countTop < ghostLimitStraightLine && _self.switchTop) {
              randomMove = _self.biasDirectionY === 'ArrowDown' ? 'ArrowUp' : 'ArrowDown';
              _self.countTop += 1;
            } else if (_self.countTop == ghostLimitStraightLine && _self.switchTop) {
              _self.countTop = 0;
              _self.switchTop = false;
            }
          } 
          if(randomMove === 'ArrowLeft' || randomMove === 'ArrowRight') {
            if(_self.countRight < ghostLimitStraightLine && !_self.switchLeft) {
              randomMove = _self.biasDirectionX;
              _self.countRight += 1;
            } else if (_self.countRight == ghostLimitStraightLine && !_self.switchLeft) {
              _self.countRight = 0;
              _self.switchLeft = true;
            }
            if(_self.countRight < ghostLimitStraightLine && _self.switchLeft) {
              randomMove = _self.biasDirectionX === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight';
              _self.countRight += 1;
            } else if (_self.countRight == ghostLimitStraightLine && _self.switchLeft) {
              _self.countRight = 0;
              _self.switchLeft = false;
            }
          } 
            _self._super.handleMove(randomMove, stepGhost);
            _self.updatePosition();
          }
        getRandomMove();
      }, 70);
    }
  
    getGhost = () => this.ghost;
  
    updatePosition = () => {
      // We check if the ghost hit pacman vertically
      if (Math.abs(this.posY - this.pac.getPosY() - sizePacman) < 15 ||
          Math.abs(this.pac.getPosY() - this.posY - sizePacman)  < 15 
      ) {
        // We check if pacman is align with ghost laterally
        if(Math.abs(this.posX - this.pac.getPosX()) < 25) {
          clearInterval(this.intervalId);
          GameOver();
        }
      }
      // We check if the ghost hit pacman laterally
      if( Math.abs(this.pac.getPosX() + sizePacman - this.posX) < 10 ||
          Math.abs(this.posX + widthGhost - this.pac.getPosX()) < 10
      ) {
        // We check if pacman is align with ghost vertically
        if(Math.abs(this.pac.getPosY() - this.posY) < 25) {
          clearInterval(this.intervalId);
          GameOver();
        }
      }
      this.ghost.style.left = `${this.posX - 25}px`;
      this.ghost.style.bottom = `${this.posY}px`;
    }
  }


// Characters animation
const animMouth = " @keyframes eat {\
    0% {\
      clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
    }\
    25% {\
      clip-path: polygon(100% 60%, 44% 48%, 100% 40%);\
    }\
    50% {\
      clip-path: polygon(100% 50%, 44% 48%, 100% 50%);\
    }\
    75% {\
      clip-path: polygon(100% 59%, 44% 48%, 100% 35%);\
    }\
    100% {\
      clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
    }\
  }\ ";

export { PacMan, Ghost, animMouth }