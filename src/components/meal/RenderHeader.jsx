import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import React from 'react'

const RenderHeader = ({currentMonth, prevMonth, nextMonth}) => {
  return (
    <>
        <div className='header row'>
              <div className='col col-start'>
                  <span className='text'>
                      <span className='text month'>
                              {format(currentMonth, 'M')}월
                      </span>
                        {format(currentMonth, 'yyyy')}
                  </span>
              </div>
                <div className='col col-end'>
                      <Icon icon="bi:arrow-left-circle-fill"  onClick={prevMonth}/>
                      <Icon icon="bi:arrow-right-circle-fill"  onClick = {nextMonth}/>
                </div>
        </div>
    </>
  )
}

export default RenderHeader
