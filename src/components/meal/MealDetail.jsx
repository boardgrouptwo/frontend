import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainHeader from "../include/MainHeader";
import {Card} from 'antd';
import { Button, Result } from 'antd';
import { Progress, Space } from 'antd';


const MealDetail = () => {
  /* 카드 뒤집기 이벤트 처리용 */
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);

  /* 카드 플립  */
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    };


  const { Meta } = Card;

  const navigate = useNavigate();
  const location = useLocation();

  /* Calender.jsx에서 props로 받아온 캘린더에서 선택한 날짜 */
  const formattedDate = location.state?.date;


  const[meal, setMeal] = useState([{
    meal_no:0,
    meal_type:"",
    meal_name:"",
    meal_origin:"",
    meal_cal:0,
    meal_nut:"",
    meal_date:""
  }])


  useEffect(() => {
    const mealList = async () => {
      
      const res = await axios.get(process.env.REACT_APP_SPRING_IP + `meal/mealList?selectedDate=${formattedDate}`);
      
      const result = JSON.stringify(res.data)
      
      const jsonDoc = JSON.parse(result)
  
      
      const meals = jsonDoc.map(item => ({
        meal_no: item.meal_no,
        meal_type: item.meal_type,
        meal_name: item.meal_name,
        meal_origin: item.meal_origin,
        meal_cal: item.meal_cal,
        meal_nut: item.meal_nut,
        meal_date: item.meal_date,
      }));
      setMeal(meals);

      
    }
    

    const fetchData = async () => {      
      await mealList()
    }
    fetchData()

  }, [formattedDate]);


  /* 식단표가 없을 경우에 나오는 화면에서 사용하는 버튼 */
  const goBack = () =>{
    navigate('/meal')
  }


  return (
    <>
      <MainHeader />

          <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", padding:0, marginBottom:"1%"}}>
          <h3 style={{width:"25%", fontSize:"35px", marginLeft:"10%", padding:0, fontStyle:"italic"}}>오늘의 식단표<img src="/images/mealtable.gif" style={{width:"20%", padding:0, margin:0}}/></h3>
          </div>
          
          {/* 내가 선택한 날짜만 보이게 */}

              <div key = {meal.meal_no} style={{ width: "90%", display: "flex", justifyContent: "center", height:"50rem", marginLeft:"5%" }}>

                {/* 점심카드 앞, 뒷면을 모두 감싸는 div태그 */}
                <div  key={`lunch-card-${meal.meal_no}`} style={{perspective: "4000px"}}>
                        {/* 점심 카드 앞면 */}
                        <div key={`lunch-front-${meal.meal_no}`} style={{ margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", position: "absolute", transform: hover? "rotateY(180deg)" : "rotateY(0deg)" }} 
                          >
                            {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meals) => (
                            <Card  key={`lunch-card-front-${meals.meal_no}`} hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                              cover={<div key={`lunch-card-cover${meals.meal_no}`} style={{  height: "42rem", width: "100%", backgroundColor: "#539165", color:"white", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)", padding:"20px", borderRadius:"10px" }}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    
                                    <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p  key={`lunch-card-meal-type-${meals.meal_no}`}>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <div style={{fontSize:"1.7rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p  key={`lunch-card-meal-name-${meals.meal_no}`}>
                                        {meal.meal_name}
                                      </p>
                                    ))}</div>

                                    <br />
                                    <br />
                                    <br />

                                    <div style={{fontSize:"1.3rem",fontWeight:"550", paddingTop:"10px"}}>원산지 
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p  key={`lunch-card-meal-origin-${meals.meal_no}`}>
                                        {meal.meal_origin}
                                      </p>
                                    ))}</div>

                                  </div>}>

{/*                                     <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop:"5%"}}>
                                        <Space wrap>
                                            <Progress
                                              type="circle"
                                              percent={90}
                                              strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                              }}
                                              showInfo={true}
                                              size={150}
                                            />
                                            <br />
                                            <br />
                                            <Progress
                                              type="circle"
                                              percent={90}
                                              strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                              }}
                                              size={150}
                                            />
                                            <br />
                                            <br />
                                            <Progress
                                              type="circle"
                                              percent={100}
                                              strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                              }}
                                              size={150}
                                            />
                                        </Space>
                                    </div> */}

                            </Card>
                            ))}
                        </div>

                        {/* 점심 카드 뒷면 */}
                        <div  key={`lunch-back-${meal.meal_no}`} style={{ margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", transform: hover? "rotateY(0deg)" : "rotateY(-180deg)" }}
                            >
                            <Card key={`lunch-card-back-${meal.meal_no}`} hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                                cover={<div  key={`lunch-card-back-cover-${meal.meal_no}`} style={{ height: "42rem", width: "100%", backgroundColor:"#243763", color:"white", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)", padding:"20px", borderRadius:"10px" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    
                                    <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`lunch-card-back-meal-type-${meal.meal_no}`}>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <div style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`lunch-card-meal-nut-${meal.meal_no}`}>
                                        영양 정보 : {meal.meal_nut}
                                      </p>
                                    ))}</div>

                                    <br />

                                    <div style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`lunch-card-meal-cal-${meal.meal_no}`}>
                                        칼로리 : {meal.meal_cal}Kcal
                                      </p>
                                    ))}</div>

                                  </div>}>
                            </Card>
                        </div>
                </div>


                {/* 저녁 카드 앞, 뒷면을 모두 감싸는 div태그 */}
                <div  key={`dinner-card-${meal.meal_no}`} style={{perspective: "4000px"}}>
                        {/* 저녁 카드 앞면 */}
                        <div key={`dinner-front-${meal.meal_no}`} style={{ margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", position: "absolute", transform: hover1? "rotateY(180deg)" : "rotateY(0deg)" }} >
                            
                        {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meals) => (
                            <Card key={`dinner-card-front-${meals.meal_no}`} hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                              cover={<div key={`dinner-card-front-cover-${meals.meal_no}`} style={{ height: "42rem", width: "100%", backgroundColor: "#D06224", color:"white", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)", padding:"20px", borderRadius:"10px" }} onMouseEnter={() => setHover1(true)} onMouseLeave={() => setHover1(false)}>
                                    
                                    <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`dinner-card-meal-type-${meals.meal_no}`}>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <div style={{fontSize:"1.7rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`dinner-card-meal-name-${meals.meal_no}`}>
                                        {meal.meal_name}
                                      </p>
                                    ))}</div>

                                    <br />
                                    <br />
                                    <br />
  
                                    <div style={{fontSize:"1.3rem",fontWeight:"550", paddingTop:"10px"}}>원산지 
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`dinner-card-meal-origin-${meals.meal_no}`}>
                                        {meal.meal_origin}
                                      </p>
                                    ))}</div>

                                  </div>}>

