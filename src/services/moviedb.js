/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
export default class MovieApiService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=f655e93c97cf1c9464a89b4f09cbd32c';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    const result = await res.json();
    return result;
  }

  // &query=The%20way%20back
  async getAllMovies(searchQuery) {
    const res = await this.getResource(`&query=${searchQuery}`);
    // console.log(res.results);
    return res.results;
  }

  async getBySearch(searchQuery, page = 1) {
    const body = await this.getResource(`&page=${page}&query=${searchQuery}&`);
    if (body.results.length === 0 && navigator.onLine) {
      throw new Error('Nothing found');
    }
    // body.results.forEach((movie) => {
    //   this._transformMovie(movie);
    // });
    // console.log(typeof body.results);
    return body;
  }
  // return body;

  getMovie(id) {
    return this.getResource(`/movie/${id}?`);
  }

  _transformMovie = (movie) => ({
    id: movie.id,
    genreIds: movie.genre_ids,
    overview: movie.overview,
    releaseDate: movie.release_date,
    title: movie.title,
    posterPath: movie.poster_path,
  });

  _transformInfo = (info) => ({
    totalPages: info.total_pages,
    totalResults: info.total_pages,
  });
  // getAllMovies = (title) => {
  //   fetch()
  //   const res = await this.getResource(`&query=${title}`);
  //   console.log('completed');
  //   return res.results;
  // }

  // async getAllPeople() {
  // const res = await this.getResource(`/people/`);
  //   return res.results
  // }

  // async getAllPlanets() {
  // const res = await this.getResource(`/planets/`);
  //   return res.results
  // }

  // async getAllStarships() {
  // const res = await this.getResource(`/starships/`);
  //   return res.results
  // }

  // getPerson(id) {
  // return this.getResource(`/people/${id}`);
  // }

  // getPlanet(id) {
  // return this.getResource(`/planets/${id}`);
  // }

  // getStarship(id) {
  // return this.getResource(`/starships/${id}`);
  // }

  //   static transformFilmData(movie) {
  //     return {
  //       id: movie.id,
  //       genreIds: movie.genre_ids,
  //       overview: movie.overview,
  //       releaseDate: movie.release_date,
  //       title: movie.title,
  //       posterPath: movie.poster_path,
  //     };
  //   }
}

// const movies = new MovieApiService();

// movies.getAllMovies('return').then((movie) => {
//   movie.forEach((p) => {
//     console.log(p);
//   });
// });

// console.log(movies.getAllMovies('return'));
// console.log(movies.getBySearch('return'));
