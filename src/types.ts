export type ScreenId = 
  | 'login'
  | 'create_project'
  | 'dashboard'
  | 'analytics'
  | 'export'
  | 'repurpose'
  | 'adapt'
  | 'workflow'
  | 'assets'
  | 'suggestions'
  | 'clip_editor'
  | 'transcript'
  | 'hooks'
  | 'captions'
  | 'processing'
  | 'ai_progress';

export type NavTab = 'Home' | 'Projects' | 'Assets' | 'AI Tools' | 'Workflow' | 'Analytics' | 'Settings';

export interface Project {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'Editing' | 'Ready' | 'Published';
  updatedAt: string;
  thumbnail: string;
}

export interface SuggestedClip {
  id: string;
  clipNumber?: string;
  title: string;
  hook?: string;
  reason?: string;
  timeRange?: string;
  durationSeconds?: number;
  viralScore?: number;
  completionRate?: string;
  retentionCategory?: string;
  statusBadge?: string;
  retentionScore?: number;
  predictedReach?: string;
  thumbnail?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  transcriptSnippet?: string;
  viralReason?: string;
  aspectRatio?: string[];
  tags?: string[];
}

export interface GeneratedHook {
  id: string;
  quote?: string;
  explanation?: string;
  score?: number;
  type?: string;
  words?: number;
  isTopRecommended?: boolean;
  style?: string;
  hookText?: string;
  retentionProjection?: number;
  category?: string;
  characterCount?: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'video' | 'clip' | 'transcript' | 'image' | 'audio';
  size: string;
  duration?: string;
  resolution?: string;
  aspect?: string;
  thumbnail?: string;
  tags: string[];
  updatedAt: string;
  metadata?: string;
  previewUrl?: string;
}

export interface WorkflowCard {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryClass: string;
  metric: string;
  statusText?: string;
  progress?: number;
  formatsCount: string;
  avatar: string;
  columnId: 'idea' | 'processing' | 'review' | 'published';
}
