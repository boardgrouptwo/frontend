import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek } from 'date-fns';
import React, { useState } from 'react'


const RenderCells = ({currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
  



    while (day <= endDate) {
              for (let i = 0; i<7; i++){
                  formattedDate = format(day, 'd');
                  const cloneDay = day;
                  days.push(
                        <div id={i} className={`col cell ${!isSameMonth(day, monthStart)? 'disabled': isSameDay(day, selectedDate)
                                                        ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')
                                                        ? 'not-valid': 'valid'}`}
                                  key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`} onClick = {() => onDateClick(cloneDay)} >
                          <span id={formattedDate} className={format(currentMonth, 'M') !== format(day, 'M')? 'text not-valid': ''} >{formattedDate}</span>
                        </div> );
                    day = addDays(day, 1);
                    
                  }//end of for
                  rows.push(<div className='row' key={day} >{days}</div>);
          days = [];
    }


  return (
    <div className='body'>{rows}</div>
  )
}

export default RenderCells
