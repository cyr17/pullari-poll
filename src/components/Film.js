import React from 'react';


import { Button } from 'flowbite-react';

const Film = ({ film, onVote }) => {
  return (
    <div>
      <h3>{film.title}</h3>
      <iframe
        width="560"
        height="315"
        src={film.url}
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
      </iframe>
      <Button onClick={() => onVote(film.id)}>Vote</Button>
    </div>
  );
};

export default Film;