import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Button>
          <Link href={'/recipes'}>Recipes page</Link>
        </Button>
      </main>
    </>
  );
}
