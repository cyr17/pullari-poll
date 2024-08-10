import React from 'react';

const Film = ({ film, onVote }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white relative">
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
      <div className="flex justify-center mt-4">
   
      <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-3 px-8 rounded-full" onClick={() => onVote(film.id)} >Vote</button>
      </div>
    </div>
    
  );
};

export default Film;
