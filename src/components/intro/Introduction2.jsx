import React from 'react'
import {SectionsContainer, Section} from 'react-fullpage';
import { Link } from 'react-router-dom';
import Introductionbar from './Introductionbar';
import MainHeader from '../include/MainHeader';
import KakaoMap from '../kakao/KakaoMap';


const Introduction2 = () => {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
  };
  return (
    <>
          <MainHeader />
      <Introductionbar />
    <SectionsContainer {...options}>
      <body>

      <img
          src='/images/intro_image5.png'
          alt='intro_image'
          style={{ align: "center", width: '100%', height: '650px', opacity: 1, padding:"1%" }}
        />
        <font style={{zIndex:'99', textAlign: "center", position: "absolute", top: "9%", left:"40%", fontSize:"30px", fontWeight: 'bold'}}> 요양원의 새로운 기준 </font>
        <font style={{zIndex:'99', textAlign: "center", position: "absolute", top: "10%", left:"40%", fontSize:"100px", fontWeight: 'bold', color: '#004445'}}> KH요양원 </font>
        <Section>
          <column>

            <div className='container' style={{ textAlign: 'center' }}>
            <img
          src='/images/scroll.png'
          style={{ align: "center", width: 'auto', opacity: 1, padding:"1%" }}
        />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            
          <h1 style={{ color: '#595959', fontWeight: 'bold', fontSize: '2rem', marginTop: '2rem' }}>
          어르신이 머물고 싶은 집
        </h1>
        <h1 style={{ color: '#004445', fontWeight: 'bold', fontSize: '3rem', marginTop: '0rem' }}>
          KH요양원
        </h1>
        <br />
       
       <div className='container' style={{ textAlign: 'center' }}>
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
        <img
          src='/images/scroll.png'
          style={{ align: "center", width: 'auto',opacity: 1, padding:"1%" }}
        />
        <br />
        <br />
        </div>
        </div>
          </column>
        </Section>

        

        <Section>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <div className='container' style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#004445', fontWeight: 'bold', fontSize: '3rem', marginTop: '0rem', marginBottom: '30px'}}>오시는 길</h2>
        <KakaoMap/>
        </div>


        </Section>
        
      </body>
    </SectionsContainer>
    </>
  );
}
export default Introduction2;