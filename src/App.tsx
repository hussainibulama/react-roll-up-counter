import { useState } from "react";
import "./App.css";
import RollUpCounter from "./lib/components/Roller";
function App() {
  const [number, setNumber] = useState(1020);

  const updateValue = () => {
    setNumber(Math.floor(Math.random() * 9999));
  };

  return (
    <div className="App">
      <div>
        <input
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <button onClick={updateValue}>Change Value</button>
      </div>
      <RollUpCounter value={number} />
    </div>
  );
}

export default App;
