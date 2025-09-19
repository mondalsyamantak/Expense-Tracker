import React from 'react'
import { DataTable } from '../transactionTable/data-table'
import {columns} from '../transactionTable/columns'

export const payments= [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]

function Transactions() {
  return (
    <main className="
    flex-1 
    p-6 space-y-6
    ">
      <div className="
      w-full 
      flex lg:flex-row flex-col flex-nowrap 
      gap-6">
        <DataTable columns={columns} data={payments}/>
      </div>
    </main>
  )
}

export default Transactions