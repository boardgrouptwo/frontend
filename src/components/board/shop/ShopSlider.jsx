import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBlock = styled(Slider)`
  text-align: center;
  overflow-x: hidden;
  .slick-dots {
    position: absolute;
    bottom: 2rem;
    @media only screen and (max-width: 1024px) {
      bottom: 1rem;
    }
  }
  .slick-dots li button:before {
    color: var(--light-gray);
  }
`;

const IMG = styled.img`
  height: 200px;
`

const ShopSlider = () => {
  const [width, setWidth] = useState(window.innerWidth < 768 ? true : false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { banners },
      } = await axios.get("/api/getItemApi");
      setImages(banners);
    };
    getData();
  }, []);

  const screenChange = (e) => {
    const matches = e.matches;
    setWidth(matches);
  };

  useEffect(() => {
    const mql = window.matchMedia("screen and (max-width:768px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <>
        <SliderBlock {...settings}>
          <IMG src="https://bucketplace-v2-development.s3.amazonaws.com/uploads/store/banners/store_home_banners/168129173474630474.png" alt="캠핑" tabindex="-1" class="sc-jfSnVq hlFoNI" style="width: 100%; display: inline-block;"></IMG>
          <IMG src="https://bucketplace-v2-development.s3.amazonaws.com/uploads/store/banners/store_home_banners/168085278916058540.jpg" alt="SK매직" tabindex="-1" class="sc-jfSnVq hlFoNI" style="width: 100%; display: inline-block;"></IMG>
          <IMG src="https://bucketplace-v2-development.s3.amazonaws.com/uploads/store/banners/store_home_banners/168085193624933812.png" alt="가구" tabindex="-1" class="sc-jfSnVq hlFoNI" style="width: 100%; display: inline-block;"></IMG>
          <IMG src="images/ad/ad1.png" alt="가구" tabindex="-1" class="sc-jfSnVq hlFoNI" style="width: 100%; display: inline-block;"></IMG>
        </SliderBlock>      
    </>
  )
}

export default ShopSlider
