import React from 'react';
import { Cpu, ScanLine, Fingerprint, FileCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: ScanLine, label: 'Metadata integrity' },
  { icon: Fingerprint, label: 'Signature & fonts' },
  { icon: Cpu, label: 'AI pattern checks' },
  { icon: FileCheck2, label: 'Visual forgery scan' },
];

const AnalysisVisualizer = ({ progress = 0 }) => {
  const activeIndex = Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length));

  return (
    <section className="relative w-full bg-[#000814] py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,209,102,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <h2 className="font-orbitron text-3xl font-bold text-[#FFD166] md:text-4xl">
          AI Analysis Phase
        </h2>
        <p className="mt-2 text-sm text-teal-100/80">
          Layers peel, neurons light, and each check locks in with a glow.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="mb-4 text-xs uppercase tracking-widest text-teal-200/80">Live checks</div>
            <div className="space-y-3">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = i <= activeIndex;
                return (
                  <div key={s.label} className={`flex items-center justify-between rounded-md border px-3 py-2 ${active ? 'border-teal-300/50 bg-teal-300/10' : 'border-white/10 bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${active ? 'text-teal-300' : 'text-teal-200/60'}`} />
                      <span className={active ? 'text-teal-50' : 'text-teal-100/70'}>{s.label}</span>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${active ? 'bg-teal-300 shadow-[0_0_12px_2px_#00FFE0]' : 'bg-white/20'}`} />
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-teal-100/70">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00FFE0] via-[#6BE4FF] to-[#8A2BE2]"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                />
              </div>
              <div className="mt-4 text-[10px] text-teal-200/70">
                Scan wave emits a blue light sweep as analysis proceeds.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="mb-4 text-xs uppercase tracking-widest text-teal-200/80">Holographic document</div>
            <div className="relative h-64 w-full overflow-hidden rounded-xl border border-teal-300/20 bg-gradient-to-br from-[#04121b] to-[#07141d]">
              {/* layered cards to simulate peel apart */}
              {[0, 1, 2].map((layer) => (
                <motion.div
                  key={layer}
                  className="absolute left-6 top-6 h-40 w-64 rounded-lg border border-white/10 bg-white/10"
                  style={{ backdropFilter: 'blur(2px)' }}
                  animate={{
                    x: [0, layer * 10, 0],
                    y: [0, layer * -6, 0],
                    opacity: [0.6, 1, 0.8],
                  }}
                  transition={{ duration: 3 + layer * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
              {/* neuron pulses */}
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-[#00FFE0]"
                  style={{ left: `${10 + (i * 7) % 80}%`, top: `${20 + (i * 11) % 60}%` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
                  transition={{ duration: 1.8 + (i % 5) * 0.2, repeat: Infinity }}
                />
              ))}
              <div className="absolute bottom-3 right-3 rounded-full border border-teal-300/30 bg-teal-300/10 px-2 py-1 text-[10px] text-teal-100">
                Hologram mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisVisualizer;
