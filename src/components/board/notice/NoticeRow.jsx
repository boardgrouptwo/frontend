import React from 'react'
import { Link } from 'react-router-dom'

const NoticeRow = ({board}) => {
  return (
    <>
      <tr>
        <td>{board.notice_no}</td>
        <td><Link to ={"detail/"+board.notice_no}>{board.notice_title}</Link></td>
        <td>{board.notice_date}</td>
        <td>{board.notice_hit}</td>
      </tr>
    </>
  )
}

export default NoticeRow
