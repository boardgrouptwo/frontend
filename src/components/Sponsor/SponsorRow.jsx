import React, { useState } from 'react';

const SponsorRow = ({ board, index }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{index+4}</td>
      <td>{board.user_id} 후원자님</td>
      <td style={{ textAlign: "center" }}>{board.spon_money}\</td>
      <td style={{ textAlign: "center" }}>{board.notice_hit}</td>
    </tr>
  );
};

export default SponsorRow;