// #### General stages parts ####

import { PacMan, Ghost } from "./characters";
import { foodHeight, foodWidth, foodColor, gameFloor, foodsPosition, wallsInfos } from "./stages/stage1";

// General constants
let intervalGhostId = null;

// create elements
const screen = document.createElement('div');
screen.setAttribute('id', 'screen');
screen.style.display = 'flex';
screen.style.justifyContent = 'center';
screen.style.alignItems = 'center';
screen.style.width = '100%';
screen.style.height = '95vh';

// initializing game elements
const pacMan = new PacMan(350, 50, wallsInfos, foodsPosition);

// Create Ghost
function generateGhosts() {
  const ghost1 = new Ghost(350, 350, wallsInfos, pacMan);
  gameFloor.appendChild(ghost1.getGhost());
  intervalGhostId = setInterval(() => {
    gameFloor.appendChild(new Ghost(350, 350, wallsInfos, pacMan).getGhost());
  }, 10000);
}

// Create walls
const walls = wallsInfos.map((wall, i) => {
  const w = document.createElement('div');
  w.setAttribute('id', `wall-${i}`);
  w.style.width = `${wall.width}px`;
  w.style.height = `${wall.height}px`;
  w.style.border = '#3F51B5 7px double';
  w.style.boxSizing = 'border-box';
  w.style.borderRadius = '2px';
  w.style.backgroundColor = 'black';
  w.style.position = 'absolute';
  w.style.top = `${wall.top}px`;
  w.style.left = `${wall.left}px`;
  return w;
});

// Create Food
const foods = foodsPosition.map((p, i) => {
  const f = document.createElement('div');
  f.setAttribute('id', p.id);
  f.style.width = `${foodWidth}px`;
  f.style.height = `${foodHeight}px`;
  f.style.backgroundColor = foodColor;
  f.style.position = "absolute";
  f.style.top = `${p.top}px`;
  f.style.left = `${p.left}px`;
  return f;
});

// we inject the element on root
walls.forEach(wall => gameFloor.appendChild(wall));
foods.forEach(food => gameFloor.appendChild(food));
gameFloor.appendChild(pacMan.getPacMan());
screen.appendChild(gameFloor);

// We create the ghosts
generateGhosts();

export { screen }