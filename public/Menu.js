("use strict");
const e = React.createElement;
const domContainer = document.getElementById("rightSide");

const Menu = () => {
  return (
    <div>
      <button
        onClick={() => {
          ReactDOM.render(e(ChangeVariableName), domContainer);
        }}
      >
        Change Variable Names
      </button>

      <button
        onClick={() => {
          ReactDOM.render(e(ConditionalRules), domContainer);
        }}
      >
        Set Rules{" "}
      </button>
    </div>
  );
};

ReactDOM.render(e(Menu), domContainer);
