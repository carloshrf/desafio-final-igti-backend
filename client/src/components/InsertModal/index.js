import React from 'react';
import './style.css';

const InsertModal = ({isVisible, label, changeModalVisibility}) => {

  if (isVisible) {
    return (
      <div className="container">
        
        <div className="header">
          <span>{label}</span>
          <button className="btn red" onClick={changeModalVisibility}>x</button>
        </div>

        <div className="inputs-container">
          <div className="type-selection">

            <label>
              <input name="group1" type="radio" checked />
              <span>Despesa</span>
            </label>
            
            <label>
              <input name="group1" type="radio" />
              <span>Receita</span>
            </label>

          </div>

            <input id="description" type="text" placeholder="Descrição" />
            <input id="category" type="text" placeholder="Categoria" />
            
            <div className="value-date">
              <input id="value" type="number" placeholder="Valor" />
              <input id="date" type="date" />
            </div>

        </div>
      </div>
    );
    
  } else {
    return null;
  }
  
}

export default InsertModal;