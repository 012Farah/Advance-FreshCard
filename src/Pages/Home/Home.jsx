import React from 'react'
import HomeSlider from './HomeSlider'
import HomeFeatures from './HomeFeatures'
import HomeCategories from './HomeCategories'
import HomeDeals from './HomeDeals'
import Loading from '../Loading/Loading'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'

export default function Home() {
  return (
  <>
    <HomeSlider></HomeSlider>
    <HomeFeatures></HomeFeatures>
    <HomeCategories></HomeCategories>
    {/* bgeb products hena */}
    <HomeDeals></HomeDeals>     
     {/*w bgeb el products hena kman , fa hgebo mara wa7da w ash8l l kol wa7d fn bt3to   */}
    <FeaturedProduct></FeaturedProduct>
    
    
  </>
  )
}
