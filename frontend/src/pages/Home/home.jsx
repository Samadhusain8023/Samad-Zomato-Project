import React, { useState } from 'react'
import './home.css'
import Header from '../../components/Header/header'
import ExploreMenu from '../../components/ExploreMenu/exploremenu'
import FoodDisplay from '../../components/FoodDisplay/fooddisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const home = () => {

  const [category,setCategory]=useState("All");


  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default home