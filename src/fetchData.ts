import type { Recipe } from '@prisma/client';

export interface recipeBody {
	id: string
	name: string;
	description: string;
	ingridients: string;
}

export async function getRecipesFromServer() {
  const data: Response = await fetch('http://localhost:3000/api/recipes');
  const recipes = (await data.json()) as Recipe[];

  return recipes;
}

export const removeRecipe = async (id: string): Promise<void> => {
	try {
		await fetch(`http://localhost:3000/api/recipe/${id}`, {
		method: 'DELETE',
	});
	} catch(e) {
		throw new Error('Somthing went wrong');
	}
};

export const postRecipe = async ({ name, description, ingridients }: Omit<recipeBody, "id">): Promise<void> => {
	try {
		await fetch('http://localhost:3000/api/recipe', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({name, description, ingridients})
		})
	} catch(e) {
		throw new Error('Occures error while adding recipe')
	}
};

export const patchRecipe = async ({ id, name, description, ingridients }: recipeBody) => {
	try {
		await fetch(`http://localhost:3000/api/recipe/${id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({name, description, ingridients}),
		})
	} catch (e) {
		throw new Error('Cannot update recipe')
	}
};