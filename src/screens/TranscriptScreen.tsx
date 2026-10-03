import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface TranscriptScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface TranscriptLine {
  id: string;
  speaker: string;
  time: string;
  seconds: number;
  text: string;
  highlighted?: boolean;
  score?: number;
}

const INITIAL_TRANSCRIPT: TranscriptLine[] = [
  {
    id: 't-1',
    speaker: 'Alex Rivera (Host)',
    time: '00:00',
    seconds: 0,
    text: "Welcome back to CreatorAi podcasts. Today, we're dissecting the inflection point every single content creator faces: autonomous repurposing versus human narrative nuance.",
    score: 88,
  },
  {
    id: 't-2',
    speaker: 'Dr. Elena Vance',
    time: '00:14',
    seconds: 14,
    text: "The fundamental mistake most teams make is treating every social channel like a copy-paste dumping ground. LinkedIn demands contextual executive synthesis, while TikTok requires immediate pattern disruption within the first 1.2 seconds.",
    highlighted: true,
    score: 98,
  },
  {
    id: 't-3',
    speaker: 'Alex Rivera (Host)',
    time: '00:32',
    seconds: 32,
    text: "Exactly. If you just take a landscape 16:9 podcast video and crop the center, you lose both speakers' non-verbal cues and context.",
    score: 91,
  },
  {
    id: 't-4',
    speaker: 'Dr. Elena Vance',
    time: '00:48',
    seconds: 48,
    text: "Right. With multi-agent systems, the AI isn't just cropping; it understands the emotional arc, dynamically switches the frame, and generates provocative hooks tailored directly to the specific persona on that platform.",
    highlighted: true,
    score: 96,
  },
  {
    id: 't-5',
    speaker: 'Alex Rivera (Host)',
    time: '01:05',
    seconds: 65,
    text: "Let's break down the 3-second hook framework you used to generate 2.4 million views last month across three separate niches.",
    score: 94,
  },
  {
    id: 't-6',
    speaker: 'Dr. Elena Vance',
    time: '01:22',
    seconds: 82,
    text: "Step one is what I call the Contrarian Premise. You start by invalidating a commonly accepted industry best practice before you introduce the breakthrough solution.",
    highlighted: true,
    score: 97,
  }
];

export const TranscriptScreen: React.FC<TranscriptScreenProps> = ({ onNavigate }) => {
  const [lines, setLines] = useState<TranscriptLine[]>(INITIAL_TRANSCRIPT);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLineId, setSelectedLineId] = useState<string>('t-2');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<string>('');

  const filteredLines = lines.filter(line =>
    line.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startEdit = (line: TranscriptLine) => {
    setEditingId(line.id);
    setEditBuffer(line.text);
  };

  const saveEdit = (id: string) => {
    setLines(lines.map(l => l.id === id ? { ...l, text: editBuffer } : l));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Subheader / Navigation Bar */}
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
              <span className="text-indigo-600 font-bold">Interactive Transcript</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Transcript Workspace</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Whisper AI Synced (99.8% Accuracy)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('hooks')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              Extract Hooks from Text
            </button>
            <button
              onClick={() => onNavigate('suggestions')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">movie</span>
              View AI Clips
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Transcript Lines */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search and Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search dialogue, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 whitespace-nowrap">Filter:</span>
              <button className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                ⭐ Viral Highlights (3)
              </button>
              <button className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">
                All Lines ({lines.length})
              </button>
            </div>
          </div>

          {/* Transcript Dialogue List */}
          <div className="space-y-3">
            {filteredLines.map((line) => {
              const isSelected = selectedLineId === line.id;
              const isEditing = editingId === line.id;

              return (
                <div
                  key={line.id}
                  onClick={() => setSelectedLineId(line.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  } ${line.highlighted ? 'ring-1 ring-amber-400/40' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {line.time}
                      </span>
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        {line.speaker}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {line.score && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">bolt</span>
                          {line.score}% Hook Potential
                        </span>
                      )}
                      {line.highlighted && (
                        <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                          Clip In Point
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Editable or Static Text */}
                  {isEditing ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        value={editBuffer}
                        onChange={(e) => setEditBuffer(e.target.value)}
                        className="w-full p-3 rounded-xl border border-indigo-400 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(null);
                          }}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEdit(line.id);
                          }}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-xs"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                      {line.text}
                    </p>
                  )}

                  {/* Actions Bar for each row */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(line);
                        }}
                        className="hover:text-indigo-600 flex items-center gap-1 font-semibold"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Edit Wording
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('clip_editor');
                        }}
                        className="hover:text-indigo-600 flex items-center gap-1 font-semibold"
                      >
                        <span className="material-symbols-outlined text-[14px]">movie_edit</span>
                        Cut Clip at {line.time}
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(line.text);
                      }}
                      className="hover:text-slate-900 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      Copy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Audio Synchronizer & Insight Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Synchronized Player Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-36">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-indigo-600">headset</span>
              Synced Audio Playback
            </h2>

            <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-slate-950 mb-4 shadow-sm group">
              <img
                src={IMAGES.podcastStudio}
                alt="Source Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50">
                  <span className="material-symbols-outlined text-2xl ml-0.5">play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 font-mono text-[10px] text-white">
                00:14 / 42:18
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Selected Segment:</span>
                <span className="font-bold text-slate-800">Dr. Elena Vance (00:14)</span>
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 italic">
                "The fundamental mistake most teams make is treating every social channel like a copy-paste dumping ground..."
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onNavigate('clip_editor')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">movie_edit</span>
                  Create Clip From Highlight
                </button>
                <button
                  onClick={() => onNavigate('hooks')}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Turn into Social Hooks
                </button>
                <button
                  onClick={() => onNavigate('captions')}
                  className="w-full py-2 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">closed_caption</span>
                  Generate Post Captions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
