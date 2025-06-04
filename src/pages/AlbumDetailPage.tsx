import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import SongItemRow from '@/components/SongItemRow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Heart, ListPlus } from 'lucide-react';

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

const albumDetails = {
  id: 'al1',
  title: 'Cosmic Anthems',
  artist: 'The Doraemons',
  releaseDate: '2023-10-26',
  coverArtUrl: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=Cosmic+Anthems',
  genre: 'Space Pop',
  songCount: 4,
  totalDuration: '15 min',
};

const mockAlbumSongs: SongData[] = [
  { id: 'sA1', title: 'Galaxy Rider', artist: 'The Doraemons', duration: '3:45', albumArtUrl: 'https://placehold.co/40x40/BA68C8/FFFFFF?text=A1' },
  { id: 'sA2', title: 'Starlight Serenade (feat. AstroGirl)', artist: 'The Doraemons', duration: '4:10', albumArtUrl: 'https://placehold.co/40x40/7986CB/FFFFFF?text=A2' },
  { id: 'sA3', title: 'Nebula Dreams', artist: 'The Doraemons', duration: '3:00', albumArtUrl: 'https://placehold.co/40x40/4FC3F7/FFFFFF?text=A3' },
  { id: 'sA4', title: 'Comet Tail', artist: 'The Doraemons', duration: '4:05', albumArtUrl: 'https://placehold.co/40x40/66BB6A/FFFFFF?text=A4' },
];

const AlbumDetailPage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  console.log('AlbumDetailPage loaded');

  const handlePlaySong = (songId: string) => {
    const songToPlay = mockAlbumSongs.find(s => s.id === songId);
    if (songToPlay) {
      setCurrentSong({
        id: songToPlay.id,
        title: songToPlay.title,
        artist: songToPlay.artist, // Artist should be same as album for album tracks
        albumArtUrl: albumDetails.coverArtUrl, // Use album cover for all songs in album context
        durationSeconds: 200, // Placeholder
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', // Placeholder
      });
      setCurrentlyPlayingId(songId);
    }
    console.log(`Play song ${songId} from album`);
  };

  const playEntireAlbum = () => {
    if (mockAlbumSongs.length > 0) {
        handlePlaySong(mockAlbumSongs[0].id);
    }
    console.log("Playing entire album");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white fixed inset-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <ScrollArea className="flex-1 overflow-y-auto p-6 pb-[100px]">
          <Card className="bg-gray-800 border-gray-700 text-white mb-6">
            <CardHeader className="flex flex-row items-start space-x-4 p-6">
              <img src={albumDetails.coverArtUrl} alt={albumDetails.title} className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm text-yellow-400 uppercase font-semibold">Album</p>
                <CardTitle className="text-4xl md:text-5xl font-bold my-2 leading-tight">{albumDetails.title}</CardTitle>
                <CardDescription className="text-gray-300 mb-1">
                  By <span className="font-semibold text-blue-400 hover:underline cursor-pointer">{albumDetails.artist}</span>
                </CardDescription>
                <p className="text-sm text-gray-400">
                  {albumDetails.genre} • Released {albumDetails.releaseDate}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {albumDetails.songCount} songs, {albumDetails.totalDuration}
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <Button onClick={playEntireAlbum} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <PlayCircle className="mr-2 h-6 w-6" /> Play Album
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400" title="Save to Library">
                    <Heart className="h-6 w-6" />
                  </Button>
                   <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" title="More options">
                    <ListPlus className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <div className="space-y-1">
            {mockAlbumSongs.map((song, index) => (
              <SongItemRow
                key={song.id}
                song={{...song, album: albumDetails.title, albumArtUrl: song.albumArtUrl || albumDetails.coverArtUrl}} // Ensure album context is passed
                index={index}
                onPlayClick={() => handlePlaySong(song.id)}
                isPlaying={currentSong?.id === song.id && currentlyPlayingId === song.id}
                isActive={currentlyPlayingId === song.id}
              />
            ))}
          </div>
        </ScrollArea>
        <MusicPlayerBar currentSong={currentSong} />
      </div>
    </div>
  );
};

export default AlbumDetailPage;