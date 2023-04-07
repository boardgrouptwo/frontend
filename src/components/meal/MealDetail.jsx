import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



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
        <h1>{selectedDate}일 식단표</h1>
        {mealData.map((meal, index) => (
          <div key={index}>
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
          </div>
          ))}
    </>
  )
}

export default MealDetail
