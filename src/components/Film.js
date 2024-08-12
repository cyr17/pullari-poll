import React from 'react';
import { toast } from 'react-toastify';
const Film = ({ film ,votedFilm, voteForFilm}) => {
  const handleVote = () => {
    voteForFilm(film.id);
  };
  return (
    <div className="p-4 rounded-lg shadow-md bg-white relative">
      <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
       
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
      
      <h3 className="text-xl font-bold mb-2">{film.title}</h3>
      <p className="text-gray-600 text-sm">{film.description}</p>
      
      {votedFilm === film.id?(
        <div className="flex justify-center mt-4">
          <button className="bg-blue-100 hover:bg-blue-200 text-green-600 font-bold py-3 px-8 rounded-full" >Voted</button>
        </div>
      ):(
        <div className="flex justify-center mt-4">
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-3 px-8 rounded-full" onClick={handleVote} >Vote</button>
        </div>

      )
    
      }
      
    </div>
    
  );
};

export default Film;
