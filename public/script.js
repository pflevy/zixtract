const DEFAULT_COLOR = "#808080";
const DEFAULT_LINE_WIDTH = 2;

// create canvas element and append it to document body
var canvas = document.getElementById("zixtractCanvas");
document.body.appendChild(canvas);
// some hotfixes...
document.body.style.margin = 0;
canvas.style.position = "fixed";
// get canvas 2D context and set him correct size
var ctx = canvas.getContext("2d");
// Default Line config
ctx.lineCap = "butt";
ctx.strokeStyle = DEFAULT_COLOR;
// resize canvas
window.addEventListener("resize", resize);
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
resize();

document.addEventListener("mousemove", handleMouseMove);
let stateAnyElementsHovered = false;
function handleMouseMove(e) {
  const anyElementHovered = elements.some((el) => {
    if (
      currMousePosition.x >= el.x0 &&
      currMousePosition.y >= el.y0 &&
      currMousePosition.x <= el.x1 &&
      currMousePosition.y <= el.y1 &&
      el.hasOwnProperty("isHovered")
    ) {
      if (el.isHovered !== true) el.isHovered = true;
      return true;
    } else if (el.hasOwnProperty("isHovered")) {
      if (el.isHovered !== false) el.isHovered = false;
    }
  });

  // Render only if state of elements hovered changes.
  if (stateAnyElementsHovered === !anyElementHovered) renderElements();
  if (anyElementHovered) {
    // canvas.style.cursor = "crosshair";
    if (stateAnyElementsHovered !== anyElementHovered)
      stateAnyElementsHovered = true;
  } else {
    // canvas.style.cursor = "default";
    if (stateAnyElementsHovered !== anyElementHovered)
      stateAnyElementsHovered = false;
  }
}

// document.addEventListener("mouseenter", renderElements);

window.onload = function () {
  renderElements();
};
