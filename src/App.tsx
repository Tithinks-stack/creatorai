/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, NavTab } from './types';
import { TopNavBar } from './components/TopNavBar';
import { ScreenSwitcherDock } from './components/ScreenSwitcherDock';

// Screens
import { LoginScreen } from './screens/LoginScreen';
import { CreateProjectScreen } from './screens/CreateProjectScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { FinalExportScreen } from './screens/FinalExportScreen';
import { RepurposeScreen } from './screens/RepurposeScreen';
import { AdaptContentScreen } from './screens/AdaptContentScreen';
import { WorkflowScreen } from './screens/WorkflowScreen';
import { AssetLibraryScreen } from './screens/AssetLibraryScreen';
import { SuggestedClipsScreen } from './screens/SuggestedClipsScreen';
import { ClipEditorScreen } from './screens/ClipEditorScreen';
import { TranscriptScreen } from './screens/TranscriptScreen';
import { GenerateHooksScreen } from './screens/GenerateHooksScreen';
import { GenerateCaptionsScreen } from './screens/GenerateCaptionsScreen';
import { AIProgressScreen } from './screens/AIProgressScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [activeNav, setActiveNav] = useState<NavTab>('Home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync top navigation tab
    if (['dashboard', 'create_project'].includes(screen)) {
      setActiveNav('Home');
    } else if (['workflow'].includes(screen)) {
      setActiveNav('Projects');
    } else if (['repurpose', 'adapt', 'suggestions', 'clip_editor', 'transcript', 'hooks', 'captions'].includes(screen)) {
      setActiveNav('AI Tools');
    } else if (['assets'].includes(screen)) {
      setActiveNav('Assets');
    } else if (['analytics'].includes(screen)) {
      setActiveNav('Analytics');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
    setActiveNav('Home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  // Determine if TopNavBar should be visible (hidden on Login, AI Progress, and Clip Editor which has its own toolbar)
  const showTopNavBar = currentScreen !== 'login' && currentScreen !== 'ai_progress' && currentScreen !== 'clip_editor';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Main Navigation */}
      {showTopNavBar && (
        <TopNavBar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          activeNav={activeNav}
          onNavTabChange={setActiveNav}
        />
      )}

      {/* Screen Render Router */}
      <main className="w-full">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />
        )}
        {currentScreen === 'create_project' && (
          <CreateProjectScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'dashboard' && (
          <DashboardScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'analytics' && (
          <AnalyticsScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'export' && (
          <FinalExportScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'repurpose' && (
          <RepurposeScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'adapt' && (
          <AdaptContentScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'workflow' && (
          <WorkflowScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'assets' && (
          <AssetLibraryScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'suggestions' && (
          <SuggestedClipsScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'clip_editor' && (
          <ClipEditorScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'transcript' && (
          <TranscriptScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'hooks' && (
          <GenerateHooksScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'captions' && (
          <GenerateCaptionsScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'ai_progress' && (
          <AIProgressScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating Screen Switcher Quick Navigation Dock */}
      <ScreenSwitcherDock
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
