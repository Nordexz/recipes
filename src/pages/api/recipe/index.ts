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

export default async function createReciepe(
  req: NextApiRequestWithRecipeInput,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, description, ingridients } = req.body;

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        ingridients,
      },
    });

    res.send(recipe);
  }
}
