import { addMonths, format, subMonths } from 'date-fns';
import React, { useState } from 'react'
import RenderCells from './RenderCells';
import RenderDays from './RenderDays';
import RenderHeader from './RenderHeader';
import '../css/calendar.css'; 
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import axios from 'axios';
import MealDetail from './MealDetail';

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content : center;
`

const Calender = () => {
    const navigate = useNavigate();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mealData, setMealData] = useState([]);

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    const onDateClick = async (day) => {
        const formattedDate = format(day, 'd');

        /* formattedDate는 내가 클릭한 달력의 날짜 */
        console.log(formattedDate)

        /* selectedDate는 오늘의 날짜 */
        console.log(selectedDate)

        console.log(currentMonth)
        
        try {
            const response = await axios.get(process.env.REACT_APP_SPRING_IP + `meal/mealList?selectedDate=${formattedDate}`);
            console.log(response.data);
            setMealData(response.data);
        } catch (error) {
            console.error(error);
        }
        navigate(`/meal/page/${formattedDate}`)
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
            {/* <MealDetail mealData={mealData} /> */}
    </>
    )
}

export default Calender
