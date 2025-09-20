import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function CategoryManager({...props}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(localStorage);
    setCategories(localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []);
  }, [])

  


  return (
    
    <Card {...props} >
      {console.log(categories)}
      <CardHeader>
        <CardTitle>Category Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='border rounded-2xl overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold text-center">Categories</TableHead>      
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category)=>(
              <TableRow key={categories.indexOf(category)}>
                <TableCell className="font-medium text-center">{category}</TableCell>     
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
        </div>
      </CardContent>
      <CardFooter className={'flex justify-end gap-3'}>
        <Input placeholder='New Category' value="this part doesnt work yet im working on it" disabled id='new-category-input' className='mr-2'/>
        <Button><Plus/>Add</Button>
      </CardFooter>
    </Card>
  )
}

export default CategoryManager