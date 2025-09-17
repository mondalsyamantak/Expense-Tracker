import React, { useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  
} from "@/components/ui/dialog"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UserRoundCheck, Mail, CheckCheck, Pencil, Trash2, Image } from 'lucide-react'
import axios from 'axios'
import { Card } from '@/components/ui/card'
function Profile() {
  const url = import.meta.env.VITE_BACKEND || 'http://localhost:8080';
  const user = {
    fullName: "Sample Name",
    username: "sample-username",
    email: "sample-email",
    todoList: []

  }

  const handleDelete = async () => {
    console.log("clicked Delete")
  }

  const [preview, setPreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    //format: NOT json; field name for file: "profilePic"

    console.log("image submission to be processed here")

    const res = axios.post(`${url}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log("response from server after image upload", response);
      setPreview("");
    }).catch((error) => {
      console.error("Error uploading image:", error);
    });
  }
  return (
    <>
    <div className="w-full flex lg:flex-row flex-col flex-nowrap p-3 gap-4">
      {/* <Card className=" items-center flex w-full flex-col p-3 "> */}
      <Card className="p-4 w-full flex items-center flex-7">
        <Avatar className="border-green-500 border-2 h-20 w-20 m-3">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-col flex items-center">
          <h1 className="font-bold">
           {user.fullName}
          </h1>
          <h2 className="">
            Productivity enthusiast
          </h2>
        </div>

        <div className="mt-6 w-full p-3 flex flex-col ">
          <div className="w-full flex items-center m-1"> 
            <UserRoundCheck/> 
            <p className="mx-3">Username: {user.username}</p>
          </div>
          <div className="w-full flex items-center m-1"> 
            <Mail/> 
            <p className="mx-3">Email: {user.email}</p>
          </div>

          {/* Image input section: */}
          <div className='flex flex-row ml-auto gap-2 mt-5'>
            <Dialog>
              <form onSubmit={handleImageUpload}>
                <DialogTrigger asChild>
                  <Button className="" type="button"><Image/>Change Profile Picture</Button>  
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile picture</DialogTitle>
                    <DialogDescription>
                      Upload an image you want to set as your profile picture
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="grid gap-3">
                      <Label htmlFor="profilepic">Image</Label>
                      <Input id="profilepic" name="profilePic" type="file" accept = "image/*" onChange = {handleImageChange} />
                    </div>
                    {preview && (
                      <Avatar className="my-2 w-60 h-60">
                        <AvatarImage src={preview} alt="preview" className="flex-nowrap" />
                      </Avatar>
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" onClick = {() => setPreview("")}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>

            {/* Edit profile section: */}
            <Dialog>
              <DialogContent className="sm:max-w-[425px]">
              <form 
              // onSubmit={handleSubmit} 
              className="p-0 m-0">
                <DialogHeader>
                  <DialogTitle className="text-center">Edit Profile</DialogTitle>
                  <DialogDescription>
                    Edit your profile
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 my-4">

                  <div className="grid gap-1">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" placeholder="Edit username" autoComplete="off" defaultValue={user.username} />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="fullName-1">Full Name</Label>
                    <Input id="fullName-1" name="fullName" placeholder="Edit your display name" autoComplete="off" defaultValue={user.fullName}/>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="email-1">Email</Label>
                    <Input id="email-1" name="email" placeholder="Edit your email" autoComplete="off" defaultValue={user.email}/>
                  </div>
                  
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" className="cursor-pointer">Submit</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
              </DialogContent>  
              <DialogTrigger asChild>
              <Button className="" type="button"><Pencil/>Edit</Button>  
              </DialogTrigger>
          </Dialog>
        </div>
              
        </div>
      </Card>
      <Card className="p-4 flex-10">
        <h1 className="font-bold mb-5">About Me</h1>
        <div className="flex flex-col">
        <p>
        If you need to change the code in sidebar.tsx, you are encouraged to do so. The code is yours. Use sidebar.tsx as a starting point and build your own.

In the next sections, we'll go over each component and how to use them.
SidebarProvider

The SidebarProvider component is used to provide the sidebar context to the Sidebar component. You should always wrap your application in a SidebarProvider component.
Props

        </p>
        <Button className="ml-auto mt-5"><Pencil/></Button>
      </div>
    </Card>
        {/* <AlertDialog >
              <AlertDialogTrigger asChild className="w-full">
              <Button className="text-red-500 m-3" variant="outline"> <Trash2/> Delete account</Button>
                
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-500">Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone, are you absolutely sure you want to permanently delete this account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="cursor-pointer">Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
        
      </div>
      </>
  )
}

export default Profile