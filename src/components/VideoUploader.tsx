import React, { useState, useRef } from 'react';
import { useVideo, SAMPLE_VIDEOS } from '../context/VideoContext';
import { UploadedVideo } from '../types';

interface VideoUploaderProps {
  onVideoUploaded?: (video: UploadedVideo) => void;
  className?: string;
  showSamplePicker?: boolean;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  onVideoUploaded,
  className = '',
  showSamplePicker = true,
}) => {
  const {
    activeVideo,
    setActiveVideo,
    uploadVideoFile,
    isUploading,
    uploadProgress,
    loadSampleVideo,
  } = useVideo();

  const [dragActive, setDragActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|webm|mkv|avi|m4v)$/i)) {
        setUploadError('Please select a valid video file (MP4, MOV, WEBM, MKV, AVI).');
        return;
      }
      try {
        const uploaded = await uploadVideoFile(file);
        if (onVideoUploaded) onVideoUploaded(uploaded);
      } catch (err: any) {
        setUploadError(err?.message || 'Failed to process video.');
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|webm|mkv|avi|m4v)$/i)) {
        setUploadError('Please select a valid video file (MP4, MOV, WEBM, MKV, AVI).');
        return;
      }
      try {
        const uploaded = await uploadVideoFile(file);
        if (onVideoUploaded) onVideoUploaded(uploaded);
      } catch (err: any) {
        setUploadError(err?.message || 'Failed to process video.');
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log('Autoplay prevented', e));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectSample = async (sampleKey: 'sample-podcast' | 'sample-techtalk' | 'sample-vlog') => {
    try {
      const sample = await loadSampleVideo(sampleKey);
      if (onVideoUploaded) onVideoUploaded(sample);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="text-red-500 hover:text-red-800">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Main Upload / Player Box */}
      {isUploading ? (
        /* Uploading State with progress */
        <div className="bg-white rounded-2xl border-2 border-[#4f46e5] p-8 md:p-12 text-center shadow-lg animate-pulse">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#4f46e5] mb-4 shadow-sm">
              <span className="material-symbols-outlined text-3xl animate-spin">sync</span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] mb-1">
              Uploading &amp; Analyzing Video Media...
            </h3>
            <p className="text-xs text-[#464555] mb-4">
              Extracting audio waveforms, video frames, and key scene metadata
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#f2f3ff] rounded-full h-3 p-0.5 border border-[#c7c4d8]/60 mb-2">
              <div
                className="bg-[#4f46e5] h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#777587]">
              <span>Transferring media</span>
              <span className="font-bold text-[#4f46e5]">{uploadProgress}%</span>
            </div>
          </div>
        </div>
      ) : activeVideo && activeVideo.url ? (
        /* Uploaded Active Video Preview Card */
        <div className="bg-white rounded-2xl border border-[#c7c4d8]/80 overflow-hidden shadow-sm hover:shadow-md transition-all">
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold truncate max-w-xs md:max-w-md font-['Plus_Jakarta_Sans']">
                {activeVideo.name}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4f46e5] text-white">
                {activeVideo.resolution || '1080p'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">cloud_upload</span>
                <span>Upload Another</span>
              </button>
            </div>
          </div>

          {/* Interactive HTML5 Video Player */}
          <div className="relative bg-black flex items-center justify-center overflow-hidden max-h-[460px] group">
            <video
              ref={videoRef}
              src={activeVideo.url}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full max-h-[420px] object-contain cursor-pointer"
              onClick={togglePlay}
              playsInline
              muted={isMuted}
            />

            {/* Big Center Play Overlay Button */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
                title="Play Video"
              >
                <div className="w-16 h-16 rounded-full bg-[#4f46e5] hover:bg-[#3525cd] text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                </div>
              </button>
            )}

            {/* Bottom Scrubber & Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 flex flex-col gap-2 transition-opacity">
              {/* Scrub Slider */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
              />

              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1 rounded hover:bg-white/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="p-1 rounded hover:bg-white/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                  </button>

                  <span className="font-mono text-[11px] text-white/90">
                    {formatSeconds(currentTime)} / {activeVideo.durationFormatted || formatSeconds(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/80">
                  <span className="px-1.5 py-0.5 rounded bg-white/20 font-mono">
                    {activeVideo.aspectRatio || '16:9'}
                  </span>
                  <span>{activeVideo.sizeFormatted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Action Strip */}
          <div className="p-4 bg-slate-50 border-t border-[#c7c4d8]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-[#464555]">
              <span className="flex items-center gap-1 font-semibold text-[#006c49]">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                Video Ready For AI
              </span>
              <span>•</span>
              <span>{activeVideo.durationFormatted} runtime</span>
              <span>•</span>
              <span>{activeVideo.sizeFormatted}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-[#c7c4d8] bg-white text-[#131b2e] hover:bg-[#f2f3ff] font-semibold transition-colors cursor-pointer"
              >
                Choose Different Video
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty / Initial Dropzone */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-10 md:p-12 text-center group cursor-pointer transition-all duration-200 relative ${
            dragActive
              ? 'border-[#4f46e5] bg-[#f2f3ff]/80 scale-[1.01]'
              : 'border-[#c7c4d8] hover:border-[#4f46e5] hover:bg-[#f2f3ff]/40 shadow-xs'
          }`}
        >
          <div className="max-w-md mx-auto flex flex-col items-center pointer-events-none">
            <div className="w-16 h-16 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-[#4f46e5] group-hover:scale-110 group-hover:bg-[#4f46e5] group-hover:text-white transition-all duration-200 mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[36px]">cloud_upload</span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e] mb-1.5">
              Upload Your Video
            </h2>
            <p className="text-sm text-[#464555] mb-3">
              Drag &amp; drop video file here, or{' '}
              <span className="text-[#4f46e5] font-semibold underline underline-offset-2">browse computer</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#777587]">
              <span className="px-2.5 py-1 bg-[#eaedff] text-[#4f46e5] font-semibold rounded-md">MP4</span>
              <span className="px-2.5 py-1 bg-[#eaedff] text-[#4f46e5] font-semibold rounded-md">MOV</span>
              <span className="px-2.5 py-1 bg-[#eaedff] text-[#4f46e5] font-semibold rounded-md">WEBM</span>
              <span className="px-2.5 py-1 bg-[#eaedff] text-[#4f46e5] font-semibold rounded-md">MKV</span>
              <span className="px-2 py-1 text-[#464555]">Up to 4GB</span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="video/mp4,video/quicktime,video/webm,video/x-matroska,video/avi,.mp4,.mov,.webm,.mkv,.avi"
      />

      {/* Quick Sample Video Picker for Testing */}
      {showSamplePicker && (
        <div className="bg-[#f2f3ff] border border-[#c7c4d8]/60 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4f46e5] text-lg">smart_display</span>
            <span className="text-xs font-bold text-[#131b2e]">Need a sample video to test with?</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectSample('sample-podcast')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#c7c4d8] hover:border-[#4f46e5] hover:text-[#4f46e5] text-xs font-medium text-[#131b2e] transition-colors cursor-pointer shadow-xs"
            >
              🎙️ Podcast (1080p)
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('sample-techtalk')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#c7c4d8] hover:border-[#4f46e5] hover:text-[#4f46e5] text-xs font-medium text-[#131b2e] transition-colors cursor-pointer shadow-xs"
            >
              💻 Tech Talk (4K)
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('sample-vlog')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#c7c4d8] hover:border-[#4f46e5] hover:text-[#4f46e5] text-xs font-medium text-[#131b2e] transition-colors cursor-pointer shadow-xs"
            >
              📱 Vertical Reel (9:16)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
