import React from 'react'
import '../css/PaymentModal.css'
import { kakaoPayReady } from '../kakao/KakaoPay';

const PaymentModal = ({payForm, open, close, header}) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아온다
  console.log(payForm);

  const kakaopay = async () => {
    const respose = await kakaoPayReady(payForm);
    console.log(respose.data);          // 카카오페이 PC_URL

    // 카카오페이 결제 성공 시 DB에 저장
    if (!respose.data) {
      console.log("결제 실패하였습니다")
    } else {
      console.log("카카오결제 성공하였습니다")

      // 카카오페이 결제 팝업 출력
      window.open(respose.data,'window_name','width=430,height=500,location=no,status=no,scrollbars=yes');
      
      
    }
  }

  return (
    <>
      <div className={ open ? 'openModal modal' : 'modal' }>
        { open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={ close }>
                &times;
              </button>
            </header>
            <main>
              {/* 카카오페이 선택 */}
              <button className="kakaopay" onClick={ kakaopay() } value={"카카오페이"}/>
            </main>
            <footer>
              <button className="close" onClick={ close }>close</button>
            </footer>
          </section>
        ) : null }
      </div>
    </>
  )
}

export default PaymentModal
