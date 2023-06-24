import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface RecipeInput {
	name: string;
	description: string;
	ingridients: string;
}
  
interface NextApiRequestWithRecipeInput extends NextApiRequest {
	body: RecipeInput;
}

export default async function singleRecipe(
  req: NextApiRequestWithRecipeInput,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    let { id } = req.query;

		if (id && typeof id !== 'string') {
			id = id[0]
		}

		const recipe = await prisma.recipe.delete({
			where: {
				id: id,
			}
		})

		res.send(recipe)
  }

	if (req.method === 'PATCH') {
		let { id } = req.query;

		if (id && typeof id !== 'string') {
			id = id[0]
		}

		const { name, description, ingridients } = req.body;

		const recipe = await prisma.recipe.update({
			where: {
				id: id,
			},
			data: {
				name,
				description,
				ingridients,
			}
		})

		res.send(recipe)
	}

	if (req.method === 'GET') {
		let { id } = req.query;

		if (id && typeof id !== 'string') {
			id = id[0]
		}

		const recipe = await prisma.recipe.findUnique({
			where: {
				id
			}
		})

		res.send(recipe)
	}
}
