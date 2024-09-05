import { useState } from 'react';
import { useEffect, useRef } from 'react';

export function DialogBasicFilm({ film, votedFilm, voteForFilm }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [needsToggle, setNeedsToggle] = useState(false);
  const synopsisRef = useRef(null);
  const iframeRef = useRef(null);


  useEffect(() => {
    // Check if the synopsis requires a toggle based on its height
    if (synopsisRef.current) {
      const lineHeight = parseFloat(getComputedStyle(synopsisRef.current).lineHeight);
      const maxHeight = lineHeight * 3; // Assuming 3 lines as the limit
      setNeedsToggle(synopsisRef.current.scrollHeight > maxHeight);
    }
  }, []);

  const handleVote = () => {
    voteForFilm(film.id);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    
      <div className="p-4 rounded-lg shadow-md bg-white relative">
        <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
        <iframe
          id="player"
          className="absolute top-0 left-0 w-full h-full"
          src={`${film.url}?enablejsapi=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          ref={iframeRef}
        />
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{film.title}</h3>
          
        </div>
        <p className="text-gray-600 text-sm italic font-bold">Director: {film.director}</p>

        <p ref={synopsisRef} className={`text-gray-600 text-sm ${!isExpanded && needsToggle ? 'line-clamp-3' : ''}`}>
          Synopsis: {film.synopsis}
        </p>

        {needsToggle && (
          <button
            onClick={toggleReadMore}
            className="text-blue-500 hover:underline text-sm mt-1"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
        {votedFilm === film.id ? (
          <div className="flex justify-center mt-4">
            <button className="bg-blue-100 hover:bg-blue-200 text-green-600 font-bold py-3 px-8 rounded-full">
              Voted
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4 space-x-8">
            <button
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-3 px-8 rounded-full"
              onClick={handleVote}
            >
              Vote
            </button>
          </div>
        )}
      </div>

      
  );
}
