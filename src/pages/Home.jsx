import React, { useEffect, useState } from 'react'
import GenreList from '../components/GenreList'
import GlobalApi from '../services/GlobalApi'
import Banner from '../components/Banner';
import TrendingGames from '../components/TrendingGames';
import GamesByGenresId from './../components/GamesByGenresId';
import { useToggle } from '../context/ToggleContext';
import GameList from '../components/GameList';

const Home = ({games}) => {

  const [allGameList,setAllGameList] = useState();
  const [gameListByGenre,setGameListByGenre]=useState([]);
  //const [gameList, setGameList] = useState([]);
  
  const { isGenreListVisible } = useToggle();

  useEffect(()=>{
    getAllGameList();
    getGameList(4);
    // getGameListNames(0,'action');
  },[])

  const getAllGameList = () => {
    GlobalApi.getAllGames.then((resp) => {
      //console.log(resp.data.results);
      setAllGameList(resp.data.results);
    })
  }


  const getGameList=(genreId)=>{
    if(genreId!=0){
      GlobalApi.getGameListByGenreId(genreId).then(resp=>{
          //console.log(resp)
          setGameListByGenre(resp.data.results)
      })
    }
  }


  return (
    <div className='grid grid-cols-4 px-5 relative'>
      <div className={`col-span-4 md:col-span-1 md:block absolute md:static z-10 bg-white dark:bg-black px-5 md:px-0 min-h-[100vh] ${isGenreListVisible ? 'hidden' : 'block'}`}>
        <GenreList genresId={(genresId) => getGameList(genresId)} />
      </div>
      <div className='col-span-4 md:col-span-3 px-0 md:px-5 md:pe-0'>
        { 
          allGameList?.length&&gameListByGenre?.length>0 ?
          <div>
           <GameList gameList={games} />
            <TrendingGames gameList={allGameList} />
            <Banner gameBanner={allGameList} />
            <GamesByGenresId gameList={gameListByGenre} />
          </div>
          :null
        }
      </div>
    </div>
  )
}

export default Home