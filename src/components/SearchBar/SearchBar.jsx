import React, { useEffect } from 'react'
import { selected, deselected, clear } from "./styles";


export default function SearchBar({filter, setFilter, search, setSearch, setSearched, handleSearch}) {
  
  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearched(false);
  };
  
    const handleFilter = (e) => {
        if (filter === e.target.value) {
          setFilter("");
          setSearched(false);
        } else {
          setFilter(e.target.value);
          setSearched(false);
        }
      };
      const handleClear = (e) => {
        setFilter("");
        setSearched(false);
      };
    const handleLook = () => {
        return (
          <>
            <button
              className={filter === "ingredient" ? selected : deselected}
              value="ingredient"
              onClick={handleFilter}
            >
              Ingrediente
            </button>
            <button
              className={filter === "author" ? selected : deselected}
              value="author"
              onClick={handleFilter}
            >
              Autor
            </button>
            <button
              className={filter === "cuisine" ? selected : deselected}
              value="cuisine"
              onClick={handleFilter}
            >
              Cocina
            </button>
            <button
              className={filter === "user" ? selected : deselected}
              value="user"
              onClick={handleFilter}
            >
              Usuario
            </button>
            {filter ? (
              <button
                className={clear}
                value="x"
                onClick={handleClear}
              >
                X
              </button>
            ) : (
              <></>
            )}
          </>
        );
      };
      useEffect(() => {
        handleLook();
      }, [filter]);
  return (
    <div className='bg-yellow py-10 px-20 flex flex-col items-center gap-4'>
    
    <input
            className="w-2/5 h-10 rounded-full bg-white indent-10 text-black focus:outline-none  focus:ring placeholder-shown:text-blue focus:ring-offset-2 focus:ring-blue/80"
            value={search}
            onChange={handleChange}
          />
          <button
          className="font-semibold w-fit h-fit px-8 py-2 text-white rounded-full border-2 border-white hover:border-transparent hover:bg-white hover:text-yellow transition ease-in-out duration-300 delay-0"
          id="name"
          disabled={search ==""}
          onClick={(e)=>{handleSearch(search,filter)}}
          
        >
          Buscar
        </button>
    
    <div className='flex gap-4 mt-4'>
        <p className='text-white'>Buscar por:</p>
        <div className='flex gap-2'>{handleLook()}</div>

    </div>
    </div>)
}
