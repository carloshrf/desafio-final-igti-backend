import React from 'react';
import editImg from '../../assets/edit.svg';
import deleteImg from '../../assets/delete.svg';

import './style.css';

const Transaction = () => {
  
  return (
    <div className="transaction-bar">
      <div className="counter">01</div>

      <div className="info">
        <div className="type">Lazer</div>
        <div>Viagem para a praia</div>
      </div>

      <div className="value">R$ 10,00</div>
      
      <div className="options">
        <button><img src={editImg} alt="editIcon" /></button>
        <button><img src={deleteImg} alt="deleteIcon" /></button>
      </div>

    </div>
  );
}

export default Transaction;