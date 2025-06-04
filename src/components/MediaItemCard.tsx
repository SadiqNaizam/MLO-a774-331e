import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Music2 } from 'lucide-react'; // Play icon

// Doraemon theme colors
const DORAEMON_BLUE_BORDER_HOVER = 'hover:border-blue-500';
const DORAEMON_PLAY_ICON_COLOR = 'text-yellow-400'; // Yellow for play icon

interface MediaItemCardProps {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  itemType: 'playlist' | 'album' | 'artist' | 'song'; // To differentiate styling or actions
  onClick?: (id: string | number) => void;
  onPlayClick?: (id: string | number, itemType: MediaItemCardProps['itemType']) => void;
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  itemType,
  onClick,
  onPlayClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log("Rendering MediaItemCard:", title, itemType);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
    console.log(`Card clicked: ${title}`);
  };

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event when play button is clicked
    if (onPlayClick) {
      onPlayClick(id, itemType);
    }
    console.log(`Play clicked for: ${title}`);
  };

  // Placeholder if no image
  const finalImageUrl = imageUrl || '/placeholder.svg'; // Ensure you have a placeholder.svg in public folder

  return (
    <Card
      className={`w-full max-w-[200px] bg-gray-800 border-gray-700 text-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 ${DORAEMON_BLUE_BORDER_HOVER} cursor-pointer group relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-gray-700">
          <img
            src={finalImageUrl}
            alt={title}
            className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-75"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-2 right-2 ${DORAEMON_PLAY_ICON_COLOR} bg-black bg-opacity-50 rounded-full 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        hover:bg-red-500 hover:text-white`}
            onClick={handlePlayButtonClick}
            aria-label={`Play ${title}`}
          >
            <PlayCircle className="h-10 w-10" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-base font-semibold truncate text-yellow-400">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs text-gray-400 mt-1 line-clamp-2">
            {description}
          </CardDescription>
        )}
        <p className="text-xs text-gray-500 mt-1 capitalize">{itemType}</p>
      </CardContent>
      {/* Optional: Footer for more actions or info
      <CardFooter className="p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
          View
        </Button>
      </CardFooter>
      */}
    </Card>
  );
}

export default MediaItemCard;