import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import SongItemRow from '@/components/SongItemRow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Keep if used in top bar
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For song filtering
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { PlayCircle, Shuffle, MoreVertical, Search as SearchIcon } from 'lucide-react';

// Placeholder data types
interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds: number;
  audioUrl: string;
}
interface SongData { id: string; title: string; artist: string; album?: string; duration: string; albumArtUrl?: string; }

const playlistDetails = {
  id: 'pl1',
  title: "Doraemon's Pocket Hits",
  description: 'A collection of upbeat and fun tracks curated by Doraemon himself. Perfect for any adventure!',
  coverArtUrl: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=Doraemon+Hits',
  owner: 'Doraemon',
  songCount: 5,
  totalDuration: '18 min',
};

const mockPlaylistSongs: SongData[] = [
  { id: 's1', title: 'Future Gadget Rock', artist: 'The Nobitas', album: 'Time Machine Grooves', duration: '3:30', albumArtUrl: 'https://placehold.co/40x40/FBC02D/000000?text=S1' },
  { id: 's2', title: 'Anywhere Doorstep Blues', artist: 'Gian & Suneo', album: 'Bully Ballads', duration: '4:05', albumArtUrl: 'https://placehold.co/40x40/F06292/FFFFFF?text=S2' },
  { id: 's3', title: 'Shizuka\'s Serenade', artist: 'Shizuka Minamoto', album: 'Sweet Melodies', duration: '2:55', albumArtUrl: 'https://placehold.co/40x40/4DD0E1/000000?text=S3' },
  { id: 's4', title: 'Dorayaki Dreams', artist: 'Doraemon', album: 'Pocket Full of Tunes', duration: '3:15', albumArtUrl: 'https://placehold.co/40x40/AED581/000000?text=S4' },
  { id: 's5', title: 'Zero Gravity Jive', artist: 'The Doraemons', album: 'Cosmic Anthems', duration: '4:20', albumArtUrl: 'https://placehold.co/40x40/FF8A65/000000?text=S5' },
];


const PlaylistDetailPage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [filterTerm, setFilterTerm] = useState('');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  console.log('PlaylistDetailPage loaded');

  const handlePlaySong = (songId: string) => {
    const songToPlay = mockPlaylistSongs.find(s => s.id === songId);
    if (songToPlay) {
      setCurrentSong({
        id: songToPlay.id,
        title: songToPlay.title,
        artist: songToPlay.artist,
        albumArtUrl: songToPlay.albumArtUrl,
        durationSeconds: 210, // Placeholder
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Placeholder
      });
      setCurrentlyPlayingId(songId);
    }
    console.log(`Play song ${songId} from playlist`);
  };
  
  const playEntirePlaylist = () => {
    if (mockPlaylistSongs.length > 0) {
        handlePlaySong(mockPlaylistSongs[0].id);
    }
    console.log("Playing entire playlist");
  };

  const filteredSongs = mockPlaylistSongs.filter(song =>
    song.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white fixed inset-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <ScrollArea className="flex-1 overflow-y-auto p-6 pb-[100px]">
          <Card className="bg-gray-800 border-gray-700 text-white mb-6">
            <CardHeader className="flex flex-row items-start space-x-4 p-6">
              <img src={playlistDetails.coverArtUrl} alt={playlistDetails.title} className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm text-yellow-400 uppercase font-semibold">Playlist</p>
                <CardTitle className="text-4xl md:text-5xl font-bold my-2 leading-tight">{playlistDetails.title}</CardTitle>
                <CardDescription className="text-gray-300 mb-3">{playlistDetails.description}</CardDescription>
                <p className="text-sm text-gray-400">
                  Created by <span className="font-semibold text-blue-400">{playlistDetails.owner}</span>
                </p>
                <p className="text-sm text-gray-400">
                  {playlistDetails.songCount} songs, {playlistDetails.totalDuration}
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <Button onClick={playEntirePlaylist} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <PlayCircle className="mr-2 h-6 w-6" /> Play
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                    <Shuffle className="mr-2 h-5 w-5" /> Shuffle
                  </Button>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-700 border-gray-600 text-white">
                        <DropdownMenuItem className="hover:!bg-blue-600">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="hover:!bg-blue-600">Delete Playlist</DropdownMenuItem>
                        <DropdownMenuItem className="hover:!bg-blue-600">Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="mb-4 relative">
             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
             <Input
                type="text"
                placeholder="Filter songs in playlist..."
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 pl-10 placeholder-gray-500 text-white"
             />
          </div>
          
          <div className="space-y-1">
            {filteredSongs.map((song, index) => (
              <SongItemRow
                key={song.id}
                song={song}
                index={index}
                onPlayClick={() => handlePlaySong(song.id)}
                isPlaying={currentSong?.id === song.id && currentlyPlayingId === song.id}
                isActive={currentlyPlayingId === song.id}
                // Add other props like onAddToQueue, onLikeSong if needed
              />
            ))}
            {filteredSongs.length === 0 && <p className="text-gray-400 text-center py-4">No songs match your filter.</p>}
          </div>
        </ScrollArea>
        <MusicPlayerBar currentSong={currentSong} />
      </div>
    </div>
  );
};

export default PlaylistDetailPage;