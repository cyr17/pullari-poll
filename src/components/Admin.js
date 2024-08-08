import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [film, setFilm] = useState({ title: '', url: '' });
  const API_BASE_URL='https://pullaripollserver.vercel.app';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilm({ ...film, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save the film to your backend or database
    await axios.post(`${API_BASE_URL}/films`, film);
    setFilm({ title: '', url: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={film.title}
        onChange={handleChange}
        placeholder="Film Title"
      />
      <input
        type="text"
        name="url"
        value={film.url}
        onChange={handleChange}
        placeholder="YouTube URL"
      />
      <button type="submit">Add Film</button>
    </form>
  );
};

export default Admin;
