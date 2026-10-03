import React, { useState } from 'react';
import { ScreenId } from '../types';

interface CreateProjectScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CreateProjectScreen: React.FC<CreateProjectScreenProps> = ({ onNavigate }) => {
  const [projectName, setProjectName] = useState('My AI Podcast');
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedTranscript, setPastedTranscript] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('Podcast_Ep01_Raw.mp4');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col font-['Inter']">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-4 text-[#777587] text-xs">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-[#4f46e5] transition-colors cursor-pointer">
          Projects
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#131b2e] font-semibold">New Project</span>
      </nav>

      {/* Heading & Subheading */}
      <div className="mb-8">
        <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl text-[#131b2e] font-bold tracking-tight">
          Create New Project
        </h1>
        <p className="text-base text-[#464555] mt-1">
          Upload your media or transcript to let AI extract viral clips and multi-platform content.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Project Name Card */}
          <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-6 shadow-xs">
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
                className="w-full pl-11 pr-4 py-2.5 bg-white text-[#131b2e] border border-[#c7c4d8] rounded-lg text-sm focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 transition-all outline-none"
              />
            </div>
          </div>

          {/* Large Dashed Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`bg-white rounded-xl border-2 border-dashed p-10 text-center group cursor-pointer transition-all duration-200 relative ${
              dragActive ? 'border-[#4f46e5] bg-[#f2f3ff]/60' : 'border-[#c7c4d8] hover:border-[#4f46e5]/70 hover:bg-[#f2f3ff]/40'
            }`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              accept="video/*,audio/*,.txt"
            />
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#4f46e5] group-hover:scale-105 group-hover:bg-[#e2dfff]/60 transition-transform duration-200 mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[36px]">cloud_upload</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] mb-1">
                Drop your video here
              </h2>
              <p className="text-sm text-[#464555] mb-2">
                or <span className="text-[#4f46e5] font-semibold underline underline-offset-2">browse files</span>
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eaedff] text-[#464555] text-[11px] rounded-full border border-[#c7c4d8]/60">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Supported: MP4, MOV, MP3, TXT (up to 2GB)
              </span>
            </div>
          </div>

          {/* Alternative Input Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('transcript')}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <span className="text-[18px]">📁</span>
              <span>Upload Transcript</span>
            </button>
            <button
              type="button"
              onClick={() => setShowPasteModal(true)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <span className="text-[18px]">📋</span>
              <span>Paste Transcript</span>
            </button>
          </div>
        </div>

        {/* Right Column: Project Summary & Pro Tip (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Project Summary Card */}
          <div className="bg-white rounded-xl border border-[#c7c4d8]/70 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/50 mb-4">
              <h3 className="text-xs font-bold text-[#131b2e] flex items-center gap-2 font-['Plus_Jakarta_Sans']">
                <span className="material-symbols-outlined text-[#4f46e5] text-[18px]">summarize</span>
                Project Summary
              </h3>
              <span className="text-[#006c49] text-[11px] font-semibold flex items-center gap-1 bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                2 Assets Staged
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Video Status Tile */}
              <div className="bg-[#faf8ff] rounded-lg p-3.5 border border-[#c7c4d8]/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#4f46e5] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">movie</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#777587] font-semibold tracking-wider">VIDEO 45:32</span>
                    <span className="material-symbols-outlined text-[#006c49] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#131b2e] truncate mt-0.5">
                    {uploadedFileName}
                  </p>
                  <span className="text-[11px] text-[#464555] block mt-0.5">
                    640 MB • 1080p 60fps
                  </span>
                </div>
              </div>

              {/* Transcript Status Tile */}
              <div className="bg-[#faf8ff] rounded-lg p-3.5 border border-[#c7c4d8]/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3130c0] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#777587] font-semibold tracking-wider">TRANSCRIPT</span>
                    <span className="material-symbols-outlined text-[#006c49] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#131b2e] mt-0.5">
                    Detected
                  </p>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e2dfff]/60 text-[#4f46e5] text-[10px] font-semibold rounded-full">
                      <span className="material-symbols-outlined text-[13px]">sync</span>
                      Auto-sync ready
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Outputs list */}
            <div className="mt-6 pt-4 border-t border-[#c7c4d8]/50">
              <p className="text-[10px] text-[#777587] uppercase tracking-wider font-semibold mb-2">Automated Outputs</p>
              <div className="space-y-1.5 text-[#464555] text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">bolt</span>
                  <span>3-5 High-hook viral shorts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">bolt</span>
                  <span>Full episode timestamped outline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">bolt</span>
                  <span>Optimized X/Twitter thread &amp; recap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-[#f2f3ff] border border-[#dae2fd] rounded-xl p-4 flex gap-3 items-start">
            <span className="material-symbols-outlined text-[#4f46e5] text-[20px] shrink-0 mt-0.5">lightbulb</span>
            <p className="text-xs text-[#464555] leading-relaxed">
              <strong className="text-[#131b2e]">Pro Tip:</strong> Files with clear host dialogue produce higher quality vertical crop tracking and chapter summaries automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-6 border-t border-[#c7c4d8]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[#464555] text-xs order-2 sm:order-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#006c49]">check</span>
          <span>All changes automatically backed up</span>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto order-1 sm:order-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-1/2 sm:w-auto px-5 py-2.5 bg-white hover:bg-[#f2f3ff] border border-[#c7c4d8] hover:border-[#777587] text-[#131b2e] font-semibold text-xs rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            onClick={() => onNavigate('processing')}
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
