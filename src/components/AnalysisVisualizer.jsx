import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const checks = [
  'Provenance model scan',
  'Metadata integrity check',
  'Visual tamper detection',
  'Hashing & anchoring prep',
  'Blockchain proof lookup',
];

const AnalysisVisualizer = ({ progress = 0 }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#000814] text-white">
      <div className="mx-auto max-w-5xl px-6 pt-24">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold">Analyzing document</h2>
          <p className="text-white/70">This usually takes less than 30 seconds.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
          >
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#8A2BE2]" />
              <h3 className="font-medium">Live checks</h3>
            </div>
            <ul className="space-y-3">
              {checks.map((label, idx) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <div className={`h-2 w-2 rounded-full ${progress > (idx + 1) * 18 ? 'bg-[#00FFE0]' : 'bg-white/30'}`} />
                  <span className={progress > (idx + 1) * 18 ? 'text-white' : 'text-white/70'}>{label}</span>
                  {progress > (idx + 1) * 18 && (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-[#00FFE0]" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#8A2BE2]/10 to-[#00FFE0]/10 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium">Progress</h3>
              <span className="text-sm text-white/70">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#00FFE0] transition-[width] duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="h-28 rounded-xl border border-white/10 bg-white/[0.04]"
                >
                  <div className="h-full w-full animate-pulse rounded-xl bg-gradient-to-br from-white/5 via-white/0 to-white/5" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisVisualizer;
