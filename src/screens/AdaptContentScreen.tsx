import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface AdaptContentScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdaptContentScreen: React.FC<AdaptContentScreenProps> = ({ onNavigate }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'shorts' | 'linkedin' | 'x' | 'tiktok'>('instagram');
  const [ctaEnabled, setCtaEnabled] = useState(true);
  const [captionText, setCaptionText] = useState(
    `AI isn't replacing programmers overnight — but it is changing how the best ones work. 💻⚡\n\nIf you're still writing boilerplate code manually, you're giving away hours of high-leverage thinking time every single day. Here's our workflow breakdown.\n\nDrop your thoughts below 👇\n\n#AI #Programming #WebDev #TechCreators`
  );
  const [isLiked, setIsLiked] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShorten = () => {
    setCaptionText(
      `AI isn't replacing coders — it's empowering them. 💻⚡\n\nStop writing manual boilerplate. Turn AI into your 24/7 senior mentor.\n\nDrop your thoughts below 👇\n\n#AI #Coding #Dev`
    );
  };

  const handleAddEmojis = () => {
    if (!captionText.includes('🚀')) {
      setCaptionText((prev) => `${prev} 🚀🔥💡`);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 font-['Inter']">
      {/* Top Meta Hierarchy */}
      <div className="flex flex-col gap-3">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#464555]">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
            Projects
          </button>
          <span className="text-[#c7c4d8] font-bold">›</span>
          <button onClick={() => onNavigate('repurpose')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
            My AI Podcast
          </button>
          <span className="text-[#c7c4d8] font-bold">›</span>
          <span className="text-[#131b2e] font-semibold">Adapt Content</span>
        </nav>

        {/* Title & Platform Segment Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Adapt Content
            </h1>
            <p className="text-sm text-[#464555] mt-0.5">
              Review and fine-tune AI-adapted content before scheduling or publishing.
            </p>
          </div>

          {/* Platform Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#c7c4d8] shadow-xs overflow-x-auto">
            <button
              onClick={() => setSelectedPlatform('instagram')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                selectedPlatform === 'instagram'
                  ? 'bg-[#4f46e5] text-white'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>Instagram</span>
              <span className="px-1.5 py-0.2 bg-white/20 text-white rounded-full text-[10px] font-bold">Reels</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('shorts')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedPlatform === 'shorts'
                  ? 'bg-[#4f46e5] text-white'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              <span>YouTube Shorts</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('linkedin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedPlatform === 'linkedin'
                  ? 'bg-[#4f46e5] text-white'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">work</span>
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('x')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedPlatform === 'x'
                  ? 'bg-[#4f46e5] text-white'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">tag</span>
              <span>X (Twitter)</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('tiktok')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedPlatform === 'tiktok'
                  ? 'bg-[#4f46e5] text-white'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">music_note</span>
              <span>TikTok</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Social Feed Simulator (Phone Frame) */}
        <section className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[370px] bg-white rounded-3xl border border-[#c7c4d8] shadow-md p-4 flex flex-col gap-3">
            {/* Instagram Header inside phone frame */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] tracking-tight">Reels</span>
                <span className="material-symbols-outlined text-[#777587] text-[18px]">expand_more</span>
              </div>
              <div className="flex items-center gap-3 text-[#131b2e]">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                <span className="material-symbols-outlined text-[20px]">send</span>
              </div>
            </div>

            {/* 9:16 Vertical Video Canvas */}
            <div className="relative w-full aspect-9/16 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group">
              <img
                src={IMAGES.reelsDarkStudio}
                alt="Podcast Reel Video Still"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>

              {/* Safe-Zone Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-semibold border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                <span>Reel Safe-Zone: On</span>
              </div>
              <div className="absolute top-3 right-3 text-white/90 hover:text-white cursor-pointer bg-black/40 backdrop-blur-xs p-1.5 rounded-full">
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
              </div>

              {/* Center Kinetic Subtitle Preview */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-center text-center px-2 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                  <span className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold text-yellow-300 drop-shadow-md">
                    You're probably using AI wrong.
                  </span>
                </div>
              </div>

              {/* Right-Hand Action Rail */}
              <div className="absolute right-3 bottom-14 flex flex-col items-center gap-4 text-white z-10">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                    <span
                      className={`material-symbols-outlined text-[24px] ${isLiked ? 'text-red-500' : 'text-white'}`}
                      style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold drop-shadow">{isLiked ? '1.2k' : '1.1k'}</span>
                </button>

                <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                  </div>
                  <span className="text-[11px] font-semibold drop-shadow">84</span>
                </div>

                <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">send</span>
                  </div>
                  <span className="text-[11px] font-semibold drop-shadow">Share</span>
                </div>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                    <span
                      className={`material-symbols-outlined text-[22px] ${isBookmarked ? 'text-yellow-400' : 'text-white'}`}
                      style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </div>
                </button>

                {/* Spinning vinyl audio thumbnail */}
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden animate-[spin_8s_linear_infinite] mt-1 shadow-md bg-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-white">album</span>
                </div>
              </div>

              {/* Bottom Creator Tag & Sound Info */}
              <div className="absolute left-3 right-16 bottom-3 flex flex-col gap-1.5 text-white z-10">
                <div className="flex items-center gap-2">
                  <img src={IMAGES.avatar} alt="Studio Avatar" className="w-7 h-7 rounded-full border border-white/60 object-cover" />
                  <span className="text-xs font-bold drop-shadow">@creatorai_studio</span>
                  <span className="text-white/60 text-[10px]">• 2h ago</span>
                  <button className="px-2 py-0.5 rounded-full border border-white/50 text-[10px] font-semibold hover:bg-white/20 transition-colors cursor-pointer">
                    Follow
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
                  <span className="truncate">Original Audio - CreatorAi</span>
                </div>
              </div>
            </div>

            {/* Below Video Caption Preview */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#c7c4d8] flex flex-col gap-1.5 text-xs">
              <div>
                <span className="font-semibold text-[#131b2e] mr-1.5">creatorai_studio</span>
                <span className="text-[#464555] leading-snug">
                  AI isn't replacing programmers overnight — but it is changing how the best ones work. 💻⚡
                </span>
                <button className="text-[#777587] hover:text-[#131b2e] font-semibold text-[11px] ml-1 cursor-pointer">
                  ... more
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-0.5 text-[#3525cd] font-medium text-[11px]">
                <span>#AI</span>
                <span>#Programming</span>
                <span>#WebDev</span>
                <span>#TechCreators</span>
              </div>
            </div>

            {/* Simulator Footer */}
            <div className="flex items-center justify-between text-[#777587] text-[11px] px-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                Live Feed Rendering 1080×1920
              </span>
              <button onClick={() => onNavigate('clip_editor')} className="hover:text-[#3525cd] transition-colors flex items-center gap-0.5 cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">open_in_full</span>
                <span>Full Screen</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: AI Adaptation Inspector & Controls */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          {/* Status Banner */}
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 flex items-start gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/15 text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#065F46] font-['Plus_Jakarta_Sans']">
                  AI adapted this content for Instagram
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#D1FAE5] text-[#047857] rounded-md">
                  Optimized
                </span>
              </div>
              <p className="text-xs text-[#065F46]/90 mt-0.5">
                Optimized for Reels algorithm &amp; 3-sec retention benchmark with dynamic text spacing.
              </p>
            </div>
          </div>

          {/* Section 1: Hook & Caption */}
          <div className="bg-white rounded-2xl border border-[#c7c4d8] p-6 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd] text-[20px]">edit_note</span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Hook &amp; Caption</h2>
              </div>
              <span className="text-[11px] text-[#777587] font-mono">{captionText.length} / 2,200 characters</span>
            </div>

            <div className="relative">
              <textarea
                value={captionText}
                onChange={(e) => setCaptionText(e.target.value)}
                rows={5}
                className="w-full bg-white text-[#131b2e] text-xs rounded-xl border border-[#c7c4d8] focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 p-3.5 outline-none transition-all resize-none"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShorten}
                  className="px-2.5 py-1 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#464555] hover:text-[#131b2e] rounded-md text-[11px] font-semibold border border-[#c7c4d8] flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  <span>Shorten</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddEmojis}
                  className="px-2.5 py-1 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#464555] hover:text-[#131b2e] rounded-md text-[11px] font-semibold border border-[#c7c4d8] flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">add_reaction</span>
                  <span>Add Emojis</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#464555] pt-1 border-t border-[#eaedff]">
              <span>Hook metric: <strong className="text-[#006c49] font-bold">94% Retention Score</strong></span>
              <button
                onClick={() => onNavigate('hooks')}
                className="text-[#3525cd] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View alternative hooks (3)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Section 2 & 3: Audio & Aspect Safe-zone (Bento Grid Pair) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Audio */}
            <div className="bg-white rounded-2xl border border-[#c7c4d8] p-4 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                    <span className="material-symbols-outlined text-[#3525cd] text-[18px]">music_note</span>
                    Selected Audio
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#006c49]/10 text-[#006c49] text-[10px] font-bold">
                    Trending
                  </span>
                </div>
                <div className="p-2.5 bg-[#f2f3ff] rounded-xl border border-[#c7c4d8]/60 flex items-center gap-3">
                  <button className="w-8 h-8 rounded-lg bg-[#4f46e5] text-white flex items-center justify-center shrink-0 hover:bg-[#3525cd] transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#131b2e] truncate">Subtle Tech Beat</p>
                    <p className="text-[11px] text-[#464555] truncate">Ducks -14dB during dialogue</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('assets')}
                className="w-full py-2 px-3 border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg hover:bg-[#f2f3ff] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                <span>Change Audio Track</span>
              </button>
            </div>

            {/* Aspect & Safe-Zone */}
            <div className="bg-white rounded-2xl border border-[#c7c4d8] p-4 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                    <span className="material-symbols-outlined text-[#3525cd] text-[18px]">crop_portrait</span>
                    Aspect &amp; Safe-Zone
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-bold">
                    Auto-Framed
                  </span>
                </div>
                <div className="p-2.5 bg-[#f2f3ff] rounded-xl border border-[#c7c4d8]/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#dae2fd] flex items-center justify-center text-[#3525cd] font-bold text-xs shrink-0">
                    9:16
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#131b2e] truncate">Vertical Reel Format</p>
                    <p className="text-[11px] text-[#464555] truncate">Optimal Instagram safe-zones applied</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-[#464555]">Subtitle positioning</span>
                <span className="text-xs text-[#3525cd] font-bold">Center-Locked</span>
              </div>
            </div>
          </div>

          {/* Section 4: Call-To-Action Overlay Toggle */}
          <div className="bg-white rounded-2xl border border-[#c7c4d8] p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e2dfff]/40 flex items-center justify-center text-[#3525cd]">
                <span className="material-symbols-outlined text-[22px]">call_to_action</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#131b2e] font-['Plus_Jakarta_Sans']">Call-To-Action Overlay</h4>
                <p className="text-xs text-[#464555]">Display "Drop your thoughts below 👇" sticker at final 3 seconds</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCtaEnabled(!ctaEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                ctaEnabled ? 'bg-[#4f46e5]' : 'bg-[#c7c4d8]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  ctaEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Section 5: Bottom Button Group Actions */}
          <div className="bg-white rounded-2xl border border-[#c7c4d8] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-1">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCaptionText("AI isn't replacing programmers overnight — but it is changing how the best ones work. 💻⚡\n\nIf you're still writing boilerplate code manually, you're giving away hours of high-leverage thinking time every single day. Here's our workflow breakdown.\n\nDrop your thoughts below 👇\n\n#AI #Programming #WebDev #TechCreators")}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-[#c7c4d8] hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Regenerate Adaptation</span>
              </button>
              <button
                onClick={() => onNavigate('captions')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-[#c7c4d8] hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Caption</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('export')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] active:scale-[0.98] text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Approve &amp; Continue to Export</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
