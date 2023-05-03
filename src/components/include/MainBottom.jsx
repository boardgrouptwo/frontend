import React from 'react'
import styled from 'styled-components'
import KakaoMap from '../kakao/KakaoMap'

const FooterAddress = styled.div`
  display: block;
  padding-bottom: 16px;
  color: #333d4b;
  color: var(--grey800);
  font-size: 15px;
`;


const MainBottom = () => {
  return (
    <>
      <div style={{
        backgroundColor: "#191F28", color: "#f4f4f4" 
        ,fontFamily: "S-CoreDream-3Light"
        ,position: "absolute"
        ,width: "100%"
        ,height: "auto"
        ,top: "100%"
        ,left: "0"
        ,margin: "0"
        ,padding: "0"
        ,textAlign: "left"
        ,overflow: "hidden"
        ,textAlign: ""
        }}>

        <FooterAddress style={{float: "left", margin: "40px 10%", padding: "20px" }}>
          <strong className="p-footer__address__company-name"><h5 style={{ fontWeight: "bold" }}>㈜케이에이치요양원</h5></strong>
          <br/>
          사업자 등록번호 : 000-00-00000 | 대표 : kh정보교육원 2조
          <br/>호스팅 서비스 : 주식회사 케이에이치요양원 | 통신판매업 신고번호 : 2023-서울강남
          <br/> [06234] 서울 강남구 테헤란로10길 9, 7층 L강의실
          <br/>고객센터 : 주소:[06234]서울 강남구 테헤란로10길 9 
          <br/>TEL:02-1234-2345 | 상담시간:09:00 ~ 18:00
          <div style={{marginTop: "4%"}}>
            <ul className="p-footer__social-list">
              <li className="p-footer__social-list-item">
                <a aria-label="Toss Facebook" target="_blank" href="https://www.iei.or.kr/main/main.kh">
                  <img src="https://static.toss.im/assets/homepage/safety/icn-facebook.svg" alt="Facebook"/>
                </a>
              </li>
              <li className="p-footer__social-list-item">
                <a aria-label="Toss Blog" target="_blank" href="https://www.iei.or.kr/main/main.kh">
                  <img src="https://static.toss.im/assets/homepage/safety/icn-blog.svg" alt="Blog"/>
                </a>
              </li>
              <li className="p-footer__social-list-item"><a aria-label="Naver Post" target="_blank" href="https://www.iei.or.kr/main/main.kh">
                  <img src="https://static.toss.im/assets/homepage/safety/icn-naver.svg" alt="Naver Post"/>
                </a>
              </li>
              <li className="p-footer__social-list-item"><a aria-label="Twitter" target="_blank" href="https://www.iei.or.kr/main/main.kh">
                  <img src="https://static.toss.im/assets/homepage/safety/icn-twitter.svg" alt="Twitter"/>
                </a>
              </li>
              <li className="p-footer__social-list-item">
                <a aria-label="Toss Instagram" target="_blank" href="https://www.iei.or.kr/main/main.kh">
                  <img src="https://static.toss.im/assets/homepage/safety/icn-instagram.svg" alt="Instagram"/>
                </a>
              </li>
            </ul>
          </div>

        </FooterAddress>

        <div style={{ margin : "10px 30px 10px 10px", padding: "20px" }}>
          <KakaoMap/>
        </div>
      </div>

    </>
  )
}

export default MainBottom
