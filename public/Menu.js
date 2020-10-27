("use strict");
const e = React.createElement;
const domContainer = document.getElementById("rightSide");

const Menu = () => {
  const [reload, doReload] = React.useState(0);
  function reloadReact() {
    doReload(reload + 1);
  }
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
        style={{ marginBottom: "5px" }}
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
      <br />
      <h3>Sheet</h3>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => reloadReact()}
      >
        Reload table
      </button>
      <br />
      <table>
        <thead>
          <tr>
            {elements.map((el, idx) => {
              return (
                <th style={{ width: idx === 0 ? "30%" : "auto" }}>
                  {el.name || el.id.toString().slice(0, 4)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {elements.map((el) => {
              return <td>{el.extractedText}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(e(Menu), domContainer);
