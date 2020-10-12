("use strict");
const e = React.createElement;

const ChangeVariableName = () => {
  const [reload, doReload] = React.useState(0);
  const [inputsText, setInputsText] = React.useState({});
  console.log("inputsText", inputsText);
  function reloadReact() {
    doReload(reload + 1);
  }
  return (
    <div>
      <h2>Change variable name</h2>
      <button onClick={() => reloadReact()}> reload </button>
      <hr></hr>
      {elements.map((el) => (
        <div>
          <p>
            {" "}
            rename{" "}
            <strong>
              {el.name || "var-" + el.id.toString().substring(0, 2)}
            </strong>{" "}
            to
            <input
              value={inputsText[el.id]}
              onChange={(e) =>
                setInputsText({ ...inputsText, [el.id]: e.target.value })
              }
            ></input>
            <button
              onClick={() => {
                el.name = inputsText[el.id];
                const prevTextRendered = document.getElementById(
                  `variableName-${el.id}`
                );
                prevTextRendered.remove();
                renderAllElements();
                reloadReact();
              }}
            >
              rename
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

const domContainer = document.getElementById("rightSide");
ReactDOM.render(e(ChangeVariableName), domContainer);
