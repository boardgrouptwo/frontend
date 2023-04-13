import React, { useRef, useEffect } from 'react';
import Bottom from '../include/Bottom';
import MainHeader from '../include/MainHeader';
import Introductionbar from './Introductionbar';
import '../css/intro.css';
import KakaoMap from '../kakao/KakaoMap';
import IntroMap from './IntroMap';

const Introduction = () => {
  const imgRef1 = useRef(null);

  useEffect(() => {
    const img1 = imgRef1.current;
    let prevScrollPos = window.pageYOffset;
    

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isImg1Visible = img1.getBoundingClientRect().bottom > 1 && img1.getBoundingClientRect().top < window.innerHeight;
      const shouldFadeOut = prevScrollPos < currentScrollPos;

      if (shouldFadeOut) {
        if (isImg1Visible) {
          img1.style.opacity = Math.max(parseFloat(img1.style.opacity) - 3, 0.2); //숫자가 커질수록 더 느리게 사라짐

        }
      } else {
        if (isImg1Visible) {
          img1.style.opacity = Math.min(parseFloat(img1.style.opacity) + 10, 1); //숫자를 크게 하면 이미지가 더 빨리 나타남

        }
      }
    
      prevScrollPos = currentScrollPos;
    };

    handleScroll(); // initial image animation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MainHeader />
      <Introductionbar />
      <br />
      <br />
      <div className='container' style={{ textAlign: 'center' }}>
      <img
          ref={imgRef1}
          src='/images/intro_image2.png'
          alt='intro_image'
          className='fadeIn'
          style={{ maxWidth: '100%', height: 'auto', opacity: 1, paddingLeft:'8%', paddingRight:'8%' }}
        />


        <h1 style={{ color: '#595959', fontWeight: 'bold', fontSize: '2rem', marginTop: '2rem' }}>
          어르신이 머물고 싶은 집
        </h1>
        <h1 style={{ color: '#004445', fontWeight: 'bold', fontSize: '3rem', marginTop: '0rem' }}>
          KH요양원
        </h1>
       <br />
        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '1.5rem' }}>
          안녕하세요, 저희 요양원 사이트에 방문해 주셔서 감사합니다. <br /> 저희 요양원은 노인분들의 안락하고 행복한 노후생활을 위해 최선을 다하고 있습니다.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '1rem' }}>
          저희 요양원은 첨단 시설과 전문 요양보호사들이 함께하는 환경에서 노인분들의 건강과 안녕을 지켜드리며, <br />다양한 프로그램과 활동을 통해 삶의 질을 높일 수 있도록 노력하고 있습니다.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '1rem' }}>
          또한, 저희 요양원은 항상 노인분들의 의견에 귀 기울이며, <br />개인 맞춤형 요양서비스를 제공하기 위해 최선을 다하고 있습니다.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '2rem' }}>
          다시 한번, 저희 요양원 사이트에 방문해 주셔서 감사합니다. <br />언제든지 궁금하신 점이 있으시면 언제든지 문의해 주시기 바랍니다.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '2rem' }}>
        감사합니다
        </p>
        <br />
        <br />
        <br />
        <hr />
        
        <br />
        <h2 style={{ color: '#004445', fontWeight: 'bold', fontSize: '3rem', marginTop: '0rem', marginBottom: '30px'}}>오시는 길</h2>
        <KakaoMap/>
        <IntroMap /> 
        <br />
      <br />
      <br />
      <br />
      </div>

      <Bottom />

    </>
  )
}

export default Introduction