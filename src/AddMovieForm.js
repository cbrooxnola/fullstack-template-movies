import React, {useState} from 'react'
import axios from 'axios'

const addMovieForm = (movies, setMovies) => {
  const [title, setTitle] = useState('')
  const [stars, setStars] = useState(1)

  const submit = async(event)=> {
    event.preventDefault()
    const newMovie = {title, stars}
    const {data} = await axios.post('/api/movies', newMovie)
    setMovies([...movies, data])
  }

  return (
    <div>
      <form>
        <label>
          Title: 
          <input type='text' onChange={ev => setTitle(ev.target.value)}/>
          </label>
          <label>
          Rating: 
          <input type='text' onChange={ev => setStars(ev.target.value)}/>
          </label>
          <button type='submit'>Submit</button>
          </form>
    </div>
  )
}