import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components';

const MainChatbot = ({handleCloseModal}) =>{
  const navigate = useNavigate();
  
  const steps = [
    {
      id: '0',
      message: '안녕하세요 챗봇입니다.',
      trigger: '1',
    },
    {
      id: '1',
      message: `요양원 서비스가 궁금하셨죠?
      그럼 소개를 시작해보겠습니다.
      준비가 되셨으면 시작을 눌러주세요          
      `,
      trigger: '2',      
    },
    {
      id: '2',
      options: [
        {value:1, label: '시작하기', trigger: '3'},
      ]
    },
    {
      id: '3',
      options: [
        {value:1, label: '로그인', trigger: '4'},
        {value:2, label: '후원하기', trigger: '5'},
        {value:3, label: '결제방법', trigger: '7'},
        {value:4, label: '봉사활동', trigger: '8'},
        {value:5, label: '면회하기', trigger: '10'},
        {value:6, label: '상품구매', trigger: '13'},
        {value:7, label: '식단표확인', trigger: '16'},
        {value:8, label: 'QNA', trigger: '17'},
        {value:9, label: '기타', trigger: '19'},
        {value:10, label: '종료', trigger: () => handleCloseModal()},
      ]
    },
    {
      id: '4',
      options: [
        { value: 1, label: '로그인페이지 이동', trigger: () => navigate("/login") },
        { value: 2, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '5',
      message: `후원은 로그인을 해야지만 진행할 수 있습니다.`,
      trigger: '6',      
    },
    {
      id: '6',
      options: [
        { value: 1, label: '후원페이지 이동', trigger: () => navigate("/sponsor/from") },
        { value: 2, label: '로그인페이지 이동', trigger: () => navigate("/login") },
        { value: 3, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '7',
      message: `결제는 카카오페이와 네이버페이로 진행할수 있습니다.`,
      trigger: '3',      
    },
    {
      id: '8',
      message: `봉사활동은 로그인을 해야지만 신청할 수 있습니다.`,
      trigger: '9',      
    },
    {
      id: '9',
      options: [
        { value: 1, label: '봉사활동 신청페이지 이동', trigger: () => navigate("/service/from") },
        { value: 2, label: '로그인페이지 이동', trigger: () => navigate("/login") },
        { value: 3, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '10',
      message: `면회는 로그인을 해야지만 신청할 수 있습니다.`,
      trigger: '11',      
    },
    {
      id: '11',
      options: [
        { value: 1, label: '면회 일정 확인', trigger: '12' },
        { value: 2, label: '면회 신청페이지 이동', trigger: () => navigate("/visit/sign") },
        { value: 3, label: '로그인페이지 이동', trigger: () => navigate("/login") },
        { value: 4, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '12',
      message: `면회는 평일 오전 10시부터 17시까지 이용아 가능하며 시간대별로
                면회신청을 할 수 있습니다.`,
      trigger: '11',      
    },
    {
      id: '13',
      message: `상품구매 많이 선물한 선물과 받고 만족한 선물로 나눠져있습니다 `,
      trigger: '14',      
    },    
    {
      id: '14',
      options: [
        { value: 1, label: '많이 선물한', trigger: () => navigate("/shopmain?type=total") },
        { value: 2, label: '받고 만족한', trigger: () => navigate("/shopreceive") },
        { value: 3, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '15',
      message: `식단표는 영양사님께서 영양을 체크해서 월별로 작성하고 있습니다 `,
      trigger: '16',      
    },
    {
      id: '16',
      options: [
        { value: 1, label: '식단표 확인', trigger: () => navigate("/meal") },
        { value: 2, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '17',
      message: `기타 질문이 있으시면 QNA페이지를 이용해주세요`,
      trigger: '18',      
    },
    {
      id: '18',
      options: [
        { value: 1, label: 'QNA', trigger: () => navigate("/qna") },
        { value: 2, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '19',
      options: [
        { value: 1, label: '오시는길', trigger: '20' },
        { value: 2, label: '요양원소개', trigger: '21' },
        { value: 3, label: '전화번호', trigger: '22' },
        { value: 4, label: '상담시간', trigger: '23' },
        { value: 5, label: '처음으로', trigger: '3' },
      ]
    },
    {
      id: '20',
      message: `대중교통 이용시 강남역 1번 출구(신분당선, 2호선), 역삼역 3번 출구(2호선) 
      버스(1100 / 1700 / 2000 / 7007 / 8001) 역삼역.포스코P&S타워 정류장 하차 후 도보 5분 입니다      
      `,
      trigger: '19',      
    },
    {
      id: '21',
      options: [
        { value: 1, label: '요양원소개 페이지', trigger: () => navigate("/intro") },
        { value: 2, label: '처음으로', trigger: '3' },
      ]
    },    
    {
      id: '22',
      message: `02-1234-2345 입니다 상담시간에만 전화를 받을 수 있습니다`,
      trigger: '19',      
    },
    {
      id: '23',
      message: `상담시간은 오전 9시부터 18시 입니다.`,
      trigger: '19',      
    },
  ]

  const theme = {    
    background: '#f5f8fb',
    headerBgColor: '#006E61',
    headerFontColor: 'white',
    headerFontSize: '15px',
    botBubbleColor: '#4a9e5c',
    botFontColor: '#FFF',
    userBubbleColor: 'white',
    userFontColor: '#4a4a4a'
  }



  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot 
          steps={steps}
          hideHeader={false}
          placeholder={'채팅이 불가능한 채널입니다.'}
          />
      </ThemeProvider>
    </>
  );
}

export default MainChatbot
