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

    //달력 한 칸을 클릭하는 이벤트
    const onDateClick = async (day) => {
        console.log("식단표 클릭")
        const formattedDate = format(day, 'yyyy-MM-dd');

        /* formattedDate는 내가 클릭한 달력의 날짜 */
        console.log(formattedDate)


        /*
        setSelectedDate(day); // 클릭한 날짜를 선택된 날짜로 설정
        console.log(day.getFullYear()); // 년도 가져오기
        console.log(day.getMonth()); // 월 가져오기 (0부터 시작)
        console.log(day.getDate()); // 일 가져오기
        */
        
        navigate(`/meal/page?${formattedDate}`, { state: { date: formattedDate } })
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
