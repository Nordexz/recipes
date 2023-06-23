import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecipesFromServer, removeRecipe } from "@/fetchData";
import { useQuery } from "@tanstack/react-query";

export default function RecipesPage(id: string) {
  const { data } = useQuery(['recipes'], getRecipesFromServer)

  const handleRemoveRecipe = async (id: string): Promise<void> => {
    try {
      await removeRecipe(id);
      // Handle completion
    } catch (error) {
      // Handle error
    }
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
            <Button>Add</Button>
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
          {/* <Button onClick={() => {removeRecipe(recipe.id)}}>X</Button> */}

          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>

    
    </>  
  )
}
