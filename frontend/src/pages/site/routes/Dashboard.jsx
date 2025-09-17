import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbPage, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import ChartPieLabel from '../components/chart-pie-label'
import { ChartAreaGradient } from '../components/chart-area-gradient'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import TableDashboard from '../components/table-dashboard'

function Dashboard() {
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
      <ChartPieLabel/>
      <ChartAreaGradient/>
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