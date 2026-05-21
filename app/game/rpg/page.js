'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Dynamically import PixelRPG with SSR disabled to prevent server rendering conflicts with Canvas & Audio contexts
const PixelRPG = dynamic(() => import('@/components/game/PixelRPG'), {
  ssr: false,
});

export default function RPGPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col">
      <Suspense fallback={
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen text-white/30 font-orbitron gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--neon-cyan)]" />
          <p className="text-xs uppercase tracking-widest font-black">Initializing 2D Cyber World...</p>
        </div>
      }>
        <PixelRPG onBack={() => router.push('/game')} />
      </Suspense>
    </div>
  );
}
