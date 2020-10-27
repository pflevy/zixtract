const DEFAULT_COLOR = "#808080";
const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_FONT_SIZE = 16;

// create canvas element and append it to document body
var canvas = document.getElementById("zixtractCanvas");
document.body.appendChild(canvas);
// some hotfixes...
document.body.style.margin = 0;
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
  renderAllElements();
}
resize();

document.addEventListener("mousemove", handleMouseMove);
let stateAnyElementsHovered = false;
function handleMouseMove(e) {
  const anyElementHovered = elements.some((el) => {
    if (el.isMouseHovering() === true) return true;
  });
  // Render only if state of elements hovered changes.
  if (stateAnyElementsHovered === !anyElementHovered) renderAllElements();
  if (anyElementHovered) {
    if (stateAnyElementsHovered !== anyElementHovered)
      stateAnyElementsHovered = true;
  } else {
    if (stateAnyElementsHovered !== anyElementHovered)
      stateAnyElementsHovered = false;
  }
}

window.onload = function () {
  setDefaultElements();
  renderAllElements();
};
