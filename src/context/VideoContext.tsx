import React, { createContext, useContext, useState, useEffect } from 'react';
import { UploadedVideo, Project, Asset } from '../types';
import { RECENT_PROJECTS, ASSETS_DATA, IMAGES } from '../data/mockData';

export const SAMPLE_VIDEOS = [
  {
    id: 'sample-podcast',
    name: 'AI_Podcast_Episode14_Master.mp4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    sizeBytes: 671088640,
    sizeFormatted: '640 MB',
    durationSeconds: 2732,
    durationFormatted: '45:32',
    resolution: '1080p 60fps',
    aspectRatio: '16:9',
    thumbnailUrl: IMAGES.podcastStudio,
    uploadedAt: 'Ready for AI Clips',
    status: 'ready' as const,
    progress: 100,
  },
  {
    id: 'sample-techtalk',
    name: 'Autonomous_Agents_LiveDemo.mp4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    sizeBytes: 346030080,
    sizeFormatted: '330 MB',
    durationSeconds: 1094,
    durationFormatted: '18:14',
    resolution: '4K UHD',
    aspectRatio: '16:9',
    thumbnailUrl: IMAGES.lectureHall,
    uploadedAt: 'Auto-sync Ready',
    status: 'ready' as const,
    progress: 100,
  },
  {
    id: 'sample-vlog',
    name: 'Creator_Vertical_Reel_9x16.mp4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    sizeBytes: 157286400,
    sizeFormatted: '150 MB',
    durationSeconds: 48,
    durationFormatted: '00:48',
    resolution: '1080x1920 (9:16)',
    aspectRatio: '9:16',
    thumbnailUrl: IMAGES.reelsDarkStudio,
    uploadedAt: 'Vertical Optimized',
    status: 'ready' as const,
    progress: 100,
  },
];

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

export const extractVideoMetadata = (
  fileOrUrl: File | string,
  fallbackName: string
): Promise<{
  url: string;
  durationSeconds: number;
  durationFormatted: string;
  width: number;
  height: number;
  resolution: string;
  aspectRatio: string;
  thumbnailUrl: string;
}> => {
  return new Promise((resolve) => {
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    // Timeout fallback after 4s
    const timeout = setTimeout(() => {
      resolve({
        url,
        durationSeconds: 180,
        durationFormatted: '03:00',
        width: 1920,
        height: 1080,
        resolution: '1080p FHD',
        aspectRatio: '16:9',
        thumbnailUrl: IMAGES.podcastStudio,
      });
    }, 4000);

    video.onloadedmetadata = () => {
      const dur = Math.max(1, Math.round(video.duration || 60));
      // Seek to capture frame for thumbnail
      video.currentTime = Math.min(1.5, Math.max(0.5, dur * 0.1));
    };

    video.onseeked = () => {
      clearTimeout(timeout);
      let thumb = IMAGES.podcastStudio;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(video.videoWidth || 640, 640);
        canvas.height = Math.round(canvas.width * ((video.videoHeight || 360) / (video.videoWidth || 640)));
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumb = canvas.toDataURL('image/jpeg', 0.85);
        }
      } catch (e) {
        console.warn('Canvas thumbnail capture exception, using fallback thumbnail:', e);
      }

      const dur = Math.max(1, Math.round(video.duration || 60));
      const mins = Math.floor(dur / 60);
      const secs = dur % 60;
      const formattedDur = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      const width = video.videoWidth || 1920;
      const height = video.videoHeight || 1080;
      let res = `${width}x${height}`;
      if (width >= 3840 || height >= 2160) res = '4K UHD (60fps)';
      else if (width >= 1920 || height >= 1080) res = '1080p FHD (60fps)';
      else if (width >= 1280 || height >= 720) res = '720p HD';

      let aspect = '16:9';
      if (height > width * 1.1) aspect = '9:16';
      else if (Math.abs(width - height) < 50) aspect = '1:1';

      resolve({
        url,
        durationSeconds: dur,
        durationFormatted: formattedDur,
        width,
        height,
        resolution: res,
        aspectRatio: aspect,
        thumbnailUrl: thumb,
      });
    };

    video.onerror = () => {
      clearTimeout(timeout);
      resolve({
        url,
        durationSeconds: 120,
        durationFormatted: '02:00',
        width: 1920,
        height: 1080,
        resolution: '1080p FHD',
        aspectRatio: '16:9',
        thumbnailUrl: IMAGES.podcastStudio,
      });
    };
  });
};

