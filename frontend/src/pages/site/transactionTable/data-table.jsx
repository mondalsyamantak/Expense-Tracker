"use client"

import * as React from "react"

import {
//   ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { useNavigate } from "react-router"
import { useGlobal } from "@/globalProviders/GlobalContext"

export function DataTable({
  columns,
  fetchData,
  data,
  ...props
  // data,
}) {

  const url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const {user, setUser} = useGlobal();

  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])

  

  const handleAddTransaction = async (e) => {
    // Logic to add a new transaction
    e.preventDefault();
    console.log(localStorage)
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    formDataObj.amount = Number(formDataObj.amount);
    const req = await axios(`${url}/transaction`,  {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formDataObj
    })
    .then ((res) => { 
      console.log(res);
      fetchData();
    })
    .catch((err) => console.log(err));
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    
  })


  React.useEffect(() => {
    console.log(data);
    if (typeof fetchData == "function") {
      fetchData();
      
    }
  }, [])

  if (data == null) {
    return (
      <Card className="w-full p-6 gap-0 py-8">
      <div className="flex items-center justify-center gap-2">
        <p>Fetching data</p>
        <RefreshCw className="animate-spin cursor-pointer" size={20}/>
      </div>
      </Card>
    )
  }

  return (
    <Card {...props} className="p-6 gap-0 py-8" >
      <div className="flex items-center ">
        <h2 className="mx-2 mr-auto text-xl font-semibold">Transactions Table</h2>
        {/* <Button className='ml-auto'><Plus/>Add Transaction Data</Button> */}
        <Dialog>
            <DialogTrigger asChild>
              <Button><Plus/>Add Transaction Data</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
            <form 
            onSubmit={handleAddTransaction}
            className="m-0 p-0 flex flex-col gap-4"
            >
              <DialogHeader>
                <DialogTitle>Add Transaction Data</DialogTitle>
                <DialogDescription>
                  Fill in the requirements to add new transaction data into the table
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="amount">Amount (in rupees)</Label>
                  <Input id="amount" name="amount" type='number' required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Short Note:</Label>
                  <Input id="description" name="description" required />
                </div>
                <div className="
                  grid grid-cols-2 grid-rows-2 grid-flow-col 
                  gap-x-3 
                ">

                  <Label htmlFor="type">Payment method:</Label>
                  <Select name="type" id="type" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label htmlFor="expenseType">Category</Label>
                  <Select name="expenseType" id="expenseType" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="category1">Sample Category 1</SelectItem>
                      <SelectItem value="category2 ">Sample Category 2</SelectItem>
                      <SelectItem value="category3">Sample Category 3</SelectItem> */}
                      { (user.categories != []) ?
                          user.categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))
                        :
                        <div>No category available</div>
                      }
                    </SelectContent>
                  </Select>

                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                  <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center py-4 ">
        <Input
            placeholder="Filter categories..."
            value={(table.getColumn("expenseType")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("expenseType")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            //will add fuzzy search later
          />
          

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onSelect = {(e) => e.preventDefault()}
                      onCheckedChange={(value) => {
                          column.toggleVisibility(!!value)
                        }
                      }

                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}