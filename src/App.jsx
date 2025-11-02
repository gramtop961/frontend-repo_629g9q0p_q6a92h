import React, { useEffect, useState } from 'react';
import HeroCover from './components/HeroCover';
import UploadVault from './components/UploadVault';
import AnalysisVisualizer from './components/AnalysisVisualizer';
import VerificationReport from './components/VerificationReport';

function App() {
  const [step, setStep] = useState('home'); // home | upload | analysis | report
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(92);
  const [factors, setFactors] = useState({});

  const startVerify = () => setStep('upload');

  const handleFileSelected = (f) => {
    setFile(f);
    setStep('analysis');
    setProgress(0);
  };

  // simulate analysis progression
  useEffect(() => {
    if (step !== 'analysis') return;
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.floor(Math.random() * 12) + 6);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        const newScore = 84 + Math.floor(Math.random() * 14); // 84-97
        setScore(newScore);
        setFactors({
          metadata: 82 + Math.floor(Math.random() * 15),
          signature: 90 + Math.floor(Math.random() * 9),
          visual: 78 + Math.floor(Math.random() * 18),
          blockchain: 98,
        });
        setTimeout(() => setStep('report'), 600);
      }
    }, 500);
    return () => clearInterval(id);
  }, [step]);

  return (
    <div className="min-h-screen w-full bg-[#000814] text-white">
      {step === 'home' && <HeroCover onStartVerify={startVerify} />}
      {step === 'upload' && <UploadVault onFileSelected={handleFileSelected} />}
      {step === 'analysis' && <AnalysisVisualizer progress={progress} />}
      {step === 'report' && <VerificationReport score={score} factors={factors} />}

      <footer className="relative border-t border-white/5 bg-[#000a13] py-6 text-center text-xs text-teal-200/60">
        <div className="mx-auto max-w-6xl px-6">
          <span className="font-orbitron tracking-widest text-teal-200/80">CERTIFY</span> · Digital Trust Universe · Neon teal · Cyber gold · Electric purple
        </div>
      </footer>
    </div>
  );
}

export default App;
