import React, { useEffect } from 'react'

const TrendingGames = ({gameList}) => {


  return (
    <div className='mt-0 mb-5'>
        <h2 className='dark:text-white font-bold text-2xl mb-4'>Trending Games</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {gameList.map((item,index) => index < 4 && (
                <div key={index} className='rounded-lg overflow-hidden bg-indigo-100 group hover:scale-105 transition-all duration-300 ease-out'>
                    <img className='h-[250px] object-cover w-full' src={item.background_image} alt="" />
                    <h2 className='p-3 font-medium'>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TrendingGames