var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

"use strict";
var e = React.createElement;

var ChangeVariableName = function ChangeVariableName() {
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      inputsText = _React$useState2[0],
      setInputsText = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      reload = _React$useState4[0],
      doReload = _React$useState4[1];

  function reloadReact() {
    doReload(reload + 1);
  }
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        className: "btn btn-link",
        onClick: function onClick() {
          ReactDOM.render(e(Menu), domContainer);
        }
      },
      "return to settings"
    ),
    React.createElement(
      "h4",
      null,
      "Change variable names"
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexFlow: "column" } },
      React.createElement(
        "button",
        {
          className: "btn btn-outline-primary btn-sm",
          onClick: function onClick() {
            return reloadReact();
          }
        },
        "Reload variables"
      )
    ),
    React.createElement("hr", null),
    elements.length > 0 ? elements.map(function (el) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "From",
          " ",
          React.createElement(
            "strong",
            null,
            el.name || "var-" + el.id.toString().substring(0, 2)
          ),
          " ",
          "to",
          " ",
          React.createElement("input", {
            value: inputsText[el.id],
            onChange: function onChange(e) {
              return setInputsText(Object.assign({}, inputsText, _defineProperty({}, el.id, e.target.value)));
            }
          }),
          " ",
          React.createElement(
            "button",
            {
              "class": "btn btn-warning btn-sm",
              onClick: function onClick() {
                el.name = inputsText[el.id];
                var prevTextRendered = document.getElementById("variableName-" + el.id);
                prevTextRendered.remove();
                renderAllElements();
                reloadReact();
              }
            },
            "rename!"
          )
        ),
        React.createElement("hr", null)
      );
    }) : React.createElement(
      "span",
      null,
      "It seems like there's no selection made on the image...",
      React.createElement("br", null),
      "If you did make a selection, please hit \"Reload variables\""
    )
  );
};

// const domContainer = document.getElementById("rightSide");
// ReactDOM.render(e(ChangeVariableName), domContainer);