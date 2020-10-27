function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var elements = [
  // { x0: 50, y0: 100, x1: 80, y1: 140, isHovered: false },
  // { x0: 200, y0: 200, x1: 280, y1: 240, isHovered: false },
];

var isMouseDown = false;
var selectedElementIndex = null; // WIP

function setDefaultElements() {
  var desiredElements = [{
    x0: 153,
    x1: 607,
    y0: 75,
    y1: 133,
    id: 51.199362531599114,
    name: "Title",
    isUpdatingPosition: false,
    isHovered: false,
    extractedText: "CAIXAS ELETRONICOS SANTANDER\nTRANSFERENCIA DE VALORES\n"
  }, {
    x0: 23,
    x1: 145,
    y0: 287,
    y1: 318,
    id: 20.3152675314453,
    name: "Payment Method",
    isUpdatingPosition: false,
    isHovered: false,
    extractedText: "DEBITO:\n"
  }, {
    x0: 603,
    x1: 747,
    y0: 425,
    y1: 471,
    id: 75.7560308139852,
    name: "Price",
    isUpdatingPosition: false,
    isHovered: false,
    extractedText: "2. 000, 00\n"
  }];
  desiredElements.forEach(function (desiredEl) {
    var newEl = new SelectionElement({
      x0: desiredEl.x0,
      x1: desiredEl.x1,
      y0: desiredEl.y0,
      y1: desiredEl.y1,
      id: desiredEl.id,
      name: desiredEl.name,
      extractedText: desiredEl.extractedText
    });
    elements.push(newEl);
    console.log(elements);
  });
}

function newElement() {
  canvas.style.cursor = "crosshair";

  isMouseDown = true;
  var newElement = new SelectionElement({
    x0: currMousePosition.x,
    y0: currMousePosition.y,
    x1: currMousePosition.x,
    y1: currMousePosition.y,
    id: elements.length + Math.random() * 100
  });
  newElement.getElementPositioning();
  elements.push(newElement);
  selectedElementIndex = elements.length - 1;
}

function functionUpdateNewestElement() {
  if (isMouseDown) {
    elements[elements.length - 1].updatePositioning({
      x1: currMousePosition.x,
      y1: currMousePosition.y
    });
    renderAllElements();
  }
}

var zixtractCanvas = document.getElementById("zixtractCanvas");
zixtractCanvas.addEventListener("mousedown", newElement);
zixtractCanvas.addEventListener("mousemove", functionUpdateNewestElement);
zixtractCanvas.addEventListener("mouseup", function () {
  isMouseDown = false;
  var element = elements[elements.length - 1];

  var _element$getElementPo = element.getElementPositioning(),
      width = _element$getElementPo.width,
      height = _element$getElementPo.height;
  // removes the element if too small
  // IMPORTANT -- This logic only considers the last element inserted, as it's the only updatable so far


  if (width < 15 || height < 15) elements.pop();
  element.setIsHovered(false);
  element.endUpdatePositioning();
  canvas.style.cursor = "default";
});

// Export elements data
function exportData() {
  var newElements = elements.map(function (el) {
    return _defineProperty({}, el.id, el.extractedText);
  });
  var dataStr = JSON.stringify(newElements);
  var dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  var exportFileDefaultName = "data.json";

  var linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
  linkElement.remove();
}

// Export elements data as CSV
function exportDataAsCSV() {
  var csvContent = "";
  // Columns, from element's variable name
  elements.forEach(function (el) {
    return csvContent = csvContent + el.name + ",";
  });
  csvContent += "\n";
  // Columns, from element's extracted text
  elements.forEach(function (el) {
    return csvContent = csvContent + el.extractedText.replace(/(\r\n|\n|\r)/gm, "") + ",";
  });

  var linkElement = window.document.createElement("a");
  linkElement.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURI(csvContent));
  linkElement.setAttribute("download", "upload_data.csv");
  linkElement.click();
  linkElement.remove();
}

// Export elements position
function exportTemplate() {
  var dataStr = JSON.stringify(elements);
  var dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  var exportFileDefaultName = "template.json";

  var linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
  linkElement.remove();
}

// Import elements position
document.getElementById("importTemplate").onchange = function (e) {
  var reader = new FileReader();
  reader.onload = function () {
    var jsonData = JSON.parse(event.target.result);
    console.log(jsonData);
    elements.splice(0, elements.length);
    jsonData.forEach(function (el) {
      return elements.push(new SelectionElement(el));
    });
    renderAllElements();
  };
  reader.readAsText(this.files[0]);
};

function removeElement(id) {
  var removeAt = elements.findIndex(function (el) {
    return el.id === id;
  });
  elements.splice(removeAt, 1);

  renderAllElements();
}