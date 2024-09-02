import React from 'react';
import { Carousel } from 'flowbite-react';
import NavbarComponent from './NavbarComponent';
const LandingPage = () => {
  return (
    <div>
      <div className='container mx-auto w-fit'>
        <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 bg-white shadow-md rounded-lg">
          <img src="/banner.PNG" alt="banner" className="w-full h-auto rounded-lg" />
          <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
            <a href="/voting" className="bg-blue-600 text-white font-bold py-2 px-8 rounded-full mt-2">Watch short films</a>
          </div>
          <p className="text-2xl font-bold">PSFF 2024 SPONSORS</p><br />
          <div className='w-full flex flex-col items-center p-0 rounded-lg'>
            <Carousel className="w-full">
              <div className="relative w-full" style={{ paddingBottom: '52.36%' }}>
                <img src="/event.png" alt='placeholder' className="absolute top-0 left-0 w-full h-full object-contain" />
              </div>
              <div className="relative w-full" style={{ paddingBottom: '52.36%' }}>
                <img src="/gold.png" alt='placeholder' className="absolute top-0 left-0 w-full h-full object-contain" />
              </div>
              <div className="relative w-full" style={{ paddingBottom: '52.36%' }}>
                <img src="/silver.png" alt='placeholder' className="absolute top-0 left-0 w-full h-full object-contain" />
              </div>
              <div className="relative w-full" style={{ paddingBottom: '52.36%' }}>
                <img src="/bronze.png" alt='placeholder' className="absolute top-0 left-0 w-full h-full object-contain" />
              </div>
            </Carousel>
          </div>
        </div>

        <div class="bg-blue-600 flex items-center justify-center h-auto py-8 rounded-t-lg">
          <div class="text-center text-white">
              <h1 class="text-lg font-semibold">Pulari Victoria Inc</h1>
              <p class="mt-2">PRESENTS</p>
              <h2 class="text-2xl font-bold mt-4">Pulari Short Film Festival Awards Ceremony</h2>
              <div class="mt-6 flex flex-col items-center space-y-4">
                  <div class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                      <span>13 OCTOBER 2024</span>
                  </div>
                  <div class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>11:00 AM</span>
                  </div>
                  <div class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>CATHIES LANE RECEPTIONS</span>
                  </div>
              </div>
              <div className="bg-white text-blue-600 font-bold py-2 px-8 rounded-full mt-2 flex items-center justify-center space-x-2">
                  <a href="https://app.orgnyse.com.au/121/short-flim-dinner-night">Book Seats</a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ticket">
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                      <path d="M13 5v2"/>
                      <path d="M13 17v2"/>
                      <path d="M13 11v2"/>
                  </svg>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;