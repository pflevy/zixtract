// Get span element to display current mouse x and y
const currMousePosEl = document.getElementById("currMousePos");
const currMousePosition = { x: 0, y: 0 };
// new position from mouse event
document.addEventListener("mousemove", setPosition);
function setPosition(e) {
  // The canvas position might not be the same as the client if,
  // for instance, there's a <div> atop of it.
  const currCanvasPos = document.getElementsByTagName("canvas")[0];
  currMousePosition.x = e.clientX - currCanvasPos.offsetLeft;
  currMousePosition.y = e.clientY - currCanvasPos.offsetTop;
  currMousePosEl.innerHTML = `x: ${e.clientX}; y: ${e.clientY}`; // display on span
}
