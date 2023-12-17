import React,{useEffect, useState} from 'react'
import GlobalApi from '../services/GlobalApi'

const GenreList = ({genresId}) => {

    const [genreList, setGenreList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(()=>{
        getGenreList();
    },[])
    
    const getGenreList = () => {
        GlobalApi.getGenreList.then((resp)=>{
            //console.log(resp.data.results);
            setGenreList(resp.data.results);
        })
    }

  return (
    <div>
        <h2 className='text-[30px] font-bold dark:text-white select-none mb-3'>Genre </h2>
        {
            genreList.map((item,index)=>(
                <div onClick={()=>{setActiveIndex(index);genresId(item.id)}} key={index} className={`flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg group ${activeIndex==index ? "bg-gray-300 dark:bg-gray-700" : null}`}>
                    <img src={item.image_background} alt="" className='w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300' />
                    <h3 className={`dark:text-white text-[18px] group-hover:font-bold transition-all ease-out duration-300 ${activeIndex==index ? "font-bold" : null}`}>{item.name}</h3>
                </div>
            ))
        }
    </div>
  )
}

export default GenreList