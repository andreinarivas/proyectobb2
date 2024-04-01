import React, { useEffect } from 'react'
import { selected, deselected, clear } from "./styles";


export default function SearchBar({filter, setFilter, search, setSearched}) {
  
    const handleFilter = (e) => {
        if (filter === e.target.value) {
          setFilter("");
          //setSearched(false);
        } else {
          setFilter(e.target.value);
          //setSearched(false);
        }
      };
    const handleLook = () => {
        return (
          <>
            <button
              className={filter === "ingrediente" ? selected : deselected}
              value="ingrediente"
              onClick={handleFilter}
            >
              Ingrediente
            </button>
            <button
              className={filter === "autor" ? selected : deselected}
              value="autor"
              onClick={handleFilter}
            >
              Autor
            </button>
            <button
              className={filter === "cocina" ? selected : deselected}
              value="cocina"
              onClick={handleFilter}
            >
              Cocina
            </button>
            <button
              className={filter === "usuario" ? selected : deselected}
              value="usuario"
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
           
          />
          <button
          className="font-semibold w-fit h-fit px-8 py-2 text-white rounded-full border-2 border-white hover:border-transparent hover:bg-white hover:text-yellow transition ease-in-out duration-300 delay-0"
          id="name"
          onClick={handleConnect}
          
        >
          Buscar
        </button>
    
    <div className='flex gap-4 mt-4'>
        <p className='text-white'>Buscar por:</p>
        <div className='flex gap-2'>{handleLook()}</div>

    </div>
    </div>)
}
