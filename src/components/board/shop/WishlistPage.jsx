import React, { useEffect, useState } from 'react';
import "../../css/WishListPage.css"
import MainHeader from '../../include/MainHeader';
import MyPageBar from '../mypage/MyPageBar';
import { useLocation, useNavigate } from 'react-router';
import { DeleteProductDB, GetProductDB } from '../../../service/ShopDBLogic';
import { useSelector } from 'react-redux';
import ShopRow from './ShopRow'
import Swal from 'sweetalert2';


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
          product_quantity:item.product_quantity
        };
        list.push(obj)  
      });
      setCartItem(list);
    };
    fetchCartList();
  }, []);

//상품 삭제 
const handleDeleteProduct = async (productNo) => {
  const res = await DeleteProductDB({ product_no: productNo }, token);
  console.log(res);
  if(res.data === 1) {
  
    Swal.fire({
      icon: "success",
      title: "삭제되었습니다.",
      showCancelButton: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "my-confirm-button"
      }
    })
      
  }
  // 삭제 후 장바구니 목록을 다시 불러옴
  const user = {
    user_id: userid
  }
  const cartList = await GetProductDB(user,token);

  const updatedCartItems = cartList.data.map((item) => ({
    product_no: item.product_no,
    product_title: item.product_title,
    product_price: item.product_price,
    product_image: item.product_image,
    product_hit: item.product_hit,
    product_quantity:item.product_quantity
  }));
  setCartItem(updatedCartItems);
};


  return (
    <>
      <MainHeader/>
      <MyPageBar />
      {cartItem.length === 0 ? (
      <div className='cart-info' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem',paddingTop:'50px' }}>
        장바구니에 상품이 없습니다.
        </div>) : (
      <div className="prodiv">
        {cartItem.map((board, index) => (
          <div className="product-row" key={index}>
          <ShopRow board={board} />
          <button onClick={() => handleDeleteProduct(board.product_no)}>삭제</button>
        </div>
          ))}
      </div>
        )}
    </>
  );
};

export default WishListPage;