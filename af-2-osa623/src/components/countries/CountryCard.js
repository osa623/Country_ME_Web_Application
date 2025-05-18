import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faGlobe, faMap, faPeopleArrows, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FaRegMap } from 'react-icons/fa';

const CountryCard = ({ country }) => {
  // Handling potential missing data

  const population = country.population?.toLocaleString() || 'Unknown';
  const region = country.region || 'Unknown';
  const capital = country.capital?.join(', ') || 'Unknown';
  
  return (
    <Link to={`/country/${country.cca3}`} className="block h-full relative">
      <div className="relative flex h-full overflow-hidden transition-shadow bg-white rounded-xl shadow hover:shadow-lg"
      style={{
        boxShadow:'inset 2px 0px 10px 5px rgba(0, 0, 0, 0.5) ,  0px -10px 20px rgba(0, 0, 0, 0.1)',
      }}>

        {/* Image Section */}
        <div className="h-48 sm:h-56 md:h-64 lg:h-[20rem] z-20 overflow-hidden"
            style={{
        boxShadow:'inset 2px 0px 10px 5px rgba(0, 0, 0, 0.5) ,  0px -10px 20px rgba(0, 0, 0, 0.1)',
      }}>
          <img
            src={country.flags?.png || country.flags?.svg || '/default-flag.png'}
            alt={`Flag of ${country.name?.common || 'Unknown Country'}`}
            className="object-cover w-full h-full"
          />
        </div>


        {/* Upper Section */}
        <div className="absolute h-24 sm:h-28 md:h-32 lg:h-[10rem] w-full z-30 top-0 bg-gradient-to-t from-white to-transparent overflow-hidden"/>
        <div className="absolute h-24 sm:h-28 md:h-32 lg:h-[10rem] bottom-0 w-full z-30 bg-white overflow-hidden"/>


        
        {/* Upper I Section */}
        <div className="absolute z-40 w-full h-24 sm:h-28 md:h-32 lg:h-[10rem] justify-between items-center p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden"
            style={{
        boxShadow:'inset 2px 0px 10px 5px rgba(0, 0, 0, 0.5) ,  0px -10px 20px rgba(0, 0, 0, 0.1)',
      }}>
            <div className='flex w-16 h-auto sm:w-20 md:w-24 lg:w-[6.5rem] bg-transparent drop-shadow-2xl items-center justify-center'
           >
                <img
                src={country.flags?.png || country.flags?.svg || '/default-flag.png'}
                alt={`Flag of ${country.name?.common || 'Unknown Country'}`}
                className="object-cover w-full h-full border-2 sm:border-4 drop-shadow-2xl"
                
              />
            </div>

            <FavoriteButton country={country} />

            <h2 className='absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 font-bricolagegrotesque right-2 sm:right-3 md:right-4 lg:right-5 text-center bg-gray-800 p-1 sm:p-1.5 md:p-2 text-white text-xs sm:text-sm font-thin mt-2'
            style={{
              fontWeight:'200'
            }}><FontAwesomeIcon icon={faGlobe} className='mr-1 sm:mr-2' />{country.name?.common || 'Unknown Country'}
            </h2>
        </div>

         {/* Upper II Section */}
         <div className="absolute flex z-40 w-full h-24 sm:h-28 md:h-32 lg:h-[10rem] justify-start bottom-0 items-start overflow-hidden">
            <div className='flex w-full h-auto bg-transparent p-2 sm:p-3 md:p-4 drop-shadow-2xl items-start justify-start'>

            <div className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm md:text-base">
              <span className="font-dmsans"><FontAwesomeIcon icon={faPeopleGroup} className='text-blue-800 mr-1 sm:mr-2'/>Population:</span> {population}
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              <span className="font-dmsans"><FontAwesomeIcon icon={faMap} className='text-blue-800 mr-1 sm:mr-2'/>Region:</span> {region}
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              <span className="font-dmsans"><FontAwesomeIcon icon={faCity} className='text-blue-800 mr-1 sm:mr-2'/>Capital:</span> {capital}
            </p>
          </div>
              
            </div>
           

              <h2 className='absolute -bottom-16 font-dmsans -right-16 opacity-10 text-secondary text-center p-2 text-nowrap text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-thin mt-2'
              style={{
                fontWeight:'100'
              }}>{country.name?.common || 'Unknown Country'}
              </h2>
         
           
        </div>

        

      </div>
    </Link>
  );
};

export default CountryCard;
