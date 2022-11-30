/* eslint-disable no-console */
/* eslint-disable no-tabs */
import { Component } from 'react';

import MoviesList from '../movies-list';

import MovieApiService from '../../services/moviedb';
import 'antd/dist/reset.css';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieApiService();
    this.getMovies('return');
    this.state = {
      films: [
        // {
        // 	id: 1,
        // 	title: 'syxdr',
        // 	releaseDate: 456,
        // 	genreIds: [4, 6],
        // 	overview: 'dffffffffffffffffffffffghjjjjjjjjjjjj',
        // 	posterPath: null,
        // },
        // {
        // 	id: 2,
        // 	title: 'sfy45253',
        // 	releaseDate: 457,
        // 	genreIds: [1, 6],
        // 	overview: 'age',
        // 	posterPath: null,
        // },
        // {
        // 	id: 3,
        // 	title: '8909876',
        // 	releaseDate: 657764987,
        // 	genreIds: [0],
        // 	overview: 'q    qwie',
        // 	posterPath: null,
        // },
      ],
    };
  }

  getMovies(title) {
    this.movieService.getMovies(title).then((movies) => {
      movies.forEach((movie) => {
        const { films } = this.state;
        films.push({
          id: movie.id,
          genreIds: movie.genre_ids,
          overview: movie.overview,
          releaseDate: movie.release_date,
          title: movie.title,
          posterPath: movie.poster_path,
        });
      });
    });
    console.log('completed app');
  }

  render() {
    const { films } = this.state;

    return (
      <div className="app">
        <MoviesList films={films} />
        app
      </div>
    );
  }
}
