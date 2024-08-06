import React from 'react';

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
      <button onClick={() => onVote(film.id)}>Vote</button>
    </div>
  );
};

export default Film;