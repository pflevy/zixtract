var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

"use strict";
var e = React.createElement;

var ConditionalRules = function ConditionalRules() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      rules = _React$useState2[0],
      setRules = _React$useState2[1];

  var _React$useState3 = React.useState(undefined),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      newRuleCompareTo = _React$useState4[0],
      setNewRuleCompareTo = _React$useState4[1];

  React.useEffect(function () {
    // console.log(elements);
  }, [elements]);

  var inputElement = React.createElement("input", {
    key: "fdafadfa",
    value: newRuleCompareTo,
    onChange: function onChange(e) {
      e.preventDefault();
      setNewRuleCompareTo(e.target.value);
    }
  });

  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        className: "btn btn-warning",
        disabled: newRuleCompareTo !== undefined,
        onClick: function onClick() {
          return setNewRuleCompareTo({});
        }
      },
      "New rule"
    ),
    true && React.createElement(
      "div",
      { key: Math.random() * 100 },
      React.createElement("hr", null),
      React.createElement(
        "span",
        {
          onClick: function onClick() {
            setNewRuleCompareTo(undefined);
          }
        },
        "DELETE"
      ),
      React.createElement("br", null),
      "If",
      " ",
      React.createElement(
        "select",
        null,
        elements.map(function (el) {
          return React.createElement(
            "option",
            { key: el.id, value: el.extractedText },
            el.id
          );
        })
      ),
      React.createElement("br", null),
      React.createElement(
        "select",
        null,
        React.createElement(
          "option",
          null,
          " ",
          "equals",
          " "
        ),
        React.createElement(
          "option",
          null,
          " ",
          "is different than",
          " "
        ),
        React.createElement(
          "option",
          null,
          " ",
          "is higher than or equal to",
          " "
        ),
        React.createElement(
          "option",
          null,
          " ",
          "is higher than"
        ),
        React.createElement(
          "option",
          null,
          " ",
          "is lower than or equal to",
          " "
        ),
        React.createElement(
          "option",
          null,
          " ",
          "is lower than"
        )
      ),
      inputElement,
      React.createElement("br", null),
      "then",
      React.createElement("hr", null)
    )
  );
};