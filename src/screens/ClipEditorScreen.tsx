import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface ClipEditorScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ClipEditorScreen: React.FC<ClipEditorScreenProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(14.8);
  const totalDuration = 48.0;
  const [activeAspect, setActiveAspect] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [captionStyle, setCaptionStyle] = useState<'hormozi' | 'clean' | 'cinema'>('hormozi');
  const [autoReframe, setAutoReframe] = useState(true);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(46);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Editor Bar */}
      <header className="h-14 bg-slate-900/90 border-b border-slate-800/80 px-4 flex items-center justify-between z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('suggestions')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Clips</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white tracking-tight">Clip #1: The AI Content Shift</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              98% Retention
            </span>
          </div>
        </div>

        {/* Center Aspect Ratio Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveAspect('9:16')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
              activeAspect === '9:16' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">stay_current_portrait</span>
            9:16 Vertical
          </button>
          <button
            onClick={() => setActiveAspect('16:9')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
              activeAspect === '16:9' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">tv</span>
            16:9 Landscape
          </button>
          <button
            onClick={() => setActiveAspect('1:1')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
              activeAspect === '1:1' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">crop_square</span>
            1:1 Square
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('repurpose')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            Repurpose
          </button>
          <button
            onClick={() => onNavigate('export')}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Clip
          </button>
        </div>
      </header>

      {/* Main Workspace (Preview + Right Inspector) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Video Canvas Area */}
        <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-6 relative">
          {/* Aspect-Ratio Video Container */}
          <div
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300 flex items-center justify-center ${
              activeAspect === '9:16'
                ? 'w-[290px] h-[516px] max-h-[70vh]'
                : activeAspect === '1:1'
                ? 'w-[440px] h-[440px] max-h-[65vh]'
                : 'w-[680px] h-[382px] max-w-[90%]'
            }`}
          >
            {/* Background Studio Visual */}
            <img
              src={IMAGES.podcastStudio}
              alt="Video Preview"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Smart Face Crop Tracker Box (Simulated AI Face Reframe) */}
            {autoReframe && (
              <div className="absolute top-[20%] left-[22%] w-[56%] h-[48%] border-2 border-dashed border-indigo-400/80 rounded-xl pointer-events-none animate-pulse">
                <span className="absolute -top-5 left-2 px-1.5 py-0.5 rounded bg-indigo-600 text-[9px] font-black uppercase tracking-wider text-white">
                  Speaker Tracking (Active)
                </span>
              </div>
            )}

            {/* Kinetic Caption Overlay */}
            <div className="absolute bottom-16 left-4 right-4 text-center pointer-events-none">
              {captionStyle === 'hormozi' && (
                <div className="inline-block px-3 py-1.5 bg-yellow-400 text-black font-black uppercase text-base tracking-wider rounded-lg shadow-2xl transform -rotate-1 scale-105 border-2 border-black">
                  🔥 DON'T JUST REPURPOSE
                </div>
              )}
              {captionStyle === 'clean' && (
                <div className="inline-block px-4 py-1.5 bg-black/80 backdrop-blur-md text-white font-bold text-sm rounded-full border border-white/20">
                  You have to adapt for each audience...
                </div>
              )}
              {captionStyle === 'cinema' && (
                <div className="inline-block font-serif italic text-white text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  "The autonomous content frontier is here."
                </div>
              )}
            </div>

            {/* Center Play/Pause Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl ml-1">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </div>
            </button>

            {/* Timestamp Badge */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-white/90 border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              00:{Math.floor(currentTime).toString().padStart(2, '0')}:12
            </div>
          </div>

          {/* Quick Playback Bar under Preview */}
          <div className="w-full max-w-2xl mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                className="hover:text-white transition-colors"
                title="Back 5s"
              >
                <span className="material-symbols-outlined text-lg">replay_5</span>
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button
                onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 5))}
                className="hover:text-white transition-colors"
                title="Forward 5s"
              >
                <span className="material-symbols-outlined text-lg">forward_5</span>
              </button>
              <span className="font-mono text-slate-300">
                00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:46
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoReframe(!autoReframe)}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                  autoReframe
                    ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">center_focus_strong</span>
                AI Face Track
              </button>
              <span className="text-[11px] text-slate-500 font-mono">1080x1920 (60fps)</span>
            </div>
          </div>
        </div>

        {/* Right Inspector & Settings Sidebar */}
        <aside className="w-80 bg-slate-900 border-l border-slate-800/80 p-5 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-indigo-400">tune</span>
                Editing Parameters
              </h2>

              {/* Dynamic Captions Section */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Kinetic Subtitle Style</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCaptionStyle('hormozi')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      captionStyle === 'hormozi'
                        ? 'border-indigo-500 bg-indigo-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs block font-black text-yellow-400">PUNCHY</span>
                    <span className="text-[9px] text-slate-400">Hormozi Style</span>
                  </button>
                  <button
                    onClick={() => setCaptionStyle('clean')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      captionStyle === 'clean'
                        ? 'border-indigo-500 bg-indigo-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs block font-bold text-white">Clean</span>
                    <span className="text-[9px] text-slate-400">Subtle Pill</span>
                  </button>
                  <button
                    onClick={() => setCaptionStyle('cinema')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      captionStyle === 'cinema'
                        ? 'border-indigo-500 bg-indigo-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs block font-serif italic text-white">Cinema</span>
                    <span className="text-[9px] text-slate-400">Classic Lower</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Smart B-Roll & Visual Inserts */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">AI B-Roll Insertion</label>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Ready (2 spots)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AI identified 2 conceptual explanations where B-roll visual clips boost retention by 22%.
              </p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={IMAGES.tutorialScreencast}
                      alt="Insert"
                      className="w-10 h-8 rounded object-cover"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">Tech Screencast</span>
                      <span className="text-[10px] text-slate-400 font-mono">00:08 - 00:14</span>
                    </div>
                  </div>
                  <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold">Swap</button>
                </div>
              </div>
            </div>

            {/* Audio Clean-up & Denoise */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Studio Audio Polish</label>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-slate-950 border-slate-800"
                />
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Voice Isolation (Spectral Denoise)</span>
                  <span className="text-indigo-400 font-bold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Loudness Normalization (LUFS -14)</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action in Inspector */}
          <div className="pt-6 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onNavigate('adapt')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              Adapt to All Platforms
            </button>
            <button
              onClick={() => onNavigate('transcript')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Edit Transcript Text
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Timeline Scrubber Area */}
      <footer className="h-32 bg-slate-900 border-t border-slate-800/90 px-6 py-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300">Timeline Trim</span>
            <span className="font-mono text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Start: {trimStart}s | End: {trimEnd}s (Duration: {trimEnd - trimStart}s)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Zoom:</span>
            <input type="range" className="w-24 accent-indigo-500" defaultValue={50} />
          </div>
        </div>

        {/* Audio Waveform & Trimmer Rail */}
        <div className="relative h-14 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center px-4">
          {/* Simulated Waveform Bars */}
          <div className="w-full h-8 flex items-center gap-[2px] opacity-75">
            {Array.from({ length: 90 }).map((_, i) => {
              const heightPercent = 20 + Math.sin(i * 0.3) * 35 + Math.cos(i * 0.15) * 30;
              const isSpike = heightPercent > 70;
              return (
                <div
                  key={i}
                  style={{ height: `${Math.max(10, Math.min(100, heightPercent))}%` }}
                  className={`flex-1 rounded-full transition-all ${
                    isSpike ? 'bg-amber-400' : 'bg-indigo-500/60'
                  }`}
                />
              );
            })}
          </div>

          {/* Active Range Overlay */}
          <div className="absolute inset-y-0 left-[5%] right-[10%] bg-indigo-500/15 border-x-4 border-indigo-500 pointer-events-none flex justify-between items-center px-1">
            <span className="text-[9px] font-mono text-indigo-300 bg-indigo-950 px-1 rounded">IN</span>
            <span className="text-[9px] font-mono text-indigo-300 bg-indigo-950 px-1 rounded">OUT</span>
          </div>

          {/* Scrubber Playhead */}
          <div
            style={{ left: `${(currentTime / totalDuration) * 100}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] z-10 pointer-events-none"
          >
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full -ml-[4px] -top-1 absolute" />
          </div>
        </div>
      </footer>
    </div>
  );
};
