const elements = [
  // { x0: 50, y0: 100, x1: 80, y1: 140, isHovered: false },
  // { x0: 200, y0: 200, x1: 280, y1: 240, isHovered: false },
];

let isMouseDown = false;
let selectedElementIndex = null; // WIP

function newElement() {
  canvas.style.cursor = "crosshair";

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

const zixtractCanvas = document.getElementById("zixtractCanvas");
zixtractCanvas.addEventListener("mousedown", newElement);
zixtractCanvas.addEventListener("mousemove", functionUpdateNewestElement);
zixtractCanvas.addEventListener("mouseup", () => {
  isMouseDown = false;
  elements[elements.length - 1].isHovered = false;
  canvas.style.cursor = "default";
  // applyTessereactToAll();
});

// Export elements position
function exportTemplate() {
  let dataStr = JSON.stringify(elements);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "template.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
  linkElement.remove();
}
