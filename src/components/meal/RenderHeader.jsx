import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import React from 'react'

const RenderHeader = ({currentMonth, prevMonth, nextMonth}) => {
  return (
    <>
        <div className='header row' style={{marginBottom:"5%"}}>
                      <div className='col col-end-left'>
                        <Icon icon="bi:arrow-left-circle-fill" style={{width:"60%", height:"90%"}}  onClick={prevMonth}/>
                      </div>
                          <img src='/images/meal2.gif' style={{width:"10%", paddingRight:"0", marginBottom:"3%"}} />
                          <div className='col col-start'>
                                    {format(currentMonth, 'yyyy')}년  {format(currentMonth, 'M')}월의 식단표
                          </div>
                          <img src='/images/meal.gif' style={{width:"10%", paddingLeft:"0", marginBottom:"1%"}} />
                      <div className='col col-end-right'>
                        <Icon icon="bi:arrow-right-circle-fill" style={{width:"60%", height:"90%"}} onClick = {nextMonth}/>
                      </div>
        </div>
    </>
  )
}

export default RenderHeader
