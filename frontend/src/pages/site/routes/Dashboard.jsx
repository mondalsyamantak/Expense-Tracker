import React, { useEffect, useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbPage, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import {ChartPieLabel} from '../components/chart-pie-label'
import { ChartAreaGradient, ChartAreaGradient2 } from '../components/chart-area-gradient'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import TableDashboard from '../components/table-dashboard'
import axios from 'axios'
import { ChartAreaAxes } from '../components/chart-area-axes'
import {ChartPieLabel2} from "@/pages/site/components/chart-pie-label2.jsx";
import {columns} from "@/pages/site/routes/Transactions/transactionTable/columns.jsx";
import {DataTable} from "@/pages/site/routes/Transactions/transactionTable/data-table.jsx";
import { useGlobal } from '@/globalProviders/GlobalContext'

function Dashboard() {
  const url = import.meta.env.VITE_BACKEND;
  // const [piechart1, setPiechart1] = useState(null);
  // const [piechart2, setPiechart2] = useState(null);
  // const [areachart1, setAreachart1] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState(null);

  const {user, setUser} = useGlobal();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`${url}/dashboard`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       });
  //       console.log("User object:", res.data);
  //       console.log("Total Expense:", res.data.totalExpense);
  //       setTotalExpense(res.data.totalExpense);
  //       setTransactionHistory(res.data.transactionHistory);
  //     } catch (err) {
  //       console.error("Error:", err);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (user) {

  //   }
  // }, [])

  if (!user) return (
    <div className='p-6 flex justify-center items-center h-full w-full'> Loading...</div>
  )

  return (
      <main className="
      flex-1 
      p-6 space-y-6
      ">
      {/* Top summary cards */}
      <div className="
      grid 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-6
      ">
        <Card className="">
          <CardHeader>
            <CardDescription>Total Balance:</CardDescription>
            <CardTitle className="font-bold text-2xl">Fetch from budget</CardTitle>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardDescription>Income this month:</CardDescription>
            <CardTitle className="font-bold text-2xl text-green-400">{user.income}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardDescription>Expense this month:</CardDescription>
            <CardTitle className="font-bold text-2xl text-rose-400">₹{user.totalExpense}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardDescription>Savings:</CardDescription>
            <CardTitle className="font-bold text-2xl text-blue-400">{(((user.income)-(user.totalExpense))/(user.income))*100}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts row */}
      <div className="
      grid 
      grid-cols-1 lg:grid-cols-2 
      gap-6
      ">
        <ChartPieLabel/>
      {/* <ChartPieLabel2/> */}
        <ChartPieLabel2/>
      {/* <ChartAreaAxes/> */}
        <ChartAreaGradient/>
        <DataTable columns={columns} className='' data={user.transactionHistory}/>
      </div>

      {/* What else should I add here?  */}
    </main>
  )
}

export default Dashboard