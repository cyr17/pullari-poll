import { useState } from 'react';

const Temp = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);

  const films = [
    {
      title: 'The Last Stand',
      description:
        'An action-packed thriller that keeps you on the edge of your seat.',
      image: 'https://picsum.photos/200/300', // Replace with your actual image URL
    },
    {
      title: 'Love\'s Journey',
      description:
        'A romantic drama that explores the highs and lows of a passionate relationship.',
      image: 'https://picsum.photos/200/300', // Replace with your actual image URL
    },
  ];

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Featured Films</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {films.map((film) => (
          <div
            key={film.title}
            className={`rounded-lg shadow-md cursor-pointer ${
              selectedFilm === film ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleFilmClick(film)}
          >
            <img
              src={film.image}
              alt={film.title}
              className="rounded-t-lg w-full"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{film.title}</h2>
              <p className="text-gray-600 text-sm">{film.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedFilm && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">
            {selectedFilm.title}
          </h2>
          <p className="text-gray-600">{selectedFilm.description}</p>
          {/* Add more details or buttons for the selected film here */}
        </div>
      )}
    </div>
  );
}

export default Temp;