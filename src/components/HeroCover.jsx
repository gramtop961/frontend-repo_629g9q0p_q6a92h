import React from 'react';
import Spline from '@splinetool/react-spline';
import { Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroCover = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#000814] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/UZwPzv3lU6s76Zx5/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#000814]/60 via-[#000814]/70 to-[#000814]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
        >
          <Sparkles className="h-4 w-4 text-[#00FFE0]" />
          <span className="text-sm tracking-wide text-white/80">AI + Blockchain Verification</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-semibold leading-tight"
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl">Digital Trust Universe</span>
          <span className="mt-2 block bg-gradient-to-r from-[#00FFE0] via-[#8A2BE2] to-[#FFD166] bg-clip-text text-2xl text-transparent sm:text-3xl">
            Real-time authenticity scoring for your documents
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-2xl text-white/70"
        >
          Upload files and watch our AI perform provenance checks, tamper detection, and blockchain anchoring — all visualized in an immersive flow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <button
            type="button"
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 rounded-lg bg-[#00FFE0] px-6 py-3 font-medium text-[#001219] transition hover:brightness-110"
          >
            <Shield className="h-5 w-5" />
            Verify a Document
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCover;
