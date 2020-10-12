("use strict");
const e = React.createElement;
const domContainer = document.getElementById("rightSide");

const Menu = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "150px",
        justifyContent: "space-between",
      }}
    >
      <h2>Settings</h2>
      <button
        className="btn btn-light"
        onClick={() => {
          ReactDOM.render(e(ChangeVariableName), domContainer);
        }}
      >
        Change Variable Names
      </button>

      <button
        className="btn btn-warning"
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
