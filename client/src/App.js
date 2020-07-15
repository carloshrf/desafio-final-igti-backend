import React, { useEffect, useState } from 'react';
import ChangeBar from './components/ChangeBar';
import InfoBar from './components/InfoBar';
import Transaction from './components/Transaction';
import axios from 'axios';

import './App.css';

export default function App() {
  const [transaction, setTransaction] = useState([]);
  const [date, setdate] = useState([]);
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getAllUniqueDates(transaction);
  }, [transaction]);

  const API_URL = 'http://localhost:3001/api/transaction';

  const getTransactions = async () => {
    const transactions = await axios.get(`${API_URL}?period=2020-07`);

    setTransaction(transactions.data.transactions);
  }

  const getAllUniqueDates = (transactions) => {
    const allDates = transactions.map(transact => transact.yearMonthDay);
    const uniqueDates = [...new Set(allDates)];
    
    setdate(uniqueDates);
  }

  const setCurrentDate = (date) => {
    setCurrentData(date);
  }

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

      {transaction.map(transact => {
        return <Transaction key={transact._id} transaction={transact} />
      })}
    </>
  );
}
