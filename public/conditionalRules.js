("use strict");
const e = React.createElement;

const ConditionalRules = () => {
  const [reload, doReload] = React.useState(0);
  function reloadReact() {
    doReload(reload + 1);
  }

  const [rules, setRules] = React.useState([]);
  const [newRuleCompareTo, setNewRuleCompareTo] = React.useState(undefined);

  React.useEffect(() => {
    // console.log(elements);
  }, [elements]);

  const inputElement = (
    <input
      key={"fdafadfa"}
      value={newRuleCompareTo}
      onChange={(e) => {
        e.preventDefault();
        setNewRuleCompareTo(e.target.value);
      }}
    ></input>
  );

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
      <h4>Create conditional rules</h4>
   <div style={{display:'flex', flexFlow: 'column'}}>
   <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => reloadReact()}
        style={{marginBottom: '5px'}}
      >
        Reload variables
      </button>
      <button
        className="btn btn-warning"
        disabled={newRuleCompareTo !== undefined}
        onClick={() => setNewRuleCompareTo({})}
      >
        New rule
      </button>
   </div>
      {true && (
        <div key={Math.random() * 100}>
          <hr />
          <span
            onClick={() => {
              setNewRuleCompareTo(undefined);
            }}
          >
            DELETE
          </span>
          <br />
          If{" "}
          <select class="form-control">
            {elements.map((el) => (
              <option key={el.id} value={el.extractedText}>
                {el.name || el.id}
              </option>
            ))}
          </select>
          <br />
          <select>
            <option> {"equals"} </option>
            <option> {"is different than"} </option>
            <option> {"is higher than or equal to"} </option>
            <option> {"is higher than"}</option>
            <option> {"is lower than or equal to"} </option>
            <option> {"is lower than"}</option>
          </select>
          {inputElement}
          <br />
          then
          <hr />
        </div>
      )}
    </div>
  );
};
