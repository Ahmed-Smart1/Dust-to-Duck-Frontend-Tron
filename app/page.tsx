import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/pageComponent'), { ssr: false });

export default function Home() {
  return <HomePage />;
}
