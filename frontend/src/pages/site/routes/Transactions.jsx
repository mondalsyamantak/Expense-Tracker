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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AddTransactions from '../transactionTable/add-transactions';
import { useGlobal } from '@/globalProviders/GlobalContext';

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
  const url = import.meta.env.VITE_BACKEND;
  const [data,setData] = useState(null);
  const {user, setUser} = useGlobal();

  const fetchData = async () => {
    console.log("I AM A FUNCTION")
    const req = await axios.get(`${url}/transaction`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then (res => 
    {
      setData(res.data);
      console.log("transaction data: ",res.data);
      let categories = [];
      for(const entry of res.data){
        const category = entry["expenseType"];
        if (!categories.includes(category)){
          categories.push(category);
        }
      }
      console.log("After saving, categories are: ",categories);

      localStorage.setItem("categories", JSON.stringify(categories));
      setUser({...user, categories: categories});
      console.log("categories redone: ", user.categories);
    })
    .catch (err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (data == null) {
    return (
      <div>Loading</div>
    )
  }
  
  return (
    <main className="
    flex-1 
    p-6 space-y-6
    ">

      <div className="
      w-full 
      flex flex-col flex-nowrap 
      gap-6
      ">
        <div className='flex md:flex-row flex-col gap-6 w-full'>
        <AddTransactions fetchData={fetchData} className='lg:flex-10 flex-7'/><CategoryManager className='md:flex hidden w-full flex-6'/>
        </div>
        <DataTable columns={columns} className='' data={data} fetchData={fetchData}/>
        <CategoryManager className='flex md:hidden'/>
        
      </div>
    </main>
  )
}

export default Transactions