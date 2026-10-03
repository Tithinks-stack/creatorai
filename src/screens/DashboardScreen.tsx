import React, { useState } from 'react';
import { ScreenId } from '../types';
import { useVideo } from '../context/VideoContext';
import { UploadVideoModal } from '../components/UploadVideoModal';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const { projects, activeVideo, setActiveVideo, uploadedVideos } = useVideo();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const tools = [
    {
      id: 'video',
      category: 'Video',
      title: 'Upload & Analyze Video',
      desc: 'Find important moments automatically',
      footer: 'Auto scene detection',
      icon: 'video_library',
      screen: 'create_project' as ScreenId,
    },
    {
      id: 'transcript',
      category: 'Transcript',
      title: 'Create / Analyze Transcript',
      desc: 'Turn spoken content into usable text',
      footer: '99.2% Whisper precision',
      icon: 'transcribe',
      screen: 'transcript' as ScreenId,
    },
    {
      id: 'suggestions',
      category: 'AI Suggestions',
      title: 'Find Content Ideas',
      desc: 'Discover clips, hooks and important moments',
      footer: 'Viral retention scoring',
      icon: 'lightbulb',
      screen: 'suggestions' as ScreenId,
    },
    {
      id: 'hooks',
      category: 'Hooks',
      title: 'Generate Hooks',
      desc: 'Create engaging opening lines',
      footer: 'First 3-second triggers',
      icon: 'flare',
      screen: 'hooks' as ScreenId,
    },
    {
      id: 'captions',
      category: 'Captions',
      title: 'Generate Captions',
      desc: 'Create captions and descriptions',
      footer: 'Dynamic animated styles',
      icon: 'subtitles',
      screen: 'captions' as ScreenId,
    },
    {
      id: 'repurpose',
      category: 'Repurpose',
      title: 'Repurpose Content',
      desc: 'Turn one piece of content into multiple formats',
      footer: '1 Video → 8 Assets',
      icon: 'sync_alt',
      screen: 'repurpose' as ScreenId,
    },
    {
      id: 'adapt',
      category: 'Platform Adaptation',
      title: 'Adapt for Platforms',
      desc: 'Instagram • YouTube • LinkedIn • X',
      footer: '9:16, 1:1, 16:9 auto-crop',
      icon: 'devices',
      screen: 'adapt' as ScreenId,
    },
    {
      id: 'analytics',
      category: 'Analytics',
      title: 'Creator Insights',
      desc: 'Understand what content performs well',
      footer: 'Audience retention curves',
      icon: 'analytics',
      screen: 'analytics' as ScreenId,
    },
  ];

  const handleEditProject = (projId: string) => {
    // Check if matched video exists
    const matched = uploadedVideos.find((v) => `proj_${v.id}` === projId || v.name.includes(projId));
    if (matched) {
      setActiveVideo(matched);
    }
    onNavigate('clip_editor');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-['Inter']">
      {/* Greeting Header Block */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl text-[#131b2e] font-bold tracking-tight">
            Good morning, Creator 👋
          </h1>
          <p className="text-base text-[#464555] max-w-2xl">
            What would you like to create today? Transform raw footage into polished viral releases with AI automation.
          </p>
        </div>

        {/* Upload Video Call-to-Action & Engine status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#eaedff] border border-[#c7c4d8]/60 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="text-xs text-[#131b2e] font-semibold">AI Video Pipeline: Ready</span>
          </div>

          <button
            onClick={() => onNavigate('create_project')}
            className="px-4 py-2 bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">cloud_upload</span>
            <span>Upload New Video</span>
          </button>
        </div>
      </section>

      {/* Quick Video Drop Banner Card */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/20 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold tracking-wide uppercase">
              <span className="material-symbols-outlined text-sm">bolt</span>
              Instant AI Repurposing
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight">
              Have a raw video file? Drop it in now.
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
              CreatorAi automatically transcribes speech, cuts viral hooks, inserts dynamic Hormozi subtitles, and reframes to 9:16 vertical.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('create_project')}
              className="px-5 py-3 bg-white text-[#4f46e5] hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">upload_file</span>
              <span>Upload Video (MP4/MOV)</span>
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl transition-all border border-white/20 cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">video_library</span>
              <span>Quick Upload Modal</span>
            </button>
          </div>
        </div>
      </section>

      {/* Creative Studio Tools Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] flex items-center gap-2">
            <span>Creative Studio Tools</span>
            <span className="text-[11px] bg-[#e2dfff] text-[#0f0069] font-bold px-2 py-0.5 rounded-full">
              8 Capabilities
            </span>
          </h2>
          <span className="text-xs text-[#464555] hidden sm:inline-block">Select a workflow to begin auto-processing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => onNavigate(t.screen)}
              className="group relative bg-white border border-[#c7c4d8] hover:border-[#4f46e5] rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between active:scale-[0.98] text-left cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#f2f3ff] text-[#4f46e5] group-hover:bg-[#4f46e5] group-hover:text-white flex items-center justify-center transition-colors duration-200 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">{t.icon}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#4f46e5] font-bold uppercase tracking-wider">{t.category}</span>
                    <span className="material-symbols-outlined text-[#777587] text-base group-hover:translate-x-0.5 group-hover:text-[#4f46e5] transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] mt-1 group-hover:text-[#4f46e5] transition-colors">
                    {t.title}
                  </h3>
                </div>
                <p className="text-xs text-[#464555] leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#e2e7ff] flex items-center gap-2 text-[#777587] text-xs">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>{t.footer}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">Recent Projects &amp; Video Media</h2>
            <p className="text-xs text-[#464555]">Continue editing or push repurposed deliverables to social queues</p>
          </div>
          <button
            onClick={() => onNavigate('workflow')}
            className="inline-flex items-center gap-1 text-xs text-[#4f46e5] hover:text-[#3525cd] font-semibold transition-colors cursor-pointer"
          >
            <span>View all projects</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-[#c7c4d8] rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#eaedff]">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2.5 right-2.5 bg-[#283044]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    <span>{proj.duration}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        proj.status === 'Ready'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : proj.status === 'Published'
                          ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          proj.status === 'Ready'
                            ? 'bg-emerald-500'
                            : proj.status === 'Published'
                            ? 'bg-indigo-500'
                            : 'bg-amber-500'
                        }`}
                      ></span>
                      {proj.status}
                    </span>
                    <span className="text-[11px] text-[#777587]">{proj.updatedAt}</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] group-hover:text-[#4f46e5] transition-colors truncate">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#464555] line-clamp-1">
                    {proj.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e2e7ff] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('workflow')}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">folder_open</span>
                    <span>Workflow</span>
                  </button>
                  <button
                    onClick={() => handleEditProject(proj.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#4f46e5] text-white hover:bg-[#3525cd] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                    <span>Edit Video</span>
                  </button>
                </div>
                <button
                  onClick={() => onNavigate('transcript')}
                  className="text-[#777587] hover:text-[#131b2e] p-1 rounded transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upload Video Modal */}
      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};
