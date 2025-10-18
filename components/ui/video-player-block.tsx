'use client'

import React from 'react'
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerPlayButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerVolumeRange,
  VideoPlayerMuteButton,
} from '@/components/kibo-ui/video-player'

interface VideoPlayerBlockProps {
  videoUrl: string
  videoPoster: string
  className?: string
}

export function VideoPlayerBlock({
  videoUrl,
  videoPoster,
  className = '',
}: VideoPlayerBlockProps) {
  return (
    <div className={className} suppressHydrationWarning>
      <VideoPlayer className="w-full rounded-xl overflow-hidden shadow-lg" suppressHydrationWarning>
        <VideoPlayerContent
          slot="media"
          src={videoUrl}
          poster={videoPoster}
          playsInline
          className="w-full aspect-video object-cover"
          suppressHydrationWarning
        />
        <VideoPlayerControlBar className="flex items-center gap-1 bg-gradient-to-t from-black/80 to-transparent">
          <VideoPlayerPlayButton />
          <VideoPlayerTimeRange />
          <VideoPlayerTimeDisplay showDuration />
          <VideoPlayerVolumeRange />
          <VideoPlayerMuteButton />
        </VideoPlayerControlBar>
      </VideoPlayer>
    </div>
  )
}
