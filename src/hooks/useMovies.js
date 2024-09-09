import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies ({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)

    // INFO: Tanto useCallback, como useMemo. solo utilizarlos en caso de
    // querer mejorar rendimiento en el proyecto.

    // INFO: useCallback, es lo mismo que useMemo solo que se utiliza,
    // para memorizar funciones. por debajo useCallback utiliza useMemo.
    const getMovies = useCallback(async ({ search }) => {
      if (search === previousSearch.current) return
    
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally{
        setLoading(false)
      }
    }, [])

    //INFO: useMemo, se utiliza para memorizar computaciones.
    // y queremos evitar que se repita todo el tiempo a menos que modifiquen dependencias establecidos
    const sortedMovies = useMemo(() => {
      return sort 
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies
      
    }, [sort, movies])
    
    return {movies: sortedMovies, loading, error, getMovies}
}
