import React from 'react'

const SponsorStatistic = ({listItem, pageNum}) => {

  return (
    <>
      <tr>
        {/* ["후원일", "후원자명", "후원금액", "후원종류", "결제방법", "익명여부", "후원내용"] */}
        <td style={{textAlign: "center"}}> {listItem.spon_date}</td>
        <td style={{textAlign: "center"}}>{listItem.user_name}</td>
        <td style={{textAlign: "center"}}> {listItem.spon_money}</td>
        <td style={{textAlign: "center"}}> {listItem.spon_huwon}</td>
        <td style={{textAlign: "center"}}> {listItem.spon_pay}</td>
        <td style={{textAlign: "center"}}> {listItem.spon_open}</td>
        <td style={{textAlign: "center"}}> {listItem.spon_content}</td>
      </tr>
    </>
  )
}

export default SponsorStatistic
