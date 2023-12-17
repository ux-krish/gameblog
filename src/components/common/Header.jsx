import React, { useContext } from "react";
import logo from "../../assets/images/react.svg";
import { FaMoon, FaSun } from "react-icons/fa6";
import { ThemeContext } from "../../context/ThemeContext";
import { useToggle } from '../../context/ToggleContext';
import SearchInput from "../SearchInput";



const Header = ({ searchTerm, onInputChange/*, onSearchClick*/ }) => {
  const {theme,setTheme} = useContext(ThemeContext);
  const { toggleGenreList } = useToggle();


  return (
    <div className="flex items-center p-4 gap-5">
      <img src={logo} alt="" width={40} height={40} onClick={toggleGenreList} />
      <SearchInput
        searchTerm={searchTerm}
        onInputChange={onInputChange}
        //onSearchClick={onSearchClick}
      />
      <div>
        {theme == "light" ? (
          <FaMoon className="text-[35px] bg-slate-200 hover:bg-slate-300 text-black p-2 rounded-full cursor-pointer" onClick={()=>{setTheme('dark');localStorage.setItem('theme','dark')}} />
        ) : (
          <FaSun className="text-[35px] bg-slate-200 hover:bg-slate-300 text-black p-2 rounded-full cursor-pointer" onClick={()=>{setTheme('light');localStorage.setItem('theme','light')}} />
        )}
      </div>
      
    </div>
  );
};

export default Header;
