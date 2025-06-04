import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Heart, ListPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Doraemon theme colors
const DORAEMON_ROW_HOVER_BG = 'hover:bg-blue-700'; // Blue accent on hover
const DORAEMON_TEXT_PRIMARY = 'text-gray-100';
const DORAEMON_TEXT_SECONDARY = 'text-gray-400';
const DORAEMON_ICON_COLOR = 'text-yellow-400'; // Yellow for icons

interface SongData {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  albumArtUrl?: string;
  isExplicit?: boolean;
}

interface SongItemRowProps {
  song: SongData;
  index?: number; // Optional index for numbered lists
  isPlaying?: boolean; // Is this song currently playing?
  isActive?: boolean; // Is this song currently selected or active in the player context?
  onPlayClick: (songId: string) => void;
  onPauseClick?: (songId: string) => void; // Optional if global pause
  onAddToQueue?: (songId: string) => void;
  onLikeSong?: (songId: string) => void;
  // Add more actions like Add to Playlist, View Artist, View Album
}

const SongItemRow: React.FC<SongItemRowProps> = ({
  song,
  index,
  isPlaying = false,
  isActive = false,
  onPlayClick,
  onPauseClick,
  onAddToQueue,
  onLikeSong,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log("Rendering SongItemRow:", song.title, "isPlaying:", isPlaying, "isActive:", isActive);

  const handlePlayPause = () => {
    if (isPlaying && onPauseClick) {
      onPauseClick(song.id);
    } else {
      onPlayClick(song.id);
    }
  };

  const activeClass = isActive ? 'bg-blue-800' : ''; // Highlight if active

  return (
    <div
      className={`flex items-center p-3 rounded-md transition-colors ${DORAEMON_ROW_HOVER_BG} ${activeClass} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index or Play/Pause Button */}
      <div className="w-10 flex items-center justify-center mr-3">
        {isHovered || isPlaying ? (
          <Button variant="ghost" size="icon" onClick={handlePlayPause} className={`${DORAEMON_ICON_COLOR} hover:text-red-400`}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        ) : (
          index !== undefined ? (
            <span className={`text-sm ${DORAEMON_TEXT_SECONDARY}`}>{index + 1}</span>
          ) : (
            <Play className={`h-5 w-5 ${DORAEMON_TEXT_SECONDARY} opacity-0 group-hover:opacity-100 transition-opacity`} /> // Placeholder for play on hover if no index
          )
        )}
      </div>

      {/* Album Art & Song Info */}
      <Avatar className="h-10 w-10 rounded mr-3">
        <AvatarImage src={song.albumArtUrl || '/placeholder.svg'} alt={song.title} />
        <AvatarFallback>{song.title.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className={`font-medium truncate ${DORAEMON_TEXT_PRIMARY} ${isActive ? 'text-yellow-400' : ''}`}>{song.title}</p>
        <p className={`text-sm truncate ${DORAEMON_TEXT_SECONDARY}`}>{song.artist}</p>
      </div>

      {/* Album (Optional) */}
      {song.album && <p className={`w-1/4 text-sm truncate hidden md:block ${DORAEMON_TEXT_SECONDARY}`}>{song.album}</p>}
      
      {/* Like Button (visible on hover) */}
      {onLikeSong && (
        <Button
          variant="ghost"
          size="icon"
          className={`mx-2 ${DORAEMON_ICON_COLOR} opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400`}
          onClick={() => onLikeSong(song.id)}
        >
          <Heart className="h-5 w-5" />
        </Button>
      )}

      {/* Duration */}
      <p className={`w-16 text-sm text-right ${DORAEMON_TEXT_SECONDARY}`}>{song.duration}</p>

      {/* More Options Menu (visible on hover) */}
      <div className="ml-2 w-10 flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`${DORAEMON_ICON_COLOR} opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400`}
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
            <DropdownMenuItem onClick={() => onPlayClick(song.id)} className="hover:!bg-blue-600">
              <Play className="mr-2 h-4 w-4" /> Play Now
            </DropdownMenuItem>
            {onAddToQueue && (
              <DropdownMenuItem onClick={() => onAddToQueue(song.id)} className="hover:!bg-blue-600">
                <ListPlus className="mr-2 h-4 w-4" /> Add to Queue
              </DropdownMenuItem>
            )}
            {/* Add more options like Add to Playlist, Go to Album, Go to Artist */}
            <DropdownMenuSeparator className="bg-gray-700"/>
            <DropdownMenuItem className="hover:!bg-blue-600">View Artist</DropdownMenuItem>
            <DropdownMenuItem className="hover:!bg-blue-600">View Album</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SongItemRow;