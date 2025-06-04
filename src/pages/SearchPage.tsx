import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MediaItemCard from '@/components/MediaItemCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import SongItemRow from '@/components/SongItemRow';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon } from 'lucide-react';

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

const mockSongs: SongData[] = [
  { id: 's1', title: 'Search Result Song 1', artist: 'Artist A', album: 'Album X', duration: '3:45', albumArtUrl: 'https://placehold.co/40x40/FFC107/000000?text=S1' },
  { id: 's2', title: 'Another Found Track', artist: 'Artist B', album: 'Album Y', duration: '4:12', albumArtUrl: 'https://placehold.co/40x40/4CAF50/FFFFFF?text=S2' },
];
const mockAlbums = [
  { id: 'al1', title: 'Found Album Alpha', description: 'By Various Artists', imageUrl: 'https://placehold.co/200x200/F44336/FFFFFF?text=AlbumA', itemType: 'album' as 'playlist' | 'album' | 'artist' | 'song'},
];
const mockPlaylists = [
  { id: 'pl1', title: 'Search Playlist Hits', description: 'Curated for you', imageUrl: 'https://placehold.co/200x200/2196F3/FFFFFF?text=PlaylistS', itemType: 'playlist' as 'playlist' | 'album' | 'artist' | 'song'},
];
const mockArtists = [
 { id: 'ar1', title: 'Musician Extraordinaire', description: 'Genre: Pop/Rock', imageUrl: 'https://placehold.co/200x200/9C27B0/FFFFFF?text=ArtistX', itemType: 'artist' as 'playlist' | 'album' | 'artist' | 'song'},
];


const SearchPage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('songs');

  console.log('SearchPage loaded');

  const handlePlaySong = (songId: string) => {
    const songToPlay = mockSongs.find(s => s.id === songId);
    if (songToPlay) {
      setCurrentSong({
        id: songToPlay.id,
        title: songToPlay.title,
        artist: songToPlay.artist,
        albumArtUrl: songToPlay.albumArtUrl,
        durationSeconds: 225, // Placeholder
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder
      });
    }
    console.log(`Play song ${songId}`);
  };
  
  const handlePlayMediaItem = (itemId: string | number, itemType: 'playlist' | 'album' | 'artist' | 'song') => {
     console.log(`Play clicked for item ${itemId} of type ${itemType}`);
     setCurrentSong({
       id: String(itemId),
       title: `Sample Song from ${itemType}`,
       artist: 'Various Artists',
       albumArtUrl: 'https://placehold.co/64x64/7C3AED/FFFFFF?text=MI',
       durationSeconds: 180,
       audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
     });
  };


  return (
    <div className="flex h-screen bg-gray-900 text-white fixed inset-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <div className="relative w-2/3">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for songs, artists, albums, playlists..."
              className="pl-10 w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <ScrollArea className="flex-1 overflow-y-auto p-6 pb-[100px]">
          {searchTerm ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="songs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Songs</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Albums</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Artists</TabsTrigger>
                <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="songs" className="mt-4">
                {mockSongs.length > 0 ? mockSongs.map((song, index) => (
                  <SongItemRow
                    key={song.id}
                    song={song}
                    index={index}
                    onPlayClick={handlePlaySong}
                    isPlaying={currentSong?.id === song.id}
                  />
                )) : <p className="text-gray-400">No songs found for "{searchTerm}".</p>}
              </TabsContent>
              <TabsContent value="albums" className="mt-4">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockAlbums.length > 0 ? mockAlbums.map(album => (
                        <MediaItemCard key={album.id} {...album} onPlayClick={handlePlayMediaItem} onClick={() => console.log(`View album ${album.id}`)} />
                    )) : <p className="text-gray-400 col-span-full">No albums found for "{searchTerm}".</p>}
                 </div>
              </TabsContent>
              <TabsContent value="artists" className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockArtists.length > 0 ? mockArtists.map(artist => (
                        <MediaItemCard key={artist.id} {...artist} onPlayClick={handlePlayMediaItem} onClick={() => console.log(`View artist ${artist.id}`)} />
                    )) : <p className="text-gray-400 col-span-full">No artists found for "{searchTerm}".</p>}
                </div>
              </TabsContent>
              <TabsContent value="playlists" className="mt-4">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockPlaylists.length > 0 ? mockPlaylists.map(playlist => (
                        <MediaItemCard key={playlist.id} {...playlist} onPlayClick={handlePlayMediaItem} onClick={() => console.log(`View playlist ${playlist.id}`)} />
                    )) : <p className="text-gray-400 col-span-full">No playlists found for "{searchTerm}".</p>}
                 </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <SearchIcon size={48} className="mb-4"/>
                <p className="text-xl">Search for your favorite music.</p>
                <p>Find songs, artists, albums, and playlists.</p>
            </div>
          )}
        </ScrollArea>
        <MusicPlayerBar currentSong={currentSong} />
      </div>
    </div>
  );
};

export default SearchPage;