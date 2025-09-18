import React from 'react'
//import { useNavigate } from 'react-router'
import {Button} from "@mui/material";

function Home() {

  // const navigate = useNavigate();
  return (
    // <div>
    //   {/* Hero Section */}
    //   <section style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
    //     <h1>Welcome to Expense Tracker</h1>
    //     <p>Track your expenses and manage your finances effortlessly.</p>
    //     <button className='rounded-2xl p-3 m-2 cursor-pointer bg-amber-500 hover:bg-amber-100 duration-200 ease-in-out' onClick={() => navigate("/app")}>Get Started</button>
    //   </section>
    //
    //   {/* Features Section */}
    //   <section style={{ padding: '50px', textAlign: 'center' }}>
    //     <h2>Why Choose Expense Tracker?</h2>
    //     <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
    //       <div style={{ maxWidth: '300px' }}>
    //         <h3>Easy to Use</h3>
    //         <p>Our intuitive interface makes tracking expenses a breeze.</p>
    //       </div>
    //       <div style={{ maxWidth: '300px' }}>
    //         <h3>Detailed Reports</h3>
    //         <p>Get insights into your spending habits with detailed reports.</p>
    //       </div>
    //       <div style={{ maxWidth: '300px' }}>
    //         <h3>Secure</h3>
    //         <p>Your data is safe with our top-notch security measures.</p>
    //       </div>
    //     </div>
    //   </section>
    //
    //   {/* Call to Action Section */}
    //   <section style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
    //     <h2>Start Managing Your Expenses Today</h2>
    //     <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Sign Up Now</button>
    //   </section>
    // </div>
      <>
          <section className={`h-[100vh] w-screen flex flex-col justify-center items-center p-32`}>
              <div className={`h-full w-full flex justify-between items-center`}>
                  <div>
                      <p className={`text-6xl font-[Helvetica] font-bold`}>Track with Ease</p>
                      <p className={`text-4xl font-[Helvetica] font-semibold`}>Analyse your expenses.</p>
                  </div>
                  <div className={`text-md font-[Helvetica] font-medium w-[30%]`}>
                      <p className={`flex flex-wrap`}>lorem Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                          book. It has survived not only five centuries, but also the leap into electronic typesetting,
                          remaining essentially unchanged. It was popularised in </p>
                  </div>
              </div>
              <div>
                  <Button type="submit" variant={"contained"} className="w-full">
                      Start Tracking Your Expense
                  </Button>
              </div>
          </section>
      </>
  )
}

export default Home