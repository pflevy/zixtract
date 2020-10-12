class SelectionElement {
  constructor(props) {
    const { x0, x1, y0, y1, id, name } = props;
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
    this.id = id;
    this.name = name;
  }

  setIsHovered(boolean) {
    this.isHovered = boolean;
  }

  // isUpdatingPosition is used to avoid re-attaching to the DOM the close button
  endUpdatePositioning() {
    this.isUpdatingPosition = false;
    renderAllElements();
  }
  updatePositioning(props) {
    this.isUpdatingPosition = true;
    const { x0, x1, y0, y1 } = props;
    this.x0 = x0 || this.x0;
    this.x1 = x1 || this.x1;
    this.y0 = y0 || this.y0;
    this.y1 = y1 || this.y1;
  }

  getElementPositioning() {
    const height = Math.abs(this.y1 - this.y0);
    const width = Math.abs(this.x1 - this.x0);
    const startingX = this.x0 < this.x1 ? this.x0 : this.x1;
    const startingY = this.y0 < this.y1 ? this.y0 : this.y1;
    return { height, width, startingX, startingY };
  }

  isMouseHovering(mousePosition) {
    const {
      height,
      width,
      startingX,
      startingY,
    } = this.getElementPositioning();
    // const mousePosition = mousePosition ? mousePosition : currMousePosition;
    if (
      currMousePosition.x >= startingX &&
      currMousePosition.x <= startingX + width &&
      currMousePosition.y >= startingY - 10 - DEFAULT_FONT_SIZE &&
      currMousePosition.y <= startingY + height
    ) {
      if (!this.isHovered) this.isHovered = true;
      return true;
    } else {
      if (this.isHovered) this.isHovered = false;
      return false;
    }
  }

  render() {
    // config
    ctx.setLineDash([10, 5]);
    ctx.lineWidth = DEFAULT_LINE_WIDTH;
    ctx.font = `${DEFAULT_FONT_SIZE}px sans-serif`;

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
}

function createSelectionAdjustPoints(el) {
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
  const { width, startingX, startingY } = el.getElementPositioning();
  if (el.isHovered) {
    const deleteNodeButton = document.createElement("button");
    deleteNodeButton.setAttribute("class", "btn btn-danger btn-sm");
    deleteNodeButton.style = `font-size: 12px; padding-top: 0;height:18px; position: absolute; top: ${
      startingY - 10 - DEFAULT_FONT_SIZE + 3
    }; left: ${startingX + width - 30 - 30} `;
    deleteNodeButton.id = `deleteNode-${el.id}`;
    deleteNodeButton.innerHTML = "delete";
    deleteNodeButton.onclick = () => {
      removeElement(el.id);
      const deleteNodeButton = document.getElementById(`deleteNode-${el.id}`);
      const variableNameText = document.getElementById(`variableName-${el.id}`);
      const variableExtractedText = document.getElementById(
        `variableExtractedText-${el.id}`
      );
      if (deleteNodeButton) {
        deleteNodeButton.remove();
        variableNameText.remove();
        if (variableExtractedText) variableExtractedText.remove();
      }
    };
    document.getElementById("zixtractCanvasDiv").appendChild(deleteNodeButton);
  } else {
    const deleteNodeButton = document.getElementById(`deleteNode-${el.id}`);
    if (deleteNodeButton) deleteNodeButton.remove();
  }
}

function handleVariableName(el) {
  const { width, startingX, startingY } = el.getElementPositioning();
  const textAlreadyRendered = document.getElementById(`variableName-${el.id}`);
  if (!textAlreadyRendered) {
    const variableNameText = document.createElement("span");
    variableNameText.style = `position: absolute; top: ${
      startingY - 20
    }; left: ${startingX} `;
    variableNameText.id = `variableName-${el.id}`;
    variableNameText.innerHTML =
      el.name || `var-${el.id.toString().substring(0, 2)}`;
    variableNameText.onclick = () => {
      // removeElement(el.id);
      // const variableNameText = document.getElementById(`deleteNode-${el.id}`);
      // if (variableNameText) variableNameText.remove();
      console.log("clicked");
    };
    document.getElementById("zixtractCanvasDiv").appendChild(variableNameText);
  }
}

function removeAllVariableExtractedTextDisplay() {
  const elements = document.querySelectorAll('*[id^="variableExtractedText-"]');
  elements.forEach((el) => el.remove());
}

function handleVariableExtractedText(el) {
  const textAlreadyRendered = document.getElementById(
    `variableExtractedText-${el.id}`
  );
  if (!textAlreadyRendered) {
    const variableNameText = document.createElement("span");
    variableNameText.style = `position: absolute; top: ${el.y0 - 40}; left: ${
      el.x0
    } `;
    variableNameText.id = `variableExtractedText-${el.id}`;
    variableNameText.innerHTML = `${el.extractedText}`;
    variableNameText.onclick = () => {
      // removeElement(el.id);
      // const variableNameText = document.getElementById(`deleteNode-${el.id}`);
      // if (variableNameText) variableNameText.remove();
      console.log("clicked");
    };
    if (el.extractedText)
      document
        .getElementById("zixtractCanvasDiv")
        .appendChild(variableNameText);
  }
}
