import React from 'react';
import './style.css';

const ChangeBar = ({ dates }) => {

  return (
    <div className="changeBar">
      {/* &lt; representa < já que ao usar retorna erro */}
      <button className="btn">&lt;</button>
      
      <select className="browser-default bar">
        {/* <option value="" disabled selected>Choose your option</option> */}
        <option value="1">Mai/2020</option>
        <option value="2">Jun/2020</option>
        <option value="3">Jul/2020</option>
      </select>

      <button className="btn">></button>
    </div>
  );
}

export default ChangeBar;