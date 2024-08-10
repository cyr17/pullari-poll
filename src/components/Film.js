import React from 'react';
import { Button } from 'flowbite-react';

const Film = ({ film, onVote }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-bold mb-2">{film.title}</h3>
      <div className="aspect-w-16 aspect-h-9">
       
      <iframe
        className='absolute top-0 left-0 w-full h-full'
        
        src={film.url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      </div>
      <Button onClick={() => onVote(film.id)} className="mt-2">Vote</Button>
    </div>
  );
};

export default Film;
