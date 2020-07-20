import React, { useState, useEffect } from 'react';
import './style.css';

const InsertModal = ({isVisible, label, changeModalVisibility, handleTransaction, currentTransaction, type}) => {
  const [transaction, setTransaction] = useState({
    type: '-',
    description: null,
    category: null,
    value: null,
    day: null,
    month: null,
    year: null,
  });
  
  useEffect(() => {
    if (currentTransaction) {
      const {type, description, category, value, day, month, year} = currentTransaction;

      setTransaction({
        type,
        description,
        category,
        value,
        day: String(day),
        month: String(month),
        year: String(year)
      });
    }
  }, [currentTransaction]);

  const handleType = (event) => {
    const { value } = event.target;

    setTransaction(prevState => ({
      ...prevState,
      type: value,
    }));
  };

  const handleDescription = (event) => {
    const { value } = event.target;

    setTransaction(prevState => ({
      ...prevState,
      description: value,
    }));    
  }

  const handleCategory = (event) => {
    const { value } = event.target;

    setTransaction(prevState => ({
      ...prevState,
      category: value,
    }));    
  }

  const handleValue = (event) => {
    const { value } = event.target;

    setTransaction(prevState => ({
      ...prevState,
      value: Number(value),
    }));    
  }

  const handleDate = (event) => {
    const { value } = event.target;

    const [year, month, day] = value.split('-');

    setTransaction(prevState => ({
      ...prevState,
      year,
      month,
      day,
    }));    
  }

  const handleSubmit = (event) => {
    if (type === 'insert') {
      handleTransaction(transaction);
      clearState();
    }

    if (type === 'update') {
      handleTransaction(currentTransaction._id, transaction);
    }


    event.preventDefault();
  }

  const handleCloseModal = () => {
    changeModalVisibility();
    clearState();
  }

  const clearState = () => {
    setTransaction({
      type: '-',
      description: null,
      category: null,
      value: null,
      day: null,
      month: null,
      year: null,
    });
  }

  if (isVisible) {
    const {type, description, category, value, day, month, year} = transaction;

    return (
      <div className="container">
        
        <div className="header">
          <span>{label}</span>
          <button className="btn red" onClick={handleCloseModal}>x</button>
        </div>

        <div className="inputs-container">
          <form onSubmit={handleSubmit} >
            <div className="type-selection">

              <label>
                <input value="-" type="radio" onChange={handleType} checked={type === '-'} />
                <span>Despesa</span>
              </label>
              
              <label>
                <input value="+" type="radio" onChange={handleType} checked={type === '+'} />
                <span>Receita</span>
              </label>

            </div>
              <input id="description" value={!!description ? description : ''} type="text" placeholder="Descrição" onChange={handleDescription} />
              <input id="category" value={!!category ? category : ''} type="text" placeholder="Categoria" onChange={handleCategory} />
              
              <div className="value-date">
                <input id="value" value={!!value ? value : ''} type="number" placeholder="Valor" onChange={handleValue} />
                <input id="date" value={!!(day && month && year) ? `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}` : ''} type="date" onChange={handleDate} />
              </div>

              <button type="submit" id="save" className="btn green">Salvar</button>

            </form>
        </div>

      </div>
    );
    
  } else {
    return null;
  }
  
}

export default InsertModal;