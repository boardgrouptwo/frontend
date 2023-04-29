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
  console.log(formattedDate)


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
      console.log(res.data)
      
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
      console.log(meals);
      meals.map(meal => console.log(meal.meal_no,meal.meal_type,meal.meal_name));
    }


    const fetchData = async () => {      
      await mealList()
    }
    fetchData()

  }, [formattedDate]);

  const goBack = () =>{
    console.log("되돌아가기 버튼 클릭")
    navigate('/meal')
  }


  return (
    <>
      <MainHeader />

          <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", padding:0, marginBottom:"1%"}}>
          <h3 style={{width:"25%", fontSize:"35px", marginLeft:"10%", padding:0, fontStyle:"italic"}}>오늘의 식단표<img src="/images/mealtable.gif" style={{width:"20%", padding:0, margin:0}}/></h3>
          </div>
          
          {/* 내가 선택한 날짜만 보이게 */}
          {meal.filter((meal) => meal.meal_date === formattedDate).map((meals) => (
              <div key = {meal.meal_no} style={{ width: "90%", display: "flex", justifyContent: "center", height:"50rem", marginLeft:"5%" }}>

                {/* 점심카드 앞, 뒷면을 모두 감싸는 div태그 */}
                <div style={{perspective: "4000px"}}>
                        {/* 점심 카드 앞면 */}
                        <div style={{ margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", position: "absolute", transform: hover? "rotateY(180deg)" : "rotateY(0deg)" }} 
                          >
                            <Card hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                                cover={<div style={{  height: "25rem", width: "100%", backgroundColor: "#539165", color:"white", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)", padding:"20px", borderRadius:"10px" }}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    
                                    <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <p style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_name}
                                      </p>
                                    ))}</p>

                                    <p style={{fontSize:"1.3rem",fontWeight:"500", paddingTop:"10px"}}>원산지 
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_origin}
                                      </p>
                                    ))}</p>

                                  </div>}>

                                    <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop:"5%"}}>
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
                                    </div>
                            </Card>
                        </div>

                        {/* 점심 카드 뒷면 */}
                        <div style={{ margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", transform: hover? "rotateY(0deg)" : "rotateY(-180deg)" }}
                            >
                            <Card hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                                cover={<div style={{ height: "42rem", width: "100%", backgroundColor:"#243763", color:"white", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)", padding:"20px", borderRadius:"10px" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    
                                    <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <p style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        영양 정보 : {meal.meal_nut}
                                      </p>
                                    ))}</p>

                                    <br />

                                    <p style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '점심').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        칼로리 : {meal.meal_cal}Kcal
                                      </p>
                                    ))}</p>

                                  </div>}>
                            </Card>
                        </div>
                </div>


                {/* 저녁 카드 앞, 뒷면을 모두 감싸는 div태그 */}
                <div style={{perspective: "4000px"}}>
                        {/* 저녁 카드 앞면 */}
                        <div style={{ margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", position: "absolute", transform: hover? "rotateY(180deg)" : "rotateY(0deg)" }} >
                            <Card hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                                cover={<div style={{ height: "25rem", width: "100%", backgroundColor: "#D06224", color:"white", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)", padding:"20px", borderRadius:"10px" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    
                                    <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <p style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_name}
                                      </p>
                                    ))}</p>

                                    <p style={{fontSize:"1.3rem",fontWeight:"500", paddingTop:"10px"}}>원산지 
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_origin}
                                      </p>
                                    ))}</p>

                                  </div>}>

                                  <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop:"5%"}}>
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
                                    </div>
                            </Card>
                        </div>

                        {/* 저녁 카드 뒷면 */}
                        <div style={{  margin: "1%", height: "42rem", width: "40rem", display: "flex", justifyContent: "center", backfaceVisibility: "hidden", transition:"1s", transform: hover? "rotateY(0deg)" : "rotateY(-180deg)" }}>
                            <Card hoverable style={{ width: "90%", border:"2px solid darkgray" }}
                                cover={<div style={{ height: "42rem", width: "100%", backgroundColor:"#E48900", color:"white", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" , padding:"20px", borderRadius:"10px" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                
                                <h1 style={{fontWeight:"600"}}>{meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        {meal.meal_type}
                                      </p>))}
                                    </h1>

                                    <br />

                                    <p style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        영양 정보 : {meal.meal_nut}
                                      </p>
                                    ))}</p>

                                    <br />

                                    <p style={{fontSize:"1.6rem",fontWeight:"600", paddingTop:"10px"}}>
                                      {meal.filter((meal) => meal.meal_type === '저녁').filter((meal) => meal.meal_date === formattedDate).map((meal) => (
                                      <p>
                                        칼로리 : {meal.meal_cal}Kcal
                                      </p>
                                    ))}</p>

                                  </div>}>
                            </Card>
                        </div>
                </div>

          </div>
            ))}

    </>
  );
};

export default MealDetail;
