import React from 'react'
import { FaStar,FaComment, FaFire } from "react-icons/fa6";

const GamesByGenresId = ({gameList}) => {
  return (
    <div className='mt-5'>
      <h2 className='dark:text-white font-bold text-2xl mb-5'>Popular Games</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-5'>
      {
        gameList.map((item, index) => (
          <div key={index} className=' bg-slate-200/90 p-3 md:p-5 rounded-xl group hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
            <img src={item.background_image} alt="" className='w-full rounded-2xl h-[270px] object-cover' />
            <h3 className='text-[20px] font-bold text-stone-950 mt-2'>{item.name}<span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>{item.metacritic}</span></h3>
            <div className='flex items-center gap-3 flex-nowrap justify-start text-stone-950'>
              <span className='flex items-center gap-1'><FaStar className=' text-amber-400' />{item.rating}</span> 
              <span className='flex items-center gap-1'><FaComment className='text-stone-950' />{item.reviews_count}</span> 
              <span className='flex items-center gap-1'><FaFire className=' text-orange-600' />{item.suggestions_count}</span>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default GamesByGenresId