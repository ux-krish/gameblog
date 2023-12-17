import React from 'react';
import { FaStar,FaComment, FaFire } from "react-icons/fa6";

function GameList({ gameList }) {
  return (
    <>
    {gameList != 0 ? <h2 className='dark:text-white font-bold text-2xl mb-5'>Search By Games</h2> : null}
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-5'>
      {gameList.map((game) => (
      <div key={game.id} className='mb-3 p-3 md:p-5 bg-slate-200/90 rounded-xl group hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
        <img src={game.background_image} alt="" className='w-full rounded-2xl h-[150px] sm:h-[270px] object-cover' />
        <h3 className='text-[20px] font-bold text-stone-950 mt-2'>{game.name}<span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>{game.metacritic}</span></h3>
        <div className='flex items-center gap-3 flex-nowrap justify-start text-stone-950'>
          <span className='flex items-center gap-1'><FaStar className=' text-amber-400' />{game.rating}</span> 
          <span className='flex items-center gap-1'><FaComment className='text-stone-950' />{game.reviews_count}</span> 
          <span className='flex items-center gap-1'><FaFire className=' text-orange-600' />{game.suggestions_count}</span>
        </div>
      </div>
      ))}
      
    </div>
    </>
  );
}

export default GameList;