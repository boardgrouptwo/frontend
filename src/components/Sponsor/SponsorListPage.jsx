import React from 'react'
import MainHeader from '../include/MainHeader'

import SponsorListbar from './SponsorListbar'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SponsorCard from './SponsorCard';
import SponsorList from './SponsorList';
/* use effect 로 값을 담아와서 card와 list에 넘겨주기 */
const SponsorListPage = () => {
  return (
    <>
      <MainHeader />
      <SponsorListbar/>
      <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>     
        <h2 style={{marginTop: "30px", textAlign: "center"}}>🌠이번달 베스트 후원인🌠</h2>

      <SponsorCard />
      <SponsorList />
      </div>
      <br />
      <br />
    </>
  )
}

export default SponsorListPage
