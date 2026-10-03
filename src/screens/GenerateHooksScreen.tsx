import React, { useState } from 'react';
import { ScreenId } from '../types';
import { GENERATED_HOOKS } from '../data/mockData';

interface GenerateHooksScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GenerateHooksScreen: React.FC<GenerateHooksScreenProps> = ({ onNavigate }) => {
  const [hooks, setHooks] = useState(GENERATED_HOOKS);
  const [topic, setTopic] = useState('AI autonomous video repurposing and multimodal creation');
  const [tone, setTone] = useState<'contrarian' | 'question' | 'curiosity' | 'story'>('contrarian');
  const [length, setLength] = useState<'punchy' | 'medium' | 'narrative'>('punchy');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateMore = () => {
    const newHook = {
      id: `hook-${Date.now()}`,
      style: tone.toUpperCase(),
      hookText: `Stop copying 16:9 videos straight to TikTok. Here is why the top 1% of creators switched to adaptive framing yesterday.`,
      retentionProjection: 97,
      category: tone,
      characterCount: 118,
    };
    setHooks([newHook, ...hooks]);
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
              <span className="text-indigo-600 font-bold">Generate Content Hooks</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Viral Hook Studio</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <span className="material-symbols-outlined text-sm">psychology</span>
                First 3-Second Retention Optimizer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('captions')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">closed_caption</span>
              Generate Captions
            </button>
            <button
              onClick={() => onNavigate('adapt')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              Apply to Video Release
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Body */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Hook Generation Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-base">tune</span>
              Hook Generation Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Core Topic or Source Thought
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Psychological Angle / Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTone('contrarian')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      tone === 'contrarian'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-bold">💥 Contrarian</span>
                    <span className="text-[10px] text-slate-500">Break assumptions</span>
                  </button>
                  <button
                    onClick={() => setTone('curiosity')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      tone === 'curiosity'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-bold">🔮 High Curiosity</span>
                    <span className="text-[10px] text-slate-500">Unresolved curiosity gap</span>
                  </button>
                  <button
                    onClick={() => setTone('question')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      tone === 'question'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-bold">❓ Provocative Q</span>
                    <span className="text-[10px] text-slate-500">Direct viewer challenge</span>
                  </button>
                  <button
                    onClick={() => setTone('story')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      tone === 'story'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-bold">📖 Story In Medias Res</span>
                    <span className="text-[10px] text-slate-500">Mid-action kickoff</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Target Length
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => setLength('punchy')}
                    className={`py-2 rounded-xl border text-center transition-all ${
                      length === 'punchy'
                        ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    &lt; 8 Words
                  </button>
                  <button
                    onClick={() => setLength('medium')}
                    className={`py-2 rounded-xl border text-center transition-all ${
                      length === 'medium'
                        ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    8-15 Words
                  </button>
                  <button
                    onClick={() => setLength('narrative')}
                    className={`py-2 rounded-xl border text-center transition-all ${
                      length === 'narrative'
                        ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    15+ Words
                  </button>
                </div>
              </div>

              <button
                onClick={handleGenerateMore}
                className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Generate 5 New Viral Variations
              </button>
            </div>
          </div>

          {/* Psychological Playbook Card */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-indigo-950">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              The 3-Second Retention Rule
            </h3>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Videos with high retention consistently frontload tension or introduce a polarizing claim before showing the speaker's face. Use these hooks as on-screen dynamic text during seconds 0.0 to 2.8.
            </p>
          </div>
        </div>

        {/* Right Column: Ranked Generated Hooks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Ranked Hook Variations ({hooks.length})
            </h2>
            <span className="text-xs text-slate-500">Sorted by Predicted Virality</span>
          </div>

          <div className="space-y-4">
            {hooks.map((hook, index) => {
              const isCopied = copiedId === hook.id;
              return (
                <div
                  key={hook.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {hook.style}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      {hook.retentionProjection}% Virality Score
                    </div>
                  </div>

                  <p className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    "{hook.hookText}"
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      {hook.characterCount ?? hook.hookText?.length ?? 100} characters • {Math.round((hook.characterCount ?? hook.hookText?.length ?? 100) / 5)} words
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(hook.id, hook.hookText || hook.quote || '')}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 text-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {isCopied ? 'check' : 'content_copy'}
                        </span>
                        {isCopied ? 'Copied!' : 'Copy'}
                      </button>

                      <button
                        onClick={() => onNavigate('clip_editor')}
                        className="px-3 py-1.5 rounded-xl font-bold bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 transition-colors flex items-center gap-1 text-xs"
                      >
                        <span className="material-symbols-outlined text-[14px]">movie_edit</span>
                        Use on Clip
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
