function renderAllElements() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 10, 10, 770, canvas.height);

  elements.forEach(function (el) {
    el.render();
  });
  console.log("Rendering elements... done.");
}