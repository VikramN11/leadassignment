import { useState } from 'react';
import './App.css';
import Inputcode from './Components/Inputcode';
import Results from './Components/Results';

function App() {

  const [code, setCode] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const codeFunc = (val, val1)=>{
    setCode(val);
    setButtonClicked(val1);
  } 

  console.log(code);

  return (
    <div className="App">
      <Inputcode codeFunc = {codeFunc} />
      <Results code={code} buttonClicked={buttonClicked} />
    </div>
  );
}

export default App;
