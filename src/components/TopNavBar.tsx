import React, { useState } from 'react';
import { ScreenId, NavTab } from '../types';
import { USER_AVATAR } from '../data/mockData';

interface TopNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  activeNav?: NavTab;
  onNavTabChange?: (tab: NavTab) => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentScreen,
  onNavigate,
  activeNav = 'Home',
  onNavTabChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabClick = (tab: NavTab) => {
    if (onNavTabChange) onNavTabChange(tab);
    switch (tab) {
      case 'Home':
        onNavigate('dashboard');
        break;
      case 'Projects':
        onNavigate('create_project');
        break;
      case 'Assets':
        onNavigate('assets');
        break;
      case 'AI Tools':
        onNavigate('suggestions');
        break;
      case 'Workflow':
        onNavigate('workflow');
        break;
      case 'Analytics':
        onNavigate('analytics');
        break;
      case 'Settings':
        onNavigate('dashboard');
        break;
    }
  };

  return (
    <header className="w-full bg-white border-b border-[#c7c4d8]/60 shadow-xs sticky top-0 z-40 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand & Global Links Cluster */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4f46e5] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#3525cd] transition-colors">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_videocam
              </span>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#4f46e5] tracking-tight">
              CreatorAi
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 h-16">
            {(['Home', 'Projects', 'Assets', 'AI Tools', 'Workflow', 'Analytics', 'Settings'] as NavTab[]).map((tab) => {
              const isActive = activeNav === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`h-16 flex items-center gap-1.5 font-['Inter'] text-xs font-semibold tracking-wide transition-colors cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#4f46e5] text-[#4f46e5]'
                      : 'border-transparent text-[#464555] hover:text-[#131b2e]'
                  }`}
                >
                  {tab}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block w-48 xl:w-60">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#777587] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets, scripts..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#f2f3ff] text-[#131b2e] border border-[#c7c4d8]/60 rounded-lg text-xs font-['Inter'] placeholder:text-[#777587] focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
            />
          </div>

          {/* Create Button */}
          <button
            onClick={() => onNavigate('create_project')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-semibold font-['Inter'] shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Create</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowHelp(false);
                setShowUserMenu(false);
              }}
              className="p-2 text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4f46e5]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#c7c4d8]/60 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-[#c7c4d8]/40 mb-3">
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#131b2e]">Notifications</h4>
                  <span className="text-[10px] text-[#4f46e5] font-semibold bg-[#e2dfff] px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2 rounded-lg bg-[#f2f3ff] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006c49] text-base mt-0.5">check_circle</span>
                    <div>
                      <p className="font-semibold text-[#131b2e]">4K Render Completed</p>
                      <p className="text-[#464555] text-[11px]">Episode 14 is ready with 5 repurposed formats.</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-[#f2f3ff] flex items-start gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[#4f46e5] text-base mt-0.5">insights</span>
                    <div>
                      <p className="font-semibold text-[#131b2e]">Viral Spike Detected</p>
                      <p className="text-[#464555] text-[11px]">Your Instagram Reel reached 54.2K views (+34%).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <div className="relative">
            <button
              onClick={() => {
                setShowHelp(!showHelp);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              className="p-2 text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer"
              title="Help & Guides"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>

            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-[#c7c4d8]/60 p-4 z-50 text-xs">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#131b2e] mb-2">CreatorAi Guide</h4>
                <p className="text-[#464555] mb-3 leading-relaxed">
                  Transform raw long-form footage into multi-channel short-form viral releases in seconds.
                </p>
                <div className="space-y-1.5 font-medium text-[#4f46e5]">
                  <button onClick={() => { onNavigate('transcript'); setShowHelp(false); }} className="block hover:underline text-left cursor-pointer">
                    • Interactive Transcript Tutorial
                  </button>
                  <button onClick={() => { onNavigate('hooks'); setShowHelp(false); }} className="block hover:underline text-left cursor-pointer">
                    • 3-Second Hook Retention Guide
                  </button>
                  <button onClick={() => { onNavigate('adapt'); setShowHelp(false); }} className="block hover:underline text-left cursor-pointer">
                    • Multi-Platform Safe Zones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative pl-1 border-l border-[#c7c4d8]/50">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowHelp(false);
              }}
              className="flex items-center rounded-full focus:outline-none ring-2 ring-transparent hover:ring-[#4f46e5]/40 transition-all cursor-pointer"
            >
              <img
                src={USER_AVATAR}
                alt="Creator Profile Avatar"
                className="w-8 h-8 rounded-full object-cover border border-[#c7c4d8]"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#c7c4d8]/60 py-2 z-50 text-xs font-['Inter']">
                <div className="px-3 py-2 border-b border-[#c7c4d8]/40">
                  <p className="font-bold text-[#131b2e]">Alex Mercer</p>
                  <p className="text-[11px] text-[#464555]">creator@studio.io</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                    Creator Pro Tier
                  </span>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => { onNavigate('dashboard'); setShowUserMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#f2f3ff] text-[#131b2e] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">dashboard</span>
                    Dashboard
                  </button>
                  <button
                    onClick={() => { onNavigate('assets'); setShowUserMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#f2f3ff] text-[#131b2e] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">folder</span>
                    Asset Library
                  </button>
                  <button
                    onClick={() => { onNavigate('login'); setShowUserMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#f2f3ff] text-[#ba1a1a] flex items-center gap-2 border-t border-[#c7c4d8]/30 mt-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Sign Out / View Login Screen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
