import React, { useEffect, useState } from 'react';
import ChangePeriod from './components/ChangePeriod';
import InfoBar from './components/InfoBar';
import Transaction from './components/Transaction';
import axios from 'axios';

import './App.css';

export default function App() {
  const [transaction, setTransaction] = useState([]);
  const [date, setdate] = useState([]);
  const [currentDate, setCurrentDate] = useState([]);

  const API_URL = 'http://localhost:3001/api/transaction';

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    if (date.length === 0) {
      getAllUniqueDates(transaction);
    }
  }, [date.length, transaction]);

  const getTransactions = async () => {
    const transactions = await axios.get(API_URL);
    setTransaction(transactions.data.transactions);
  }

  const getTransactionsByDate = async (event) => {
    const period = event.target.value;

    const transactions = await axios.get(`${API_URL}?period=${period}`);

    const allTransactions = transactions.data.transactions;
    
    setCurrentDate(period);
    setTransaction(allTransactions);
  }

  const filterTransactionsByDescription = async (event) => {
    const filter = event.target.value;

    if (filter !== '') {
      const response = await axios.get(`${API_URL}/filter?value=${filter}`);

      const transactions = response.data;

      const filteredTransactions = [];

      transactions.forEach(transact => {

        if (!currentDate.length) {
          filteredTransactions.push(transact);
        } else {
          const verified = transact.yearMonth === currentDate;

          verified && filteredTransactions.push(transact);
        }
      });

      setTransaction(filteredTransactions);
    } else {
      getTransactionsByDate({target:{value: currentDate}});
    }
    

  }

  const getAllUniqueDates = (transactions) => {
    const allDates = transactions.map(transact => transact.yearMonth);
    const uniqueDates = [...new Set(allDates)];
    
    setdate(uniqueDates);
  }

  return (
    <>
      <div className="title">
        <h5>Bootcamp Full Stack - Desafio Final</h5>
        <span>Controle Financeiro Pessoal</span>
      </div>
      <ChangePeriod getTransactionsByDate={getTransactionsByDate} dates={date} />
      <InfoBar transaction={transaction}/>
      <div className="filterBar">
        <button className="btn">+ NOVO LANÇAMENTO</button>
        <input 
          style={{height: '36px', marginLeft: '10px'}} 
          type="text" 
          placeholder="Filtro" 
          onChange={filterTransactionsByDescription} 
        />
      </div>

      {transaction.map(transact => {
        return <Transaction key={transact._id} transaction={transact} />
      })}
    </>
  );
}
