import react from 'react';

const LandingPage = () => {
    return (
        <div className="bg-cream min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/bg-film.png)' }}>
          
        <div className="flex flex-col items-center p-4 sm:p-0">
        <img src="https://firebasestorage.googleapis.com/v0/b/ballistiks-cyr17.appspot.com/o/Logo-embossed.jpg?alt=media&token=6b22c355-355b-4919-a130-1c8f36584e79" alt="City Icon" className="mx-auto h-15 sm:h-48 rounded-full " />
        
        <h1 className="text-3xl font-bold mt-4">SHORT FILM COMPETITION</h1>
        <h2 className="text-xl font-medium text-gray-400 mb-10">2024 CONTEST</h2>
        <p className="text-lg font-medium">Vote for your favorite short film</p>
        <a href="/voting" className="bg-blue-600 text-white font-bold py-2 px-8 rounded-full mt-6">VOTE</a>
        </div>
        </div>
      );
    };
export default LandingPage;