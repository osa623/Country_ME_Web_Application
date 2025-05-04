import React from 'react';
import CountryList from '../components/countries/CountryList';
import SearchBar from '../components/countries/SearchBar';
import RegionFilter from '../components/countries/RegionFilter';
import LanguageFilter from '../components/countries/LanguageFilter';

//importing images for this one 
import backgroundImage from '../assests/background1.jpg';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className='relative w-full h-[60vh] bg-transparent overflow-hidden justify-between items-center mb-8'>
        <div className='absolute blur-sm flex w-full z-30 bg-transparent overflow-hidden h-[60vh] items-center justify-center'>
          <img src={backgroundImage} alt="Background" className='flex w-full h-[60vh] object-cover' />
        </div>
        
        <div className='absolute flex flex-col w-full bg-transparent overflow-hidden h-[60vh] z-40 items-center justify-center'>
          <div className="max-w-xl w-full px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
              Explore Countries Around the World
            </h2>
            <SearchBar />
            
            <div className="mt-4 flex justify-center gap-4">
              <div className="max-w-xs w-full">
                <RegionFilter />
              </div>
              <div className="max-w-xs w-full">
                <LanguageFilter />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-12">
        <CountryList />
      </div>
    </div>
  );
};

export default HomePage;
