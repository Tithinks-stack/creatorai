import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface RepurposeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface RepurposeFormat {
  id: string;
  name: string;
  type: string;
  icon: string;
  iconBg: string;
  status: 'pending' | 'generated';
  specs: string;
  desc?: string;
  detail?: string;
}

export const RepurposeScreen: React.FC<RepurposeScreenProps> = ({ onNavigate }) => {
  const [formats, setFormats] = useState<RepurposeFormat[]>([
    {
      id: 'youtube',
      name: 'YouTube',
      type: '16:9 Landscape Video',
      icon: 'smart_display',
      iconBg: 'bg-red-50 text-red-600 border-red-100',
      status: 'pending',
      specs: '1080p • Includes intro/outro',
      desc: 'Generates high-definition widescreen video snippet with automated intro graphics and high-clarity voice boosting.',
      detail: '',
    },
    {
      id: 'instagram',
      name: 'Instagram Reel',
      type: '9:16 Vertical Video',
      icon: 'photo_camera',
      iconBg: 'bg-pink-50 text-pink-600 border-pink-100',
      status: 'generated',
      specs: 'Auto-captions • Center-crop safe zone',
      detail: 'reel_export_v1_ep14.mp4 ready',
    },
    {
      id: 'shorts',
      name: 'YouTube Short',
      type: '9:16 Vertical Video',
      icon: 'play_circle',
      iconBg: 'bg-red-50 text-red-500 border-red-100',
      status: 'generated',
      specs: 'High-retention pace • Sound-on graphics',
      detail: 'Hook animation: "AI Misconception"',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Post',
      type: 'Text Post + Attached Video',
      icon: 'article',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      status: 'generated',
      specs: 'Professional tone • Key takeaway bullets',
      detail: '"90% of students treat AI like a search engine instead of..."',
    },
    {
      id: 'twitter',
      name: 'X / Twitter',
      type: 'Short Post & 4-Tweet Thread',
      icon: 'chat_bubble_outline',
      iconBg: 'bg-[#eaedff] text-[#131b2e] border-[#c7c4d8]',
      status: 'pending',
      specs: 'Hook-first thread • 280-char snippets',
      desc: 'Extracts punchy sentences designed for conversational virality and includes auto-stitched numbered thread layout.',
    },
    {
      id: 'tiktok',
      name: 'TikTok / Snippet',
      type: '9:16 Kinetic Subtitles',
      icon: 'music_video',
      iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
      status: 'pending',
      specs: 'Trending sound ready',
      desc: 'Synchronizes spoken emphasis with kinetic bounce typography and 9:16 vertical face-tracking framing.',
    },
  ]);

  const handleGenerateFormat = (id: string) => {
    setFormats((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'generated', detail: `${f.name} render ready` } : f))
    );
  };

  const handleGenerateAll = () => {
    setFormats((prev) =>
      prev.map((f) => ({ ...f, status: 'generated', detail: `${f.name} render ready` }))
    );
  };

  const generatedCount = formats.filter((f) => f.status === 'generated').length;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 font-['Inter'] pb-28">
      {/* Breadcrumb & Workflow Tracker */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center space-x-2 text-xs text-[#464555]">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
            Projects
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#777587]">chevron_right</span>
          <button onClick={() => onNavigate('workflow')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
            My AI Podcast
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#777587]">chevron_right</span>
          <span className="text-[#131b2e] font-semibold">Repurpose Content</span>
        </nav>

        {/* Source Clip Status Pill */}
        <div className="inline-flex items-center gap-2 bg-white border border-[#c7c4d8] px-3 py-1.5 rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse"></span>
          <span className="text-xs font-semibold text-[#131b2e]">Source: Episode 14 (46s clip selected)</span>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            Repurpose Your Content
          </h1>
          <p className="text-base text-[#464555] mt-1">
            Turn one piece of content into multiple platform-ready formats in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#464555]">Platform Engines:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold">
            <span className="material-symbols-outlined text-[15px] text-[#4f46e5]">bolt</span>
            Fast Adaptation v2.4
          </span>
        </div>
      </div>

      {/* Top Source Highlight Card */}
      <section className="bg-white rounded-xl border border-[#c7c4d8] p-6 shadow-xs hover:border-[#777587] transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Thumbnail with Play Overlay */}
            <div
              onClick={() => onNavigate('clip_editor')}
              className="relative w-44 h-24 rounded-lg overflow-hidden shrink-0 border border-[#c7c4d8] group cursor-pointer shadow-xs"
            >
              <img
                src={IMAGES.sourceClipPodcast}
                alt="Episode 14 Source Clip Thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#283044]/30 group-hover:bg-[#283044]/10 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#4f46e5] flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </div>
              </div>
              <span className="absolute bottom-1.5 right-1.5 bg-[#283044]/80 backdrop-blur-xs text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                00:46
              </span>
            </div>

            {/* Metadata & Hook Quote */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#4f46e5] bg-[#f2f3ff] px-2 py-0.5 rounded uppercase tracking-wider">
                  Source Highlight
                </span>
                <span className="text-[#777587] text-xs">•</span>
                <span className="text-xs text-[#464555]">Episode 14: Modern Productivity</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e]">
                The Biggest Mistake Students Make With AI
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="material-symbols-outlined text-[18px] text-[#4f46e5]">format_quote</span>
                <p className="text-sm italic text-[#464555]">"You're probably using AI wrong."</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => onNavigate('suggestions')}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs flex items-center gap-2 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#777587]">swap_horiz</span>
              <span>Change Source Clip</span>
            </button>
          </div>
        </div>
      </section>

      {/* Platform Output Cards Bento Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Platform Formats</h3>
          <div className="flex items-center gap-2 text-xs text-[#464555]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span> {generatedCount} Generated
            <span className="w-2.5 h-2.5 rounded-full bg-[#c7c4d8] ml-2"></span> {formats.length - generatedCount} Pending
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map((fmt) => {
            const isGen = fmt.status === 'generated';
            return (
              <div
                key={fmt.id}
                className={`bg-white rounded-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden ${
                  isGen ? 'border-2 border-[#6cf8bb]/80' : 'border border-[#c7c4d8] hover:border-[#777587]'
                }`}
              >
                {isGen && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#6cf8bb]/20 rounded-bl-full pointer-events-none"></div>
                )}
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${fmt.iconBg}`}>
                      <span className="material-symbols-outlined text-[24px]">{fmt.icon}</span>
                    </div>
                    {isGen ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb]/40 text-[#00714d] text-[11px] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>Generated</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-[#464555] text-[11px] font-medium border border-[#c7c4d8]">
                        Ready to Generate
                      </span>
                    )}
                  </div>

                  <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">{fmt.name}</h4>
                  <p className="text-xs text-[#464555] mt-0.5">{fmt.type}</p>

                  <div className="mt-4 pt-4 border-t border-[#c7c4d8]/60 space-y-2">
                    <div className="flex items-center gap-2 text-[#464555] text-xs">
                      <span className={`material-symbols-outlined text-[16px] ${isGen ? 'text-[#006c49]' : 'text-[#777587]'}`}>
                        {isGen ? 'check_circle' : 'tune'}
                      </span>
                      <span>{fmt.specs}</span>
                    </div>

                    {isGen ? (
                      <div className="bg-[#f2f3ff] p-2.5 rounded-lg border border-[#c7c4d8] text-xs font-semibold text-[#131b2e] truncate">
                        {fmt.detail}
                      </div>
                    ) : (
                      <p className="text-[#464555]/80 text-xs line-clamp-2">
                        {fmt.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-[#c7c4d8]/60 flex items-center gap-2">
                  {isGen ? (
                    <>
                      <button
                        onClick={() => onNavigate('adapt')}
                        className="flex-1 bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold border border-[#c7c4d8] py-2 rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => onNavigate('clip_editor')}
                        className="flex-1 bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold border border-[#c7c4d8] py-2 rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>Edit</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleGenerateFormat(fmt.id)}
                      className="w-full bg-white hover:bg-[#4f46e5] hover:text-white text-[#4f46e5] text-xs font-semibold border border-[#4f46e5] py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      <span>Generate Format</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#c7c4d8] shadow-lg py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-32 bg-[#eaedff] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#4f46e5] h-full rounded-full transition-all duration-300"
                style={{ width: `${(generatedCount / formats.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#131b2e]">
              <span className="font-bold">{generatedCount} of {formats.length}</span>
              <span className="text-[#464555]">formats generated</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleGenerateAll}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] text-[#131b2e] font-semibold text-xs flex items-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">batch_prediction</span>
              <span>Generate All Remaining</span>
            </button>
            <button
              onClick={() => onNavigate('adapt')}
              className="px-5 py-2.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white font-semibold text-xs flex items-center gap-2 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Proceed to Platform Adaptation</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
