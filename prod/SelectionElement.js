var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectionElement = function () {
  function SelectionElement(props) {
    _classCallCheck(this, SelectionElement);

    var x0 = props.x0,
        x1 = props.x1,
        y0 = props.y0,
        y1 = props.y1,
        id = props.id,
        name = props.name;

    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
    this.id = id;
    this.name = name;
  }

  _createClass(SelectionElement, [{
    key: "setIsHovered",
    value: function setIsHovered(boolean) {
      this.isHovered = boolean;
    }

    // isUpdatingPosition is used to avoid re-attaching to the DOM the close button

  }, {
    key: "endUpdatePositioning",
    value: function endUpdatePositioning() {
      this.isUpdatingPosition = false;
      renderAllElements();
    }
  }, {
    key: "updatePositioning",
    value: function updatePositioning(props) {
      this.isUpdatingPosition = true;
      var x0 = props.x0,
          x1 = props.x1,
          y0 = props.y0,
          y1 = props.y1;

      this.x0 = x0 || this.x0;
      this.x1 = x1 || this.x1;
      this.y0 = y0 || this.y0;
      this.y1 = y1 || this.y1;
    }
  }, {
    key: "getElementPositioning",
    value: function getElementPositioning() {
      var height = Math.abs(this.y1 - this.y0);
      var width = Math.abs(this.x1 - this.x0);
      var startingX = this.x0 < this.x1 ? this.x0 : this.x1;
      var startingY = this.y0 < this.y1 ? this.y0 : this.y1;
      return { height: height, width: width, startingX: startingX, startingY: startingY };
    }
  }, {
    key: "isMouseHovering",
    value: function isMouseHovering(mousePosition) {
      var _getElementPositionin = this.getElementPositioning(),
          height = _getElementPositionin.height,
          width = _getElementPositionin.width,
          startingX = _getElementPositionin.startingX,
          startingY = _getElementPositionin.startingY;
      // const mousePosition = mousePosition ? mousePosition : currMousePosition;


      if (currMousePosition.x >= startingX && currMousePosition.x <= startingX + width && currMousePosition.y >= startingY - 10 - DEFAULT_FONT_SIZE && currMousePosition.y <= startingY + height) {
        if (!this.isHovered) this.isHovered = true;
        return true;
      } else {
        if (this.isHovered) this.isHovered = false;
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      // config
      ctx.setLineDash([10, 5]);
      ctx.lineWidth = DEFAULT_LINE_WIDTH;
      ctx.font = DEFAULT_FONT_SIZE + "px sans-serif";

      if (!this.isUpdatingPosition) {
        handleCloseButton(this);
        handleVariableName(this);
      }
      handleVariableExtractedText(this);

      // Stroke borders for hovered.
      if (this.isHovered || this.isUpdatingPosition) {
        ctx.strokeStyle = "#21E0D7";
      } else ctx.strokeStyle = DEFAULT_COLOR;

      ctx.beginPath(); // begin
      ctx.moveTo(this.x0, this.y0); // from
      ctx.strokeRect(this.x0, this.y0, this.x1 - this.x0, this.y1 - this.y0);
      ctx.lineTo(this.x0, this.y0); // to
      ctx.stroke(); // draw it!
      ctx.closePath();

      // Draw selectors.
      if (this.isHovered || this.isUpdatingPosition) {
        createSelectionAdjustPoints(this);
      }
    }
  }]);

  return SelectionElement;
}();

function createSelectionAdjustPoints(el) {
  ctx.setLineDash([]);
  for (var i = 0; i <= 1; i++) {
    for (var j = 0; j <= 1; j++) {
      ctx.beginPath();
      ctx.arc(el["x" + i], el["y" + j], 5, 0, 2 * Math.PI, false); // interpolation to access x0,x1,y0,y1 accordingly
      ctx.fillStyle = "white";
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }
}

function handleCloseButton(el) {
  var _el$getElementPositio = el.getElementPositioning(),
      width = _el$getElementPositio.width,
      startingX = _el$getElementPositio.startingX,
      startingY = _el$getElementPositio.startingY;

  if (el.isHovered) {
    var deleteNodeButton = document.createElement("button");
    deleteNodeButton.setAttribute("class", "btn btn-danger btn-sm");
    deleteNodeButton.style = "font-size: 12px; padding-top: 0;height:18px; position: absolute; top: " + (startingY - 10 - DEFAULT_FONT_SIZE + 3) + "; left: " + (startingX + width - 30 - 30) + " ";
    deleteNodeButton.id = "deleteNode-" + el.id;
    deleteNodeButton.innerHTML = "delete";
    deleteNodeButton.onclick = function () {
      removeElement(el.id);
      var deleteNodeButton = document.getElementById("deleteNode-" + el.id);
      var variableNameText = document.getElementById("variableName-" + el.id);
      var variableExtractedText = document.getElementById("variableExtractedText-" + el.id);
      if (deleteNodeButton) {
        deleteNodeButton.remove();
        variableNameText.remove();
        if (variableExtractedText) variableExtractedText.remove();
      }
    };
    document.getElementById("zixtractCanvasDiv").appendChild(deleteNodeButton);
  } else {
    var _deleteNodeButton = document.getElementById("deleteNode-" + el.id);
    if (_deleteNodeButton) _deleteNodeButton.remove();
  }
}

function handleVariableName(el) {
  var _el$getElementPositio2 = el.getElementPositioning(),
      width = _el$getElementPositio2.width,
      startingX = _el$getElementPositio2.startingX,
      startingY = _el$getElementPositio2.startingY;

  var textAlreadyRendered = document.getElementById("variableName-" + el.id);
  if (!textAlreadyRendered) {
    var variableNameText = document.createElement("span");
    variableNameText.style = "position: absolute; top: " + (startingY - 20) + "; left: " + startingX + " ";
    variableNameText.id = "variableName-" + el.id;
    variableNameText.innerHTML = el.name || "var-" + el.id.toString().substring(0, 2);
    variableNameText.onclick = function () {
      // removeElement(el.id);
      // const variableNameText = document.getElementById(`deleteNode-${el.id}`);
      // if (variableNameText) variableNameText.remove();
      console.log("clicked");
    };
    document.getElementById("zixtractCanvasDiv").appendChild(variableNameText);
  }
}

function removeAllVariableExtractedTextDisplay() {
  var elements = document.querySelectorAll('*[id^="variableExtractedText-"]');
  elements.forEach(function (el) {
    return el.remove();
  });
}

function handleVariableExtractedText(el) {
  var textAlreadyRendered = document.getElementById("variableExtractedText-" + el.id);
  if (!textAlreadyRendered) {
    var variableNameText = document.createElement("span");
    variableNameText.style = "position: absolute; top: " + (el.y0 - 40) + "; left: " + el.x0 + " ";
    variableNameText.id = "variableExtractedText-" + el.id;
    variableNameText.innerHTML = "" + el.extractedText;
    variableNameText.onclick = function () {
      // removeElement(el.id);
      // const variableNameText = document.getElementById(`deleteNode-${el.id}`);
      // if (variableNameText) variableNameText.remove();
      console.log("clicked");
    };
    if (el.extractedText) document.getElementById("zixtractCanvasDiv").appendChild(variableNameText);
  }
}