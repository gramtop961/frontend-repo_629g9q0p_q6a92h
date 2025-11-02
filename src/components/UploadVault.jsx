import React, { useRef, useState } from 'react';
import { UploadCloud, Lock, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadVault = ({ onFileSelected }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const handleFiles = (files) => {
    if (!files || !files.length) return;
    const file = files[0];
    setSelectedName(file.name);
    // small delay to show animation before passing file up
    setTimeout(() => onFileSelected(file), 600);
  };

  return (
    <section className="relative w-full bg-[#000814] py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,224,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <h2 className="font-orbitron text-3xl font-bold text-teal-200 md:text-4xl">
          Upload to the Vault
        </h2>
        <p className="mt-2 text-sm text-teal-100/80">
          Drag & drop into the rotating vault door. Your file is scanned with a neon sweep.
        </p>

        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`mt-8 grid place-items-center rounded-2xl border bg-white/5 p-10 backdrop-blur-md transition ${
            isDragging ? 'border-teal-300/60' : 'border-white/10'
          }`}
        >
          <div className="flex w-full max-w-xl flex-col items-center gap-6">
            <motion.div
              animate={{ rotate: isDragging ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
              className="relative grid h-40 w-40 place-items-center rounded-full border border-teal-300/40 bg-gradient-to-b from-[#05111a] to-[#041019] shadow-[0_0_60px_-20px_#00FFE0]"
            >
              <div className="absolute inset-2 rounded-full border border-teal-300/20" />
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 40px rgba(0,255,224,0.15)' }} />
              <Lock className="h-8 w-8 text-teal-200" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(0,255,224,0.0), rgba(0,255,224,0.35), rgba(0,255,224,0.0) 25%)',
                  WebkitMask: 'radial-gradient(circle, transparent 58%, black 59%)',
                  mask: 'radial-gradient(circle, transparent 58%, black 59%)',
                }}
              />
            </motion.div>

            <div className="text-center">
              <button
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-3 text-sm text-teal-50 transition hover:bg-teal-300/20"
              >
                <UploadCloud className="h-4 w-4" /> Choose a file to verify
              </button>
              <input
                ref={inputRef}
                type="file"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
              <p className="mt-3 text-xs text-teal-200/70">PDF, DOCX, PNG, JPG up to 25MB</p>
            </div>

            <AnimatePresence>
              {selectedName && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-teal-100"
                >
                  <FileText className="h-3.5 w-3.5 text-teal-300" /> {selectedName}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadVault;
