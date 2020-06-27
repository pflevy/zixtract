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
