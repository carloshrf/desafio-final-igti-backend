import React from 'react';

import './style.css';

const ChangePeriod = ({ getTransactionsByDate, dates }) => {
  const monthsAbbreviation = [
    '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const formattedDates = dates.map(date => {
    const [year, month] = date.split('-');

    return {
      abreviated: `${monthsAbbreviation[Number(month)]}/${year}`,
      date
    };
  });

  console.log('aaaa')

  return (
    <div className="changeBar">
      {/* &lt; representa < já que ao usar retorna erro */}
      <button className="btn">&lt;</button>

      <select className="browser-default bar" defaultValue="" onChange={getTransactionsByDate} >

        <option value="" disabled >Buscar datas</option>
        
        {formattedDates.map(period => {
          const { abreviated } = period;
          const { date } = period;

          return (
            <option key={date} value={date}>
              {abreviated}
            </option>
          );
        })}

      </select>

      <button className="btn">{'>'}</button>
    </div>
  );
}

export default ChangePeriod;