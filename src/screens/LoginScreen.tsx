import React, { useState } from 'react';
import { ScreenId } from '../types';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('alex@creator.io');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] antialiased min-h-screen relative flex flex-col justify-between selection:bg-[#dae2fd] selection:text-[#4f46e5] overflow-x-hidden font-['Inter']">
      {/* Ambient Background Canvas & Micro-decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute inset-0 bg-dot-pattern opacity-70"></div>

        {/* Top Left: Video timestamp badge */}
        <div className="absolute top-[16%] left-[10%] hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-xs border border-[#c7c4d8]/40 rounded-lg px-3 py-1.5 shadow-xs transform -rotate-3 text-[#464555]">
          <span className="material-symbols-outlined text-[#4f46e5] text-sm">play_circle</span>
          <span className="text-[11px] font-semibold tracking-wider text-[#131b2e]">01:24</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
        </div>

        {/* Top Right: Audio / Captions badge */}
        <div className="absolute top-[22%] right-[12%] hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-xs border border-[#c7c4d8]/40 rounded-lg px-3 py-1.5 shadow-xs transform rotate-3 text-[#464555]">
          <span className="material-symbols-outlined text-[#4f46e5] text-sm">closed_caption</span>
          <span className="text-[11px] text-[#464555] font-medium">Auto-Captions generated</span>
        </div>

        {/* Bottom Left: Document draft shape */}
        <div className="absolute bottom-[18%] left-[14%] hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-xs border border-[#c7c4d8]/40 rounded-lg px-3 py-2 shadow-xs transform rotate-2">
          <span className="material-symbols-outlined text-[#4f46e5] text-sm">description</span>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#131b2e]">Thread Outline</span>
            <span className="text-[10px] text-[#464555] leading-none">6 Multi-channel variants</span>
          </div>
        </div>

        {/* Bottom Right: Repurposing frame badge */}
        <div className="absolute bottom-[14%] right-[11%] hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-xs border border-[#c7c4d8]/40 rounded-lg px-3 py-1.5 shadow-xs transform -rotate-2">
          <span className="material-symbols-outlined text-[#006c49] text-sm">auto_awesome</span>
          <span className="text-[11px] font-semibold text-[#131b2e]">4K Render Ready</span>
          <span className="text-[#006c49] text-[11px] font-bold">100%</span>
        </div>

        {/* Soft ambient indigo glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e2dfff]/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </div>

      {/* Minimal Top Navigation / Brand Anchor */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#4f46e5] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] tracking-tight">CreatorAi</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-medium text-[#464555] hover:text-[#131b2e] transition-colors duration-150 py-2 px-3 rounded-lg hover:bg-[#f2f3ff] flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">help</span>
            <span className="hidden sm:inline">Help &amp; Support</span>
          </button>
        </div>
      </header>

      {/* Main Content: Centered Modern Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-8 py-8">
        <div className="w-full max-w-[440px] bg-white border border-[#c7c4d8]/60 rounded-xl p-6 md:p-8 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] relative backdrop-blur-xs">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="inline-flex w-12 h-12 rounded-xl bg-[#f2f3ff] border border-[#e2dfff] items-center justify-center text-[#4f46e5] mb-3.5 shadow-xs">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#131b2e] font-bold tracking-tight">Welcome to CreatorAi</h1>
            <p className="text-sm text-[#464555] mt-1.5">Create once. Repurpose everywhere.</p>
          </div>

          {/* Quick OAuth Provider */}
          <div className="space-y-4 mb-5">
            <button
              onClick={onLogin}
              className="w-full h-11 bg-white border border-[#c7c4d8]/80 hover:border-[#777587] hover:bg-[#f2f3ff] active:scale-[0.98] transition duration-150 rounded-lg flex items-center justify-center gap-3 px-4 text-[#131b2e] font-semibold text-sm shadow-xs cursor-pointer"
              type="button"
            >
              <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z" fill="#4285F4"></path>
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.14C3.25 21.36 7.33 24 12 24z" fill="#34A853"></path>
                <path d="M5.28 14.27a7.18 7.18 0 0 1 0-4.54V6.59H1.26a11.96 11.96 0 0 0 0 10.82l4.02-3.14z" fill="#FBBC05"></path>
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.59l4.02 3.14c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider with Text */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-[#c7c4d8]/50"></div>
              <span className="bg-white px-3 text-xs text-[#464555] font-medium relative">or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input Field */}
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1.5" htmlFor="email">
                Email address
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#464555]">
                  <span className="material-symbols-outlined text-base">mail</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@creator.io"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#c7c4d8] rounded-lg text-sm text-[#131b2e] placeholder:text-[#777587] focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition duration-150"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#131b2e]" htmlFor="password">
                  Password
                </label>
                <a className="text-[11px] font-semibold text-[#4f46e5] hover:text-[#3525cd] transition-colors duration-150" href="#forgot">
                  Forgot password?
                </a>
              </div>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#464555]">
                  <span className="material-symbols-outlined text-base">lock</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#c7c4d8] rounded-lg text-sm text-[#131b2e] placeholder:text-[#777587] focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#464555] hover:text-[#131b2e] focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Primary CTA: Log In */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 bg-[#4f46e5] hover:bg-[#3525cd] active:scale-[0.98] text-white font-semibold text-sm rounded-lg shadow-xs flex items-center justify-center gap-2 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] cursor-pointer"
              >
                <span>Log In</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Bottom Card Sign-up Link */}
          <div className="mt-6 text-center pt-4 border-t border-[#c7c4d8]/40">
            <p className="text-xs text-[#464555]">
              Don't have an account?{' '}
              <button
                onClick={onLogin}
                className="text-xs font-semibold text-[#4f46e5] hover:text-[#3525cd] transition-colors duration-150 ml-1 cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#464555]">
        <div className="text-xs text-[#777587]">
          © 2025 CreatorAi Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-5 text-xs">
          <a className="hover:text-[#131b2e] transition-colors duration-150" href="#terms">Terms</a>
          <a className="hover:text-[#131b2e] transition-colors duration-150" href="#privacy">Privacy</a>
          <a className="hover:text-[#131b2e] transition-colors duration-150" href="#security">Security</a>
          <div className="flex items-center gap-1.5 ml-1 px-2.5 py-1 bg-[#f2f3ff] rounded-full border border-[#c7c4d8]/30">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span className="text-[11px] font-semibold text-[#131b2e]">Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
