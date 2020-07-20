import React from 'react';
import editImg from '../../assets/edit.svg';
import deleteImg from '../../assets/delete.svg';

import './style.css';

const Transaction = ({ transaction, changeUpdateModalVisibility, handleDeleteTransaction }) => {
  
  const backgroundColor = transaction.type === '-' ? '#ff737373' : '#a4f1a4f0';

  const loadUpdateTransaction = () => {
    changeUpdateModalVisibility(transaction);
  }

  const removeTransaction = () => {
    handleDeleteTransaction(transaction._id);
  }

  return (
    <div className="transaction-bar" style={{ background: backgroundColor }}>
      <div className="counter">{transaction.day}</div>

      <div className="info">
        <div className="type">{transaction.category}</div>
        <div>{transaction.description}</div>
      </div>

      <div className="value">R$ {transaction.value.toFixed(2)}</div>
      
      <div className="options">
        <button><img src={editImg} alt="editIcon" onClick={loadUpdateTransaction}/></button>
        <button><img src={deleteImg} alt="deleteIcon" onClick={removeTransaction} /></button>
      </div>

    </div>
  );
}

export default Transaction;