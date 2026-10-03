import React, { useState } from 'react';
import { ScreenId, Asset } from '../types';
import { useVideo } from '../context/VideoContext';
import { UploadVideoModal } from '../components/UploadVideoModal';

interface AssetLibraryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AssetLibraryScreen: React.FC<AssetLibraryScreenProps> = ({ onNavigate }) => {
  const { assets, setActiveVideo, uploadedVideos } = useVideo();
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Recently Updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);

  const filteredAssets = assets.filter((a) => {
    if (filterType === 'Videos' && a.type !== 'video') return false;
    if (filterType === 'Audio' && a.type !== 'audio') return false;
    if (filterType === 'Transcripts' && a.type !== 'transcript') return false;
    if (filterType === 'Clips' && a.type !== 'clip') return false;
    if (filterType === 'Graphics' && a.type !== 'image') return false;
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleOpenAsset = (asset: Asset) => {
    // If it corresponds to an uploaded video, set activeVideo
    const matchedUploaded = uploadedVideos.find((v) => v.name === asset.name);
    if (matchedUploaded) {
      setActiveVideo(matchedUploaded);
    }
    setPreviewAsset(asset);
  };

  const handleEditInClipEditor = (asset: Asset) => {
    const matchedUploaded = uploadedVideos.find((v) => v.name === asset.name);
    if (matchedUploaded) {
      setActiveVideo(matchedUploaded);
    }
    setPreviewAsset(null);
    onNavigate('clip_editor');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 font-['Inter'] pb-28">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-[#464555] text-xs mb-1">
            <span className="material-symbols-outlined text-[16px]">folder_special</span>
            <span>Workspace Library</span>
            <span>/</span>
            <span className="text-[#4f46e5] font-semibold">Active Repository</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            Asset Library &amp; Footage Hub
          </h1>
          <p className="text-sm text-[#464555] mt-1 max-w-2xl">
            All your raw videos, extracted clips, transcripts, and generated graphics in one organized workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('create_project')}
            className="bg-white text-[#131b2e] border border-[#c7c4d8] hover:bg-[#f2f3ff] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-150 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#464555]">add_circle</span>
            <span>New Project</span>
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-150 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span>+ Upload Video</span>
          </button>
        </div>
      </div>

      {/* Quick Storage & Stats Bar */}
      <div className="bg-white border border-[#c7c4d8] rounded-xl p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#4f46e5]">cloud</span>
              <span className="text-xs font-bold text-[#131b2e]">Storage Capacity</span>
            </div>
            <span className="text-xs text-[#464555]">
              <strong className="text-[#131b2e] font-bold">14.8 GB</strong> of 100 GB
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#f2f3ff] rounded-full overflow-hidden flex">
            <div className="h-full bg-[#4f46e5] rounded-full" style={{ width: '14.8%' }}></div>
          </div>
          <p className="text-[11px] text-[#464555] mt-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#006c49]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            85.2 GB free on your Creator Pro tier
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-[#f2f3ff] px-4 py-2.5 rounded-lg border border-[#c7c4d8]/60">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[20px]">video_file</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-base leading-tight text-[#131b2e] font-bold">
                {assets.filter((a) => a.type === 'video').length}
              </div>
              <div className="text-[11px] text-[#464555]">Master Recordings</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#f2f3ff] px-4 py-2.5 rounded-lg border border-[#c7c4d8]/60">
            <div className="w-8 h-8 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_videocam
              </span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-base leading-tight text-[#131b2e] font-bold">
                {assets.filter((a) => a.type === 'clip').length}
              </div>
              <div className="text-[11px] text-[#464555]">Extracted Clips</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets, transcripts, hooks, tags..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#c7c4d8] rounded-lg text-sm text-[#131b2e] placeholder:text-[#777587] focus:outline-none focus:border-[#4f46e5] shadow-xs"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#464555] hidden sm:inline font-medium">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-[#c7c4d8] text-[#131b2e] text-xs font-semibold py-2 px-3 rounded-lg shadow-xs cursor-pointer outline-none"
              >
                <option>Recently Updated</option>
                <option>File Size</option>
                <option>Duration</option>
                <option>Alphabetical</option>
              </select>
            </div>
            <div className="h-6 w-px bg-[#c7c4d8]"></div>
            <div className="flex items-center bg-[#f2f3ff] p-1 rounded-lg border border-[#c7c4d8]/60">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-white text-[#4f46e5] shadow-xs' : 'text-[#464555]'}`}
                title="Grid View"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#4f46e5] shadow-xs' : 'text-[#464555]'}`}
                title="List View"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 text-xs">
          {[
            { id: 'All', label: 'All Assets', count: assets.length },
            { id: 'Videos', label: 'Videos', icon: 'videocam', count: assets.filter((a) => a.type === 'video').length },
            { id: 'Clips', label: 'Short Clips', icon: 'movie_filter', count: assets.filter((a) => a.type === 'clip').length },
            { id: 'Transcripts', label: 'Transcripts', icon: 'description', count: assets.filter((a) => a.type === 'transcript').length },
            { id: 'Audio', label: 'Audio & Music', icon: 'graphic_eq', count: assets.filter((a) => a.type === 'audio').length },
            { id: 'Graphics', label: 'Social Posts & Graphics', icon: 'image', count: assets.filter((a) => a.type === 'image').length },
          ].map((pill) => {
            const isActive = filterType === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setFilterType(pill.id)}
                className={`h-8 px-3.5 rounded-full font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#e2e7ff] border border-[#4f46e5]/30 text-[#4f46e5] shadow-xs'
                    : 'bg-[#f2f3ff] text-[#464555] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
              >
                {pill.icon && <span className="material-symbols-outlined text-[16px]">{pill.icon}</span>}
                <span>{pill.label}</span>
                {pill.count !== undefined && (
                  <span className="bg-[#4f46e5] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {pill.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border border-[#c7c4d8] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              {/* Media Preview Slot */}
              {asset.type === 'transcript' ? (
                <div
                  onClick={() => onNavigate('transcript')}
                  className="relative w-full aspect-video bg-[#f2f3ff] p-4 flex flex-col justify-between border-b border-[#c7c4d8]/40 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-white border border-[#c7c4d8] px-2.5 py-1 rounded text-[11px] text-[#131b2e] font-mono flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#006c49]">article</span>
                      TEXT / TRANSCRIPT
                    </span>
                    <span className="bg-[#6ffbbe]/40 text-[#006c49] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                      99.2% Whisper
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#c7c4d8]/70 shadow-xs text-left">
                    <div className="text-[10px] text-[#777587] font-mono mb-1">[00:00:14] Host: Alex Mercer</div>
                    <p className="text-xs text-[#131b2e] italic line-clamp-2">
                      "Today we are talking about AI-first creator workflows, automated distribution loops, and the shift toward ambient generation..."
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#464555] font-mono">
                    <span>6,420 words</span>
                    <span>UTF-8 indexed</span>
                  </div>
                </div>
              ) : asset.type === 'audio' ? (
                <div className="relative w-full aspect-video bg-[#f2f3ff] p-5 flex flex-col justify-between border-b border-[#c7c4d8]/40">
                  <div className="flex items-center justify-between">
                    <span className="bg-white border border-[#c7c4d8] px-2.5 py-1 rounded text-[11px] text-[#131b2e] font-mono flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">music_note</span>
                      AUDIO STEM
                    </span>
                    <span className="bg-[#6ffbbe]/50 text-[#006c49] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      Royalty Free
                    </span>
                  </div>
                  {/* Waveform Bars */}
                  <div className="flex items-end justify-between gap-1 h-14 px-2 my-auto">
                    {[4, 8, 12, 6, 10, 14, 9, 11, 7, 13, 8, 5, 10, 7, 12, 9, 6, 4, 3].map((val, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full ${idx > 6 && idx < 13 ? 'bg-[#4f46e5]' : 'bg-[#c7c4d8]'}`}
                        style={{ height: `${val * 3.5}px` }}
                      ></span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#464555] font-mono">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">replay</span> Seamless Loop
                    </span>
                    <span>{asset.duration}</span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => handleOpenAsset(asset)}
                  className="relative w-full aspect-video bg-[#283044] overflow-hidden cursor-pointer"
                >
                  <img
                    src={asset.thumbnail}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#283044]/85 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                      {asset.resolution || asset.aspect || '1080p'}
                    </span>
                  </div>
                  {asset.duration && (
                    <div className="absolute bottom-3 right-3 bg-[#283044]/90 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                      {asset.duration}
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#283044]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAsset(asset);
                      }}
                      className="p-2.5 rounded-full bg-white text-[#4f46e5] hover:scale-110 transition-transform shadow-md cursor-pointer"
                      title="Play Video"
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditInClipEditor(asset);
                      }}
                      className="p-2.5 rounded-full bg-white text-[#131b2e] hover:text-[#4f46e5] hover:scale-110 transition-transform shadow-md cursor-pointer"
                      title="Edit Clip"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Card Meta Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#131b2e] truncate" title={asset.name}>
                      {asset.name}
                    </h3>
                    <p className="text-[11px] text-[#464555] mt-0.5">
                      {asset.size} • {asset.metadata}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#464555] text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-4 py-3 bg-[#f2f3ff]/50 border-t border-[#c7c4d8]/40 flex items-center justify-between text-xs">
              <span className="text-[#464555] text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span> {asset.updatedAt}
              </span>
              <button
                onClick={() => {
                  if (asset.type === 'transcript') onNavigate('transcript');
                  else if (asset.type === 'clip') onNavigate('adapt');
                  else handleEditInClipEditor(asset);
                }}
                className="text-[#4f46e5] hover:text-[#3525cd] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {asset.type === 'transcript' ? 'Show Notes' : asset.type === 'clip' ? 'Publish' : 'Edit in Clip Editor'}
                </span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Video Modal */}
      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => setIsUploadModalOpen(false)}
      />

      {/* Video Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl text-white">
            <div className="px-5 py-3.5 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">movie</span>
                <span className="text-xs font-bold truncate max-w-md">{previewAsset.name}</span>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="bg-black relative max-h-[500px] flex items-center justify-center">
              <video
                src={previewAsset.previewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                controls
                autoPlay
                className="w-full max-h-[460px] object-contain"
              />
            </div>

            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900">
              <div className="text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-white">{previewAsset.metadata}</p>
                <p>Duration: {previewAsset.duration || 'N/A'} • Size: {previewAsset.size}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewAsset(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleEditInClipEditor(previewAsset)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <span>Open in Clip Editor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
