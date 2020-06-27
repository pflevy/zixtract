// Get span element to display current mouse x and y
const currMousePosEl = document.getElementById("currMousePos");
// new position from mouse event
document.addEventListener("mousemove", setPosition);
function setPosition(e) {
  currMousePosEl.innerHTML = `x: ${e.clientX}; y: ${e.clientY}`; // display on span
}
