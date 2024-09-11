import React from 'react'

import Style from '../styles/index.module.css'
import { HeroSection,Service } from '@/components/componentsIndex'

const index = () => {
  return (
    <div className={Style.homePage}>
        <HeroSection />
        <Service />
    </div>
  )
}

export default index