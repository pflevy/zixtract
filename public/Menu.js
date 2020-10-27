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
        className="btn btn-primary"
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
      table
      <table>
        {elements.map((el) => {
          console.log(el);
          return <th>{el.name || el.id.toString().slice(0, 4)}</th>;
        })}
        <tbody>
          {elements.map((el) => {
            return <td>{el.extractedText}</td>;
          })}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(e(Menu), domContainer);
