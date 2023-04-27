import React, { useEffect, useState } from 'react';
import "../css/WishListPage.css"
import axios from 'axios';
import MainHeader from '../include/MainHeader';

const WishlistPage = () => {
  const [isCheckAll, setIsCheckAll] = useState(false); //모든 항목을 체크했을 경우의 state
  const [isCheckingBox, setIsCheckingBox] = useState(false); //체크한 항목이 한 개라도 있을 경우의 state
  const [checkedArr, setCheckedArr] = useState([]); //체크한 항목의 정보를 객체로 저장시켜주는 state
  const [itemList, setItemList] = useState([]);
  
  //db연결
  useEffect(() => {
    axios.get('/api/items').then(response => {
      setItemList(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  //개별 체크항목 체크
  const switchCheckedClass = (index) => {
    const updatedItemList = itemList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setItemList(updatedItemList);
  };

  //전체선택여부확인
  const changeAllCheck = (e) => {
    const updatedItemList = itemList.map((item) => {
      return {
        ...item,
        isChecked: e.target.checked,
      };
    });
    setItemList(updatedItemList);
    setIsCheckAll(e.target.checked);
  };
// itemList에서 체크된 아이템만 가져와서 체크박스 상태에 따라 isCheckingBox와 checkedArr의 상태를 업데이트하는 useEffect
  useEffect(() => {
    const checkedItems = itemList.filter((item) => item.isChecked);
    if (checkedItems.length > 0) {
        setIsCheckingBox(true);
        setCheckedArr(checkedItems);
    } 
    else {
        setIsCheckingBox(false);
        setCheckedArr([]);
    }
  }, [itemList]);
//선택한 제품 가격
const chekedprice = (updatedItemList) => {
    const totalPrice = updatedItemList.reduce(
      (acc, cur) => acc + cur.price * cur.amount,
      0
    );
    return totalPrice;
  };
  
  //수량증감 구현위한 변수 
  const [isBtnVaild,setIsBtnValid]=useState()
  const [item,setItem] =useState()
  const onChangeProps = (id, key, value) => {
    setItemList(prevState => {
      return prevState.map(obj => {
        if (obj.id === id) {
          return { ...obj, [key]: value };
        } else {
          return { ...obj };
        }
      });
    });
  };
//증가
  const increaseAmount = (id) => {
    setItemList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      })
    );
  };
  //감소
  const decreaseAmount = (id) => {
    setItemList((prevList) =>
      prevList.map((item) => {
        if (item.id === id && item.amount > 1) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      })
    );
  };
//증감상태를 업데이트하는 effect훅
  useEffect(() => {
    setIsBtnValid(itemList.amount > 1);
  }, [itemList.amount]);

  //삭제
  const deleteList = (idsToDelete) => {
    const remainingItems = itemList.filter(item => !idsToDelete.includes(item.id));
    setItemList(remainingItems);
  }
  const handleDelete = () => {
    if (checkedArr.length === 0) {
      alert('선택한 상품이 없습니다.');
      console.log("삭제불가")
    } else {
     //삭제함수호출
      const idsToDelete = checkedArr.map(item => item.id);
      deleteList(idsToDelete);
      console.log("삭제")
    }
  };
 //주문페이지 이동

  return (
    <>
    <MainHeader/>
    <section className='section-title'>
      <div>
        <h2 className='page-title'>장바구니</h2>
        </div>
        </section>
      <div className='div-container'>
        
          <div className='cart_chk'>
           <li className="chk-bind">
            <label className='wishlist_check_checkbox_all' htmlFor='wishlist_check_checkbox_all'>전체선택</label>
            <input
            type='checkbox'
            id='wishlist_check_checkbox_all'
            onClick={changeAllCheck}
            checked={isCheckAll}
            className='wishlist_check_checkbox_all'
            />
            </li>
            <button className='btn_delete'onClick={handleDelete}>선택 삭제</button>
          
          </div>
          <div className="sublayout">
            <div className='cartpage'>
            {itemList.length === 0 && <li className='cartlist'>장바구니에 담긴 상품이 없습니다.</li>}
            {itemList.map((item, index) => (
              <div key={item.id} className='cartlist'>
                <h3>{item.name}</h3>
                <p className='p-price'>가격: {item.price}원</p>
                <p>수량: {item.amount}</p>
                <button className='btn_inc' onClick={() => increaseAmount(item.id)}>+</button>
                <button className='btn_dec' onClick={() => decreaseAmount(item.id)}>-</button>
                  <div>
                    <input
                      type='checkbox'
                      id={`wishlist_check_checkbox_${index}`}
                      onClick={() => switchCheckedClass(index)}
                      checked={item.isChecked}
                      className='wishlist_check_box'
                    />
                  </div>
              </div>
            ))}
            </div>
          <div className="price_info">
            <ul>
              <div className='exptected_price'>
                <p>상품 금액: {chekedprice(checkedArr)}원</p>
                <button className='btn_buy_chk'onClick={() => itemList.filter(item => item.isChecked).length ? window.location.href='/ORDER페이지 URL' : alert('선택한 상품이 없습니다.')}>선택상품 주문하기</button>
                <button className='btn_buy_all'>전체상품 주문하기</button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
/* */