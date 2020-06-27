window.onload = function () {
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
  ctx.strokeStyle = "#808080";
  // resize canvas
  window.addEventListener("resize", resize);
  function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  // last known position
  var pos = { x: 0, y: 0 };
  const elements = [
    { x0: 50, y0: 100, x1: 80, y1: 140, isHovered: false },
    { x0: 200, y0: 200, x1: 280, y1: 240, isHovered: false },
  ];

  function renderElements() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((el) => {
      ctx.setLineDash([10, 5]);
      ctx.lineWidth = 2;

      if (el.isHovered) {
        ctx.lineWidth = ctx.strokeStyle = "#21E0D7";
      } else ctx.strokeStyle = "#808080";
      ctx.beginPath(); // begin
      ctx.moveTo(el.x0, el.y0); // from
      // ctx.fillText("Var1", pos.x, pos.y - 10);
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
        e.clientY <= el.y1
      ) {
        el.isHovered = true;
        return true;
      } else {
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
  document.addEventListener("mousedown", setPosition);
  document.addEventListener("mouseenter", renderElements);

  function getStartingPosition(e) {
    return { x: e.clientX, y: e.clientY };
  }

  function draw(e) {
    console.log("draw");
    canvas.style.cursor = "crosshair";
    // mouse left button must be pressed
    if (e.buttons !== 1) return;
    // rec.draw();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // begin

    ctx.setLineDash([10, 5]);

    const position = getStartingPosition(e);
    ctx.moveTo(pos.x, pos.y); // from
    ctx.fillText("Var1", pos.x, pos.y - 10);
    // setPosition(e);
    ctx.strokeRect(pos.x, pos.y, position.x - pos.x, position.y - pos.y);

    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
  }
};
