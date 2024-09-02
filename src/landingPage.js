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
        <div className='w-full flex flex-col items-center p-0rounded-lg'>
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
      <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 bg-white shadow-md rounded-lg">
        <img src="/awards_banner.PNG" alt="banner" className="w-full h-auto rounded-lg" />
        <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
          <a href="https://app.orgnyse.com.au/121/short-flim-dinner-night" className="bg-blue-600 text-white font-bold py-2 px-8 rounded-full mt-2">Book Seats</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;