const image = document.getElementById("image");

document.getElementById("imageInput").onchange = function (e) {
  image.onload = renderElements;
  image.onerror = () => console.log("Error loading image");
  image.src = URL.createObjectURL(this.files[0]);
};
