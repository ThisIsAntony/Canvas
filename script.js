'use strict';
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 1;


canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mousemove",draw);
function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100% , 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  checkWidth();
  checkColor();
}
function checkColor() {
  if (hue > 360) hue = 0;
  hue++;
}
function checkWidth() {
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;
  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}
