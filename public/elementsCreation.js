const elements = [
  // { x0: 50, y0: 100, x1: 80, y1: 140, isHovered: false },
  // { x0: 200, y0: 200, x1: 280, y1: 240, isHovered: false },
];

let isMouseDown = false;
let selectedElementIndex = null; // WIP

function newElement() {
  canvas.style.cursor = "crosshair";

  isMouseDown = true;
  const newElement = new SelectionElement({
    x0: currMousePosition.x,
    y0: currMousePosition.y,
    x1: currMousePosition.x,
    y1: currMousePosition.y,
    id: elements.length + Math.random() * 100,
  });
  newElement.getElementPositioning();
  elements.push(newElement);
  selectedElementIndex = elements.length - 1;
}

function functionUpdateNewestElement() {
  if (isMouseDown) {
    elements[elements.length - 1].updatePositioning({
      x1: currMousePosition.x,
      y1: currMousePosition.y,
    });
    renderAllElements();
  }
}

const zixtractCanvas = document.getElementById("zixtractCanvas");
zixtractCanvas.addEventListener("mousedown", newElement);
zixtractCanvas.addEventListener("mousemove", functionUpdateNewestElement);
zixtractCanvas.addEventListener("mouseup", () => {
  isMouseDown = false;
  const element = elements[elements.length - 1];
  const { width, height } = element.getElementPositioning();
  // removes the element if too small
  // IMPORTANT -- This logic only considers the last element inserted, as it's the only updatable so far
  if (width < 15 || height < 15) elements.pop();
  element.setIsHovered(false);
  element.endUpdatePositioning();
  canvas.style.cursor = "default";
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

// Import elements position
document.getElementById("importTemplate").onchange = function (e) {
  var reader = new FileReader();
  reader.onload = () => {
    const jsonData = JSON.parse(event.target.result);
    console.log(jsonData);
    elements.splice(0, elements.length);
    jsonData.forEach((el) => elements.push(new SelectionElement(el)));
    renderAllElements();
  };
  reader.readAsText(this.files[0]);
};

function removeElement(id) {
  const removeAt = elements.findIndex((el) => el.id === id);
  elements.splice(removeAt, 1);

  renderAllElements();
}
