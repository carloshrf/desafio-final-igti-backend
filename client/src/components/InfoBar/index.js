import React from 'react';
import './style.css';

const InfoBar = ({transaction}) => {

  const lancamentos = transaction.length;

  const saldo = transaction.reduce((accumulator, transact) => {
    const type = transact.type;
    
    if (type === '-') {
      return accumulator - transact.value;
    } else {
      return accumulator + transact.value;
    }
  }, 0); 

  const receitas = transaction.reduce((accumulator, transact) => {
    const type = transact.type;
    
    if (type === '-') {
      return accumulator + 0;
    } else {
      return accumulator + transact.value;
    }
  }, 0);

  const despesas = transaction.reduce((accumulator, transact) => {
    const type = transact.type;
    
    if (type === '-') {
      return accumulator + transact.value;
    } else {
      return accumulator + 0;
    }
  }, 0); 

  return (
    <div className="statusBar">
      <div><span>Lançamentos:</span> <span>{lancamentos}</span></div>
      <div><span>Receitas:</span> <span style={{color: 'green'}}>{receitas}</span></div>
      <div><span>Despesas:</span> <span style={{color: 'red'}}>{despesas}</span></div>
      <div><span>Saldo:</span> <span style={{color: 'green'}}>{saldo}</span></div>
    </div>    
  );
}

export default InfoBar;