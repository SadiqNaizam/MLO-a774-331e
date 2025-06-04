import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MediaItemCard from '@/components/MediaItemCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search as SearchIcon } from 'lucide-react';

// Placeholder data for MusicPlayerBar Song type
interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds: number;
  audioUrl: string;
}

// Placeholder data for MediaItemCard
const featuredPlaylists = [
  { id: 'pl1', title: "Doraemon's Pocket Hits", description: 'Upbeat and fun tracks', imageUrl: 'https://placehold.co/200x200/3B82F6/FFFFFF?text=Playlist1', itemType: 'playlist' as 'playlist' | 'album' | 'artist' | 'song' },
  { id: 'pl2', title: 'Relaxing Vibes', description: 'Chill tunes for a calm day', imageUrl: 'https://placehold.co/200x200/10B981/FFFFFF?text=Playlist2', itemType: 'playlist' as 'playlist' | 'album' | 'artist' | 'song' },
  { id: 'pl3', title: 'Workout Power', description: 'High-energy music', imageUrl: 'https://placehold.co/200x200/F59E0B/FFFFFF?text=Playlist3', itemType: 'playlist' as 'playlist' | 'album' | 'artist' | 'song' },
];

const newReleases = [
  { id: 'al1', title: 'Future Sounds', description: 'By DJ Electron', imageUrl: 'https://placehold.co/200x200/EC4899/FFFFFF?text=Album1', itemType: 'album' as 'playlist' | 'album' | 'artist' | 'song' },
  { id: 'al2', title: 'Acoustic Dreams', description: 'By The Strummers', imageUrl: 'https://placehold.co/200x200/8B5CF6/FFFFFF?text=Album2', itemType: 'album' as 'playlist' | 'album' | 'artist' | 'song' },
];

const recentlyPlayed = [
  { id: 's1', title: 'Sunshine Groove', description: 'Artist A', imageUrl: 'https://placehold.co/200x200/EF4444/FFFFFF?text=Song1', itemType: 'song' as 'playlist' | 'album' | 'artist' | 'song' },
];

const MainInterfacePage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  console.log('MainInterfacePage loaded');

  const handlePlay = (itemId: string | number, itemType: 'playlist' | 'album' | 'artist' | 'song') => {
    console.log(`Play clicked for item ${itemId} of type ${itemType}`);
    // For demonstration, play a dummy song if any item is clicked
    setCurrentSong({
      id: String(itemId),
      title: `Sample Song from ${itemType}`,
      artist: 'Various Artists',
      albumArtUrl: 'https://placehold.co/64x64/7C3AED/FFFFFF?text=AA',
      durationSeconds: 180,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
    });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white fixed inset-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64"> {/* Adjust ml-64 to match Sidebar width */}
        {/* Top Bar within content area */}
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <div className="relative w-1/3">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for songs, artists, playlists..."
              className="pl-10 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <ScrollArea className="flex-1 overflow-y-auto p-6 pb-[100px]"> {/* pb for MusicPlayerBar height + padding */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Featured Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {featuredPlaylists.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={handlePlay}
                  onClick={() => console.log(`Navigate to playlist ${item.id}`)}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">New Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {newReleases.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={handlePlay}
                  onClick={() => console.log(`Navigate to album ${item.id}`)}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Recently Played</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recentlyPlayed.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={handlePlay}
                  onClick={() => console.log(`Play song ${item.id}`)}
                />
              ))}
            </div>
          </section>
        </ScrollArea>
        <MusicPlayerBar currentSong={currentSong} />
      </div>
    </div>
  );
};

export default MainInterfacePage;