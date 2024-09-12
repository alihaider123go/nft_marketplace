import React from 'react'

import Style from '../styles/index.module.css'
import { HeroSection,Service,BigNFTSlider,Subscribe } from '@/components/componentsIndex'

const index = () => {
  return (
    <div className={Style.homePage}>
        <HeroSection />
        <Service />
        <BigNFTSlider />
        <Subscribe />
    </div>
  )
}

export default index