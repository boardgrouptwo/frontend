import React from 'react';
import Calender from './Calender';
import MainHeader from '../include/MainHeader';
import Noticebar from '../board/notice/Noticebar';
import Bottom from '../include/Bottom';

const Meal = () => {
  return (
    <>
      <MainHeader />
      <Noticebar/>
      <Calender />
      <Bottom />
    </>
  );
};

export default Meal;
