import React, { useState } from 'react';

const SponsorRow = ({ board, index }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{index+4}</td>
      <td>{board.spon_open==='공개' ? board.user_id : '익명의' } 후원자님</td>
      <td style={{ textAlign: "center" }}>{board.spon_money}원</td>
      <td style={{ textAlign: "center" }}>{board.spon_content}</td>
    </tr>
  );
};

export default SponsorRow;