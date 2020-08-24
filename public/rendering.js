function renderElements() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 10, 10, 770, canvas.height);

  elements.forEach((el, index) => {
    // config
    ctx.setLineDash([10, 5]);
    ctx.lineWidth = DEFAULT_LINE_WIDTH;
    ctx.font = `${DEFAULT_FONT_SIZE}px sans-serif`;

    handleCloseButton(el);
    // Stroke borders for hovered el.
    if (el.isHovered) {
      ctx.strokeStyle = "#21E0D7";
    } else ctx.strokeStyle = DEFAULT_COLOR;

    ctx.beginPath(); // begin
    ctx.moveTo(el.x0, el.y0); // from

    // print variable name
    ctx.fillStyle = "#000000";
    ctx.fillText(`var${index}: ${el.extractedText}`, el.x0, el.y0 - 10);

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

function createSelectionAdjustPoints(ctx, el) {
  ctx.setLineDash([]);
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      ctx.beginPath();
      ctx.arc(el[`x${i}`], el[`y${j}`], 5, 0, 2 * Math.PI, false); // interpolation to access x0,x1,y0,y1 accordingly
      ctx.fillStyle = "white";
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }
}

function handleCloseButton(el) {
  if (el.isHovered) {
    const deleteNodeButton = document.createElement("button");
    deleteNodeButton.style = `position: absolute; top: ${el.y0}; left: ${el.x0} `;
    deleteNodeButton.id = `deleteNode-${el.id}`;
    deleteNodeButton.innerHTML = "X";
    deleteNodeButton.onclick = () => {
      removeElement(el.id);
      const deleteNodeButton = document.getElementById(`deleteNode-${el.id}`);
      if (deleteNodeButton) deleteNodeButton.remove();
    };
    document.getElementById("zixtractCanvasDiv").appendChild(deleteNodeButton);
  } else {
    const deleteNodeButton = document.getElementById(`deleteNode-${el.id}`);
    if (deleteNodeButton) deleteNodeButton.remove();
  }
}
