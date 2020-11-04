var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

"use strict";
var e = React.createElement;
var domContainer = document.getElementById("rightSide");

var Menu = function Menu() {
  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      reload = _React$useState2[0],
      doReload = _React$useState2[1];

  function reloadReact() {
    doReload(reload + 1);
  }
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexFlow: "column",
        height: "150px",
        justifyContent: "space-between"
      }
    },
    React.createElement(
      "h2",
      null,
      "Settings"
    ),
    React.createElement(
      "button",
      {
        className: "btn btn-warning",
        onClick: function onClick() {
          ReactDOM.render(e(ChangeVariableName), domContainer);
        },
        style: { marginBottom: "5px" }
      },
      "Change Variable Names"
    ),
    React.createElement("br", null),
    React.createElement(
      "h3",
      null,
      "Sheet"
    ),
    React.createElement(
      "button",
      {
        className: "btn btn-outline-primary btn-sm",
        onClick: function onClick() {
          return reloadReact();
        }
      },
      "Reload table"
    ),
    React.createElement("br", null),
    React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          elements.map(function (el, idx) {
            return React.createElement(
              "th",
              { style: { width: idx === 0 ? "30%" : "auto" } },
              el.name || el.id.toString().slice(0, 4)
            );
          })
        )
      ),
      React.createElement(
        "tbody",
        null,
        React.createElement(
          "tr",
          null,
          elements.map(function (el) {
            return React.createElement(
              "td",
              null,
              el.extractedText
            );
          })
        )
      )
    )
  );
};

ReactDOM.render(e(Menu), domContainer);