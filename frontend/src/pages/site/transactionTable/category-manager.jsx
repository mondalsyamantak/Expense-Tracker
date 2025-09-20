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
import { useGlobal } from '@/globalProviders/GlobalContext';

function CategoryManager({...props}) {
  const [categories, setCategories] = useState([]);
  const {user, setUser} = useGlobal();

  useEffect(() => {
    console.log(localStorage);
    setCategories(localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []);
  }, [])

  const handleAddCategory = (e) => {
    e.preventDefault();

    const category = new FormData(e.target).get('new-category-input').trim();

    if (!category) return;
    
    console.log("reached")
    if (!categories.includes(category)) {
      const newCategories = [...categories, category];
      setCategories(newCategories);
      setUser({...user, categories: newCategories});
      localStorage.setItem('categories', JSON.stringify(newCategories));
      e.target.reset();
    }
  }
  


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
            { (categories.length != 0) ? 
              categories.map((category)=>(
                <TableRow key={categories.indexOf(category)}>
                  <TableCell className="font-medium text-center">{category}</TableCell>     
                </TableRow>
              )) :
              <div className='w-full text-center p-4'>No results.</div>
          }
          </TableBody>
          
        </Table>
        </div>
      </CardContent>
      <CardFooter>
        <form 
        onSubmit={handleAddCategory} className='flex w-full justify-end'>
          <Input placeholder=' Add new category'
          id='new-category-input' 
          name='new-category-input'
          className='mr-2'/>
          <Button type="submit" ><Plus/>Add</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default CategoryManager