import React, { useEffect, useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbPage, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import {ChartPieLabel, ChartPieLabel2} from '../components/chart-pie-label'
import { ChartAreaGradient, ChartAreaGradient2 } from '../components/chart-area-gradient'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import TableDashboard from '../components/table-dashboard'
import axios from 'axios'
import { ChartAreaAxes } from '../components/chart-area-axes'

function Dashboard() {
  const [piechart1, setPiechart1] = useState(null);
  const [piechart2, setPiechart2] = useState(null);
  const [areachart1, setAreachart1] = useState(null);
  useEffect(() => {
    const res = axios.get('/api/v1/transactions/summary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setPiechart1(res.data))
    .catch(err => console.log(err))

    const res2 = axios.get('/api/v1/transactions/summary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setPiechart2(res.data))
    .catch(err => console.log(err))

    const res3 = axios.get('/api/v1/transactions/summary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setAreachart1(res.data))
    .catch(err => console.log(err))

  })
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
            <CardTitle className="font-bold text-2xl">₹12,540</CardTitle>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardDescription>Income this month:</CardDescription>
            <CardTitle className="font-bold text-2xl text-green-400">₹12,540</CardTitle>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardDescription>Expense this month:</CardDescription>
            <CardTitle className="font-bold text-2xl text-rose-400">₹12,540</CardTitle>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardDescription>Random useful data:</CardDescription>
            <CardTitle className="font-bold text-2xl text-blue-400">79%</CardTitle>
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
      <ChartAreaGradient/>
      {/* <ChartAreaAxes/> */}
      <ChartAreaGradient2/>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A list of your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <TableDashboard/>
        </CardContent>
      </Card>
      </div>

      {/* What else should I add here?  */}
    </main>
  )
}

export default Dashboard