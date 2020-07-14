import React from 'react';
import './style.css';

const InfoBar = () => {

  return (
    <div className="statusBar">
      <div><span>Lançamentos:</span> 69</div>
      <div><span>Receitas:</span> R$ 4.000,00</div>
      <div><span>Despesas:</span> R$ 1.710,00</div>
      <div><span>Saldo:</span> 14.114,80</div>
    </div>    
  );
}

export default InfoBar;