import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex justify-around">
      <Link href={'/dochazka'}>
        <PrimaryButton onClick={() => {}}>
          <p>Docházka</p>
        </PrimaryButton>
      </Link>

      <PrimaryButton disabled onClick={() => {}}>
        <p>Knihovna</p>
      </PrimaryButton>

      <PrimaryButton disabled onClick={() => {}}>
        <p>Inventura</p>
      </PrimaryButton>

      <PrimaryButton disabled onClick={() => {}}>
        <p>Matrika</p>
      </PrimaryButton>

      <PrimaryButton disabled onClick={() => {}}>
        <p>Online Žákovská</p>
      </PrimaryButton>

      <PrimaryButton disabled onClick={() => {}}>
        <p>Vysvědčení</p>
      </PrimaryButton>
    </div>
  );
}
