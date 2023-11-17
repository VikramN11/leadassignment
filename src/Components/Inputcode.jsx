import React, { useState } from 'react';
import style from "../Styles/Inputcode.module.css";

const Inputcode = ({codeFunc}) => {

    const [val, setVal] = useState("");

    const handleClick = (e)=>{
      e.preventDefault();
      codeFunc(val, true);
      setVal("");
    }

  return (
    <div className={style.inputcode_div}>
      <h1>Zip Code Information App</h1>
        <form>
           <input type="number" placeholder='Enter Postal Code' value={val} onChange={(e)=>setVal(e.target.value)} /> 
           <input type="submit" value="Submit" onClick={handleClick} />
        </form>
    </div>
  )
}

export default Inputcode