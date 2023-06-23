import type { Recipe } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const recipes: Recipe[] = await prisma.recipe.findMany();

    res.send(recipes);
  }
}
