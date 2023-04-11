import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import React from 'react'

const RenderHeader = ({currentMonth, prevMonth, nextMonth}) => {
  return (
    <>
        <div className='header row'>
                      <div className='col col-end-left'>
                      <Icon icon="bi:arrow-left-circle-fill"  onClick={prevMonth}/>
                      </div>
                      <div className='col col-start'>
                          <span className='text'>
                                {format(currentMonth, 'yyyy')}년
                          </span>
                          <span className='text month'>
                                {format(currentMonth, 'M')}월
                          </span>
                      </div>
                      <div className='col col-end-right'>
                      <Icon icon="bi:arrow-right-circle-fill"  onClick = {nextMonth}/>
                      </div>
        </div>
    </>
  )
}

export default RenderHeader
