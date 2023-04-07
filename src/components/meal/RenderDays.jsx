import React from 'react'

const RenderDays = () => {
    const days =[];
    const date = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']




    for(let i =0; i <7 ; i++){
        days.push(
              <div className='col' key= {i}>
                      {date[i]}
              </div>,
          )
    }
  return (
    <div className='days row'>{days}</div>
  )
}

export default RenderDays
