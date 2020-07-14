import React from 'react';
import ChangeBar from './components/ChangeBar';
import InfoBar from './components/InfoBar';
import Transaction from './components/Transaction';

import './App.css';

export default function App() {
  return (
    <>
      <div className="title">
        <h5>Bootcamp Full Stack - Desafio Final</h5>
        <span>Controle Financeiro Pessoal</span>
      </div>
      <ChangeBar />
      <InfoBar />
      <div className="filterBar">
        <button className="btn">+ NOVO LANÇAMENTO</button>
        <input style={{height: '36px', marginLeft: '10px'}} type="text" placeholder="Filtro" />
      </div>

      <Transaction /> 
    </>
  );
}
