import React from 'react'
import '../css/intro.css';

const IntroMap = () => {
  return (

        
        <div className="map-table pc">
            <div className="table-row">
                <div className="cell map-desc">
                <table>
                    <tr>
                    <th>주소</th>
                    <td>서울특별시 강남구 테헤란로 14길 6 </td>
                    </tr>
                    <tr>
                    <th>대표전화</th>
                    <td>02-0000-0000</td>
                    </tr>
                </table>
                </div>
            </div>

            <div className="map-table">

            <table border={1}>
                <tr>
                    <td rowSpan={7}>                   
                        <h5>
                        <img src="/images/map_dt4.png" alt="" className="pc" />
                        <span className="pc" />
                        <br />대중교통 이용시
                        </h5> 
                    </td>
                    <td><strong>🚌 버스 </strong></td>
                </tr>
                <tr>
                    <td>- 역삼역.포스코P&S타워 정류장 하차</td>
                </tr>
                <tr>
                    <td>- 146 / 740 / 341 / 360</td>
                </tr>
                <tr>
                    <td>- 1100 / 1700 / 2000 / 7007 / 8001 </td>
                </tr>
                <tr>
                    <td><strong>🚃지하철</strong></td>
                </tr>
                <tr>
                    <td>- 강남역 1번 출구(신분당선, 2호선)</td>
                </tr>
                <tr>
                    <td>- 역삼역 3번 출구(2호선)</td>
                </tr>
            </table>


            <table>
                <tr>
                    <td rowSpan={4}> 
                        <h5>
                        <img src="/images/map_dt5.png" alt="" className="pc" />
                        <span className="pc" />
                        <br />자가용 이용시
                        </h5> 
                    </td>
                </tr>
                <tr>
                    <td><strong>🚗주차 안내</strong></td>
                </tr>
                <tr>
                    <td>- 주차(37대) : 옥외(1층) 10대, 지하1층 27대</td>
                </tr>
                <tr>
                    <td>※ 지하주차장 이용시 지상으로 이동하여 현관문 이용</td>
                </tr>

            </table>




        </div>
    </div>
  )
}

export default IntroMap
