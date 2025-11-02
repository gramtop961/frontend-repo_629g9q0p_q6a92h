import React, { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover.jsx';
import UploadVault from './components/UploadVault.jsx';
import AnalysisVisualizer from './components/AnalysisVisualizer.jsx';
import VerificationReport from './components/VerificationReport.jsx';

function App() {
  const [step, setStep] = useState('hero');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const score = useMemo(() => {
    // Generate a deterministic score per file name for demo feel
    if (!file?.name) return 92;
    const sum = file.name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return 80 + (sum % 20); // 80 - 99
  }, [file]);

  useEffect(() => {
    if (step !== 'analysis') return;

    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 6;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => setStep('report'), 600);
          return 100;
        }
        return next;
      });
    }, 600);

    return () => clearInterval(id);
  }, [step]);

  return (
    <div className="min-h-screen w-full bg-[#000814] text-white">
      {step === 'hero' && (
        <HeroCover onGetStarted={() => setStep('upload')} />
      )}

      {step === 'upload' && (
        <UploadVault
          onBack={() => setStep('hero')}
          onFileSelected={(selected) => {
            setFile(selected);
            setStep('analysis');
          }}
        />
      )}

      {step === 'analysis' && (
        <AnalysisVisualizer progress={progress} />
      )}

      {step === 'report' && (
        <VerificationReport
          onBack={() => setStep('analysis')}
          onRestart={() => {
            setFile(null);
            setProgress(0);
            setStep('hero');
          }}
          fileName={file?.name || 'Document'}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
