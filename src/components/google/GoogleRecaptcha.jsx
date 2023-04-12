import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha';

const GoogleRecaptcha = () => {

    //구글 캡차 서비스
    const onChange = (value) => {
        console.log('Captcha value:', value);
        }

  return (
    <>
{/* 구글 캡차 서비스 */}
<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'0px 60px 0px 0px'}}>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_YOUR_RECAPTCHA_KEY}
        onChange={onChange}
      />
    </div>

    </>
  )
}

export default GoogleRecaptcha
