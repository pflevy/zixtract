const DEFAULT_COLOR = "#808080";

const { createWorker } = Tesseract;
// create canvas element and append it to document body
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
// some hotfixes...
document.body.style.margin = 0;
canvas.style.position = "fixed";
// get canvas 2D context and set him correct size
var ctx = canvas.getContext("2d");
resize();
// Default Line config
ctx.lineCap = "butt";
ctx.strokeStyle = DEFAULT_COLOR;
// resize canvas
window.addEventListener("resize", resize);
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

const elements = [
  // { x0: 50, y0: 100, x1: 80, y1: 140, isHovered: false },
  // { x0: 200, y0: 200, x1: 280, y1: 240, isHovered: false },
];

const image = document.getElementById("image");
console.log(image);
function renderElements() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 10, 10, canvas.width, canvas.height);
  // ctx.fillRect(0, 0, canvas.width, canvas.height); // TESTING

  elements.forEach((el, index) => {
    // config
    ctx.setLineDash([10, 5]);
    ctx.lineWidth = 2;

    // Stroke borders for hovered el.
    if (el.isHovered) {
      ctx.lineWidth = ctx.strokeStyle = "#21E0D7";
    } else ctx.strokeStyle = DEFAULT_COLOR;

    ctx.beginPath(); // begin
    ctx.moveTo(el.x0, el.y0); // from

    // print variable name
    ctx.fillStyle = "#000000";
    ctx.fillText(`var${index}: ${el.text}`, el.x0, el.y0 - 10);
    // Printing random text to test the crop and textextract
    // ctx.font = "30px Arial";
    // ctx.fillText(`TEST TXT`, el.x0 + 30, el.y0 + 30);

    ctx.strokeRect(el.x0, el.y0, el.x1 - el.x0, el.y1 - el.y0);
    ctx.lineTo(el.x0, el.y0); // to
    ctx.stroke(); // draw it!
    ctx.closePath();
    // Draw selectors if hovered.
    if (el.isHovered) {
      createSelectionAdjustPoints(ctx, el);
    }
  });
  console.log("Rendering elements... done.");
}

document.addEventListener("mousemove", handleMouseMove);
let stateAnyElementsHovered = false;
function handleMouseMove(e) {
  const anyElementHovered = elements.some((el) => {
    if (
      e.clientX >= el.x0 &&
      e.clientY >= el.y0 &&
      e.clientX <= el.x1 &&
      e.clientY <= el.y1 &&
      el.hasOwnProperty("isHovered")
    ) {
      if (el.isHovered !== true) el.isHovered = true;
      return true;
    } else if (el.hasOwnProperty("isHovered")) {
      if (el.isHovered !== false) el.isHovered = false;
    }
  });
  if (stateAnyElementsHovered === !anyElementHovered) renderElements();
  if (anyElementHovered) {
    canvas.style.cursor = "crosshair";
    if (stateAnyElementsHovered !== anyElementHovered)
      stateAnyElementsHovered = true;
  } else {
    canvas.style.cursor = "default";
    if (stateAnyElementsHovered !== anyElementHovered)
      stateAnyElementsHovered = false;
  }
}

let isMouseDown = false;
let selectedElementIndex = null; // WIP
function newElement() {
  isMouseDown = true;
  const newElement = {
    x0: currMousePosition.x,
    y0: currMousePosition.y,
    x1: currMousePosition.x,
    y1: currMousePosition.y,
  };
  elements.push(newElement);
  selectedElementIndex = elements.length - 1;
}

function functionUpdateNewestElement() {
  if (isMouseDown) {
    elements[elements.length - 1].x1 = currMousePosition.x;
    elements[elements.length - 1].y1 = currMousePosition.y;
    renderElements();
  }
}

document.addEventListener("mousedown", newElement);
document.addEventListener("mousemove", functionUpdateNewestElement);
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  elements[elements.length - 1].isHovered = false;
});
// document.addEventListener("mouseenter", renderElements);

window.onload = function () {
  renderElements();
};
