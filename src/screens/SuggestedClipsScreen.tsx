import React, { useState } from 'react';
import { ScreenId } from '../types';
import { SUGGESTED_CLIPS, IMAGES } from '../data/mockData';

interface SuggestedClipsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SuggestedClipsScreen: React.FC<SuggestedClipsScreenProps> = ({ onNavigate }) => {
  const [clips, setClips] = useState(SUGGESTED_CLIPS);
  const [filter, setFilter] = useState<'all' | 'high' | 'viral'>('all');
  const [selectedClipId, setSelectedClipId] = useState<string>('clip-1');

  const filteredClips = clips.filter(c => {
    const retention = c.retentionScore ?? c.viralScore ?? 90;
    const reach = c.predictedReach ?? c.statusBadge ?? '';
    if (filter === 'high') return retention >= 95;
    if (filter === 'viral') return reach.toLowerCase().includes('viral') || reach.includes('100K+');
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Subheader / Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <button onClick={() => onNavigate('dashboard')} className="hover:text-indigo-600 transition-colors">
                Projects
              </button>
              <span>/</span>
              <button onClick={() => onNavigate('workflow')} className="hover:text-indigo-600 transition-colors">
                My AI Podcast
              </button>
              <span>/</span>
              <span className="text-indigo-600 font-bold">AI Suggested Clips</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Suggested Viral Clips</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                5 Moments Detected
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              AI ranked high-retention segments analyzed from audio pitch spikes, transcript density, and emotional punchlines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'all' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (5)
              </button>
              <button
                onClick={() => setFilter('high')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'high' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Top Retention (95%+)
              </button>
              <button
                onClick={() => setFilter('viral')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'viral' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Viral Projected
              </button>
            </div>

            <button
              onClick={() => onNavigate('clip_editor')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-sm">movie_edit</span>
              Open in Clip Editor
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Source Media Quick Player Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-indigo-500/20">
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0 group">
              <img
                src={IMAGES.podcastStudio}
                alt="Source Podcast"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">mic</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  Full Episode
                </span>
                <span className="text-xs text-slate-400">Duration: 42m 18s</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">My AI Podcast - Ep. 14: The Autonomous Content Frontier</h2>
              <p className="text-xs text-slate-300 line-clamp-1 max-w-xl mt-0.5">
                Host deep dive with Dr. Elena Vance exploring real-time multimodal generative models and audience hooks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('transcript')}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/15 flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">subject</span>
              Interactive Transcript
            </button>
            <button
              onClick={() => onNavigate('ai_progress')}
              className="px-3 py-2 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 rounded-xl text-xs font-semibold border border-indigo-400/30 flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              Re-run AI Analysis
            </button>
          </div>
        </div>

        {/* Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.map((clip, index) => {
            const isSelected = selectedClipId === clip.id;
            return (
              <div
                key={clip.id}
                onClick={() => setSelectedClipId(clip.id)}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src={clip.thumbnail || IMAGES.creatorDynamicClip}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
                      #{index + 1} Best Hook
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-black bg-emerald-500/90 backdrop-blur-md text-white shadow-sm">
                      <span className="material-symbols-outlined text-[13px]">bolt</span>
                      {clip.retentionScore ?? clip.viralScore ?? 92}% Retention
                    </div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 transform group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl ml-0.5">play_arrow</span>
                    </div>
                  </div>

                  {/* Bottom Time Indicators */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs font-mono text-[11px]">
                      {clip.startTime ?? '00:14'} - {clip.endTime ?? '01:00'} ({clip.duration ?? '46s'})
                    </span>
                    <span className="text-[11px] bg-indigo-600/80 px-2 py-0.5 rounded backdrop-blur-xs font-bold">
                      {clip.predictedReach ?? clip.statusBadge ?? 'High Potential'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {clip.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 italic">
                      "{clip.transcriptSnippet ?? clip.hook ?? 'Direct insights from episode'}"
                    </p>

                    {/* AI Viral Reason */}
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                      <span className="material-symbols-outlined text-indigo-600 text-[16px] mt-0.5">psychology</span>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                        <strong className="text-slate-900">Why it works:</strong> {clip.viralReason ?? clip.reason ?? 'High vocal clarity & topic relevance'}
                      </p>
                    </div>

                  {/* Bottom Badges & Aspect Ratio */}
                    {/* Format Target Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {(clip.aspectRatio ?? ['9:16', '1:1']).map((ratio: string) => (
                        <span
                          key={ratio}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100"
                        >
                          {ratio}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {(clip.tags ?? ['#podcast', '#viral']).slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('clip_editor');
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                      Edit Clip
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('adapt');
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                      title="Adapt for social"
                    >
                      <span className="material-symbols-outlined text-[15px]">share</span>
                      Adapt
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('export');
                      }}
                      className="py-2 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs flex items-center transition-colors"
                      title="Download clip"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Recommendation Bar */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">tips_and_updates</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Want higher virality? Try generating custom hooks</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Pair these clips with psychological hook openers to increase the first 3-second retention by up to 34%.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('hooks')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              Open Hook Studio
            </button>
            <button
              onClick={() => onNavigate('captions')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">closed_caption</span>
              Generate Captions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
