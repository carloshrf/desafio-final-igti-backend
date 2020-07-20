import React, { useEffect, useState } from 'react';
import ChangePeriod from './components/ChangePeriod';
import InfoBar from './components/InfoBar';
import Transaction from './components/Transaction';
import InsertModal from './components/InsertModal';

import { create, update, remove, filterByDate, filterByName, find } from './services/transactionService';

import './App.css';

export default function App() {
  const [transaction, setTransaction] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [date, setdate] = useState([]);
  const [currentDate, setCurrentDate] = useState([]);
  const [insertModalVisibility, setInsertModalVisibility] = useState(false);
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    if (date.length === 0) {
      getAllUniqueDates(transaction);
    }

  }, [date, date.length, transaction]);

  const getTransactions = async () => {
    const transactions = await find();
    setTransaction(transactions.data.transactions);
  }

  const getTransactionsByDate = async (event) => {
    const period = event.target.value;

    const transactions = await filterByDate(period);
    
    const allTransactions = transactions.data.transactions;
    
    setCurrentDate(period);
    setTransaction((allTransactions).sort((a, b) => {
      return a.day - b.day;
    }));
  }

  const filterTransactionsByDescription = async (event) => {
    const filter = event.target.value;

    if (filter !== '') {
      const response = await filterByName(filter);

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

      setTransaction((filteredTransactions).sort((a, b) => {
        return a.day - b.day;
      }));
    } else {
      getTransactionsByDate({target:{value: currentDate}});
    }
    
  }

  const getAllUniqueDates = (transactions) => {
    if (transactions.length !== 0) {
      const allDates = transactions.map(transact => transact.yearMonth);
      const uniqueDates = [...new Set(allDates)];
      setdate(uniqueDates);
    }
  }

  const changeInsertModalVisibility = () => {
    if (insertModalVisibility) {
      setInsertModalVisibility(false);
    } else {
      setInsertModalVisibility(true);
    }
  }

  const changeUpdateModalVisibility = (transact) => {
    if (updateModalVisibility) {
      setCurrentTransaction(null);
      setUpdateModalVisibility(false);
    } else {
      setCurrentTransaction(transact);
      setUpdateModalVisibility(true);
    }
  }

  const handleCreateTransaction = async (newTransaction) => {
    await create(newTransaction)
    .then((response) => console.log('Nova transação: ', response.data.transaction))
    .catch((err) => console.log(err));
  }

  const handleUpdateTransaction = async (id, newTransaction) => {
    await update(id, newTransaction)
    .then((response) => console.log('Lançamento atualizado: ', response.data.transaction))
    .catch((err) => console.log(err));
  }

  const handleDeleteTransaction = async (id) => {
    await remove(id)
    .then((response) => console.log('Lançamento removido: ', response.data.transaction))
    .catch((err) => console.log(err));
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
        <button className="btn" onClick={changeInsertModalVisibility}>+ NOVO LANÇAMENTO</button>
        <input 
          style={{height: '36px', marginLeft: '10px'}} 
          type="text" 
          placeholder="Filtro" 
          onChange={filterTransactionsByDescription} 
        />
      </div>

      {transaction.map(transact => {
        return (
          <Transaction 
            key={transact._id} 
            transaction={transact} 
            changeUpdateModalVisibility={changeUpdateModalVisibility}
            handleDeleteTransaction={handleDeleteTransaction}
          />
        );
      })}

        <InsertModal 
          changeModalVisibility={changeInsertModalVisibility} 
          isVisible={insertModalVisibility}
          label='Inclusão de lançamento'
          type="insert"
          handleTransaction={handleCreateTransaction}
        />

        <InsertModal 
          changeModalVisibility={changeUpdateModalVisibility} 
          currentTransaction={currentTransaction}
          isVisible={updateModalVisibility}
          label='Alterar lançamento'
          type="update"
          handleTransaction={handleUpdateTransaction}
        />
    </>
  );
}
