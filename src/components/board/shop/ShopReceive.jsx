import React from 'react'
import MainHeader from '../../include/MainHeader'
import ShopBar from './ShopBar'
import ShopSlider from './ShopSlider'
import ShopReceiveCard from './ShopReceiveCard'
import Bottom from '../../include/Bottom'

const ShopReceive = () => {
  return (
    <>
      <MainHeader/> 
      <ShopBar/>
      <ShopReceiveCard />
      <Bottom />
    </>
  )
}

export default ShopReceive
