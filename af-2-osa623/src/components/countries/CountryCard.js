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
        <div className="lgs:h-[20rem] z-20 overflow-hidden"
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
        <div className="absolute lgs:h-[10rem] w-full z-30 top-0 bg-gradient-to-t from-white to-transparent overflow-hidden"/>
        <div className="absolute lgs:h-[10rem] bottom-0 w-full z-30 bg-white overflow-hidden"/>


        
        {/* Upper I Section */}
        <div className="absolute z-40 w-full lgs:h-[10rem] justify-between items-center lgs:p-6 overflow-hidden"
            style={{
        boxShadow:'inset 2px 0px 10px 5px rgba(0, 0, 0, 0.5) ,  0px -10px 20px rgba(0, 0, 0, 0.1)',
      }}>
            <div className='flex lgs:w-[6.5rem] lgs:h-auto bg-transparent drop-shadow-2xl items-center justify-center'
           >
                <img
                src={country.flags?.png || country.flags?.svg || '/default-flag.png'}
                alt={`Flag of ${country.name?.common || 'Unknown Country'}`}
                className="object-cover w-full h-full border-4 drop-shadow-2xl"
                
              />
            </div>

            <FavoriteButton country={country} />

            <h2 className='absolute bottom-5  font-bricolagegrotesque right-5 text-center  bg-gray-800  lgs:p-2 0 text-white text-nowrap text-sm font-thin mt-2'
            style={{
              fontWeight:'200'
            }}><FontAwesomeIcon icon={faGlobe} className='mr-2' />{country.name?.common || 'Unknown Country'}
            </h2>
        </div>

         {/* Upper II Section */}
         <div className="absolute flex z-40 w-full lgs:h-[10rem] justify-start bottom-0 items-start  overflow-hidden"
            style={{

      }}>
            <div className='flex lgs:w-full lgs:h-auto bg-transparent lgs:p-4 drop-shadow-2xl items-start justify-start'>

            <div className="space-y-2">
            <p>
              <span className=" font-dmsans text-md"><FontAwesomeIcon icon={faPeopleGroup} className=' text-blue-800 mr-2'/>Population:</span> {population}
            </p>
            <p>
              <span className="font-dmsans text-md"><FontAwesomeIcon icon={faMap} className=' text-blue-800 mr-2'/>Region:</span> {region}
            </p>
            <p>
              <span className=" font-dmsans text-md"><FontAwesomeIcon icon={faCity} className=' text-blue-800 mr-2'/>Capital:</span> {capital}
            </p>
          </div>
              
            </div>
           

              <h2 className='absolute -bottom-16 font-dmsans -right-16 opacity-10 text-secondary text-center lgs:p-2 0 text-nowrap text-9xl font-thin mt-2'
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
