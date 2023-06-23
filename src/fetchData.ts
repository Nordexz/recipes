import type { Recipe } from '@prisma/client';

export async function getRecipesFromServer() {
  const data: Response = await fetch('http://localhost:3000/api/recipes');
  const recipes = (await data.json()) as Recipe[];

  return recipes;
}

export const removeRecipe = async (id: string) => {
  try {
		await fetch(`http://localhost:3000/api/recipe/${id}`, {
    method: 'DELETE',
  });
	} catch(e) {
		throw new Error();
	}
};
