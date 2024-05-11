import Image from 'next/image';
import styles from './page.module.css';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <main className="text-4xl">
        Home Page <Button variant="destructive">hoi</Button>
      </main>
    </>
  );
}
