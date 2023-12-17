import React, { useState, useEffect, Navigate } from 'react';

const Banner = ({gameBanner}) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          // Increment the current slide index
          setCurrentSlide((prevSlide) => (prevSlide + 1) % gameBanner.length);
        }, 10000);
    
        return () => clearInterval(interval); // Cleanup the interval on component unmount
      }, [currentSlide, gameBanner.length]);

    return (
        <div className='overflow-hidden h-[400px] relative'>
        {
            gameBanner.map((item, index) => (
                <div className={`w-full absolute  mt-2 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  } transition-opacity duration-1000`} key={index}>
                    <div className='absolute z-99 bottom-0 left-0 bg-gradient-to-t from-slate-900 to-transparent w-full p-5 rounded-2xl'>
                        <h2 className='text-[24px] text-white font-bold mb-3'>{item.name}</h2>
                        <button onClick={()=>console.log(item.name)} className='bg-violet-600 hover:bg-violet-800 transition-all ease-out duration-300 text-white px-4 p-1 rounded-lg'>Get Now</button>
                    </div>
                    <img src={item.background_image} className='w-full rounded-2xl h-[380px] object-cover' alt="" />
                </div>
            ))
        }
        </div>
       
    )
}

export default Banner