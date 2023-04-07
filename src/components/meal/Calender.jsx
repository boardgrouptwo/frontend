import { addMonths, format, subMonths } from 'date-fns';
import React, { useState } from 'react'
import RenderCells from './RenderCells';
import RenderDays from './RenderDays';
import RenderHeader from './RenderHeader';
import '../css/calendar.css'; 
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const DivContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content : center;
    
`

const Calender = () => {
    const navigate = useNavigate();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    const onDateClick = (day) => {
        const formattedDate = format(day, 'd');
        console.log(formattedDate)
        navigate(`/meal/page:${formattedDate}`)
    };

    return (
    <>      
            <DivContainer>
                <div className='calendar'>
                    <RenderHeader currentMonth={currentMonth} prevMonth ={prevMonth} nextMonth ={nextMonth} />
                    <RenderDays/>
                    <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
                </div>
            </DivContainer>
    </>
    )
}

export default Calender
