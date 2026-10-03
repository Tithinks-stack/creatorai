import React, { useState } from 'react';
import { useVideo } from '../context/VideoContext';
import { VideoUploader } from './VideoUploader';
import { UploadedVideo } from '../types';

interface UploadVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (video: UploadedVideo) => void;
}

export const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { activeVideo, addProjectFromVideo } = useVideo();
  const [projectTitle, setProjectTitle] = useState('');

  if (!isOpen) return null;

  const handleVideoUploaded = (video: UploadedVideo) => {
    setProjectTitle(video.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
  };

  const handleComplete = () => {
    if (activeVideo) {
      addProjectFromVideo(activeVideo, projectTitle || undefined);
      if (onSuccess) onSuccess(activeVideo);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#c7c4d8] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#c7c4d8]/60 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-lg">cloud_upload</span>
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                Upload Video to Workspace
              </h3>
              <p className="text-xs text-[#464555]">
                Process raw footage into viral clips, subtitles, and multi-platform media
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#777587] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Project Title Input */}
          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
              Project / Media Title
            </label>
            <input
              type="text"
              value={projectTitle || (activeVideo ? activeVideo.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') : '')}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. My AI Podcast Episode 01"
              className="w-full px-3.5 py-2.5 bg-white text-[#131b2e] border border-[#c7c4d8] rounded-xl text-xs font-['Inter'] focus:outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10"
            />
          </div>

          {/* Video Uploader Dropzone & Player */}
          <VideoUploader onVideoUploaded={handleVideoUploaded} />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#c7c4d8]/60 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-[#777587] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#006c49]">security</span>
            Secure local browser processing
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#c7c4d8] text-xs font-semibold text-[#131b2e] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              disabled={!activeVideo}
              className="px-5 py-2 rounded-xl bg-[#4f46e5] hover:bg-[#3525cd] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Save &amp; Open Project</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
