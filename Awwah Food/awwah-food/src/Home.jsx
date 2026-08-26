import { useState } from "react"

const Navbar = () => {
  return(
    <header>
      <h1>Awwah Food</h1>
      <h2>Home</h2>
      <h2>About</h2>
      <h2>Menu</h2>
      <h2>How to Order</h2>
      <h2>Contact</h2>
    </header>
  )
}

const Hero = () => {
  return(
    <div className="hero-page">
      <h3>Awwah Food</h3>
      <h1>Homemade Culiner Halal & Fresh</h1>
      <button className="hero-btn">Gas Pesen</button>
      <button className="hero-btn">Lihat menunya dulu</button>
    </div>
  )
}

export default Navbar