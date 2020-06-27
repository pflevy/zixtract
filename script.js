window.onload = function () {
  // create canvas element and append it to document body
  var canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // Get span element to display current mouse x and y
  const currMousePosEl = document.getElementById("currMousePos");

  // some hotfixes...
  document.body.style.margin = 0;
  canvas.style.position = "fixed";

  // get canvas 2D context and set him correct size
  var ctx = canvas.getContext("2d");
  resize();

  // last known position
  var pos = { x: 0, y: 0 };

  // Line config
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#0000ff";

  window.addEventListener("resize", resize);
  document.addEventListener("mousemove", draw);
  document.addEventListener("mousedown", setPosition);
  document.addEventListener("mouseenter", setPosition);

  // new position from mouse event
  function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
    currMousePosEl.innerHTML = `x: ${pos.x}; y: ${pos.y}`; // display on span
  }
  function getStartingPosition(e) {
    return { x: e.clientX, y: e.clientY };
  }

  // class Rectangle {
  //   constructor(ctx, x, y) {
  //     this.x = x;
  //     this.y = y;
  //     this.ctx = ctx;
  //   }

  //   draw() {
  //     ctx.beginPath(); // begin

  //     const position = getStartingPosition(e);
  //     ctx.moveTo(pos.x, pos.y); // from
  //     setPosition(e);
  //     ctx.strokeRect(pos.x, pos.y, position.x - pos.x, position.y - pos.y);
  //   }
  // }

  // const rec = new Rectangle(ctx, 0, 0);

  // resize canvas
  function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function draw(e) {
    canvas.style.cursor = "crosshair";
    // mouse left button must be pressed
    if (e.buttons !== 1) return;
    // rec.draw();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // begin

    ctx.lineWidth = 2;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#808080";
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
