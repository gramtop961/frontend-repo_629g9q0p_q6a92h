import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, ShieldCheck } from 'lucide-react';

const HeroCover = ({ onStartVerify }) => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-[#000814] text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/vi0ijCQQJTRFc8LA/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Top gradient glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#000814]/40 via-[#000814]/60 to-[#000814]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-xs tracking-wider text-teal-200 backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
          Digital Trust Universe
        </div>

        <h1 className="font-orbitron text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
          Certify: AI x Blockchain Verification
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-teal-100/90 md:text-base">
          Step into a cyber‑lab aesthetic where documents are scanned, analyzed, and secured on-chain.
        </p>

        <div className="mt-10">
          <button
            onClick={onStartVerify}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#00FFE0] to-[#6BE4FF] px-7 py-3 text-[#001219] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 -z-[1] animate-pulse bg-white/20 blur-2xl" />
            <Rocket className="h-5 w-5" />
            <span className="font-semibold">Verify a Document</span>
          </button>
          <div className="mt-3 text-xs text-teal-100/70">
            Neon HUD, holographic motion, and precision engineering vibes.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
