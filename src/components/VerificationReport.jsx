import React from 'react';
import { ShieldCheck, Activity, FileSearch, Lock, Chain } from 'lucide-react';
import { motion } from 'framer-motion';

const Ring = ({ size = 180, stroke = 12, value = 80, color = '#00FFE0' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="drop-shadow-[0_0_20px_rgba(0,255,224,0.25)]">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#0b1b25" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  );
};

const VerificationReport = ({ score = 92, factors = {} }) => {
  const items = [
    { icon: FileSearch, label: 'Metadata', value: factors.metadata ?? 88, color: '#00FFE0' },
    { icon: Lock, label: 'Signature', value: factors.signature ?? 95, color: '#FFD166' },
    { icon: Activity, label: 'Visual', value: factors.visual ?? 86, color: '#8A2BE2' },
    { icon: Chain, label: 'Blockchain', value: factors.blockchain ?? 99, color: '#00FFA3' },
  ];

  return (
    <section className="relative w-full bg-[#000814] py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(138,43,226,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <Ring size={220} stroke={14} value={score} color="#00FFE0" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-sm uppercase tracking-[0.2em] text-teal-200/80">Authenticity</div>
                  <div className="font-orbitron text-5xl font-extrabold text-white">{score}%</div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-xs text-teal-100">
                    <ShieldCheck className="h-3.5 w-3.5 text-teal-300" /> Verified
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-orbitron text-2xl font-bold text-teal-200">Verification Breakdown</h3>
            <p className="mt-2 text-sm text-teal-100/80">
              Tap a factor to reveal granular details. Rings pulse to highlight any risk segments.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {items.map(({ icon: Icon, label, value, color }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" style={{ color }} />
                    <div>
                      <div className="text-sm text-white">{label}</div>
                      <div className="text-xs text-teal-200/70">Score</div>
                    </div>
                  </div>
                  <div className="font-orbitron text-xl" style={{ color }}>
                    {value}%
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
              <div className="text-xs uppercase tracking-widest text-emerald-200/80">Blockchain Proof</div>
              <div className="mt-1 text-sm">Hash anchored on-chain. A proof card with a transaction link seals the block.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationReport;
