//import { useNavigate } from 'react-router'
import {Button} from "@mui/material";
import DotGrid from "@/components/Backgrounds/DotGrid.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useNavigate} from "react-router";
import {useEffect} from "react";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const navigate = useNavigate();

    return (
      <>
          <section className={`h-[100vh] w-screen flex flex-col justify-center items-center`}>
              <div className="absolute inset-0 -z-10 h-full w-full">
                  <DotGrid
                      dotSize={3}
                      gap={25}
                      baseColor="#E5C8C8FF"
                      activeColor="#5227FF"
                      proximity={150}
                      shockRadius={250}
                      shockStrength={5}
                      resistance={750}
                      returnDuration={1.5}
                  />
              </div>
              <div className={`h-[60%] w-full flex justify-between items-center  p-32`}>
                  <div>
                      <p className={`text-6xl font-[Roboto] font-semibold z-10`}>Track your <span className={`font-bold bg-yellow-300 p-2`}>Money</span></p>
                      <p className={`text-4xl font-roboto font-semibold mt-8`}>like a <span className={` text-6xl font-bold bg-yellow-300 p-2 -z-10`}>PRO</span>.</p>
                  </div>
                  <div className={`text-md font-[Helvetica] font-medium w-[30%] p-16 hover:backdrop-blur-xs`}>
                      <p className={`flex flex-wrap`}>lorem Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                          1500s, when an unknown printe</p>
                  </div>
              </div>
              <div className={`w-full h-[6%] flex items-center justify-center`}>
                  <button className={`w-[16%] h-full bg-transparent backdrop-blur-2xl border border-black rounded-xl hover:bg-black hover:text-white shadow-sm`}  onClick={() => navigate("/login", { state: { message: "" }, replace: true })}>
                      Start Tracking
                  </button>
              </div>
          </section>
          <section className={`h-fit w-screen flex flex-col justify-center items-center mt-16`}>
              <div id="black-div"
                   className={`h-[32rem] w-[64rem] flex items-center justify-center bg-center bg-cover rounded-xl shadow-xl`} style={{ backgroundImage: "url('/test.jpg')" }}>
              </div>
              <div className={`mt-16`}>
                  <p className={`text-8xl font-bold`}>Enter some title content.</p>
              </div>
              <div className={`w-full h-fit flex justify-between p-16 mt-16`}>
                  <div className={`h-[32rem] w-[50%] shadow bg-cover bg-center rounded-xl`} style={{ backgroundImage: "url('/test.jpg')" }}>
                  </div>
                  <div className={`flex flex-col h-[50%] w-[40%]`}>
                      <p className={`text-6xl`}>feature</p>
                      <p className={`text-md flex flex-wrap`}>simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                          1500s, when an unknown printe</p>
                  </div>
              </div>
              <div className={`w-full h-fit flex justify-between p-16`}>
                  <div className={`flex flex-col h-[50%] w-[40%]`}>
                      <p className={`text-6xl`}>feature</p>
                      <p className={`text-md flex flex-wrap`}>simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                          1500s, when an unknown printe</p>
                  </div>
                  <div className={`h-[32rem] w-[50%] shadow bg-cover bg-center rounded-xl`} style={{ backgroundImage: "url('/test.jpg')" }}>
                  </div>
              </div>
              <div className={`w-full h-fit flex justify-between p-16`}>
                  <div className={`h-[32rem] w-[50%] shadow bg-cover bg-center rounded-xl`} style={{ backgroundImage: "url('/test.jpg')" }}>
                  </div>
                  <div className={`flex flex-col h-[50%] w-[40%]`}>
                      <p className={`text-6xl`}>feature</p>
                      <p className={`text-md flex flex-wrap`}>simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                          1500s, when an unknown printe</p>
                  </div>
              </div>
          </section>
      </>
  )
}

export default Home