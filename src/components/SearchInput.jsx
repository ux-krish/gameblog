import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
const SearchInput = ({ searchTerm, onInputChange /*, onSearchClick*/ }) => {

    
  return (
    <div className="flex items-center bg-slate-200  p-1 px-2 w-full rounded-full gap-3">
        <FaMagnifyingGlass className='mx-2 h-[20px] w-[20px]' />
        <input
          type="text"
          placeholder="Search games"
          name=""
          id=""
          className="bg-transparent outline-none w-full  h-[35px]"
          value={searchTerm}
          onChange={(e) => onInputChange(e.target.value)}
        />
        {/* <button onClick={(onSearchClick)} className='btn bg-slate-900 text-white px-4 py-2 rounded-full'>Search</button> */}
      </div>
  )
}

export default SearchInput