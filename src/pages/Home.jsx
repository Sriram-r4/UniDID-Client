import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero-image.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import FooterSection from "../components/FooterSection";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("userData"));
      setUser(savedUser && savedUser.active ? savedUser : null);
    };

    fetchUser();

    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e] scroll-smooth ">
      <Navbar />

      <section className="sm:px-6 px-3  pb-12 pt-14  border-[#0a1b2b]/50 sm:pt-16  sm:gap-0 grid  sm:grid-cols-2 justify-center ">
        <div className="sm:text-lg md:text-xl md:h-[38rem] lg:min-h-[38rem] sm:rounded-l-lg sm:rounded-r-none rounded-lg bg-[#0a1b2b]/60 shadow-xl  flex flex-col sm:justify-center p-6 ">
          <div className="sm:p-4 p-2">
            <p className="text-white xl:text-6xl md:text-5xl text-4xl font-medium font-title sm:p-2">
              Your Identity,
              <span className="bg-gradient-to-r from-[#76daff] via-[#76daff] to-[#fcd000] bg-clip-text text-transparent ">
                &nbsp; Reimagined:
              </span>
            </p>
            <p className="text-white xl:text-3xl md:text-2xl text-xl  font-title sm:px-4">
              Secure,&nbsp;
              <span className="bg-gradient-to-r from-[#76daff] via-[#76daff] to-[#fcd000] bg-clip-text text-transparent font-medium">
                Decentralized,&nbsp;
              </span>
              and in Your Hands
            </p>
          </div>
          <p className="text-white xl:text-xl md:text-lg text-sm font-title sm:px-8 px-2 ">
            Unlock a safer, more efficient way to manage your digital identity.
            Our blockchain-powered solution empowers you to maintain full
            ownership and security, eliminating the need for trust in
            centralized authorities.
          </p>
          <div className="sm:p-4 sm:px-8 p-2 sm:py-6 flex justify-center">
            {user ? (
              <Link
                to="/userdashboard"
                className="bg-[#2b4162] ring-2 ring-[#0a1b2b]/50 hover:bg-white/90 hover:text-[#2b4162] rounded-lg p-2 px-4 text-white"
              >
                Try Now
                <i className="bi bi-chevron-right p-2" />
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="bg-[#2b4162] ring-2 ring-[#0a1b2b]/50 hover:bg-white/90 hover:text-[#2b4162] rounded-lg p-2 px-4 text-white"
              >
                Try Now
                <i className="bi bi-chevron-right p-2" />
              </Link>
            )}
          </div>
        </div>
        <div className="sm:min-h-[38rem] sm:flex  hidden ">
          <img
            src={heroImg}
            alt="Hero"
            className=" xl:h-[34rem] xl:w-full grayscale hover:grayscale-0 object-cover sm:min-h-[38rem] sm:rounded-r-lg"
          />
        </div>
      </section>
      {/** site metrics(testing,regulation,safety,protection) */}
      <section className="min-h-[24rem] bg-gradient-to-br  from-[#2b4162] to-[#12100e] sm:px-6 px-3 py-6 ">
        <div className="p-6 rounded-lg bg-[#0a1b2b]/60 grid grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 min-h-[22rem] shadow-xl border-[#0a1b2b]/50 gap-0">
          <div className="p-6 bg-teal-500  text-center text-wrap text-white font-title ">
            1
          </div>
          <div className="p-6 bg-red-500  text-center text-wrap text-white font-title ">
            2
          </div>
          <div className="p-6 bg-blue-500 text-center text-wrap text-white font-title  ">
            3
          </div>
          <div className="p-6 bg-purple-500  text-center text-wrap text-white font-title ">
            4
          </div>
        </div>
      </section>
      {/** User Workflow Section */}
      <section className="min-h-[28rem] bg-gradient-to-br  from-[#2b4162] to-[#12100e] sm:px-6 px-3 py-6 ">
        <div className="p-6  rounded-lg bg-[#0a1b2b]/60  min-h-[28rem] border-[#0a1b2b]/50 shadow-xl  ">
          <div className="flex flex-nowrap min-h-[26rem] gap-8 overflow-x-scroll scroll-smooth scrollbar-custom">
            <div className="p-6 bg-teal-500  text-center text-wrap text-white font-title min-w-[18rem] ">
              1
            </div>
            <div className="p-6 bg-red-500  text-center text-wrap text-white font-title   min-w-[18rem] ">
              2
            </div>
            <div className="p-6 bg-blue-500 text-center text-wrap text-white font-title  min-w-[18rem] ">
              3
            </div>
            <div className="p-6 bg-purple-500  text-center text-wrap  text-white font-title  min-w-[18rem] ">
              4
            </div>
            <div className="p-6 bg-indigo-500  text-center text-wrap text-white font-title  min-w-[18rem] ">
              5
            </div>
            <div className="p-6 bg-slate-500  text-center text-wrap text-white font-title  min-w-[18rem] ">
              6
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default Home;
