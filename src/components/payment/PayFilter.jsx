import { genTypeStyle } from 'antd/es/alert/style';
import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

/* 
 * payTypes: 
 * type: true
 * id: pay_type
 * title: pTitle
 * handlePTitle: handlePTitle
 */
const PayFilter = ({types, type, id, title, handlePTitle}) => {
  console.log(id);      // pay_type
  const navigate = useNavigate();
  const location = useLocation();

  const setPath = (oldItem, newItem, key) => {
    console.log(location.pathname)
    console.log(oldItem)    // 이전 타입
    console.log(newItem)    // 변경될 타입
    console.log(key)

    let path='';
    path = '?pay_type=' + newItem;

    return path;
  }

  return (
    <DropdownButton variant="" title={title} style={{border: '1px solid lightgray', borderRadius:'5px', height:'38px'}}>
      { 
        types.map((element, index)=>(
          <Dropdown.Item as="button" key={index} onClick={()=>{
            if(type){ 
              navigate(setPath(title,element,id)); 
            }
            handlePTitle(element); 
          }}>
            {element}
          </Dropdown.Item>
        )) 
      }
    </DropdownButton>
  )
}

export default PayFilter
