import { useState, useCallback } from 'react'
import './App.css'

import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { Movies } from "./components/movies";

import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })
  const debouncedGetMovies = useCallback(debounce(search => {
    console.log({search})
    getMovies({search})
  }, 300), [getMovies])  
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log({search})
    getMovies({ search })
  }
  const handleChange = (event) => {
    // const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return
    const newSearch = event.target.value
    updateSearch(event.target.value)
    debouncedGetMovies( newSearch )
  }
  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form action="" className='form' onSubmit={handleSubmit}>
          <input
            name='search'
            onChange={handleChange}
            value={search}
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input
            type="checkbox"
            onChange={handleSort}
            checked={sort}
          />
          <button type="submit">Buscar</button>
        </form>
        {error && 
          <p
            style={{
              color: 'red'
            }}
          >
            {error}
          </p>
        }
      </header>
      
      <main>
        { loading ? <p>Cargando...</p> : <Movies movies={ movies }/> }
      </main>
    </div>
  )
}

export default App
