"use strict";
var e = React.createElement;
var domContainer = document.getElementById("rightSide");

var Menu = function Menu() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        onClick: function onClick() {
          ReactDOM.render(e(ChangeVariableName), domContainer);
        }
      },
      "Change Variables Name"
    ),
    React.createElement(
      "button",
      {
        onClick: function onClick() {
          ReactDOM.render(e(ConditionalRules), domContainer);
        }
      },
      "Set Rules",
      " "
    )
  );
};

ReactDOM.render(e(Menu), domContainer);