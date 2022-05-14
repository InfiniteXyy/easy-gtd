import { useRouter } from 'next/router';

export function BackButton() {
  const router = useRouter();
  return <div className="i-[akar-icons-arrow-back] text-xl" onClick={router.back} />;
}
