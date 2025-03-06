import React from 'react'
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import MainTable from '../components/MainTable';

const UserTable = () => {
  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
    <Navbar />
    <section className="sm:px-6 px-3 pt-16 pb-6 ">
      <div className="p-3 sm:p-6  rounded-lg bg-[#0a1b2b]/60  min-h-[44rem] border-[#0a1b2b]/50">
       <MainTable/>
      </div>
    </section>
    <FooterSection />
  </div>
  )
}

export default UserTable