import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface FinalExportScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const FinalExportScreen: React.FC<FinalExportScreenProps> = ({ onNavigate }) => {
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);
  const [copiedThread, setCopiedThread] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const handleCopyText = (type: 'linkedin' | 'thread') => {
    if (type === 'linkedin') {
      setCopiedLinkedIn(true);
      setTimeout(() => setCopiedLinkedIn(false), 2000);
    } else {
      setCopiedThread(true);
      setTimeout(() => setCopiedThread(false), 2000);
    }
  };

  const handleDownload = (assetName: string) => {
    setDownloadSuccess(`Downloading ${assetName}...`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 font-['Inter']">
      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[#10b981] text-base">download_done</span>
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[#464555] text-xs mb-4">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
          Projects
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <button onClick={() => onNavigate('workflow')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
          My AI Podcast
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#131b2e] font-semibold">Final Content Ready</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Your Content Is Ready 🎉
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/30 border border-[#6cf8bb] text-[#00714d] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
              Render Complete
            </span>
          </div>
          <p className="text-base text-[#464555] mt-1.5 max-w-2xl">
            All 5 adapted assets have been processed, rendered in high fidelity, and are ready to publish or download.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-[#c7c4d8] shadow-xs text-[#464555] text-xs font-medium">
          <div className="flex items-center gap-1.5 text-[#4f46e5] font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>5 Assets Ready</span>
          </div>
          <span className="text-[#c7c4d8]">•</span>
          <div className="flex items-center gap-1.5 text-[#131b2e]">
            <span className="material-symbols-outlined text-[18px] text-[#777587]">timer</span>
            <span>Total Render Time: 18s</span>
          </div>
          <span className="text-[#c7c4d8]">•</span>
          <div className="flex items-center gap-1.5 text-[#131b2e]">
            <span className="material-symbols-outlined text-[18px] text-[#777587]">hd</span>
            <span>1080p 60fps HD</span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Asset 1: YouTube Video (16:9) - Spans 8 Columns */}
        <div className="md:col-span-8 bg-white rounded-xl border border-[#c7c4d8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
          <div>
            <div className="p-5 border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">smart_display</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors">
                    Episode 14: Future of AI Creative Workflows
                  </h3>
                  <span className="text-[11px] text-[#464555]">Master YouTube Master Cut</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="material-symbols-outlined text-[16px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                ✓ Ready (HD 1080p, 45:32)
              </span>
            </div>

            <div className="relative w-full aspect-video bg-[#283044] overflow-hidden">
              <img
                src={IMAGES.youtubeMasterCut}
                alt="Episode 14 YouTube Thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-[#283044]/85 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
                <span className="material-symbols-outlined text-[14px]">aspect_ratio</span>
                16:9 Landscape
              </div>
              <button
                onClick={() => onNavigate('clip_editor')}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#4f46e5]/90 hover:bg-[#4f46e5] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[32px] ml-1">play_arrow</span>
              </button>
              <div className="absolute bottom-4 right-4 bg-[#283044]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                45:32
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#464555] text-xs font-medium">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Audio Normalized (-14 LUFS)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('clip_editor')}
                className="px-3.5 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Preview</span>
              </button>
              <button
                onClick={() => onNavigate('clip_editor')}
                className="px-3.5 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDownload('Episode_14_Master.mp4')}
                className="px-4 py-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download (.mp4)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Asset 2: LinkedIn Post & Video - Spans 4 Columns */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#c7c4d8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
          <div>
            <div className="p-5 border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">post_add</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">LinkedIn Post &amp; Video</h3>
                  <span className="text-[11px] text-[#464555]">Optimized Carousel &amp; Clip</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="material-symbols-outlined text-[14px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                ✓ Ready
              </span>
            </div>

            <div className="p-5 space-y-3.5">
              <div className="bg-[#f2f3ff] p-3.5 rounded-lg border border-[#c7c4d8]/60 text-xs text-[#464555] leading-relaxed relative">
                <div className="text-[11px] text-[#3525cd] font-bold mb-1 flex items-center justify-between">
                  <span>GENERATED POST HOOK</span>
                  <span className="material-symbols-outlined text-[16px] text-[#777587]">content_copy</span>
                </div>
                "AI won't take creative jobs—creators who orchestrate AI systems will replace those who don't. Here are 3 breakthroughs from my conversation with..."
              </div>

              <div className="relative rounded-lg overflow-hidden border border-[#c7c4d8] aspect-4/3 bg-[#283044]">
                <img
                  src={IMAGES.laptopDesk}
                  alt="LinkedIn Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-[#283044]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  1:45 Highlight
                </div>
                <button
                  onClick={() => onNavigate('clip_editor')}
                  className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] ml-0.5">play_arrow</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between gap-1">
            <button
              onClick={() => onNavigate('adapt')}
              className="px-2.5 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-[11px] font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">visibility</span>
              <span>Preview</span>
            </button>
            <button
              onClick={() => handleCopyText('linkedin')}
              className="px-2.5 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#4f46e5] text-[11px] font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">content_copy</span>
              <span>{copiedLinkedIn ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={() => handleDownload('LinkedIn_Highlight.mp4')}
              className="px-3 py-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-[11px] font-semibold rounded-lg flex items-center gap-1 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>Download Video</span>
            </button>
          </div>
        </div>

        {/* Asset 3: Instagram Reel (9:16) - Spans 4 Columns */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#c7c4d8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
          <div>
            <div className="p-4 border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Instagram Reel</h3>
                  <span className="text-[11px] text-[#464555] truncate block max-w-[150px]">Mistake Students Make</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="material-symbols-outlined text-[14px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                ✓ Ready
              </span>
            </div>

            <div className="p-4 flex flex-col items-center bg-[#f2f3ff]/40">
              <div className="relative w-44 aspect-9/16 rounded-xl overflow-hidden shadow-md border border-[#c7c4d8] bg-[#283044]">
                <img
                  src={IMAGES.reelStopDoingThis}
                  alt="Instagram Reel Frame"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#283044]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  9:16
                </div>
                <div className="absolute bottom-3 left-2 right-2 bg-[#283044]/90 backdrop-blur-xs p-1.5 rounded text-center">
                  <span className="text-white text-[10px] font-semibold block leading-tight">✨ Dynamic Animated Captions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between gap-1.5">
            <button
              onClick={() => onNavigate('adapt')}
              className="px-3 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Preview</span>
            </button>
            <button
              onClick={() => onNavigate('clip_editor')}
              className="px-3 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDownload('Reel_Mistake_Students_Make.mp4')}
              className="px-3.5 py-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download (.mp4)</span>
            </button>
          </div>
        </div>

        {/* Asset 4: YouTube Short (9:16) - Spans 4 Columns */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#c7c4d8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
          <div>
            <div className="p-4 border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">play_circle</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">YouTube Short</h3>
                  <span className="text-[11px] text-[#464555] truncate block max-w-[150px]">Stop copying AI code blindly</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="material-symbols-outlined text-[14px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                ✓ Ready
              </span>
            </div>

            <div className="p-4 flex flex-col items-center bg-[#f2f3ff]/40">
              <div className="relative w-44 aspect-9/16 rounded-xl overflow-hidden shadow-md border border-[#c7c4d8] bg-[#283044]">
                <img
                  src={IMAGES.youtubeShortArchitecture}
                  alt="YouTube Short Frame"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#283044]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  9:16
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#283044]/70 text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px] ml-0.5">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-2 right-2 bg-[#283044]/90 backdrop-blur-xs p-1.5 rounded text-center">
                  <span className="text-white text-[10px] font-semibold block leading-tight">60 FPS Optimized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between gap-1.5">
            <button
              onClick={() => onNavigate('clip_editor')}
              className="px-3 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Preview</span>
            </button>
            <button
              onClick={() => onNavigate('clip_editor')}
              className="px-3 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDownload('YouTube_Short_Architecture.mp4')}
              className="px-3.5 py-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download (.mp4)</span>
            </button>
          </div>
        </div>

        {/* Asset 5: X / Twitter Thread - Spans 4 Columns */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#c7c4d8] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
          <div>
            <div className="p-4 border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">tag</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">X / Twitter Thread</h3>
                  <span className="text-[11px] text-[#464555]">4 Tweets Formatted</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="material-symbols-outlined text-[14px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                ✓ Ready
              </span>
            </div>

            <div className="p-4 space-y-2.5">
              <div className="p-3 bg-[#f2f3ff] rounded-lg border border-[#c7c4d8]/60 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#4f46e5] text-white text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                <p className="text-xs text-[#464555] leading-snug">
                  1/4 Most developers use generative AI like a faster Google search. That's mistake #1. Here's what top 1% engineers do differently 🧵👇
                </p>
              </div>

              <div className="p-3 bg-[#f2f3ff]/70 rounded-lg border border-[#c7c4d8]/40 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#777587] text-white text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                <p className="text-xs text-[#464555] leading-snug">
                  2/4 Context grounding beats prompt hacks every time. Feed system architectures instead of ad-hoc snippets...
                </p>
              </div>

              <div className="flex items-center justify-center py-1">
                <span className="text-[11px] text-[#777587] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">more_vert</span>
                  +2 additional tweets ready in queue
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between gap-2">
            <button
              onClick={() => onNavigate('captions')}
              className="px-3 py-1.5 bg-white hover:bg-[#eaedff] border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Preview</span>
            </button>
            <button
              onClick={() => handleCopyText('thread')}
              className="w-full px-4 py-1.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copiedThread ? 'Thread Copied!' : 'Copy Thread'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Publishing Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#c7c4d8]/80 shadow-lg py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e] block sm:inline">
                Ready to launch across channels?
              </span>
              <span className="hidden md:inline text-xs text-[#464555] ml-2">
                All assets formatted with correct aspect ratios &amp; metadata.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleDownload('CreatorAi_Full_Bundle.zip')}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#c7c4d8] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">folder_zip</span>
              <span>Download All as ZIP</span>
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>Publish / Schedule to Socials 🚀</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Scheduling Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c7c4d8] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/40 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4f46e5]">rocket_launch</span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  Publish / Schedule Queue
                </h3>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="text-[#777587] hover:text-[#131b2e] cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {scheduledSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-[#6cf8bb]/40 text-[#006c49] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-3xl font-bold">check</span>
                </div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">Scheduled Successfully!</h4>
                <p className="text-xs text-[#464555] mt-1 mb-5">
                  5 assets are queued to publish across Instagram, YouTube, X, and LinkedIn.
                </p>
                <button
                  onClick={() => { setShowScheduleModal(false); setScheduledSuccess(false); onNavigate('workflow'); }}
                  className="px-5 py-2 bg-[#4f46e5] text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  View in Workflow Pipeline
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#464555] mb-4">
                  Select destination channels to push these 5 formatted releases directly:
                </p>
                <div className="space-y-2.5 mb-6 text-xs font-semibold text-[#131b2e]">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#4f46e5]/40 bg-[#f2f3ff]/50 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
                      Instagram Reels (@creatorai_studio)
                    </span>
                    <input type="checkbox" defaultChecked className="text-[#4f46e5] rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#4f46e5]/40 bg-[#f2f3ff]/50 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                      YouTube Channel (Creator Studio)
                    </span>
                    <input type="checkbox" defaultChecked className="text-[#4f46e5] rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#4f46e5]/40 bg-[#f2f3ff]/50 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#131b2e]"></span>
                      X / Twitter (@creator_ai)
                    </span>
                    <input type="checkbox" defaultChecked className="text-[#4f46e5] rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#4f46e5]/40 bg-[#f2f3ff]/50 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
                      LinkedIn Page (CreatorAi)
                    </span>
                    <input type="checkbox" defaultChecked className="text-[#4f46e5] rounded" />
                  </label>
                </div>
                <div className="flex justify-end gap-2.5">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-2 border border-[#c7c4d8] rounded-lg text-xs font-semibold hover:bg-[#f2f3ff] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setScheduledSuccess(true)}
                    className="px-5 py-2 bg-[#4f46e5] text-white rounded-lg text-xs font-semibold hover:bg-[#3525cd] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Confirm &amp; Schedule</span>
                    <span className="material-symbols-outlined text-sm">check</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
