import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogContainer,
} from './dialog.tsx';

import { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';

export function DialogBasicFilm({ film, votedFilm, voteForFilm }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [needsToggle, setNeedsToggle] = useState(false);
  const synopsisRef = useRef(null);

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
    <Dialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <div className="p-4 rounded-lg shadow-md bg-white relative">
        <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={film.url}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{film.title}</h3>
          <DialogTrigger>
            <button className="hover:bg-gray-200 text-blue-600 font-bold py-1 px-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-maximize"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </DialogTrigger>
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

      <DialogContainer>
        <DialogContent className="relative">
          <div className="p-4 rounded-lg shadow-md bg-white flex h-screen w-screen">
            <div className="flex-1 mb-4 rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 p-4 w-full h-screen"
                src={film.url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              />
            </div>
          </div>
        </DialogContent>
        <DialogClose
          className="fixed right-1 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </DialogClose>
      </DialogContainer>
    </Dialog>
  );
}
