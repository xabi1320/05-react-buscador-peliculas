const API_KEY = '79b9fa64' 

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const data = await response.json()
        const movies = data.Search
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))
    } catch (e) {
      throw new Error("[ERROR] Ocurrio un error al hacer el fetching de datos");
    }
}