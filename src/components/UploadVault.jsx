import React, { useRef, useState } from 'react';
import { Upload, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadVault = ({ onBack, onFileSelected }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    setFileName(file.name);
    onFileSelected(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#000814] text-white">
      <div className="mx-auto max-w-5xl px-6 pt-24">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Lock className="h-3.5 w-3.5 text-[#00FFE0]" />
            End-to-end secured
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-10 backdrop-blur-lg`}
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-10 transition ${
              isDragging ? 'border-[#00FFE0]/70 bg-[#00FFE0]/5' : 'border-white/10 bg-black/10'
            }`}
            onClick={() => inputRef.current?.click()}
          >
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 rounded-xl bg-[#00FFE0]/10"
                />
              )}
            </AnimatePresence>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <Upload className="h-7 w-7 text-[#00FFE0]" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Drag and drop your file here</p>
              <p className="text-sm text-white/60">PDF, PNG, JPG, DOCX up to 25MB</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            />
            {fileName && (
              <p className="mt-2 text-sm text-white/70">Selected: {fileName}</p>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-md bg-[#00FFE0] px-5 py-2.5 font-medium text-[#001219] hover:brightness-110"
            >
              Choose File
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadVault;
