import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AnimatedCounter from './SlotCounter';
function App() {
  const [number, setNumber] = useState(1020);

  const updateValue = () => {
    setNumber(Math.floor(Math.random() * 9999));
  };
  return (
    <div className="App">
      <div> 
        <input value={number} onChange={(e)=> setNumber(Number(e.target.value))} />
        <button onClick={updateValue}>Change Value</button>
      </div>
        <AnimatedCounter value={number}/>
    </div>
  );
}

export default App;