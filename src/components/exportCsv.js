import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { filmsList } from './FilmList';
export const exportToExcel = (votes) => {
  const filmList = filmsList;

    const wb = XLSX.utils.book_new();

    // Create a mapping from filmId to filmName
    const filmMap = filmList.reduce((map, film) => {
      map[film.id] = film.title;
      return map;
  }, {});

    
    // Add voting details to a new sheet
    const votingData = [
        ['User Name', 'Film', 'Phone Number', 'Timestamp'],
        ...votes.map(vote => [
            vote.userName,
            filmMap[vote.filmId] || vote.filmId, // Replace filmId with filmName
            vote.phoneNumber,
            vote.timeStamp,
        ]),
    ];

    const votingSheet = XLSX.utils.aoa_to_sheet(votingData);
    XLSX.utils.book_append_sheet(wb, votingSheet, 'Voting Details');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), 'VotingList.xlsx');
};