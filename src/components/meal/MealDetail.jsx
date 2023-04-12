import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../include/MainHeader";

const MealDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid red;
  margin-top: 10px;
`;

const ErrorP = styled.p`
  display: flex;
  font-size : 25px;
  justify-content: center;
  align-self: center;
  margin-top: 10px;
`

const MealDetail = () => {
  const location = useLocation();

  const selectedDate = location.state?.selectedDate;

  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        if (!selectedDate) {
          setMealData([]);
          return;
        }

        const response = await axios.get(
          process.env.REACT_APP_SPRING_IP + `meal/mealList?selectedDate=${selectedDate}`
        );
        setMealData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMealData();
  }, [selectedDate]);

  return (
    <>
      <MainHeader />
      {mealData.length === 0 ? (
        <ErrorP>해당 날짜에 대한 식단 정보가 없습니다.</ErrorP>
      ) : (
      <MealDiv>
        <h2>오늘의 식단표</h2>
        {mealData.map((meal, index) => (
          <div key={index}>
            <p>식사명 : {meal.mealName}</p>
            <p>메뉴명 : {meal.dishName}</p>
            <p>원산지 정보 : {meal.originInfo}</p>
            <p>칼로리 정보 : {meal.calorieInfo}</p>
            <p>영양소 정보 : {meal.nutrientInfo}</p>
          </div>
        ))}
      </MealDiv>
      )}
    </>
  );
};

export default MealDetail;
