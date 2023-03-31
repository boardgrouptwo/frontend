import { addMonths, subMonths } from 'date-fns';
import React, { useState } from 'react'
import RenderCells from './RenderCells';
import RenderDays from './RenderDays';
import RenderHeader from './RenderHeader';
import './calendar.css'; 

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    const onDateClick = (day) => {
        setSelectedDate(day);
  };

  return (
    <>
        <div className='calendar'>
            <RenderHeader currentMonth={currentMonth} prevMonth ={prevMonth} nextMonth ={nextMonth} />
            <RenderDays/>
            <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
        </div>
    </>
  )
}

export default Calender
