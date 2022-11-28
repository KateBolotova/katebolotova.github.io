
let clicked = false; // нажат ли лайк

function rand_element(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setColors(el, bg, text)
{
  el.style.backgroundColor = bg;
  el.style.color = text;
}

love.onclick = function () {
  clicked = !clicked;

  if (clicked)
  {
    setColors(love, "rgba(255, 0, 0, 0.5)", "white");
  }
  else {
    setColors(love, "rgba(255, 255, 255, 0.5)", "black");
  }
}

let mouseX = 0;
let mouseY = 0;

function updateMousePos(ev)
{
  mouseX = ev.pageX;
  mouseY = ev.pageY;
}

let body = document.body;
let heartDiv = document.createElement('div');
body.appendChild(heartDiv);
body.setAttribute('onmousemove', 'updateMousePos(event)');

let allHearts = ['🫀', '💓', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '🧡', '💜', '🖤', '💝', '💞', '🥰', '😍', '😻', ]
let hearts = [];
let clicked_inner = false;
let first_clicked_inner = false;

body.onclick = function () {
  if (clicked)
  {
    if (first_clicked_inner)
    {
      clicked_inner = !clicked_inner;
    }
    first_clicked_inner = true;
  }
}

function spawnAt(x, y)
{
  if (clicked && clicked_inner)
  {
    let div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = x.toString() + "px";
    div.style.top = y.toString() + "px";
    div.style.fontSize = '3em';
    div.innerHTML = rand_element(allHearts);

    heartDiv.appendChild(div);
    hearts.push(div);
  }
  else if (!clicked) {
    clicked_inner = false;
    first_clicked_inner = false;
    if (hearts.length > 0)
    {
      for (let i = 0; i < hearts.length; i++) {
        let element = hearts[i];
        heartDiv.removeChild(element);
      }
      hearts = [];
    }
  }
}

function spawnAtMouse()
{
  spawnAt(mouseX, mouseY);
}

setInterval(spawnAtMouse, 30);

// MOBILE

function startup() {
  body.addEventListener('touchmove', handleMove);
}

document.addEventListener("DOMContentLoaded", startup);

function handleMove(evt) {
  evt.preventDefault();
  const el = document.getElementById('canvas');
  const ctx = el.getContext('2d');
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const color = colorForTouch(touches[i]);
    const idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      spawnAt(touches[i].pageX, touches[i].pageY);

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    }
  }
}
