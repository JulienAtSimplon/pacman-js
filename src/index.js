import { animMouth } from "./modules/characters";
import { screen } from "./modules/stage";

const root = document.getElementById('root');

var s = document.createElement( 'style' );
s.innerHTML = animMouth;
root.appendChild(s);

// we inject the element on root
root.appendChild(screen);

// _Proto
// _proto("hello");
