import { addMonths } from 'date-fns';
import React from 'react'

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

  return (
    <>
        <div className='calendar'>
            <div className='header'>Header</div>
            <div className='days'>Days</div>
            <div className='body'>Cells</div>
        </div>
    </>
  )
}

export default Calender
