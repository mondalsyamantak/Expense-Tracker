import { Bitcoin, GalleryVerticalEnd } from "lucide-react"

import { Toaster, toast } from 'sonner'
import { SignUpForm } from "../../components/signup-form";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SignUpPage() {

  const url = import.meta.env.VITE_BACKEND || "http://localhost:3000"
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    
    const res = await axios(`${url}/SignUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    })
    .then((res) => {
      console.log(res.status)
      if (res.status == 200) toast.success("Account created successfully, please log into your account")
      navigate("/app", {
        state: {
          message: "SignUp successful",
        }
      })
    }) //====> [remove this line]
    .catch(err => console.log(err));
    //[show the error in a sonner/toast message]

    // if (res.status == 200) {
    //   // navigate("/login", {
    //   //   state: {
    //   //     message: "Signup successful please login",
    //   //   }
    //   // })
    //   toast.success("signed up successfully")
    // }
    console.log(res.status)

    
  }


  return (
    <div className="grid min-h-svh lg:grid-cols-2 mb-0 border">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <Bitcoin className="size-4" />
            </div>
            Expense Tracker
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Toaster richColors/>
            <SignUpForm onSubmit={handleSubmit} />
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