{/*                                   <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop:"5%"}}>
                                        <Space wrap>
                                              <Progress
                                                type="circle"
                                                percent={80}
                                                strokeColor={{
                                                  '0%': '#108ee9',
                                                  '100%': '#87d068',
                                                }}
                                                showInfo={true}
                                                size={150}
                                              />
                                              <br />
                                              <br />
                                              <Progress
                                                type="circle"
                                                percent={90}
                                                strokeColor={{
                                                  '0%': '#108ee9',
                                                  '100%': '#87d068',
                                                }}
                                                size={150}
                                              />
                                              <br />
                                              <br />
                                              <Progress
                                                type="circle"
                                                percent={100}
                                                strokeColor={{
                                                  '0%': '#108ee9',
                                                  '100%': '#87d068',
                                                }}
                                                size={150}
                                              />
                                        </Space>
                                    </div> */}

                            </Card>
                            ))}
                        </div>

                        {/* 저녁 카드 뒷면 */}
                        <div key={`dinner-back-${meal.meal_no}`} style={{  margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", transform: hover1? "rotateY(0deg)" : "rotateY(-180deg)" }}>
                            <Card key={`dinner-card-back-${meal.meal_no}`} hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                                cover={<div key={`dinner-card-back-cover-${meal.meal_no}`} style={{ height: "42rem", width: "100%", backgroundColor:"#E48900", color:"white", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" , padding:"20px", borderRadius:"10px" }} onMouseEnter={() => setHover1(true)} onMouseLeave={() => setHover1(false)}>
                                
                                <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`dinner-card-back-meal-type-${meal.meal_no}`}>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <div style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`dinner-card-meal-nut-${meal.meal_no}`}>
                                        영양 정보 : {meal.meal_nut}
                                      </p>
                                    ))}</div>

                                    <br />

                                    <div style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p key={`dinner-card-meal-cal-${meal.meal_no}`}>
                                        칼로리 : {meal.meal_cal}Kcal
                                      </p>
                                    ))}</div>

                                  </div>}>
                            </Card>
                        </div>
                </div>

          </div>
          
            )

    </>
  );



};

export default MealDetail;
