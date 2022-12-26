/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
export default class MovieApiService {
  // constructor(props) {
  //   super(props);
  //   stat
  // }
  _apiBase = 'https://api.themoviedb.org/3/';

  apiKey = 'api_key=f655e93c97cf1c9464a89b4f09cbd32c';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}${this.apiKey}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    const result = await res.json();

    // if (!res.ok && navigator.onLine) {
    //   throw new Error(`Recieved ${res.status}`);
    // }

    return result;
  };

  // createGuestSession = async () => {
  //   let response = await fetch(`${this._apiBase}authentication/guest_session/new?${this.apiKey}`);
  //   if (response.ok) {
  //     response = await response.json();
  //     this.sessionId = response.guest_session_id;
  //   }
  // };

  // &query=The%20way%20back
  // async getAllMovies(searchQuery) {
  //   const res = await this.getResource(`&query=${searchQuery}`);
  //   // console.log(res.results);
  //   return res.results;
  // }

  getBySearch = async (searchQuery, page = 1) => {
    const body = await this.getResource(`/search/movie?page=${page}&query=${searchQuery}&`);
    if (body.results.length === 0 && navigator.onLine) {
      throw new Error('Nothing found');
    }
    // body.results.forEach((movie) => {
    //   this._transformMovie(movie);
    // });
    // console.log(typeof body.results);
    return body;
  };
  // return body;

  getMovie(id) {
    return this.getResource(`/movie/${id}?`);
  }

  getGenres = async () => this.getResource('/genre/movie/list?').then((body) => body.genres);

  // createGuestSession = async () => {
  //   let response = await fetch(`${this._apiBase}authentication/guest_session/new?${this.apiKey}`);
  //   if (response.ok) {
  //     response = await response.json();
  //     this.sessionId = response.guest_session_id;
  //     // const sessionId = response.guest_session_id;
  //     // return sessionId;
  //   }
  //   // return new Error('egc');
  // };

  // eslint-disable-next-line consistent-return
  postMovieRate = (movieId, rate) => {
    const ratedMovies = localStorage.getItem('ratedMovies');
    if (!ratedMovies) {
      return localStorage.setItem('ratedMovies', JSON.stringify([{ movieId, rate }]));
    }
    const ratedMoviesParse = JSON.parse(ratedMovies);

    if (ratedMovies.includes(`${movieId}`)) {
      const result = ratedMoviesParse.map((item) => {
        if (item.movieId === movieId) {
          return { movieId: item.movieId, rate };
        }
        return item;
      });
      return localStorage.setItem('ratedMovies', JSON.stringify(result));
    }

    ratedMoviesParse.push({ movieId, rate });
    localStorage.setItem('ratedMovies', JSON.stringify(ratedMoviesParse));
  };

  getRated() {
    // eslint-disable-next-line no-unused-vars
    return localStorage.getItem('ratedMovies');
  }

  // rateMovie = async (id, value) => {
  //   await fetch(`${this._apiBase}movie/${id}/rating?${this.apiKey}&guest_session_id=${this.sessionId}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({ value }),
  //   });
  // };

  // getRatedMovies = async (page = 1) => {
  //   let response = await fetch(
  //     `${this._apiBase}guest_session/${this.sessionId}/rated/movies?${this.apiKey}&page=${page}`,
  //   );

  //   if (response.ok) {
  //     response = await response.json();
  //   }
  //   return response;
  // };
}

const movies = new MovieApiService();

// movies.getAllMovies('return').then((movie) => {
//   movie.forEach((p) => {
//     console.log(p);
//   });
// });

// movies.createGuestSession();
console.log(movies.getMovie(900484));
// console.log(movies.createGuestSession());
console.log(movies.getBySearch('return'));
// console.log(movies.getBySearch('return'));
