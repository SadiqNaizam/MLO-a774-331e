import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Maximize2 } from 'lucide-react';

// Doraemon theme colors
const DORAEMON_PLAYER_BG = 'bg-blue-600'; // Main blue for player
const DORAEMON_TEXT_PRIMARY = 'text-white';
const DORAEMON_TEXT_SECONDARY = 'text-blue-200';
const DORAEMON_SLIDER_TRACK = 'bg-blue-300';
const DORAEMON_SLIDER_RANGE = 'bg-yellow-400'; // Yellow for progress
const DORAEMON_ICON_COLOR = 'text-white';
const DORAEMON_ICON_HOVER_ACCENT = 'hover:text-red-400'; // Red accent on hover

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds: number; // Total duration in seconds
  audioUrl: string; // URL to the audio file
}

interface MusicPlayerBarProps {
  currentSong: Song | null;
  // Add more props for queue management, next/prev song logic etc.
  // onNextSong: () => void;
  // onPreviousSong: () => void;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(0.5); // 0-1
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds

  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("Rendering MusicPlayerBar for song:", currentSong?.title);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Load new song
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      setIsPlaying(true); // Autoplay new song
      setCurrentTime(0);
      setProgress(0);
    }
  }, [currentSong]);


  const handlePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && currentSong) {
      const newCurrentTime = audioRef.current.currentTime;
      setCurrentTime(newCurrentTime);
      setProgress((newCurrentTime / currentSong.durationSeconds) * 100);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentSong) {
      const newTime = (value[0] / 100) * currentSong.durationSeconds;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
    if (audioRef.current) audioRef.current.volume = value[0];
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentSong) {
    // Optionally render a placeholder or nothing if no song is active
    return (
        <div className={`fixed bottom-0 left-0 right-0 h-20 ${DORAEMON_PLAYER_BG} border-t border-blue-700 flex items-center justify-center ${DORAEMON_TEXT_PRIMARY}`}>
            <p>No song selected.</p>
        </div>
    );
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 h-[90px] ${DORAEMON_PLAYER_BG} border-t border-blue-700 p-3 flex items-center justify-between shadow-2xl z-50`}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate} // To get initial duration
        onEnded={() => setIsPlaying(false) /* TODO: onNextSong() */}
        // src={currentSong.audioUrl} // Set via useEffect
      />

      {/* Song Info */}
      <div className="flex items-center space-x-3 w-1/4">
        <Avatar className="h-12 w-12 rounded">
          <AvatarImage src={currentSong.albumArtUrl || '/placeholder.svg'} alt={currentSong.title} />
          <AvatarFallback>{currentSong.title.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className={`font-semibold text-sm truncate ${DORAEMON_TEXT_PRIMARY}`}>{currentSong.title}</p>
          <p className={`text-xs truncate ${DORAEMON_TEXT_SECONDARY}`}>{currentSong.artist}</p>
        </div>
      </div>

      {/* Player Controls & Progress */}
      <div className="flex flex-col items-center justify-center flex-grow max-w-md">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className={`${DORAEMON_ICON_COLOR} ${DORAEMON_ICON_HOVER_ACCENT}`}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePlayPause} className={`${DORAEMON_ICON_COLOR} ${DORAEMON_ICON_HOVER_ACCENT} bg-yellow-400 hover:bg-red-500 rounded-full p-2 w-10 h-10`}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon" className={`${DORAEMON_ICON_COLOR} ${DORAEMON_ICON_HOVER_ACCENT}`}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-full mt-1">
          <span className={`text-xs ${DORAEMON_TEXT_SECONDARY}`}>{formatTime(currentTime)}</span>
          <Slider
            defaultValue={[0]}
            value={[progress]}
            max={100}
            step={1}
            onValueChange={handleSeek}
            className="w-full cursor-pointer"
            classNames={{
                track: `${DORAEMON_SLIDER_TRACK} h-1.5`,
                range: `${DORAEMON_SLIDER_RANGE} h-1.5`,
                thumb: `h-3.5 w-3.5 ${DORAEMON_SLIDER_RANGE} border-2 border-blue-700`,
            }}
          />
          <span className={`text-xs ${DORAEMON_TEXT_SECONDARY}`}>{formatTime(currentSong.durationSeconds)}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center space-x-3 w-1/4 justify-end">
        <Button variant="ghost" size="icon" className={`${DORAEMON_ICON_COLOR} ${DORAEMON_ICON_HOVER_ACCENT}`}>
          <ListMusic className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMute} className={`${DORAEMON_ICON_COLOR} ${DORAEMON_ICON_HOVER_ACCENT}`}>
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
            defaultValue={[0.5]}
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24 cursor-pointer"
            classNames={{
                track: DORAEMON_SLIDER_TRACK,
                range: DORAEMON_SLIDER_RANGE,
                thumb: `h-3 w-3 ${DORAEMON_SLIDER_RANGE} border-2 border-blue-700`,
            }}
        />
        <Button variant="ghost" size="icon" className={`${DORAEMON_ICON_COLOR} ${DORAEMON_ICON_HOVER_ACCENT}`}>
            <Maximize2 className="h-5 w-5" /> {/* For fullscreen or expanded view */}
        </Button>
      </div>
    </div>
  );
}

export default MusicPlayerBar;