import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { useVideo } from '../context/VideoContext';
import { VideoUploader } from '../components/VideoUploader';

interface CreateProjectScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CreateProjectScreen: React.FC<CreateProjectScreenProps> = ({ onNavigate }) => {
  const { activeVideo, addProjectFromVideo } = useVideo();
  const [projectName, setProjectName] = useState(
    activeVideo ? activeVideo.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') : 'My AI Podcast'
  );
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedTranscript, setPastedTranscript] = useState('');

  // Sync project name when activeVideo changes
  useEffect(() => {
    if (activeVideo) {
      setProjectName(activeVideo.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
    }
  }, [activeVideo]);

  const handleContinueToAI = () => {
    if (activeVideo) {
      addProjectFromVideo(activeVideo, projectName);
    }
    onNavigate('ai_progress');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col font-['Inter']">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-4 text-[#777587] text-xs">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
          Projects
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#131b2e] font-semibold">New Project &amp; Video Upload</span>
      </nav>

      {/* Heading & Subheading */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl text-[#131b2e] font-bold tracking-tight">
            Upload Video &amp; Create Project
          </h1>
          <p className="text-base text-[#464555] mt-1">
            Upload your footage to extract viral clips, generate synchronized subtitles, and repurpose for social channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Video Processing Engine Ready
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Project Settings & Video Uploader */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Project Name Card */}
          <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-5 shadow-xs">
            <label className="block text-xs font-semibold text-[#131b2e] mb-2" htmlFor="project-name">
              Project Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">
                edit_note
              </span>
              <input
                id="project-name"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Give your project a title..."
                className="w-full pl-11 pr-4 py-2.5 bg-white text-[#131b2e] border border-[#c7c4d8] rounded-lg text-sm focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 transition-all outline-none"
              />
            </div>
          </div>

          {/* Interactive Video Uploader with Drag/Drop & Real Playback Preview */}
          <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#c7c4d8]/40">
              <h2 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4f46e5] text-lg">movie_filter</span>
                <span>Video Footage Source</span>
              </h2>
              <span className="text-xs text-[#777587]">Supports MP4, MOV, WEBM, MKV</span>
            </div>

            <VideoUploader showSamplePicker={true} />
          </div>

          {/* Alternative Input Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('transcript')}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#4f46e5] text-lg">transcribe</span>
              <span>Upload / Edit Transcript</span>
            </button>
            <button
              type="button"
              onClick={() => setShowPasteModal(true)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#4f46e5] text-lg">content_paste</span>
              <span>Paste Text / Script</span>
            </button>
          </div>
        </div>

        {/* Right Column: Project Summary & Pro Tip (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Project Summary Card */}
          <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-6 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/50 mb-4">
              <h3 className="text-xs font-bold text-[#131b2e] flex items-center gap-2 font-['Plus_Jakarta_Sans']">
                <span className="material-symbols-outlined text-[#4f46e5] text-[18px]">summarize</span>
                Staged Media Summary
              </h3>
              <span className="text-[#006c49] text-[11px] font-semibold flex items-center gap-1 bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                Ready for Pipeline
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Dynamic Video Status Tile */}
              <div className="bg-[#faf8ff] rounded-lg p-3.5 border border-[#c7c4d8]/60 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#4f46e5] shrink-0 mt-0.5 overflow-hidden">
                  {activeVideo?.thumbnailUrl ? (
                    <img
                      src={activeVideo.thumbnailUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[20px]">movie</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#777587] font-semibold tracking-wider uppercase">
                      VIDEO {activeVideo?.durationFormatted || '45:32'}
                    </span>
                    <span
                      className="material-symbols-outlined text-[#006c49] text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#131b2e] truncate mt-0.5">
                    {activeVideo?.name || 'No video selected'}
                  </p>
                  <span className="text-[11px] text-[#464555] block mt-0.5">
                    {activeVideo?.sizeFormatted || '640 MB'} • {activeVideo?.resolution || '1080p 60fps'}
                  </span>
                </div>
              </div>

              {/* Transcript Status Tile */}
              <div className="bg-[#faf8ff] rounded-lg p-3.5 border border-[#c7c4d8]/60 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3130c0] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#777587] font-semibold tracking-wider">AUDIO TRANSCRIPTION</span>
                    <span
                      className="material-symbols-outlined text-[#006c49] text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#131b2e] mt-0.5">
                    Whisper AI Auto-Diarization
                  </p>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e2dfff]/60 text-[#4f46e5] text-[10px] font-semibold rounded-full">
                      <span className="material-symbols-outlined text-[13px]">sync</span>
                      Auto-extract enabled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Outputs list */}
            <div className="mt-6 pt-4 border-t border-[#c7c4d8]/50">
              <p className="text-[10px] text-[#777587] uppercase tracking-wider font-semibold mb-2">Automated Outputs</p>
              <div className="space-y-2 text-[#464555] text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">bolt</span>
                  <span>3-5 High-hook viral shorts with animated subs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">bolt</span>
                  <span>9:16 vertical face auto-crop tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">bolt</span>
                  <span>Optimized X/Twitter thread &amp; LinkedIn recap</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button in Sidebar */}
            <div className="mt-6 pt-4 border-t border-[#c7c4d8]/50">
              <button
                onClick={handleContinueToAI}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#4f46e5] hover:bg-[#3525cd] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Launch AI Video Analysis</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-[#f2f3ff] border border-[#dae2fd] rounded-xl p-4 flex gap-3 items-start">
            <span className="material-symbols-outlined text-[#4f46e5] text-[20px] shrink-0 mt-0.5">lightbulb</span>
            <p className="text-xs text-[#464555] leading-relaxed">
              <strong className="text-[#131b2e]">Pro Tip:</strong> Uploading high-resolution footage (1080p or 4K) allows our AI to generate lossless 9:16 vertical crops with sharp facial centering.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-6 border-t border-[#c7c4d8]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[#464555] text-xs order-2 sm:order-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#006c49]">check</span>
          <span>Project settings and uploaded footage saved locally</span>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto order-1 sm:order-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-1/2 sm:w-auto px-5 py-2.5 bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            Cancel / Back to Dashboard
          </button>
          <button
            onClick={handleContinueToAI}
            className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#4f46e5] hover:bg-[#3525cd] text-white font-semibold text-xs rounded-lg shadow-xs focus:ring-4 focus:ring-[#4f46e5]/20 transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <span>Continue to AI Analysis</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Paste Transcript Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c7c4d8]">
            <h3 className="text-base font-bold text-[#131b2e] mb-2 font-['Plus_Jakarta_Sans']">Paste Transcript</h3>
            <p className="text-xs text-[#464555] mb-4">
              Paste your text or timestamped transcript below for automated speaker diarization.
            </p>
            <textarea
              rows={6}
              value={pastedTranscript}
              onChange={(e) => setPastedTranscript(e.target.value)}
              placeholder="[00:00:00] Speaker 1: Welcome to today's episode..."
              className="w-full p-3 border border-[#c7c4d8] rounded-xl text-xs font-mono text-[#131b2e] focus:outline-none focus:border-[#4f46e5] mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 border border-[#c7c4d8] rounded-lg text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg text-xs font-semibold hover:bg-[#3525cd] cursor-pointer"
              >
                Apply Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
