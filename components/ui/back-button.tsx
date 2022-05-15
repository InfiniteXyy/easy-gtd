import { useRouter } from 'next/router';

export function BackButton() {
  const router = useRouter();
  return (
    <div className="i-[material-symbols-arrow-back] text-xl" onClick={() => router.push('/')} />
  );
}