interface VideoContextType {
  uploadedVideos: UploadedVideo[];
  activeVideo: UploadedVideo;
  setActiveVideo: (video: UploadedVideo) => void;
  isUploading: boolean;
  uploadProgress: number;
  uploadVideoFile: (file: File, options?: { autoSelect?: boolean; projectTitle?: string }) => Promise<UploadedVideo>;
  loadSampleVideo: (sampleKey: 'sample-podcast' | 'sample-techtalk' | 'sample-vlog') => Promise<UploadedVideo>;
  removeVideo: (id: string) => void;
  projects: Project[];
  assets: Asset[];
  addProjectFromVideo: (video: UploadedVideo, title?: string) => Project;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>(SAMPLE_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<UploadedVideo>(SAMPLE_VIDEOS[0]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>(RECENT_PROJECTS);
  const [assets, setAssets] = useState<Asset[]>(ASSETS_DATA);

  const addProjectFromVideo = (video: UploadedVideo, customTitle?: string): Project => {
    const cleanTitle = customTitle || video.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    const existing = projects.find((p) => p.id === `proj_${video.id}`);
    if (existing) return existing;

    const newProject: Project = {
      id: `proj_${video.id}`,
      title: cleanTitle,
      description: `Uploaded media: ${video.name} • ${video.resolution || '1080p'} • Ready for AI extraction`,
      duration: video.durationFormatted,
      status: 'Editing',
      updatedAt: 'Just now',
      thumbnail: video.thumbnailUrl || IMAGES.podcastStudio,
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const uploadVideoFile = async (
    file: File,
    options?: { autoSelect?: boolean; projectTitle?: string }
  ): Promise<UploadedVideo> => {
    setIsUploading(true);
    setUploadProgress(10);

    const tempId = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const objectUrl = URL.createObjectURL(file);

    // Simulate realistic fast upload progression
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 120);

    try {
      const meta = await extractVideoMetadata(file, file.name);
      clearInterval(progressInterval);
      setUploadProgress(100);

      const newUploadedVideo: UploadedVideo = {
        id: tempId,
        name: file.name,
        file,
        url: meta.url,
        sizeBytes: file.size,
        sizeFormatted: formatFileSize(file.size),
        durationSeconds: meta.durationSeconds,
        durationFormatted: meta.durationFormatted,
        width: meta.width,
        height: meta.height,
        resolution: meta.resolution,
        aspectRatio: meta.aspectRatio,
        thumbnailUrl: meta.thumbnailUrl || IMAGES.podcastStudio,
        uploadedAt: 'Just uploaded',
        status: 'ready',
        progress: 100,
      };

      setUploadedVideos((prev) => [newUploadedVideo, ...prev]);

      // Add as Asset to Library
      const newAsset: Asset = {
        id: `asset_${tempId}`,
        name: file.name,
        type: 'video',
        size: formatFileSize(file.size),
        duration: meta.durationFormatted,
        resolution: meta.resolution,
        aspect: meta.aspectRatio,
        thumbnail: meta.thumbnailUrl || IMAGES.podcastStudio,
        tags: ['Uploaded', 'Raw Master', meta.aspectRatio === '9:16' ? 'Vertical' : 'Landscape'],
        updatedAt: 'Just now',
        metadata: `${meta.resolution} • ${formatFileSize(file.size)}`,
        previewUrl: meta.url,
      };
      setAssets((prev) => [newAsset, ...prev]);

      if (options?.autoSelect !== false) {
        setActiveVideo(newUploadedVideo);
        addProjectFromVideo(newUploadedVideo, options?.projectTitle);
      }

      setIsUploading(false);
      return newUploadedVideo;
    } catch (err) {
      clearInterval(progressInterval);
      setIsUploading(false);
      throw err;
    }
  };

  const loadSampleVideo = async (
    sampleKey: 'sample-podcast' | 'sample-techtalk' | 'sample-vlog'
  ): Promise<UploadedVideo> => {
    const sample = SAMPLE_VIDEOS.find((s) => s.id === sampleKey) || SAMPLE_VIDEOS[0];
    setActiveVideo(sample);
    addProjectFromVideo(sample);
    return sample;
  };

  const removeVideo = (id: string) => {
    setUploadedVideos((prev) => {
      const target = prev.find((v) => v.id === id);
      if (target?.url && target.url.startsWith('blob:')) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((v) => v.id !== id);
    });
    if (activeVideo?.id === id) {
      const remaining = uploadedVideos.filter((v) => v.id !== id);
      if (remaining.length > 0) {
        setActiveVideo(remaining[0]);
      }
    }
  };

  return (
    <VideoContext.Provider
      value={{
        uploadedVideos,
        activeVideo,
        setActiveVideo,
        isUploading,
        uploadProgress,
        uploadVideoFile,
        loadSampleVideo,
        removeVideo,
        projects,
        assets,
        addProjectFromVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
