var image = document.getElementById("image");

document.getElementById("imageInput").onchange = function (e) {
  image.onload = renderAllElements;
  image.onerror = function () {
    return console.log("Error loading image");
  };
  image.src = URL.createObjectURL(this.files[0]);
};