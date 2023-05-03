import React from 'react'

const PaymentRow = ({listItem, pageNum}) => {

  return (
    <>
      <tr>
        <td style={{textAlign: "center"}}>{listItem.pay_type}</td>
        <td style={{textAlign: "center"}}>{listItem.pay_date}</td>
        <td style={{textAlign: "center"}}>{listItem.pay_amount}</td>
        <td style={{textAlign: "center"}}> {listItem.pay_content}</td>
      </tr>
    </>
  )
}

export default PaymentRow
