import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import { useFavorites } from '../contexts/FavoritesContext';

//images
import subBackground from '../assests/background4.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircle, faCity, faFlag, faHeart, faHeartBroken, faLanguage, faLayerGroup, faMoneyBill, faSubscript } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { area } from 'framer-motion/client';

const CountryDetailPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data[0]);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  const toggleFavorite = () => {
    if (!country) return;
    
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
      console.log('Removed from favorites:', country.name.common);
    } else {
      addFavorite(country);
      console.log('Added to favorites:', country.name.common);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="p-8 rounded-xl bg-white shadow-xl flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-md font-medium text-gray-700">Loading country details...</div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <div className="p-8 rounded-xl bg-white shadow-xl text-center">
          <div className="text-6xl mb-4">😕</div>
          <div className="text-md text-red-500 font-medium">
            {error || 'Country not found'}
          </div>
          <Link to="/home" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg">
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  // Destructure and handle optional properties
  const {
    name,
    population,
    region,
    subregion,
    capital,
    area,
    flags,
    currencies,
    languages,
    borders,
    tld,
    coatOfArms
  } = country;


  //detail page

  // Format currencies for display
  const formattedCurrencies = currencies ? 
    Object.entries(currencies).map(([code, currency]) => (
      <span key={code} className="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-blue-100 text-blue-800 rounded-full">
        {currency.name} <span className="ml-1 font-semibold">{currency.symbol}</span>
      </span>
    )) : 
    <span className="text-gray-500">No currency data</span>;

  // Format languages for display
  const formattedLanguages = languages ?
    Object.entries(languages).map(([code, language]) => (
      <span key={code} className="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-green-100 text-green-800 rounded-full">
        {language}
      </span>
    )) :
    <span className="text-gray-500">No language data</span>;



  return (
    <div className="relative sms:flex-col sms:h-[200rem] lgs:h-[180vh] w-full bg-transparent overflow-hidden z-40" >
       <div className='absolute w-full h-screen  justify-center items-center'>
                
            <img
                  src={flags.svg || flags.png}
                  alt={`Flag of ${name.common}`}
                  className="object-cover w-full sm:scale-125 md:scale-140 lgs:scale-150 shadow-md"
                />
            
 

       </div>
       <div className="absolute z-40 flex inset-0 right-0  bg-gradient-to-l from-transparent via-white to-white w-full lgs:w-[100vw]"/>
      <div className='absolute flex flex-col w-full z-50 h-auto bg-gradient-to-l from-white via-transparent to-transparent overflow-hidden items-start justify-start'>
          
          {/* Upper Section for the top layer */}
          <div className='flex flex-col sm:flex-row lgs:h-[30vh] w-full items-start bg-blue-400 justify-between overflow-hidden'>



              <div className='relative flex-col w-full lgs:w-full h-40 sm:h-60 md:h-80 items-center justify-center overflow-hidden'>
               
                <img
                  src={subBackground}
                  alt={`Flag of ${name.common}`}
                  className="absolute object-cover z-20 w-full h-40 sm:h-60 md:h-80"
                />
                <div className='absolute object-cover z-20 w-full sm:w-[60vw] md:w-[50vw] h-40 sm:h-60 md:h-80 bg-gradient-to-l from-blue-400 via-blue-400 to-transparent'/>
                <div className='absolute object-cover z-20 w-full sm:w-[70vw] md:w-[50vw] h-40 sm:h-60 md:h-80 bg-transparent to-transparent'>
                <h2 className='flex flex-col font-dmsans text-2xl sm:text-4xl md:text-5xl lgs:text-6xl font-bold text-white drop-shadow-lg p-4 sm:p-6 md:p-8 lgs:p-12'
              style={{
                fontWeight:'100'
              }}>
                {name?.common || 'Country Name'}<span className='text-lg sm:text-xl md:text-2xl lgs:text-3xl mt-2 text-white bg-blue-700 p-1 sm:p-1.5 lgs:p-2 font-normal'>{name?.official || 'Official Name'}</span>
              </h2>

                </div>

              </div>

              <div className='relative flex-col w-full lgs:w-120 h-40 sm:h-60 md:h-80 items-center justify-center overflow-hidden'>
                <img
                  src={flags.svg || flags.png}
                  alt={`Flag of ${name.common}`}
                  className="absolute object-cover z-20 w-full h-40 sm:h-60 md:h-80"
                />
                <div className='absolute flex object-cover z-20 w-full sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-r from-blue-400 to-transparent'>


                </div>

                    {/* Navigation bar with back button and favorite */}

                    <div className="bg-white relative flex-col w-full sm:w-[70vw] md:w-[60vw] lgs:w-[50vw] shadow-md">
                      <div className="container flex flex-row sm:flex-col lgs:space-y-5 absolute z-40 w-full mx-auto px-2 sm:px-3 md:px-4 py-4 sm:py-8 md:py-12 flex justify-between items-center">
                        <Link 
                          to="/home" 
                          className="flex items-center bg-blue-600 rounded-full p-2 sm:p-3 md:p-4 lgs:p-4 text-white hover:text-yellow-600 transition-colors text-xs sm:text-sm md:text-base"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} className="mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Back to Countries</span>
                          <span className="inline sm:hidden">Back</span>
                        </Link>
                        
                        <button 
                          onClick={toggleFavorite} 
                          className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                          disabled={!country}
                        >
                          <FontAwesomeIcon 
                            icon={country && isFavorite(country.cca3) ? faHeart : faHeartBroken} 
                            className={`mr-1 sm:mr-2 ${country && isFavorite(country.cca3) ? 'text-red-500' : 'text-gray-400'}`} 
                          />
                          <span className="hidden sm:inline">
                            {country && isFavorite(country.cca3) ? 'Remove from Favorites' : 'Add to Favorites'}
                          </span>
                          <span className="inline sm:hidden">
                            {country && isFavorite(country.cca3) ? 'Remove' : 'Add'}
                          </span>
                        </button>

                      </div>

                    </div>

              </div>

              
              
          </div>

  
                <div className='flex flex-col lg:flex-row lgs:h-auto w-full space-y-6 lg:space-y-0 lgs:space-x-2 overflow-y-auto items-start p-2 sm:p-3 md:p-4 lgs:p-5 justify-center overflow-hidden'>


                   

                   
                        <div className='relative flex-col w-full lgs:w-[30vw] rounded-md p-2 sm:p-4 md:p-5 lgs:p-6 h-auto items-center justify-center'>
                        
                          <div className='flex flex-col font-dmsans items-center justify-center text-center text-lg sm:text-xl bg-blue-950 rounded-2xl p-3 sm:p-4 md:p-5 lgs:p-5 text-white drop-shadow-lg'
                          style={{
                          fontWeight:'200',
                          
                          }}>
                          <h2 className='flex font-dmsans text-2xl sm:text-3xl md:text-4xl text-white'
                          style={{
                          fontWeight:'200'
                          }}>National Symbols</h2>
                          </div>


                          <div className='flex w-full items-center justify-center overflow-hidden'>
                          <div className='flex w-[0.1rem] h-[1rem] sm:h-[1.5rem] md:h-[2rem] lgs:h-[2rem] bg-gray-900'/>
                          </div>
                               
                          
                          <h2 className='flex flex-col font-dmsans text-center text-sm sm:text-md bg-blue-600 rounded-2xl p-1 sm:p-1.5 md:p-2 lgs:p-2 text-white drop-shadow-lg'
                          style={{
                          fontWeight:'200'
                          }}>
                          National Flag
                          </h2>


                          <div className='flex w-full items-center justify-center overflow-hidden'>
                          <div className='flex w-[0.1rem] h-[1rem] sm:h-[1.5rem] md:h-[2rem] lgs:h-[2rem] bg-gray-900'/>
                          </div>


                        <img
                        src={flags.svg || flags.png}
                        alt={`Flag of ${name.common}`}
                        className="flex object-cover rounded-xl z-20 w-auto h-auto max-w-full"
                        style={{
                          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',
                        }}
                        />
                        <div className='flex w-full items-center justify-center overflow-hidden'>
                          <div className='flex w-[0.1rem] h-[1rem] sm:h-[1.5rem] md:h-[2rem] lgs:h-[2rem] bg-gray-900'/>
                          </div>

                        <h2 className='flex flex-col font-dmsans text-center text-sm sm:text-md bg-blue-600 rounded-2xl p-1 sm:p-1.5 md:p-2 lgs:p-2 text-white drop-shadow-lg'
                          style={{
                          fontWeight:'200'
                          }}>
                          Coat of Arms
                          </h2>

                          <div className='flex w-full items-center justify-center overflow-hidden'>
                          <div className='flex w-[0.1rem] h-[1rem] sm:h-[1.5rem] md:h-[2rem] lgs:h-[2rem] bg-gray-900'/>
                          </div>

                        <div className='flex w-full items-center justify-center overflow-hidden'>
                          <img
                          src={coatOfArms?.png || coatOfArms?.png}
                          alt={`Coat of Arms of ${name.common}`}
                          className="flex object-cover rounded-xl z-20 w-[8rem] sm:w-[9rem] md:w-[10rem] h-auto"
                          style={{
                            boxShadow: ' inset 0 0 0 1px rgba(0, 0, 0, 0.2)',
                          }}
                          />
                          </div>

                          <div className='flex flex-col w-full mt-6 sm:mt-8 md:mt-10 lgs:mt-12 border-2 p-2 sm:p-3 md:p-4 lgs:p-4 border-blue-700 h-auto bg-transparent drop-shadow-2xl items-center justify-center overflow-hidden'>
                          
                            <h2 className='flex flex-col font-dmsans text-center text-xl sm:text-2xl drop-shadow-md rounded-2xl text-black'
                          style={{
                          fontWeight:'200'
                          }}>
                            
                               Border Countries
                             </h2>

                          {/* Border country images */}
                          <div className="flex flex-wrap justify-center items-center mt-4 gap-2 sm:gap-3 md:gap-4">
                            {borders?.length > 0 && Array.isArray(borders) && borders.map((borderCode) => (
                            <BorderCountryFlag key={borderCode} code={borderCode} />
                            ))}
                          </div>
                          
                        </div>
                        </div>  




                         
                        <div className='relative flex flex-col w-full lgs:w-[70vw] rounded-md h-auto p-2 sm:p-3 md:p-4 lgs:p-5 items-center justify-start'>

                             
                            <div className='flex flex-col w-full lgs:w-full h-auto bg-white rounded-3xl items-start bg-transparent justify-start p-4 sm:p-8 md:p-12'
                            style={{
                            boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 2px 10px 2px rgba(0, 0, 0, 0.2)',
                            }}>
                            <h2 className='text-xl sm:text-2xl font-bold font-bricolagegrotesque w-full md:w-[70vw] lgs:w-[50vw] text-gray-800 mb-4'>Country Overview</h2>
                            <p className='text-gray-600 font-dmsans text-sm sm:text-base w-full md:w-[70vw] lgs:w-[50vw]'
                            style={{
                            fontWeight:'200'
                            }}>
                            {name?.official || 'Official Name'} is located in the {region || 'Region'} region, specifically in the {subregion || 'Subregion'} subregion. 
                            It has a population of {population?.toLocaleString() || 'N/A'} people and its capital city is {capital || 'N/A'}.
                            </p>
                            <p className='text-gray-600 font-dmsans text-sm sm:text-base mt-4 w-full md:w-[70vw] lgs:w-[50vw]'
                            style={{
                            fontWeight:'200'
                            }}>
                            The country uses the top-level domain {tld?.[0] || 'N/A'} and spans an area of {area ? `${area.toLocaleString()} km²` : 'N/A'}.
                            </p>
                            <p className='text-gray-600 font-dmsans text-sm sm:text-base mt-4 w-full md:w-[70vw] lgs:w-[50vw]'
                            style={{
                            fontWeight:'200'
                            }}>
                            The national flag and coat of arms are important symbols of {name?.common || 'this country'}, representing its identity and heritage.
                            </p>
                            <p className='text-gray-600 font-dmsans text-sm sm:text-base mt-4 w-full md:w-[70vw] lgs:w-[50vw]'
                            style={{
                            fontWeight:'200'
                            }}>
                            {name?.common || 'This country'} shares borders with {borders?.length > 0 ? borders.join(', ') : 'no other countries'}, making it unique in its geographical context.
                            </p>
                            </div>

                            <div className='relative flex flex-col md:flex-row w-full h-auto mt-4 sm:mt-6 md:mt-8 lgs:mt-8 items-center justify-center space-y-4 md:space-y-0 md:space-x-4'>
                            {/* Spec Section I */} 
                                    <div className='flex flex-col w-full md:w-auto lgs:w-auto h-auto bg-white rounded-3xl items-start bg-transparent justify-start p-4 sm:p-8 md:p-12'
                                    style={{
                                      boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 2px 10px 2px rgba(0, 0, 0, 0.2)',
                                    }}>

                                      <div className='flex flex-col font-dmsans drop-shadow-2xl text-md rounded-xl bg-blue-900 lgs:p-2 font-bold text-white'
                                      style={{
                                        fontWeight:'300'
                                      }}>
                                        Key Information
                                      </div>

                                      <div className='flex flex-col w-auto h-auto lgs:mt-8 lgs:space-y-4 items-center justify-center'>
                                            
                                            {/* Population */}
                                            <div className='flex  w-auto h-auto items-start justify-start'>
                                                <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center rounded-full bg-blue-400'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 20px 10px 2px rgba(0, 0, 0, 0.2)',
                                                  }}>

                                                    <FontAwesomeIcon icon={faPeopleGroup} className='text-center text-white'/>

                                                  </div>
                                                  
                                                  <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center overflow-hidden'>
                                                        <div className='flex flex-col font-dmsans text-md lgs:w-[4rem] lgs:h-[0.1rem] font-bold bg-gray-800 drop-shadow-lg'/>
                                                  </div>

                                                  <div className='flex lgs:w-auto lgs:h-[3rem] bg-white rounded-full items-center justify-center overflow-hidden'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',

                                                  }}>
                                                        <p className='flex flex-col font-dmsans text-md  lgs:w-[15rem] items-center justify-center lgs:h-[5rem] font-bold text-black drop-shadow-lg'
                                                        style={{
                                                          fontWeight:'200'
                                                        }}>

                                                          {population?.toLocaleString() || 'Population'}
                                                        </p>
                                                  </div>

                                                  
                                                    
                                            </div>

                                            {/* region */}
                                            <div className='flex  w-auto h-auto items-start justify-start'>
                                                <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center rounded-full bg-blue-400'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 20px 10px 2px rgba(0, 0, 0, 0.2)',
                                                  }}>
                                                    <FontAwesomeIcon icon={faCircle} className='text-center text-white'/>

                                                  </div>
                                                  
                                                  <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center overflow-hidden'>
                                                        <div className='flex flex-col font-dmsans text-md lgs:w-[4rem] lgs:h-[0.1rem] font-bold bg-gray-800 drop-shadow-lg'/>
                                                  </div>

                                                  <div className='flex lgs:w-auto lgs:h-[3rem] bg-white rounded-full items-center justify-center overflow-hidden'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',

                                                  }}>
                                                        <p className='flex flex-col font-dmsans text-md  lgs:w-[15rem] items-center justify-center lgs:h-[5rem] font-bold text-black drop-shadow-lg'
                                                        style={{
                                                          fontWeight:'200'
                                                        }}>

                                                          {region?.toLocaleString() || 'Population'}
                                                        </p>
                                                  </div>

                                                  
                                                    
                                            </div>

                                            {/* sunRegion */}
                                            <div className='flex  w-auto h-auto items-start justify-start'>
                                                <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center rounded-full bg-blue-400'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 20px 10px 2px rgba(0, 0, 0, 0.2)',
                                                  }}>

                                                      <FontAwesomeIcon icon={faFlag} className='text-center text-white'/>

                                                  </div>
                                                  
                                                  <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center overflow-hidden'>
                                                        <div className='flex flex-col font-dmsans text-md lgs:w-[4rem] lgs:h-[0.1rem] font-bold bg-gray-800 drop-shadow-lg'/>
                                                  </div>

                                                  <div className='flex lgs:w-auto lgs:h-[3rem] bg-white rounded-full items-center justify-center overflow-hidden'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',

                                                  }}>
                                                        <p className='flex flex-col font-dmsans text-md  lgs:w-[15rem] items-center justify-center lgs:h-[5rem] font-bold text-black drop-shadow-lg'
                                                        style={{
                                                          fontWeight:'200'
                                                        }}>

                                                          {subregion?.toLocaleString() || 'Population'}
                                                        </p>
                                                  </div>

                                                  
                                                    
                                            </div>

                                            {/* region */}
                                            <div className='flex  w-auto h-auto items-start justify-start'>
                                                <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center rounded-full bg-blue-400'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 20px 10px 2px rgba(0, 0, 0, 0.2)',
                                                  }}>

                                                        <FontAwesomeIcon icon={faCity} className='text-center text-white'/>
                                                  </div>
                                                  
                                                  <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center overflow-hidden'>
                                                        <div className='flex flex-col font-dmsans text-md lgs:w-[4rem] lgs:h-[0.1rem] font-bold bg-gray-800 drop-shadow-lg'/>
                                                  </div>

                                                  <div className='flex lgs:w-auto lgs:h-[3rem] bg-white rounded-full items-center justify-center overflow-hidden'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',

                                                  }}>
                                                        <p className='flex flex-col font-dmsans text-md  lgs:w-[15rem] items-center justify-center lgs:h-[5rem] font-bold text-black drop-shadow-lg'
                                                        style={{
                                                          fontWeight:'200'
                                                        }}>

                                                          {capital?.toLocaleString() || 'Population'}
                                                        </p>
                                                  </div>

                                                  
                                                    
                                            </div>

                                            {/* region */}
                                            <div className='flex  w-auto h-auto items-start justify-start'>
                                                <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center rounded-full bg-blue-400'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 20px 10px 2px rgba(0, 0, 0, 0.2)',
                                                  }}>

                                                    <FontAwesomeIcon icon={faFlag} className='text-center text-white'/>
                                                  </div>
                                                  
                                                  <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center overflow-hidden'>
                                                        <div className='flex flex-col font-dmsans text-md lgs:w-[4rem] lgs:h-[0.1rem] font-bold bg-gray-800 drop-shadow-lg'/>
                                                  </div>

                                                  <div className='flex lgs:w-auto lgs:h-[3rem] bg-white rounded-full items-center justify-center overflow-hidden'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',

                                                  }}>
                                                        <p className='flex flex-col font-dmsans text-md  lgs:w-[15rem] items-center justify-center lgs:h-[5rem] font-bold text-black drop-shadow-lg'
                                                        style={{
                                                          fontWeight:'200'
                                                        }}>

                                                          {tld?.toLocaleString() || 'Population'}
                                                        </p>
                                                  </div>

                                                  
                                                    
                                            </div>

                                            {/* sunRegion */}
                                            <div className='flex  w-auto h-auto items-start justify-start'>

                                                <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center rounded-full bg-blue-400'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 20px 10px 2px rgba(0, 0, 0, 0.2)',
                                                  }}>
                                                      <FontAwesomeIcon icon={faSubscript} className='text-center text-white'/>          

                                                  </div>
                                                  
                                                  <div className='flex lgs:w-[3rem] lgs:h-[3rem] items-center justify-center overflow-hidden'>
                                                        <div className='flex flex-col font-dmsans text-md lgs:w-[4rem] lgs:h-[0.1rem] font-bold bg-gray-800 drop-shadow-lg'/>
                                                  </div>

                                                  <div className='flex lgs:w-auto lgs:h-[3rem] bg-white rounded-full items-center justify-center overflow-hidden'
                                                  style={{
                                                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5) , inset 0 0 0 1px rgba(0, 0, 0, 0.2)',

                                                  }}>
                                                        <h2 className='flex flex-col font-dmsans text-md  lgs:w-[15rem] items-center justify-center lgs:h-[5rem] font-bold text-black drop-shadow-lg'
                                                        style={{
                                                          fontWeight:'200'
                                                        }}>

                                                          {area ? `${area.toLocaleString()} km²` : 'N/A'}
                                                        </h2>
                                                  </div>

                                                  
                                                    
                                            </div>





                                      </div>
                          
                                    </div>

                                    {/* Spec Section II */} 
                                    <div className='flex flex-col w-full md:w-auto md:ml-0 lg:ml-5 lgs:ml-5 h-auto bg-white rounded-3xl items-start bg-transparent justify-start p-4 sm:p-8 md:p-12'
                                    style={{
                                      boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3) , inset 0px 2px 10px 2px rgba(0, 0, 0, 0.2)',
                                    }}>

                                      <div className='flex flex-col font-dmsans drop-shadow-2xl text-md rounded-xl bg-blue-900 lgs:p-2 font-bold text-white'
                                      style={{
                                        fontWeight:'300'
                                      }}>
                                        Other Key Information
                                      </div>

                                      <div className='flex flex-col w-auto h-auto lgs:mt-8 lgs:space-y-4 items-center justify-center'>
                                            
                                      <div className="space-y-8">

                                            {/* Languages */}
                                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                              <div className="p-2">
                                                <h2 className="text-2xl font- text-gray-800 mb-4 flex items-center"
                                                style={{
                                                  fontWeight:'300'
                                                }}>
                                                  <FontAwesomeIcon icon={faLanguage} className="mr-2 text-blue-600" />
                                                  Languages
                                                </h2>
                                                
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                  <div className="flex flex-wrap">
                                                    {formattedLanguages}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            
                                            {/* Currencies */}
                                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                              <div className="p-2">
                                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"
                                                style={{
                                                  fontWeight:'300'
                                                }}>
                                                  <FontAwesomeIcon icon={faMoneyBill} className="mr-2 text-blue-600" />
                                                  Currencies
                                                </h2>
                                                
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                  <div className="flex flex-wrap">
                                                    {formattedCurrencies}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                      </div>
                          
                                    </div>

                              </div>  



                </div> 



          </div>
          
      </div>





         

      
      

    </div>
  );
};

// Helper component for border country flag
const BorderCountryFlag = ({ code }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(code);
        setCountry(data[0]);
      } catch (err) {
        setCountry(null);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) return null;

  return (
    <Link to={`/country/${country.cca3}`} className="flex flex-col items-center">
      <img
        src={country.flags?.svg || country.flags?.png}
        alt={`Flag of ${country.name?.common}`}
        className="w-16 h-10 object-cover rounded shadow"
      />
      <span className="mt-1 text-xs text-gray-700">{country.name?.common}</span>
    </Link>
  );
};

// Helper component for info items
const InfoItem = ({ label, value, icon }) => (
  <div>
    <p className="text-gray-800">
      {icon && <span className="mr-2">{icon}</span>}
      <span className="font-semibold">{label}: </span>
      <span className="text-gray-600">{value}</span>
    </p>
  </div>
);

export default CountryDetailPage;
