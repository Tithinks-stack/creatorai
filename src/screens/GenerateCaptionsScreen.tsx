import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/mockData';

interface GenerateCaptionsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GenerateCaptionsScreen: React.FC<GenerateCaptionsScreenProps> = ({ onNavigate }) => {
  const [platform, setPlatform] = useState<'linkedin' | 'instagram' | 'youtube' | 'x' | 'tiktok'>('linkedin');
  const [tone, setTone] = useState<'authoritative' | 'casual' | 'provocative' | 'concise'>('authoritative');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [copied, setCopied] = useState(false);

  const captionsByPlatform: Record<string, string> = {
    linkedin: `Most teams waste 20+ hours a week taking podcast recordings and turning them into generic snippets that get zero traction.

Here is the fundamental reality:
Reformatting is not repurposing. 

When you merely slice a horizontal video into a 9:16 rectangle without contextualizing the narrative hook for the feed, the algorithm immediately throttles reach.

In our latest discussion with Dr. Elena Vance, we dissected:
1. Dynamic speaker tracking vs static center-cropping
2. Why Contrarian Openers increase 3-second retention by 34%
3. How multi-modal AI models adapt the emotional resonance per platform

What is your current workflow for adapting long-form video? Let's discuss in the comments.

#ContentStrategy #VideoRepurposing #CreatorEconomy #ArtificialIntelligence #Podcasting`,
    instagram: `Stop posting 16:9 podcast crops to Reels 🛑 If they can’t read the hook in 1.2s, they swipe.

Here is what the top 1% of creators do instead:
✨ Dynamic camera tracking
✨ Kinetic bold captions
✨ Contrarian pattern disruptors

Tap the link in bio to watch Episode 14 on YouTube! 🎧

#reels #contentcreator #creatoreconomy #videoediting #podcastclips`,
    youtube: `The Truth About AI Video Repurposing (Why Most Creators Fail)

Is AI video repurposing actually good, or does it produce robotic slop? In this episode of My AI Podcast, Alex Rivera sits down with AI researcher Dr. Elena Vance to analyze the exact frameworks that generate millions of views without losing narrative authenticity.

TIMESTAMPS:
00:00 - The Repurposing Trap
00:14 - LinkedIn vs TikTok Algorithmic Differences
00:48 - Autonomous Multi-Modal Cropping
01:22 - The 3-Second Retention Hook

Subscribe for weekly episodes breaking down modern media tools!`,
    x: `Reformatting is not repurposing.

If you just crop a 16:9 video to 9:16, your content will fail. 

You need:
• Contrarian pattern disruption in sec 0-2
• Speaker-isolated framing
• Native feed copy that treats the audience with respect

Episode 14 is live now.`,
    tiktok: `Nobody tells you this about podcast clips 👀 Why the center crop is dead and what you need to do instead ⬇️ #podcast #creator #learnontiktok`
  };

  const [currentCaption, setCurrentCaption] = useState(captionsByPlatform[platform]);

  const handlePlatformChange = (p: typeof platform) => {
    setPlatform(p);
    setCurrentCaption(captionsByPlatform[p]);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <span className="text-indigo-600 font-bold">Generate Captions</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Social Post & Caption Generator</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <span className="material-symbols-outlined text-sm">closed_caption</span>
                Feed-Optimized Copy
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('adapt')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">devices</span>
              Platform Visuals
            </button>
            <button
              onClick={() => onNavigate('export')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-sm">file_download</span>
              Export Full Package
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Platform Selector & Tones */}
        <div className="lg:col-span-5 space-y-6">
          {/* Platform Tab Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-600 text-base">public</span>
              Target Distribution Channel
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePlatformChange('linkedin')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                  platform === 'linkedin'
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-blue-600 text-lg">work</span>
                LinkedIn Article & Post
              </button>

              <button
                onClick={() => handlePlatformChange('instagram')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                  platform === 'instagram'
                    ? 'bg-fuchsia-50 border-fuchsia-600 text-fuchsia-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-fuchsia-600 text-lg">photo_camera</span>
                Instagram Reels
              </button>

              <button
                onClick={() => handlePlatformChange('youtube')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                  platform === 'youtube'
                    ? 'bg-red-50 border-red-600 text-red-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-red-600 text-lg">smart_display</span>
                YouTube Description
              </button>

              <button
                onClick={() => handlePlatformChange('x')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                  platform === 'x'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-slate-700 text-lg">tag</span>
                X (Twitter) Post
              </button>
            </div>
          </div>

          {/* Tone & Style Adjustments */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-600 text-base">tune</span>
              Tone & Structure
            </h2>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setTone('authoritative')}
                className={`p-2.5 rounded-xl border text-left font-semibold ${
                  tone === 'authoritative' ? 'bg-indigo-50 border-indigo-600 text-indigo-900' : 'border-slate-200'
                }`}
              >
                💼 Thought Leader
              </button>
              <button
                onClick={() => setTone('casual')}
                className={`p-2.5 rounded-xl border text-left font-semibold ${
                  tone === 'casual' ? 'bg-indigo-50 border-indigo-600 text-indigo-900' : 'border-slate-200'
                }`}
              >
                ☕ Casual & Friendly
              </button>
              <button
                onClick={() => setTone('provocative')}
                className={`p-2.5 rounded-xl border text-left font-semibold ${
                  tone === 'provocative' ? 'bg-indigo-50 border-indigo-600 text-indigo-900' : 'border-slate-200'
                }`}
              >
                ⚡ Contrarian / Punchy
              </button>
              <button
                onClick={() => setTone('concise')}
                className={`p-2.5 rounded-xl border text-left font-semibold ${
                  tone === 'concise' ? 'bg-indigo-50 border-indigo-600 text-indigo-900' : 'border-slate-200'
                }`}
              >
                🎯 Bullet Summary
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer">
                <span>Include algorithmic hashtags</span>
                <input
                  type="checkbox"
                  checked={includeHashtags}
                  onChange={(e) => setIncludeHashtags(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer">
                <span>Include call-to-action (comment / tap link)</span>
                <input
                  type="checkbox"
                  checked={includeCTA}
                  onChange={(e) => setIncludeCTA(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
              </label>
            </div>

            <button
              onClick={() => {
                setCurrentCaption(currentCaption + "\n\n💡 Pro tip: Always engage in the first 60 minutes after posting.");
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">auto_fix_high</span>
              Enhance with AI Call-to-Action
            </button>
          </div>

          {/* Source Anchor Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <img
              src={IMAGES.podcastStudio}
              alt="Episode Source"
              className="w-14 h-12 rounded-lg object-cover"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">My AI Podcast - Ep. 14</span>
              <span className="text-[11px] text-slate-500">Source: Clip #1 (46s Highlight)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Caption Area & Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Generated Copy Preview
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {platform.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">
                    {currentCaption.length} characters
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </div>

              {/* Editable Text Area */}
              <textarea
                value={currentCaption}
                onChange={(e) => setCurrentCaption(e.target.value)}
                rows={16}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs md:text-sm text-slate-800 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-mono resize-none"
              />
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                <span>Algorithm readability: 98/100 (Optimal line breaks & spacing)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('adapt')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Back to Social Feed
                </button>
                <button
                  onClick={() => onNavigate('export')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-all hover:scale-[1.02]"
                >
                  Proceed to Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
