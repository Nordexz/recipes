import { buttonVariants } from '@/components/ui/button';
import { getOneById } from '@/fetchData';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SingleRecipePage() {
  const { query } = useRouter();
  const receipeId = (query?.id as string) || '';

	const { data } = useQuery(['recipe', receipeId], () => getOneById(receipeId), {
    enabled: !!receipeId,
  });

  return (
		<div className="bg-gray-300 py-10 px-6 h-screen">
			<Link
				className={`${buttonVariants({ variant: "destructive" })} fixed left-3 top-3`}
				href="/recipes"
			>
				Back to list
			</Link>
	
			<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
				{data && (
					<>
						<h2 className="text-3xl font-bold mb-6">{data.name}</h2>
						<p className="text-gray-600 mb-6">{data.description}</p>
						<h3 className="text-xl font-bold mb-4">Ingredients:</h3>
						<p className="list-disc mb-6">{data.ingridients}</p>
					</>
				)}
				
			</div>
		</div>
	);
	
}
