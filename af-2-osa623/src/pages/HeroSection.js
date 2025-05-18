import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGlobe, FaFlag, FaUsers, FaMapMarkedAlt } from 'react-icons/fa';


//image fetching
import backgroundImage from '../assests/background3.jpg';
import backgroundImage_I from '../assests/background2.jpg';


//api fetching 
import { getAllCountries } from '../services/api';  




const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const [getCountry , setGetCountry] = useState([]);

    useEffect(()=> {

        const fetchCountries = async () => {
            try {
                const data = await getAllCountries();
                setGetCountry(data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    })
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='relative w-full bg-transparent h-auto overflow-hidden'>

             {/* first Section */}
            <div className="relative overflow-hidden bg-transparent min-h-screen">
                {/* Background elements */}
               <div className='absolute w-full h-screen bg-orange-600 overflow-hidden  justify-between items-center mb-8'>
                    <img src={backgroundImage} alt="Background" className='flex w-full blur-sm h-screen object-cover backdrop-blur-sm' />
               </div>

                {/* Main content */}
                <div className="relative w-full items-center justify-center h-screen flex flex-col bg-transparent">
                    <div className="flex justify-center items-center">
                        
                        {/* Left side content */}
                        <div className="flex flex-col items-center justify-center">

                         {/* Heading */}
                         <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl sms:text-lg sms:w-[80vw] lgs:text-xl font-poppins lgs:w-[40vw] text-center font-medium text-white tracking-tight"
                            >
                            Discover hidden gems, vibrant cultures, and epic adventures. From city escapes to wild journeys, we inspire your next trip. Ready to wander
                            </motion.h1>

                            
                            {/* Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl sm:text-5xl lgs:text-8xl lgs:w-[75vw] sms:w-[60vw] text-center font-extrabold text-white tracking-tight"
                            >
                                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-800">Countries</span> and Their Wonders
                            </motion.h1>
                            
                            
                            {/* Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4 sms:mt-6 lgs:mt-12"
                            >
                                <button className="px-3 py-2 sm:px-4 sms:py-2 md:px-6 md:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-950 text-white text-xs sm:text-sm md:text-base font-semibold flex items-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition duration-300 hover:translate-y-[-2px]">
                                    <a href='/home'>Get Started </a><FaArrowRight className="ml-1 sm:ml-2" />
                                </button>
                                <button className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg bg-gray-800/70 text-white text-xs sm:text-sm md:text-base border border-gray-700 flex items-center hover:bg-gray-700/70 transition duration-300">
                                    <FaGlobe className="mr-1 sm:mr-2" /> Learn More
                                </button>
                            </motion.div>
                            

                        </div>
                        
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-0 right-0 lgs:h-32 bg-transparent flex items-center justify-center px-4 sm:px-6 md:px-8">
                                                {/* Stats */}
                                                <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-6 bg-white p-4 sm:p-8 md:p-12 rounded-2xl border-gray-800 w-full max-w-xs sm:max-w-md md:max-w-lg"
                                style={{
                                    boxShadow:'inset 0px 0px 20px rgba(0, 0, 0, 0.1), inset 0px -10px 20px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <div className="text-center py-2 sm:py-0">
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary flex justify-center items-center gap-1 sm:gap-2"><FaFlag className="text-blue-400" /> 195</p>
                                    <p className="text-gray-800 text-xs sm:text-sm">Countries</p>
                                </div>
                                <div className="text-center py-2 sm:py-0">
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary flex justify-center items-center gap-1 sm:gap-2"><FaUsers className="text-blue-400" /> 8B+</p>
                                    <p className="text-gray-800 text-xs sm:text-sm">Global Population</p>
                                </div>
                                <div className="text-center py-2 sm:py-0">
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary flex justify-center items-center gap-1 sm:gap-2"><FaMapMarkedAlt className="text-blue-400" /> 100+</p>
                                    <p className="text-gray-800 text-xs sm:text-sm">Landmarks</p>
                                </div>
                            </motion.div>
                </div>
            </div>

            {/* Second Section */}
            <div className='relative h-auto min-h-[80vh] bg-white items-center justify-center py-8 sm:py-12 md:py-16'>
               

               
               <div className='absolute flex flex-col px-4 sm:px-6 md:px-8 sm:p-8 md:p-12 w-full h-auto z-40 items-center justify-center'>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-dmsans font-bold text-gray-800 text-center'>Find Any Country Here</h2>
                        <p className='text-sm sm:text-base md:text-lg font-dmsans text-center w-full sm:w-[80vw] md:w-[70vw] lgs:w-[60vw] py-4 sm:py-6 md:py-8 text-gray-500'
                        style={{
                            fontWeight:'300'
                        }}>Embark on a boundless journey across continents and cultures as we unlock the planet's most breathtaking destinations. From the misty peaks of the Himalayas to the crystalline waters of the Maldives, from the bustling souks of Marrakech to the neon-lit streets of Tokyo, we bring you immersive travel experiences that ignite your wanderlust.</p>
                        
                        <div className='flex items-center justify-center mt-2  sm:mt-4 w-full'>
                            <div className='flex h-auto w-full px-2 sm:p-5'>
                                <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 w-full'>
                                                        
                                    { getCountry.slice(0,12).map((country, index)=> (
                                        <div key={index} className='flex flex-col w-full max-w-[10rem] mx-auto h-auto bg-transparent items-center justify-center'>
                                            <div className='flex flex-col w-full h-[3rem] sm:h-[4rem] md:h-[5rem] bg-transparent items-center justify-center'>
                                                <img 
                                                    src={country.flags.png || country.flags.svg} 
                                                    alt={country.name.common} 
                                                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                                                />
                                            </div>  
                                            <h2 className='text-center text-gray-800 font-poppins text-xs sm:text-sm font-thin mt-1 sm:mt-2 truncate w-full'>{country.name.common}</h2>
                                        </div>   
                                    ))}                 
                                </div>
                            </div>
                        </div>
               </div>
            </div>

            {/* third Section */}
             <div className='relative h-[40vh] bg-white items-center justify-center'>
                               
               {/* Background elements */}
               <div className='absolute w-full h-screen bg-orange-600 overflow-hidden  justify-between items-center mb-8'>
                    <img src={backgroundImage} alt="Background" className='flex w-full blur-sm h-screen object-cover backdrop-blur-sm' />
               </div>
                

            </div>
        </div>
    );
};

export default HeroSection;