import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AnalyticsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('30d');
  const [filterFormat, setFilterFormat] = useState('All Formats');

  const topContent = [
    {
      id: 'tc_1',
      title: 'The Biggest Mistake Students Make With AI',
      subtitle: 'Reel / Short • 42 seconds',
      platform: 'Instagram Reels',
      platformColor: 'bg-[#4f46e5]',
      reach: '54.2K',
      growth: '↑ 34%',
      metricLabel: '84% Retention',
      metricPercent: 84,
      icon: 'play_circle',
    },
    {
      id: 'tc_2',
      title: 'Why Blindly Copying Code Fails',
      subtitle: 'X Thread & Clip • 6 tweets',
      platform: 'X / Twitter',
      platformColor: 'bg-[#131b2e]',
      reach: '38.1K',
      growth: '↑ 18%',
      metricLabel: '9.6% Engagement',
      metricPercent: 78,
      icon: 'chat',
    },
    {
      id: 'tc_3',
      title: 'Episode 14: Future of AI Creative Workflows',
      subtitle: 'YouTube Master • Longform 22m',
      platform: 'YouTube',
      platformColor: 'bg-[#ba1a1a]',
      reach: '21.5K',
      growth: '↑ 12%',
      metricLabel: 'Avg Watch: 14:20',
      metricPercent: 65,
      icon: 'smart_display',
    },
    {
      id: 'tc_4',
      title: 'Solo Operators vs Big Teams',
      subtitle: 'LinkedIn Carousel • 8 slides',
      platform: 'LinkedIn',
      platformColor: 'bg-[#4f46e5]',
      reach: '14.6K',
      growth: '↑ 41%',
      metricLabel: 'Shares: 312',
      metricPercent: 82,
      icon: 'view_carousel',
    },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-['Inter']">
      {/* Header Section with Date & Quick Filter Pill */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#eaedff] text-xs font-semibold text-[#3525cd] mb-2.5">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              insights
            </span>
            <span>Live Creator Pulse</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl text-[#131b2e] font-bold tracking-tight">
            Creator Insights
          </h1>
          <p className="text-sm text-[#464555] mt-1">
            Actionable intelligence on your content performance, retention hooks, and audience engagement.
          </p>
        </div>

        {/* Quick Date Selector */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-white border border-[#c7c4d8]/60 rounded-xl p-1 shadow-xs">
          <button
            onClick={() => setDateRange('7d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              dateRange === '7d' ? 'bg-[#eaedff] text-[#3525cd]' : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              dateRange === '30d' ? 'bg-[#eaedff] text-[#3525cd]' : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setDateRange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              dateRange === 'all' ? 'bg-[#eaedff] text-[#3525cd]' : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            All Time
          </button>
          <button
            className="p-1.5 rounded-lg text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            title="Export Report"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-[#464555] mb-2">
            <span className="text-xs font-semibold">Total Content Created</span>
            <span className="material-symbols-outlined text-[20px] text-[#3525cd]">video_library</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#131b2e] tracking-tight">24</span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3525cd] font-semibold">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>
              <span>+6 this month</span>
            </span>
          </div>
          <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#4f46e5] h-full rounded-full w-[80%]"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-[#464555] mb-2">
            <span className="text-xs font-semibold">Published Across Platforms</span>
            <span className="material-symbols-outlined text-[20px] text-[#006c49]">share</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#131b2e] tracking-tight">18</span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] font-semibold">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              <span>75% completion rate</span>
            </span>
          </div>
          <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#006c49] h-full rounded-full w-[75%]"></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-[#464555] mb-2">
            <span className="text-xs font-semibold">Total Multi-Platform Views</span>
            <span className="material-symbols-outlined text-[20px] text-[#3130c0]">visibility</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#131b2e] tracking-tight">128.4K</span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3525cd] font-semibold">
              <span className="material-symbols-outlined text-[13px]">north_east</span>
              <span>↑ 24% vs last period</span>
            </span>
          </div>
          <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#4b4dd8] h-full rounded-full w-[88%]"></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-[#464555] mb-2">
            <span className="text-xs font-semibold">Average Audience Engagement</span>
            <span className="material-symbols-outlined text-[20px] text-[#006c49]">favorite</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#131b2e] tracking-tight">8.4%</span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] font-semibold">
              <span className="material-symbols-outlined text-[13px]">star</span>
              <span>Benchmark: 4.2%</span>
            </span>
          </div>
          <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#006c49] h-full rounded-full w-[94%]"></div>
          </div>
        </div>
      </section>

      {/* AI Performance Insights Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-[#4f46e5] text-white">
              <span className="material-symbols-outlined text-[15px]">psychology</span>
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] tracking-tight">
              AI Content Intelligence
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e2e7ff] text-[#3525cd]">
              3 NEW SIGNALS
            </span>
          </div>
          <span className="text-[#464555] text-xs hidden sm:inline-block">
            Curated specifically from your recent short-form experiments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Insight 1 */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#3525cd]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3525cd]">
                  <span className="material-symbols-outlined text-[22px]">school</span>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#eaedff] text-[#3525cd] font-semibold">
                  3.2x Saves
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] mb-2">
                Your educational clips perform best 🎓
              </h3>
              <p className="text-xs text-[#464555] leading-relaxed">
                Educational content generates 3.2x more bookmarks and saves on LinkedIn and X compared to purely promotional posts.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#c7c4d8]/40 flex items-center justify-between">
              <span className="text-[11px] text-[#464555]">Recommended:</span>
              <button
                onClick={() => onNavigate('hooks')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold active:scale-[0.98] transition-transform shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                <span>Auto-generate more educational hooks</span>
              </button>
            </div>
          </div>

          {/* Insight 2 */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#3525cd]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3525cd]">
                  <span className="material-symbols-outlined text-[22px]">bolt</span>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#6cf8bb]/30 text-[#00714d] font-semibold">
                  +42% Retention
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] mb-2">
                Videos under 60 seconds receive 42% higher engagement ⚡
              </h3>
              <p className="text-xs text-[#464555] leading-relaxed">
                Short-form Reels and Shorts between 35s–50s show an 82% completion rate, peaking with strong hook retention.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#c7c4d8]/40 flex items-center justify-between">
              <span className="text-[11px] text-[#464555]">Recommended:</span>
              <button
                onClick={() => onNavigate('clip_editor')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3525cd] text-xs font-semibold active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">content_cut</span>
                <span>Trim active clips to &lt;50s</span>
              </button>
            </div>
          </div>

          {/* Insight 3 */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#3525cd]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3525cd]">
                  <span className="material-symbols-outlined text-[22px]">ads_click</span>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#eaedff] text-[#3525cd] font-semibold">
                  88% Hold Rate
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] mb-2">
                Strongest hooks introduce the problem in the first 3 seconds 🎯
              </h3>
              <p className="text-xs text-[#464555] leading-relaxed">
                Clips starting with contrarian opening hooks (like "You're probably using AI wrong") have an 88% 3-second hold rate.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#c7c4d8]/40 flex items-center justify-between">
              <span className="text-[11px] text-[#464555]">Recommended:</span>
              <button
                onClick={() => onNavigate('hooks')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold active:scale-[0.98] transition-transform shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>Use Hook Generator</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performing Content Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] tracking-tight">
              Top Performing Content
            </h2>
            <p className="text-xs text-[#464555]">High-yield multi-channel assets ranked by retention and resonance.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#c7c4d8]/60 bg-white text-[#131b2e] text-xs font-semibold cursor-pointer outline-none"
            >
              <option>All Formats</option>
              <option>Instagram Reels</option>
              <option>YouTube</option>
              <option>X / Twitter</option>
              <option>LinkedIn</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-[#c7c4d8]/60 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f3ff]/60 border-b border-[#c7c4d8]/60 text-xs font-semibold text-[#464555]">
                  <th className="py-3.5 px-5">Content Asset</th>
                  <th className="py-3.5 px-4">Primary Platform</th>
                  <th className="py-3.5 px-4">Reach / Views</th>
                  <th className="py-3.5 px-4">Retention / Metric</th>
                  <th className="py-3.5 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c7c4d8]/40 text-xs">
                {topContent.map((row) => (
                  <tr key={row.id} className="hover:bg-[#f2f3ff]/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3525cd] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                        </div>
                        <div>
                          <div
                            onClick={() => onNavigate('adapt')}
                            className="font-semibold text-[#131b2e] hover:text-[#4f46e5] cursor-pointer transition-colors"
                          >
                            {row.title}
                          </div>
                          <div className="text-[#464555] text-[11px] mt-0.5">{row.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#eaedff] text-[#131b2e]">
                        <span className={`w-2 h-2 rounded-full ${row.platformColor}`}></span>
                        {row.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-mono">
                      <span className="font-bold text-[#131b2e] text-sm">{row.reach}</span>
                      <span className="text-[#006c49] text-[11px] font-semibold ml-1.5">{row.growth}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#e2e7ff] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#006c49] h-full rounded-full" style={{ width: `${row.metricPercent}%` }}></div>
                        </div>
                        <span className="font-semibold text-[#131b2e] text-xs">{row.metricLabel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onNavigate('repurpose')}
                          className="p-1.5 rounded-lg text-[#464555] hover:text-[#3525cd] hover:bg-[#eaedff] transition-colors cursor-pointer"
                          title="Create Follow-up Clip"
                        >
                          <span className="material-symbols-outlined text-[18px]">fork_right</span>
                        </button>
                        <button
                          onClick={() => onNavigate('clip_editor')}
                          className="p-1.5 rounded-lg text-[#464555] hover:text-[#3525cd] hover:bg-[#eaedff] transition-colors cursor-pointer"
                          title="View Heatmap"
                        >
                          <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Student Creator Workflow Nudge Banner */}
      <section className="bg-[#eaedff] border border-[#c7c4d8]/60 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
              Want to test a 3-second hook on your next concept?
            </h3>
            <p className="text-xs text-[#464555] mt-0.5">
              Let CreatorAi automatically synthesize 5 high-converting opening statements tailored to your student audience.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('hooks')}
          className="bg-[#4f46e5] hover:bg-[#3525cd] text-white px-5 py-2.5 rounded-lg font-semibold text-xs active:scale-[0.98] transition-all shadow-xs flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Open Hook Studio</span>
        </button>
      </section>
    </div>
  );
};
