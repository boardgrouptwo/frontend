import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import MainHeader from '../include/MainHeader';


const MealDiv = styled.div`
  display : flex;
  justify-content : center;
  border : 2px solid red;
  margin-top : 10px;

`



const MealDetail = () => {
    const {selectedDate} =useParams();

    const [mealData, setMealData] = useState([]);

    useEffect(()=>{
        const fetchMealData = async () => {
            try{
                const response = await axios.get(process.env.REACT_APP_SPRING_IP + `meal/mealList?selectedDate=${selectedDate}`);
                setMealData(response.data);
            }catch(error){
            console.error(error)
            }
        }
        fetchMealData();
    },[selectedDate])

  return (
    <>
      <MainHeader />
        <MealDiv>
            <h2>오늘의 식단표</h2>
            {mealData.map((meal, index) => (
              <div key={index}>
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
              </div>
              ))}
          </MealDiv>
    </>
  )
}

export default MealDetail
