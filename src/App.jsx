import React, { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover.jsx';
import UploadVault from './components/UploadVault.jsx';
import AnalysisVisualizer from './components/AnalysisVisualizer.jsx';
import VerificationReport from './components/VerificationReport.jsx';

// Simple error boundary to avoid blank screen on runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#000814] text-white flex items-center justify-center p-6">
          <div className="max-w-lg text-center">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-white/70">The interface hit an unexpected error. Try reloading or going back to start.</p>
            <button
              className="mt-6 rounded-md bg-[#00FFE0] px-4 py-2 font-medium text-[#001219] hover:brightness-110"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [step, setStep] = useState('hero');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const score = useMemo(() => {
    if (!file?.name) return 92;
    const sum = file.name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return 80 + (sum % 20);
  }, [file]);

  useEffect(() => {
    if (step !== 'analysis') return;

    setProgress(0);
    let cancelled = false;
    const id = setInterval(() => {
      if (cancelled) return;
      setProgress((p) => {
        const next = p + Math.random() * 12 + 6;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => !cancelled && setStep('report'), 600);
          return 100;
        }
        return next;
      });
    }, 600);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [step]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
