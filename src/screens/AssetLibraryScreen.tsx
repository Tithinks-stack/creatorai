import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS_DATA } from '../data/mockData';

interface AssetLibraryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AssetLibraryScreen: React.FC<AssetLibraryScreenProps> = ({ onNavigate }) => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Recently Updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const filteredAssets = ASSETS_DATA.filter((a) => {
    if (filterType === 'Videos' && a.type !== 'video') return false;
    if (filterType === 'Audio' && a.type !== 'audio') return false;
    if (filterType === 'Transcripts' && a.type !== 'transcript') return false;
    if (filterType === 'Clips' && a.type !== 'clip') return false;
    if (filterType === 'Graphics' && a.type !== 'image') return false;
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
            Asset Library
          </h1>
          <p className="text-sm text-[#464555] mt-1 max-w-2xl">
            All your raw videos, extracted clips, transcripts, and generated graphics in one organized workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white text-[#131b2e] border border-[#c7c4d8] hover:bg-[#f2f3ff] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-150 shadow-xs cursor-pointer active:scale-[0.98]">
            <span className="material-symbols-outlined text-[18px] text-[#464555]">create_new_folder</span>
            <span>New Folder</span>
          </button>
          <button
            onClick={() => onNavigate('create_project')}
            className="bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-150 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span>+ Upload Asset</span>
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
              <strong className="text-[#131b2e] font-bold">14.2 GB</strong> of 100 GB
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#f2f3ff] rounded-full overflow-hidden flex">
            <div className="h-full bg-[#4f46e5] rounded-full" style={{ width: '14.2%' }}></div>
          </div>
          <p className="text-[11px] text-[#464555] mt-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#006c49]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            85.8 GB free on your Creator Pro tier
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-[#f2f3ff] px-4 py-2.5 rounded-lg border border-[#c7c4d8]/60">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[20px]">video_file</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-base leading-tight text-[#131b2e] font-bold">12</div>
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
              <div className="font-['Plus_Jakarta_Sans'] text-base leading-tight text-[#131b2e] font-bold">34</div>
              <div className="text-[11px] text-[#464555]">AI Clips Generated</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#f2f3ff] px-4 py-2.5 rounded-lg border border-[#c7c4d8]/60">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006c49]">
              <span className="material-symbols-outlined text-[20px]">article</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-base leading-tight text-[#131b2e] font-bold">9</div>
              <div className="text-[11px] text-[#464555]">Transcripts Indexed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Workspaces & Folders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#464555]" style={{ fontVariationSettings: "'FILL' 1" }}>
              push_pin
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Pinned Workspaces &amp; Folders</h2>
          </div>
          <button className="text-xs text-[#4f46e5] font-semibold hover:underline flex items-center gap-1 cursor-pointer">
            <span>View all folders</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#c7c4d8] hover:border-[#4f46e5]/60 hover:shadow-md transition-all duration-200 rounded-xl p-4 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#e2dfff]/50 group-hover:bg-[#e2dfff] text-[#4f46e5] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors truncate">
                  My AI Podcast (Season 1)
                </h3>
                <p className="text-[11px] text-[#464555]">18 files • updated 2h ago</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#777587] text-[18px]">more_vert</span>
          </div>

          <div className="bg-white border border-[#c7c4d8] hover:border-[#4f46e5]/60 hover:shadow-md transition-all duration-200 rounded-xl p-4 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#eaedff] group-hover:bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors truncate">
                  College Tech Talk Series
                </h3>
                <p className="text-[11px] text-[#464555]">9 files • updated yesterday</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#777587] text-[18px]">more_vert</span>
          </div>

          <div className="bg-white border border-[#c7c4d8] hover:border-[#4f46e5]/60 hover:shadow-md transition-all duration-200 rounded-xl p-4 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#eaedff] group-hover:bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors truncate">
                  Viral TikTok Hooks &amp; B-Roll
                </h3>
                <p className="text-[11px] text-[#464555]">15 files • updated 3 days ago</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#777587] text-[18px]">more_vert</span>
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
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#f2f3ff] px-1.5 py-0.5 rounded text-[#464555] border border-[#c7c4d8]/60 font-mono">
              Ctrl + F
            </span>
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
            { id: 'All', label: 'All Assets', count: 42 },
            { id: 'Videos', label: 'Videos (12)', icon: 'videocam' },
            { id: 'Audio', label: 'Audio & Music (8)', icon: 'graphic_eq' },
            { id: 'Transcripts', label: 'Transcripts (9)', icon: 'description' },
            { id: 'Clips', label: 'Short Clips (13)', icon: 'movie_filter' },
            { id: 'Graphics', label: 'Social Posts & Graphics', icon: 'image' },
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
                {pill.count && (
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
                <div className="relative w-full aspect-video bg-[#f2f3ff] p-4 flex flex-col justify-between border-b border-[#c7c4d8]/40">
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
                <div className="relative w-full aspect-video bg-[#283044] overflow-hidden">
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
                      onClick={() => onNavigate('clip_editor')}
                      className="p-2.5 rounded-full bg-white text-[#4f46e5] hover:scale-110 transition-transform shadow-md cursor-pointer"
                      title="Preview"
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                    </button>
                    <button
                      onClick={() => onNavigate('repurpose')}
                      className="p-2.5 rounded-full bg-white text-[#131b2e] hover:text-[#4f46e5] hover:scale-110 transition-transform shadow-md cursor-pointer"
                      title="Repurpose"
                    >
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
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
                  <span className="material-symbols-outlined text-[#777587] text-[18px]">more_vert</span>
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
                  else onNavigate('clip_editor');
                }}
                className="text-[#4f46e5] hover:text-[#3525cd] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {asset.type === 'transcript' ? 'Show Notes' : asset.type === 'clip' ? 'Publish' : 'Extract Highlights'}
                </span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Batch Actions Dock */}
      <div className="mt-4 p-4 rounded-xl bg-white border border-[#c7c4d8]/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#4f46e5]">
            <span className="material-symbols-outlined text-[20px]">tips_and_updates</span>
          </span>
          <div>
            <span className="text-xs font-bold text-[#131b2e]">Pro Creator Tip: Batch Auto-Repurposing</span>
            <p className="text-xs text-[#464555]">Select multiple master clips to queue automated AI shorts, transcripts, and carousel slides in parallel.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold px-3.5 py-2 rounded-lg border border-[#c7c4d8] transition-colors flex items-center gap-1.5 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Sync Cloud Backup</span>
          </button>
          <button
            onClick={() => onNavigate('repurpose')}
            className="bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>Batch AI Repurpose</span>
          </button>
        </div>
      </div>
    </div>
  );
};
