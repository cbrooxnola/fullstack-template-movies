import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import AddMovieForm from './AddMovieForm'

const App = ()=> {
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    const fetchMovies = async()=>{
      const data = await axios.get('/api/movies')
      setMovies(data)
    }
    fetchMovies()
  }, [])

  const raiseRating = async(movie)=>{
    try {
    const newRating = movie.stars + 1
    const {data} = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: newRating})
    
    const newMovies = movies.map((movieMap)=>{
      if (movieMap.id === movie.id){
        return data
      } else {
        return movieMap
      }
    })
  
    setMovies(newMovies)
  } catch (error){
      
  }
  }

  const lowerRating = async(movie)=>{
    const newRating = movie.stars - 1
    const {data} = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: movie.stars})
    const newMovies = movies.map((movieMap)=>{
      if (movieMap.id === movie.id){
        return data
      } else {
        return movieMap
      }
    })
    setMovies(newMovies)
  }

const deleteMovie = async(movie)=> {
  const data = await axios.delete(`/api/movies/${movie.id}`)
  const updatedList = movies.filter((movieFilt)=>{
    return movieFilt.id !== movie.id
  })
  setMovies(updatedList)
}

  return (
    <div>
    <h1>Movie Rating Database</h1>
    <p>{error}</p>
    <AddMovieForm movies={movies} setMovies={setMovies}
    <ul>
      {
        movies.map((movie)=>{
          return(
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <h3>
                <span>
                  Rating: {movie.stars}
                  <button onCLick={()=>{raiseRating(movie)}}>
                    +
                  </button>
                  <button onCLick={()=>{lowerRating(movie)}}>
                    -
                  </button>
                </span>
              </h3>
              <button onClick={}>Delete</button>
            </li>
          )
        })
      }
    </ul>

    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
