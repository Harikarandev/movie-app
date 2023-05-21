import React, {useState, useEffect , useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const [movies, setMovies] = useState([]);

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // }
  
  const [movies, setmovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchMovies = useCallback(async () => {

  setloading(true);
  seterror(null);
  try{

    const response = await fetch('https://swapi.dev/api/films/');
    if(!response.ok){
      throw new Error('Something Went Wrong!');
    };
    const data = await response.json(); 
  
     const transformedMovies = data.results.map(moviesdata =>{
       return{
         id: moviesdata.episode_id,
         title: moviesdata.title,
         openingText: moviesdata.opening_crawl,
         releasedate: moviesdata.release_date
       };
     });
     setmovies(transformedMovies); 
    } catch (error){
      seterror(error.message);
    }
    setloading(false);

 },[]);
//   function fetchMovies(){

//   setloading(true);
//   seterror(null);
//   fetch('https://swapi.dev/api/film/').then(response =>{
//     return response.json();
//   }).catch(error=>window.alert('ereror')).then(data =>{
//     const transformedMovies = data.results.map(moviesdata =>{
//       return{
//         id: moviesdata.episode_id,
//         title: moviesdata.title,
//         openingText: moviesdata.opening_crawl,
//         releasedate: moviesdata.release_date
//       };
//     });
//     setmovies(transformedMovies);
//     setloading(false);
//   });

//  }

  useEffect(()=>{
    fetchMovies();
  },[fetchMovies]);

 let content = <p>No Movies Found!</p>

 if(movies.length > 0){
  content = <MoviesList movies={movies}/>
 }

 if(loading){
  content = <p>Loading for you...</p>
 }
if(!loading && error){
  content = <p>{error}</p> 
}
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section> 
      <section>
        {content}
        {/* {!loading && movies.length> 0 && <MoviesList movies={movies}/>}
        {!loading && movies.length === 0 && !error && <p>No Movies Found!</p>}
        {!loading && error  && <p>{error}</p>}
        {loading && !error && <p>Loading for you...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
