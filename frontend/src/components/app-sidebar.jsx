"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavPages } from "./nav-pages"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { Skeleton } from "./ui/skeleton"
import axios from "axios"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  pages: [
    {
      name: "Dashboard",
      url: "/app",
      icon: Frame,
    },
    {
      name: "Transactions",
      url: "/app/transactions",
      icon: PieChart,
    },
    {
      name: "Budgets",
      url: "/app/budgets",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {

  const [user, setUserdata] = React.useState(null);
  const url = import.meta.env.VITE_BACKEND;
  
  React.useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`${url}/dashboard`, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => 
      {
        setUserdata(res.data.user);
        console.log(res.data.user);
      })
      .catch((err)=> {
        console.log("error: ", err)
      })
    }

    fetchUserData();

  }, [])

  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/app">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Expense Tracker</span>
                  <span className="text-xs">Kyuki aaj kamaenga to kal khaaenga</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavPages pages={data.pages} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
