import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES, WORKFLOW_CARDS } from '../data/mockData';

interface WorkflowScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const WorkflowScreen: React.FC<WorkflowScreenProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [cards, setCards] = useState(WORKFLOW_CARDS);
  const [milestones, setMilestones] = useState([
    { id: 1, title: 'High-retention clips extracted', desc: '4/4 viral snippets isolated & ready for timeline trimming', done: true, tag: '4/4 Ready' },
    { id: 2, title: 'Viral hooks synthesized & ranked', desc: 'Top-scored intro rated 94% retention probability', done: true, tag: 'Ranked' },
    { id: 3, title: 'Dynamic subtitles auto-synchronized', desc: 'Word-level timestamps calibrated across 45 mins', done: true, tag: 'Synchronized' },
    { id: 4, title: 'Repurposed platform formats pending creator review', desc: 'TikTok 9:16, YouTube 16:9, X Thread, and LinkedIn carousel', done: false, tag: 'Needs Review' },
  ]);

  const toggleMilestone = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  };

  const completedMilestones = milestones.filter((m) => m.done).length;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-['Inter']">
      {/* Screen Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#c7c4d8]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#e2dfff] text-[#0f0069] text-xs px-2.5 py-0.5 rounded-full font-bold">
              Active Studio Pipeline
            </span>
            <span className="text-[#464555] text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#006c49] inline-block animate-pulse"></span>
              {cards.length} Active Projects
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            Content Workflow
          </h1>
          <p className="text-sm text-[#464555] mt-1 max-w-2xl">
            Track and manage your video and media pipelines from initial concept to multi-platform publishing.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-[#f2f3ff] p-1 rounded-lg border border-[#c7c4d8]/60">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                viewMode === 'board' ? 'bg-white text-[#4f46e5] shadow-xs' : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_kanban</span>
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-[#4f46e5] shadow-xs' : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              <span>List</span>
            </button>
          </div>

          <button className="flex items-center gap-2 bg-white border border-[#c7c4d8] hover:bg-[#f2f3ff] px-3 py-2 rounded-lg text-xs font-semibold text-[#131b2e] transition-colors shadow-xs cursor-pointer">
            <span className="material-symbols-outlined text-[#777587] text-[18px]">filter_list</span>
            <span>Filter by Host/Creator</span>
            <span className="material-symbols-outlined text-[#777587] text-[16px]">expand_more</span>
          </button>

          <button
            onClick={() => onNavigate('create_project')}
            className="flex items-center gap-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Workflow Project</span>
          </button>
        </div>
      </div>

      {/* Section 1: Pipeline Stage Progression Bar */}
      <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">linear_scale</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Pipeline Stage Progression</h2>
          </div>
          <span className="text-xs text-[#464555] bg-[#eaedff] px-2.5 py-1 rounded-md">
            Current Focus: <strong className="text-[#131b2e] font-semibold">Editing Phase</strong>
          </span>
        </div>

        <div className="overflow-x-auto pb-2 custom-scrollbar">
          <div className="min-w-[860px] flex items-center justify-between gap-2">
            {/* Step 1 */}
            <div className="flex-1 bg-[#f2f3ff]/70 border border-[#c7c4d8]/50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">Done</p>
                  <p className="text-xs text-[#131b2e] font-bold">1. IDEA</p>
                </div>
              </div>
              <span className="text-[11px] text-[#777587]">100%</span>
            </div>
            <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0">arrow_forward</span>

            {/* Step 2 */}
            <div className="flex-1 bg-[#f2f3ff]/70 border border-[#c7c4d8]/50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">Done</p>
                  <p className="text-xs text-[#131b2e] font-bold">2. SCRIPT</p>
                </div>
              </div>
              <span className="text-[11px] text-[#777587]">100%</span>
            </div>
            <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0">arrow_forward</span>

            {/* Step 3 */}
            <div className="flex-1 bg-[#f2f3ff]/70 border border-[#c7c4d8]/50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">Done</p>
                  <p className="text-xs text-[#131b2e] font-bold">3. RECORDING</p>
                </div>
              </div>
              <span className="text-[11px] text-[#777587]">100%</span>
            </div>
            <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0">arrow_forward</span>

            {/* Step 4 */}
            <div className="flex-1 bg-[#f2f3ff]/70 border border-[#c7c4d8]/50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">Done</p>
                  <p className="text-xs text-[#131b2e] font-bold">4. AI ANALYSIS</p>
                </div>
              </div>
              <span className="text-[11px] text-[#777587]">100%</span>
            </div>
            <span className="material-symbols-outlined text-[#4f46e5] text-[18px] shrink-0">arrow_forward</span>

            {/* Step 5 (Active) */}
            <div className="flex-1 bg-white border-2 border-[#4f46e5] ring-4 ring-[#e2dfff]/50 rounded-lg p-3 flex items-center justify-between shadow-md relative overflow-hidden">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shrink-0 animate-pulse">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    movie_edit
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-[#4f46e5] font-bold uppercase tracking-wider flex items-center gap-1">
                    Active Phase
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-ping"></span>
                  </p>
                  <p className="text-xs text-[#131b2e] font-extrabold">5. EDITING</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#e2dfff] text-[#0f0069] font-bold px-1.5 py-0.5 rounded">65%</span>
            </div>
            <span className="material-symbols-outlined text-[#c7c4d8] text-[18px] shrink-0">arrow_forward</span>

            {/* Step 6 */}
            <div className="flex-1 bg-white/60 border border-[#c7c4d8]/40 rounded-lg p-3 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#e2e7ff] text-[#464555] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                </div>
                <div>
                  <p className="text-[10px] text-[#464555] font-medium uppercase tracking-wider">Queued</p>
                  <p className="text-xs text-[#131b2e] font-semibold">6. READY</p>
                </div>
              </div>
              <span className="text-[11px] text-[#777587]">--</span>
            </div>
            <span className="material-symbols-outlined text-[#c7c4d8]/50 text-[18px] shrink-0">arrow_forward</span>

            {/* Step 7 */}
            <div className="flex-1 bg-white/60 border border-[#c7c4d8]/40 rounded-lg p-3 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#e2e7ff] text-[#464555] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[15px]">cloud_upload</span>
                </div>
                <div>
                  <p className="text-[10px] text-[#464555] font-medium uppercase tracking-wider">Queued</p>
                  <p className="text-xs text-[#131b2e] font-semibold">7. PUBLISHED</p>
                </div>
              </div>
              <span className="text-[11px] text-[#777587]">--</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Active Project Stage Details Card */}
      <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-6 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#c7c4d8]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                mic
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                  My AI Podcast - Episode 14
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4f46e5] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  In Editing (Step 5 of 7)
                </span>
              </div>
              <p className="text-xs text-[#464555] mt-0.5">
                Topic: The Future of Autonomous Coding Agents • Host: Marcus Vance • Recorded yesterday
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-[11px] text-[#464555]">Last AI sync: 12 mins ago</span>
            <button
              onClick={() => onNavigate('suggestions')}
              className="p-1.5 rounded-lg text-[#777587] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
          {/* Recording Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-lg overflow-hidden border border-[#c7c4d8]/60 group bg-[#eaedff]">
              <img
                src={IMAGES.overheadDesk}
                alt="Studio Desk"
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-transparent flex flex-col justify-between p-3.5">
                <div className="flex justify-between items-center">
                  <span className="bg-[#283044]/90 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    4K • 60 FPS
                  </span>
                  <span className="bg-[#ba1a1a]/90 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Raw Cut
                  </span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('clip_editor')}
                      className="w-8 h-8 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    </button>
                    <span className="text-xs font-mono tracking-tight">45:32 / 45:32</span>
                  </div>
                  <span className="text-[11px] text-[#dae2fd] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
                    Clean Studio Audio
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-xs text-[#464555] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#777587] text-[16px]">storage</span>
                File size: 3.42 GB
              </span>
              <span className="text-xs text-[#006c49] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Audio normalized (-14 LUFS)
              </span>
            </div>
          </div>

          {/* Key Milestone Checklist (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4f46e5] text-[18px]">task_alt</span>
                  Stage 5 Milestone Checklist: Editing &amp; Optimization
                </h3>
                <span className="text-xs font-semibold text-[#4f46e5] bg-[#e2dfff]/60 px-2 py-0.5 rounded">
                  {completedMilestones} of {milestones.length} Completed
                </span>
              </div>

              <div className="space-y-2.5">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(m.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                      m.done
                        ? 'bg-[#f2f3ff]/60 border-[#c7c4d8]/40 hover:bg-[#f2f3ff]'
                        : 'bg-[#e2dfff]/20 border-[#4f46e5]/30 hover:bg-[#e2dfff]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                          m.done ? 'bg-[#006c49] text-white' : 'border-2 border-[#4f46e5] bg-white'
                        }`}
                      >
                        {m.done ? (
                          <span className="material-symbols-outlined text-[15px]">check</span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse"></span>
                        )}
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${m.done ? 'text-[#131b2e]' : 'text-[#131b2e] font-bold'}`}>
                          {m.title}
                        </p>
                        <p className="text-[11px] text-[#464555]">{m.desc}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.done
                          ? 'bg-[#6cf8bb]/40 text-[#00714d]'
                          : 'bg-[#e2dfff] text-[#4f46e5]'
                      }`}
                    >
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-[#c7c4d8]/40">
              <button
                onClick={() => onNavigate('clip_editor')}
                className="flex items-center gap-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">content_cut</span>
                <span>Jump to Clip Editor</span>
              </button>
              <button
                onClick={() => onNavigate('suggestions')}
                className="flex items-center gap-1.5 bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#c7c4d8] text-xs font-semibold px-3.5 py-2.5 rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#4f46e5] text-[18px]">insights</span>
                <span>View AI Suggestions</span>
              </button>
              <button
                onClick={() => onNavigate('repurpose')}
                className="flex items-center gap-1.5 bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#c7c4d8] text-xs font-semibold px-3.5 py-2.5 rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#006c49] text-[18px]">auto_awesome_motion</span>
                <span>Open Repurpose Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Multi-Project Pipeline Kanban Board */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e]">
              Multi-Project Pipeline Board
            </h2>
            <p className="text-xs text-[#464555]">Drag or track creator releases across production stages</p>
          </div>
          <span className="text-xs text-[#777587]">Columns: 4 Active Stages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {/* Column 1: Script & Idea */}
          <div className="bg-[#f2f3ff]/60 rounded-xl p-3.5 border border-[#c7c4d8]/60 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#777587]"></span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">Script &amp; Idea</h3>
                <span className="text-[10px] bg-[#e2e7ff] text-[#464555] px-1.5 py-0.2 rounded font-semibold">2</span>
              </div>
              <button onClick={() => onNavigate('create_project')} className="text-[#777587] hover:text-[#131b2e] p-1 rounded cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {cards
              .filter((c) => c.columnId === 'idea')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('transcript')}
                  className="bg-white rounded-xl p-4 border border-[#c7c4d8]/60 shadow-xs hover:shadow hover:border-[#4f46e5]/40 transition-all flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${c.categoryClass}`}>
                      {c.category}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#777587] group-hover:text-[#131b2e]">
                      more_vert
                    </span>
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-[#464555] line-clamp-2 mt-0.5">{c.description}</p>
                  </div>
                  <div className="text-[11px] text-[#777587]">{c.metric}</div>
                  <div className="pt-2 border-t border-[#c7c4d8]/40 flex items-center justify-between">
                    <span className="text-[10px] bg-[#eaedff] text-[#464555] px-2 py-0.5 rounded-full font-semibold">
                      {c.formatsCount}
                    </span>
                    <img src={c.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                  </div>
                </div>
              ))}
          </div>

          {/* Column 2: AI Processing & Editing */}
          <div className="bg-[#f2f3ff]/60 rounded-xl p-3.5 border border-[#c7c4d8]/60 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5] animate-ping"></span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                  AI Processing &amp; Editing
                </h3>
                <span className="text-[10px] bg-[#e2dfff] text-[#0f0069] px-1.5 py-0.2 rounded font-bold">1 Active</span>
              </div>
              <button onClick={() => onNavigate('create_project')} className="text-[#777587] hover:text-[#131b2e] p-1 rounded cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {cards
              .filter((c) => c.columnId === 'processing')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('clip_editor')}
                  className="bg-white rounded-xl p-4 border-2 border-[#4f46e5] ring-2 ring-[#e2dfff]/40 shadow-md flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] text-white bg-[#4f46e5] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      In Progress
                    </span>
                    <span className="flex items-center gap-1 text-[#4f46e5] text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                      Step 5/7
                    </span>
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">{c.title}</h4>
                    <p className="text-[11px] text-[#464555] line-clamp-2 mt-0.5">{c.description}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#464555] font-medium">Timeline processing</span>
                      <span className="text-[#4f46e5] font-bold">65%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#e2e7ff] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4f46e5] rounded-full w-[65%]"></div>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#777587]">{c.metric}</div>
                  <div className="pt-2 border-t border-[#c7c4d8]/40 flex items-center justify-between">
                    <span className="text-[10px] bg-[#e2dfff] text-[#0f0069] px-2 py-0.5 rounded-full font-bold">
                      {c.formatsCount}
                    </span>
                    <button className="text-[#4f46e5] hover:bg-[#e2dfff]/50 p-1 rounded transition-colors">
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Column 3: Ready for Review */}
          <div className="bg-[#f2f3ff]/60 rounded-xl p-3.5 border border-[#c7c4d8]/60 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4b4dd8]"></span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">Ready for Review</h3>
                <span className="text-[10px] bg-[#e2e7ff] text-[#464555] px-1.5 py-0.2 rounded font-semibold">2</span>
              </div>
              <button className="text-[#777587] hover:text-[#131b2e] p-1 rounded cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {cards
              .filter((c) => c.columnId === 'review')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('repurpose')}
                  className="bg-white rounded-xl p-4 border border-[#c7c4d8]/60 shadow-xs hover:shadow hover:border-[#4f46e5]/40 transition-all flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${c.categoryClass}`}>
                      {c.category}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#777587] group-hover:text-[#131b2e]">
                      more_vert
                    </span>
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-[#464555] line-clamp-2 mt-0.5">{c.description}</p>
                  </div>
                  <div className="text-[11px] text-[#777587]">{c.metric}</div>
                  <div className="pt-2 border-t border-[#c7c4d8]/40 flex items-center justify-between">
                    <span className="text-[10px] bg-[#eaedff] text-[#464555] px-2 py-0.5 rounded-full font-semibold">
                      {c.formatsCount}
                    </span>
                    <button className="text-[#777587] hover:text-[#4f46e5] p-1 rounded cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">rate_review</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Column 4: Published & Live */}
          <div className="bg-[#f2f3ff]/60 rounded-xl p-3.5 border border-[#c7c4d8]/60 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">Published &amp; Live</h3>
                <span className="text-[10px] bg-[#e2e7ff] text-[#464555] px-1.5 py-0.2 rounded font-semibold">3</span>
              </div>
              <button onClick={() => onNavigate('analytics')} className="text-[#777587] hover:text-[#131b2e] p-1 rounded cursor-pointer" title="View archive">
                <span className="material-symbols-outlined text-[18px]">history</span>
              </button>
            </div>

            {cards
              .filter((c) => c.columnId === 'published')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('analytics')}
                  className="bg-white rounded-xl p-4 border border-[#c7c4d8]/60 shadow-xs hover:shadow transition-all flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-semibold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                      {c.category}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#777587] group-hover:text-[#131b2e]">
                      more_vert
                    </span>
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-[#464555] line-clamp-1 mt-0.5">{c.description}</p>
                  </div>
                  <div className="text-[11px] text-[#777587]">{c.metric}</div>
                  <div className="pt-2 border-t border-[#c7c4d8]/40 flex items-center justify-between">
                    <span className="text-[10px] bg-[#eaedff] text-[#464555] px-2 py-0.5 rounded-full font-semibold">
                      {c.formatsCount}
                    </span>
                    <button className="text-[#777587] hover:text-[#006c49] p-1 rounded cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">analytics</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
