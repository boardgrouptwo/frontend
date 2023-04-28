import { Button, Result } from 'antd';
import MainHeader from '../include/MainHeader';
import Bottom from '../include/Bottom';
import { useNavigate } from 'react-router-dom';
import KhSponorServicebar from '../khservice/KhSponorServicebar';

const PaymentSuccess = () => {
  const navigate = useNavigate();


  const success = () => (
    <Result
      status="success"
      title="결제 완료되었습니다!"
      extra={[
        <Button type="primary" key="console" onClick={(e) => navigate("/shopmain?type=total")}>선물하기</Button>,
        <Button key="buy" onClick={(e) => navigate("/mypage")}>내정보</Button>,
      ]}
    />      
  );
  
  return (
    <>
      <MainHeader />
      <KhSponorServicebar />
      <br />
      <br />
      <div className='container' style={{ textAlign: 'center' }}>
        <div className='sponsor-success' >
          {success()}
        </div>
        <br />
        <br />
      </div>
      <Bottom />
    </>
  )
}

export default PaymentSuccess
