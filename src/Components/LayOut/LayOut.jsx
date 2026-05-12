import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'

function LayOut() {
  return (
  <>
  <NavBar/>
  <Outlet/>
  <Footer/>
  </>
  )
}

export default LayOut