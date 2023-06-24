import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecipesFromServer, postRecipe, removeRecipe } from "@/fetchData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function RecipesPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingridients, setIngridients] = useState('')

  const { data } = useQuery(['recipes'], getRecipesFromServer)

  const queryClient = useQueryClient();

  const { mutate: deleteRecipe } = useMutation(removeRecipe, {
    onSuccess: () => {
      void queryClient.invalidateQueries(["recipes"])
    }
  })

  const { mutate: addRecipe } = useMutation(postRecipe, {
    onSuccess: () => {
      void queryClient.invalidateQueries(["recipes"])
    }
  })

  const handlePostRecipe = () => {
    void addRecipe({name, description, ingridients})
  
    setName('')
    setDescription('')
    setIngridients('')
  };

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Uniq ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Ingridients</TableHead>
          <TableHead className="text-right">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add new recipe</DialogTitle>
                  <DialogDescription>
                    You can add new recipe using this form
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input 
                      id="name" 
                      className="col-span-3" 
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input 
                      id="description" 
                      className="col-span-3" 
                      placeholder="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ingridients" className="text-right">
                      Ingridients
                    </Label>
                    <Textarea 
                      id="ingridients" 
                      className="col-span-3 min-h-0" 
                      placeholder="ingridients"
                      value={ingridients}
                      onChange={(e) => setIngridients(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger>
                  <Button 
                    type="submit"
                    onClick={handlePostRecipe}
                  >
                    Add recipe
                  </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {data && data.map(recipe => (
        <TableRow key={recipe.id}>
          <TableCell className="font-medium">{recipe.id}</TableCell>
          <TableCell>{recipe.name}</TableCell>
          <TableCell>{recipe.description}</TableCell>
          <TableCell>{recipe.ingridients}</TableCell>
          <TableCell className="text-right">
            <Button className="mr-2" onClick={() => {
              void deleteRecipe(recipe.id)
            }}>
              Edit
            </Button>
            <Button onClick={() => {
              void deleteRecipe(recipe.id)
            }}>
              X
            </Button>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>    
    </>  
  )
}
