const { createWorker } = Tesseract;

function applyTessereactToAll() {
  elements.forEach((el, i) => {
    el.text = "loading...";
    cropElementSelection(el, i);
    renderElements();
  });
}

function cropElementSelection(el, index) {
  // Select part of  the canvas, from element.
  var canvasSelection = document.createElement("canvas");
  // New canvas with the size of the selection
  canvasSelection.width = el.x1 - el.x0;
  canvasSelection.height = el.y1 - el.y0;
  canvasSelection
    .getContext("2d")
    .drawImage(
      canvas,
      el.x0 + DEFAULT_LINE_WIDTH / 2,
      el.y0 + DEFAULT_LINE_WIDTH / 2,
      el.x1 - el.x0 - DEFAULT_LINE_WIDTH,
      el.y1 - el.y0 - DEFAULT_LINE_WIDTH,
      0,
      0,
      el.x1 - el.x0,
      el.y1 - el.y0
    );
  result = canvasSelection.toDataURL();
  retrieveTextFromSelection(result, "my-canvas.jpeg", index);
}
// window.location.href = result;

// Save | Download image
function retrieveTextFromSelection(data, filename = "untitled.jpeg", index) {
  console.log("data", data);
  const worker = createWorker({
    // logger: (m) => console.log(m),
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage("por");
    await worker.initialize("por");
    const {
      data: { text },
    } = await worker.recognize(data);
    console.log(text);
    elements[index].text = text;
    renderElements();
    await worker.terminate();
  })();

  // var a = document.createElement("a");
  // a.href = data;
  // a.download = filename;
  // document.body.appendChild(a);
  // a.click();
  // a.remove();
}
