import { getOneById } from '@/fetchData';
import type { Recipe } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function SingleRecipePage() {
  const { query } = useRouter();
  const receipeId = (query?.id as string) || '';

  const { data } = useQuery(['recipe'], () => getOneById(receipeId));

  return (
		<div>
			{data && (
				<span>{`Recipe name: ${data.name}`}</span>
			)}
		</div>
	);
}
