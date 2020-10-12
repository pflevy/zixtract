"use strict";
var e = React.createElement;
var domContainer = document.getElementById("rightSide");

var Menu = function Menu() {
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
        className: "btn btn-primary",
        onClick: function onClick() {
          ReactDOM.render(e(ChangeVariableName), domContainer);
        }
      },
      "Change Variable Names"
    ),
    React.createElement(
      "button",
      {
        className: "btn btn-warning",
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