"use client"




import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown, Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { 
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem,

} from "@/components/ui/select"
import { useGlobal } from "@/globalProviders/GlobalContext"
import { toast } from "sonner"
import axios from "axios"

export const columns = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return (
        <div className="font-medium">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Method",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description")
      return <div className="max-w-sm truncate">{description}</div>
    },
  },
  {
    accessorKey: "expenseType",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  {
    id: "edit",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(payment.id)}
        //     >
        //       Copy payment ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>View customer</DropdownMenuItem>
        //     <DropdownMenuItem>View payment details</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <EditTransaction values={payment}/>
      )
    },
  },
  
]

function EditTransaction({values}) {

  const {register, handleSubmit, control} = useForm({
    defaultValues: {
      "type": values.type,
      "expenseType": values.expenseType
    }
  });
  const {user, setUser} = useGlobal();
  const url = import.meta.env.VITE_BACKEND;

  const handleEdit = async (e) => {
    e.transactionID=values.transactionID;
    console.log(e);

    const req = await axios(`${url}/updateTransaction`,  {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: e
    })
    .then ((res) => { 
      console.log(res);
      // fetchData();
      toast.success("Edited transaction successfully");
    })
    .catch((err) => console.log(err));
    // toast.success("Edited transaction successfully");
  }
  return (
    <Dialog>
      <form 
      onSubmit={handleSubmit(handleEdit)}
      id="editTransactionForm"
      >
        <DialogTrigger asChild>
          <Button variant="ghost"><Pencil/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Amount (in rupees)</Label>
              <Input id="name-1" defaultValue={values.amount} {...register("amount")} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Short Note</Label>
              <Input id="username-1" defaultValue={values.description} {...register("description")} required />
            </div>


            <div className="
                  grid grid-cols-2 grid-rows-2 grid-flow-col 
                  gap-x-3 
                  mb-2
                ">

                  <Label htmlFor="type">Payment method:</Label>
                  {/* <Select id="type" defaultValue={values.type} {...register("type")} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                    </SelectContent>
                  </Select> */}
                  <Controller
                    name="type"
                    control={control}
                    defaultValue={values.type}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Label htmlFor="expenseType">Category</Label>
                  {/* <Select defaultValue={values.expenseType} {...register("expenseType")} id="expenseType" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      { (user.categories != []) ?
                          user.categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))
                        :
                        <div>No category available</div>
                      }
                    </SelectContent>
                  </Select> */}
                  <Controller
                    name="expenseType"
                    control={control}
                    defaultValue={values.expenseType}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        { (user.categories != []) ?
                            user.categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))
                          :
                          <div>No category available</div>
                        }
                      </SelectContent>
                    </Select>
                    )}
                    />


                </div>


          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button
              type="submit"
              form="editTransactionForm" 
            >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}



