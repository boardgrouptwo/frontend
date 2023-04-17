import React from 'react'
import { Link } from 'react-router-dom'

const QnARow = ({board, pageNum}) => {
  return (
    <>
      <tr>
        <td style={{textAlign: "center"}}>{board.qna_no}</td>
        <td style={{textAlign: "center"}}>{board.qna_type}</td>
        <td style={{textAlign: "center"}}>{board.user_name}</td>
        <td style={{textAlign: "center"}}><Link to ={"detail?page="+pageNum.page+"&qna_no="+board.qna_no}>{board.qna_title}</Link></td>
        <td style={{textAlign: "center"}}>{board.qna_date}</td>
        <td style={{textAlign: "center"}}> {board.qna_result}</td>
      </tr>
    </>
  )
}

export default QnARow
