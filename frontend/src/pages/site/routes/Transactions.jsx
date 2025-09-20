import React, { useState,useEffect } from 'react'
import { DataTable } from '../transactionTable/data-table'
import {columns} from '../transactionTable/columns'
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryManager from '../transactionTable/category-manager';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { GripVertical } from 'lucide-react';

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
      gap-6
      ">
        {/* <DataTable columns={columns} className=''/>
        <CategoryManager className='flex-2 w-full'/> */}
        <ResizablePanelGroup direction="horizontal" className="h-full gap-5">
          <ResizablePanel defaultSize={80}>
            <DataTable columns={columns}/>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-primary"/>
          <ResizablePanel>
            <CategoryManager defaultSize={20} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  )
}

export default Transactions