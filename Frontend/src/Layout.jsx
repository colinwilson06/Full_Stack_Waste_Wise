import React from 'react'
import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
      
    </>
  )
}
