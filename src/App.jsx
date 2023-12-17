import { useEffect, useState } from "react";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import { ThemeContext } from "./context/ThemeContext";
import { ToggleProvider } from "./context/ToggleContext";
import Footer from "./components/common/Footer";
import GlobalApi from './services/GlobalApi'

export default function App() {
  const [theme,setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    setTheme(localStorage.getItem('theme'));
  },[])

  
  const handleInputChange = (value) => {
    setSearchTerm(value);
    console.log('Input Value:', value);

    GlobalApi.getGameListByName(searchTerm).then((resp) => {
      console.log(searchTerm);
      setGameList(resp.data.results);
    })
  };



  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   GlobalApi.getGameListByName(searchTerm).then((resp) => {
  //     console.log(searchTerm);
  //     setGameList(resp.data.results);
  //   })
  // };

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
    <div className={`${theme} ${theme == 'dark' ? 'bg-black' : ''} min-h-[100vh] divide-purple-400`}>
      <ToggleProvider>
      
        <Header
          searchTerm={searchTerm}
          onInputChange={handleInputChange}
          //onSearchClick={handleSearch}
        />
        <Home games={gameList} />
        <Footer />
      </ToggleProvider>
    </div>
    </ThemeContext.Provider>
  )
} 