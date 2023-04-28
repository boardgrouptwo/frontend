import React, { useEffect, useState } from 'react';
import "../../css/WishListPage.css"
import MainHeader from '../../include/MainHeader';
import MyPageBar from '../mypage/MyPageBar';
import { useLocation, useNavigate } from 'react-router';
import { GetProductDB } from '../../../service/ShopDBLogic';
import { useSelector } from 'react-redux';
import ShopRow from './ShopRow'


const WishListPage = () => {
  
  const token=useSelector(state=>state.token)
  const userid=useSelector(state=>state.userid)

  const navigate = useNavigate();
  const location = useLocation();

  
  // 장바구니 목록
  const [cartItem, setCartItem] =  useState([])
  useEffect(() => {
    const fetchCartList = async () => {
      const user = {
        user_id: userid
      }
      const res = await GetProductDB(user,token);
      console.log(res.data)
      const list = []
      res.data.forEach((item) => {
          const obj= {
          product_no: item.product_no,
          product_title: item.product_title,
          product_price: item.product_price,
          product_image: item.product_image,
          product_hit: item.product_hit,
        };
        list.push(obj)  
      });
      setCartItem(list);
    };
    fetchCartList();
  }, []);


  return (
    <>
      <MainHeader/>
      <MyPageBar />
      <div className="prodiv">        
        {cartItem.map((board,index) => (
        <ShopRow key={index} board={board} />
        ))}
      </div>
    </>
  );
};

export default WishListPage;