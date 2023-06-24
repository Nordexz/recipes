import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRecipesFromServer, patchRecipe, postRecipe, removeRecipe } from '@/fetchData';
import type { recipeBody } from '@/fetchData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function RecipesPage() {
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputIngridients, setInputIngridients] = useState('');

  const { data } = useQuery(['recipes'], getRecipesFromServer);

  const queryClient = useQueryClient();

  const { mutate: deleteRecipe } = useMutation(removeRecipe, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['recipes']);
    },
  });

  const { mutate: addRecipe } = useMutation(postRecipe, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['recipes']);
    },
  });

  const { mutate: updateRecipe } = useMutation(patchRecipe, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['recipes']);
    },
  })

  const clearInputs = () => {
    setInputName('');
    setInputDescription('');
    setInputIngridients('');
  };

  const handleOnEdit = (name: string, desc: string, ingr: string) => {
    setInputName(name);
    setInputDescription(desc);
    setInputIngridients(ingr);
  };

  const handlePostRecipe = () => {
    void addRecipe({
      name: inputName,
      description: inputDescription,
      ingridients: inputIngridients
    });

    clearInputs();
  };

  const handlePatchRecipe = ({ 
    id,
    name,
    description,
    ingridients
  }: recipeBody) => {
    console.log(id,name,description,ingridients)
    void updateRecipe({ 
      id,
      name,
      description,
      ingridients
    });

    clearInputs();
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
                  <Button
                    variant="outline"
                    onClick={clearInputs}
                    className="mr bg-green-500 text-white"
                  >
                    Add
                  </Button>
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
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
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
                        value={inputDescription}
                        onChange={(e) => setInputDescription(e.target.value)}
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
                        value={inputIngridients}
                        onChange={(e) => setInputIngridients(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogTrigger>
                      <Button type="submit" onClick={handlePostRecipe}>
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
          {data &&
            data.map(({id, name, description, ingridients}) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>
                  <Link href={`/recipe/${id}`} className='hover:text-blue-600'>
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{ingridients}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() =>
                          handleOnEdit(
                            name,
                            description,
                            ingridients
                          )
                        }
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Recipe editor</DialogTitle>
                        <DialogDescription>
                          Use this form to edit recipe
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
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
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
                            value={inputDescription}
                            onChange={(e) => setInputDescription(e.target.value)}
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
                            value={inputIngridients}
                            onChange={(e) => setInputIngridients(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogTrigger>
                          <Button
                            type="submit"
                            onClick={() => {
                              handlePatchRecipe({
                                id,
                                name: inputName,
                                description: inputDescription,
                                ingridients: inputIngridients,
                              })
                            }}
                          >
                            Update
                          </Button>
                        </DialogTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => {
                      void deleteRecipe(id);
                    }}
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
