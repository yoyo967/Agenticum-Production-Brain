import './console-fallback.ts';
import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  state = { error: null };

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("AppErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#0b0c10] text-[#c5cbd3] flex flex-col items-center justify-center p-8 font-mono">
          <div className="border border-[#ff0055]/30 bg-[#ff0055]/5 p-8 rounded-xl max-w-2xl w-full flex flex-col gap-4 text-left">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff0055] animate-pulse"></span>
              Agenticum Preview Error
            </h1>
            <p className="text-sm text-slate-400">
              The preview has encountered a runtime React exception. Detailed logs have been written to the console.
            </p>
            <div className="bg-[#0b0c10] p-4 rounded border border-[#ff0055]/20 text-xs text-[#ff0055] overflow-auto max-h-60">
              <pre className="whitespace-pre-wrap">{String(this.state.error)}</pre>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-[#ff0055] hover:bg-[#ff0055]/80 text-white font-bold rounded text-xs transition-colors cursor-pointer self-start"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </StrictMode>,
  );
} else {
  console.error("Fatal Error: Root container element '#root' not found in DOM!");
  const fallback = document.createElement('div');
  fallback.style.position = 'fixed';
  fallback.style.inset = '0';
  fallback.style.backgroundColor = '#0b0c10';
  fallback.style.color = '#ff0055';
  fallback.style.fontFamily = 'monospace';
  fallback.style.padding = '2rem';
  fallback.style.display = 'flex';
  fallback.style.alignItems = 'center';
  fallback.style.justifyContent = 'center';
  fallback.innerHTML = '<h1>Fatal Error: Root container element not found!</h1>';
  document.body.appendChild(fallback);
}
