const elements = [
  // { x0: 50, y0: 100, x1: 80, y1: 140, isHovered: false },
  // { x0: 200, y0: 200, x1: 280, y1: 240, isHovered: false },
];

let isMouseDown = false;
let selectedElementIndex = null; // WIP

function setDefaultElements() {
  const desiredElements = [
    {
      x0: 153,
      x1: 607,
      y0: 75,
      y1: 133,
      id: 51.199362531599114,
      name: "Title",
      isUpdatingPosition: false,
      isHovered: false,
      extractedText: "CAIXAS ELETRONICOS SANTANDER\nTRANSFERENCIA DE VALORES\n",
    },
    {
      x0: 23,
      x1: 145,
      y0: 287,
      y1: 318,
      id: 20.3152675314453,
      name: "Payment Method",
      isUpdatingPosition: false,
      isHovered: false,
      extractedText: "DEBITO:\n",
    },
    {
      x0: 603,
      x1: 747,
      y0: 425,
      y1: 471,
      id: 75.7560308139852,
      name: "Price",
      isUpdatingPosition: false,
      isHovered: false,
      extractedText: "2. 000, 00\n",
    },
  ];
  desiredElements.forEach((desiredEl) => {
    const newEl = new SelectionElement({
      x0: desiredEl.x0,
      x1: desiredEl.x1,
      y0: desiredEl.y0,
      y1: desiredEl.y1,
      id: desiredEl.id,
      name: desiredEl.name,
      extractedText: desiredEl.extractedText,
    });
    elements.push(newEl);
    console.log(elements);
  });
}

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

// Export elements data
function exportData() {
  const newElements = elements.map((el) => ({ [el.id]: el.extractedText }));
  let dataStr = JSON.stringify(newElements);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "data.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
  linkElement.remove();
}

// Export elements data as CSV
function exportDataAsCSV() {
  let csvContent = "";
  // Columns, from element's variable name
  elements.forEach((el) => (csvContent = csvContent + el.name + ","));
  csvContent += "\n";
  // Columns, from element's extracted text
  elements.forEach(
    (el) =>
      (csvContent =
        csvContent + el.extractedText.replace(/(\r\n|\n|\r)/gm, "") + ",")
  );

  var linkElement = window.document.createElement("a");
  linkElement.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURI(csvContent)
  );
  linkElement.setAttribute("download", "upload_data.csv");
  linkElement.click();
  linkElement.remove();
}

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
