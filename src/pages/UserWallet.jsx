import React from 'react'
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import DigitalWallet from '../components/DigitalWallet';

const UserWallet = () => {
  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
      <Navbar />
      <section className="sm:px-6 px-3 pt-16 pb-6 ">
        <div className="p-3 lg:p-6  rounded-lg bg-[#0a1b2b]/60  min-h-[44rem] border-[#0a1b2b]/50">
         <DigitalWallet/>
        </div>
      </section>
      <FooterSection />
    </div>
  )
}

export default UserWallet