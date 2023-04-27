import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek } from 'date-fns';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


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
                                  key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`} onClick = {() => onDateClick(cloneDay)} style={{whiteSpace: "nowrap", overflow: "hidden" , textOverflow: "ellipsis"}}>
                          <p id={formattedDate} className={format(currentMonth, 'M') !== format(day, 'M')? 'text not-valid': ''} style={{paddingTop:"5px"}}>{formattedDate}</p>
                          <div style={{ marginTop:"17%", whiteSpace: "nowrap", overflow: "hidden" , textOverflow: "ellipsis", width:"100%", textAlign:"center"}}>
                            <ul style={{listStyle:"none", paddingLeft:"10px"}}>
                              <li><Link to='/meal/page'>점심</Link></li>
                              <li>저녁</li>
                            </ul>
                          </div>
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
