import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface AIProgressScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AIProgressScreen: React.FC<AIProgressScreenProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState(68);
  const [currentStepIndex, setCurrentStepIndex] = useState(2);

  const steps = [
    { title: 'Whisper Audio Transcription & Alignment', status: 'completed', duration: '12s' },
    { title: 'Acoustic Pitch & Energy Spikes Detection', status: 'completed', duration: '8s' },
    { title: 'Multi-Modal Speaker Isolation & 9:16 Face Reframe', status: 'in-progress', duration: 'Calculating...' },
    { title: 'High-Retention Hook Extraction & Captioning', status: 'pending', duration: '~10s' },
    { title: 'Multi-Channel Social Package Assembly', status: 'pending', duration: '~14s' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-6">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          AI Neural Processing Pipeline
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Transforming Your Media in Real-Time
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Our distributed AI pipeline is transcribing, isolating vocal clarity, tracking facial framing, and generating high-retention social assets.
        </p>
      </div>

      {/* Center Dynamic Progress Visualizer */}
      <div className="max-w-2xl mx-auto w-full my-8 space-y-8">
        {/* Big Circular / Bar Gauge */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                Source Project
              </span>
              <span className="text-base font-bold text-white">
                My AI Podcast - Episode 14 (42:18)
              </span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black font-mono text-indigo-400">
                {progress}%
              </span>
              <span className="text-[11px] text-slate-400 block font-medium">
                Est. time remaining: 18s
              </span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800/80 mb-6">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Pipeline Step Checklist */}
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isDone = idx < currentStepIndex || progress === 100;
              const isCurrent = idx === currentStepIndex && progress < 100;

              return (
                <div
                  key={step.title}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                    isCurrent
                      ? 'bg-indigo-950/40 border-indigo-500/40 text-white'
                      : isDone
                      ? 'bg-slate-950/40 border-slate-800/60 text-slate-300'
                      : 'bg-transparent border-transparent text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                        <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                      </div>
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500 animate-spin">
                        <span className="material-symbols-outlined text-[13px]">refresh</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      </div>
                    )}
                    <span className={`font-semibold ${isCurrent ? 'text-indigo-200 font-bold' : ''}`}>
                      {step.title}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-slate-500">
                    {isDone ? 'Completed' : step.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Preview Monitor Thumbnail */}
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.podcastStudio}
              alt="Live Processing"
              className="w-16 h-12 rounded-lg object-cover border border-slate-700"
            />
            <div>
              <span className="text-xs font-bold text-white block">Active Neural Node #04</span>
              <span className="text-[11px] text-slate-400 font-mono">Frame 18,420 / 76,140</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Run in Background
            </button>
            <button
              onClick={() => onNavigate('suggestions')}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
            >
              <span>View Results Now</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500">
        CreatorAi Distributed Engine • Powered by High-Throughput Media Models
      </div>
    </div>
  );
};
