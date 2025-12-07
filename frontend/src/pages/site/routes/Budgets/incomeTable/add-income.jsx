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

  const handleAddIncome = async (e) => {
    // Logic to add a new transaction
    e.preventDefault();
    console.log(localStorage)
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    formDataObj.amount = Number(formDataObj.amount);
    const req = await axios(`${url}/income`,  {
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
            onSubmit={handleAddIncome}
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

                  <Label htmlFor="type">Recurring Type:</Label>
                  <Select name="recurringType" id="recurringType" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">single</SelectItem>
                      <SelectItem value="Weekly">weekly</SelectItem>
                      <SelectItem value="Monthly">monthly</SelectItem>
                      <SelectItem value="Yearly">yearly</SelectItem>
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

