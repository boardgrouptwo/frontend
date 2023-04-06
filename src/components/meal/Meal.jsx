import React from 'react';
import Calender from './Calender';
import MainHeader from '../include/MainHeader';
import Noticebar from '../board/notice/Noticebar';

const Meal = () => {
  return (
    <>
      <MainHeader />
      <Noticebar/>
      <Calender />
    </>
  );
};

export default Meal;
