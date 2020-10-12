("use strict");
const e = React.createElement;

const ChangeVariableName = () => {
  const [reload, doReload] = React.useState(0);
  const [inputsText, setInputsText] = React.useState({});
  function reloadReact() {
    doReload(reload + 1);
  }
  return (
    <div>
      <button
        className="btn btn-link"
        onClick={() => {
          ReactDOM.render(e(Menu), domContainer);
        }}
      >
        return to settings
      </button>
      <h4>Change variable names</h4>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => reloadReact()}
      >
        Reload variables
      </button>
      <hr></hr>
      {elements.length > 0 ? (
        elements.map((el) => (
          <div>
            <p>
              From{" "}
              <strong>
                {el.name || "var-" + el.id.toString().substring(0, 2)}
              </strong>{" "}
              to{" "}
              <input
                value={inputsText[el.id]}
                onChange={(e) =>
                  setInputsText({ ...inputsText, [el.id]: e.target.value })
                }
              ></input>{" "}
              <button
                class="btn btn-warning btn-sm"
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
                rename!
              </button>
            </p>
          </div>
        ))
      ) : (
        <span>
          It seems like there's no selection made on the image...<br></br>
          If you did make a selection, please hit "Reload variables"
        </span>
      )}
    </div>
  );
};

// const domContainer = document.getElementById("rightSide");
// ReactDOM.render(e(ChangeVariableName), domContainer);
