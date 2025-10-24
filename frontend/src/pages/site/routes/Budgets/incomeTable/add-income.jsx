import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem

 } from '@/components/ui/select';
import { useGlobal } from '@/globalProviders/GlobalContext';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
export default function AddIncome({fetchData, ...props}) {

  const {user, setUser} = useGlobal();

  const url = import.meta.env.VITE_BACKEND;

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
      toast.success("Added new transaction data successfully");
    })
    .catch((err) => console.log(err));

    e.target.reset();
  }
  return (
    <Card className={"w-full "} {...props}>

      <CardHeader>
        <CardTitle>Add Transactions</CardTitle>
      </CardHeader>
      <CardContent>
              <Toaster richColors/>
          <form 
            onSubmit={handleAddTransaction}
            className="m-0 p-0 flex flex-col gap-4"
            >
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
                  mb-2
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
                <Button className={'mt-auto'} type="submit">Add Transaction</Button>
              </div>
            </form>  
      </CardContent>
    </Card>
  )
}

