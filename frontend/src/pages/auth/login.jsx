import { Bitcoin, GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { Toaster, toast } from 'sonner'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginPage() {

  const url = import.meta.env.VITE_BACKEND || "http://localhost:3000"
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("use effect ran")
        if (location.state && location.state.message) {
          // Display the message as a toast notification
          console.log(location.state.message);
          if (location.state.message != "") {
            toast.success(location.state.message);
            console.log("logged out")
          }
          // Clear the state to prevent duplicate toasts on re-render
          location.state.message = null;
          navigate("/login", {
            state: {
              message: "",
            },
            replace: true
          })
        }
    })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // toast.success("Data registered in console");

    const res = await axios(`${url}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: (data)
    })
    .catch(err => console.log(err));
    // [show the error in toast]

    if (res?.status == 200) {
      
      localStorage.setItem("token", res.data);
      navigate("/app", {
        state: {
          message: "Login successful",
        }
      })
    }

  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };


  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <Bitcoin className="size-4"/>
            </div>
            Expense Tracker
          </a>
          <ModeToggle className="ml-auto"/>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Toaster richColors/>
            <LoginForm onSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
