import React from 'react'
import MainHeader from '../include/MainHeader'
import SponsorFrombar from './SponsorFrombar'
import "../css/spon.css"
import "../css/spon.css"
import Bottom from '../include/Bottom';



const SponsorSuccess = () => {


  return (
    <>
      <MainHeader />
      <SponsorFrombar />
      <br />
      <br />
      <div className='container' style={{ textAlign: 'center' }}>

      <div className='sponsor-success' >

          <img           
          src='/images/SponSuccess.png'
          alt='SponSuccess' 
          style={{ maxWidth: '70%', height: 'auto', opacity: 1 }}

          />


</div>
<br />
<br />


        
    </div>
    <Bottom />
    </>
  )
}

export default SponsorSuccess