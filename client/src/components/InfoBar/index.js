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
      <div><span>Lançamentos:</span> {lancamentos}</div>
      <div><span>Receitas:</span> {receitas}</div>
      <div><span>Despesas:</span> {despesas}</div>
      <div><span>Saldo:</span> {saldo}</div>
    </div>    
  );
}

export default InfoBar;