// Get span element to display current mouse x and y
const currMousePosEl = document.getElementById("currMousePos");
const currMousePosition = { x: 0, y: 0 };
// new position from mouse event
document.addEventListener("mousemove", setPosition);
function setPosition(e) {
  currMousePosition.x = e.clientX;
  currMousePosition.y = e.clientY;
  currMousePosEl.innerHTML = `x: ${e.clientX}; y: ${e.clientY}`; // display on span
}
