import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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

import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { toast, Toaster } from "sonner"
import { ModeToggle } from "@/components/mode-toggle"

export default function Page() {

  const location = useLocation();
  const path = location.pathname.replace(/\/$/, "");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.message) {
      // Display the message as a toast notification
      console.log(location.state.message);
      if (location.state.message != "") {
        toast.success(location.state.message);
      }
      // Clear the state to prevent duplicate toasts on re-render
      location.state.message = null;
      navigate("/app", {
        state: {
          message: "",
        },
        replace: true
      })
    }
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Toaster richColors />
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block" style = {{"display" : (path === '/app')? "none" : "block"}}>
                <BreadcrumbLink onClick={() => navigate("/app")} className="cursor-pointer">
                {/* {["/app", "/today", "/tomorrow", "/this-month"].some((field) => field?.trim() === location.pathname)? "Home" : "Other"} */}
                Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" style = {{"display" : path === '/app'? "none" : "block"}} />
              <BreadcrumbItem>
                <BreadcrumbPage>{
                  (path === "/app")? "Dashboard" : 
                    (path === "/app/profile")? "Profile" : 
                      (path === "/app/transactions")? "Transactions" :
                        "Unknown"
                }</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto"><ModeToggle/></div>

          </div>

        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
