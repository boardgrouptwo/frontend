import React from 'react'
import { Link } from 'react-router-dom'

const ScheduleRow = ({schedule}) => {
  return (
    <>
      <tr>
        <td>{schedule.cal_no}</td>
        <td><Link to={"/schedule/detail/"+schedule.cal_no}className='btn btn-primary'>{schedule.cal_title}</Link></td>
        <td>{schedule.cal_writer}</td>
        <td>{`${schedule.cal_start}~${schedule.cal_end}`}</td>
      </tr>
    </>
  )
}

export default ScheduleRow
