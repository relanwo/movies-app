/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
export default class MovieApiService {
  _apiBase = 'https://api.themoviedb.org/3/';

  apiKey = 'api_key=f655e93c97cf1c9464a89b4f09cbd32c';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}${this.apiKey}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    const result = await res.json();

    return result;
  };

  createGuestSession = async () => {
    if (!this.session) {
      const request = await fetch(`${this._apiBase}authentication/guest_session/new?${this.apiKey}`);
      const response = await request.json();
      if (!response.success) throw new Error('Failed');
      this.sessionId = response.guest_session_id;
      sessionStorage.setItem('session', JSON.stringify(this.sessionId));
    } else {
      this.sessionId = sessionStorage.getItem('session');
    }
  };

  getBySearch = async (searchQuery, page = 1) => {
    const body = await this.getResource(`/search/movie?page=${page}&query=${searchQuery}&`);
    if (body.results.length === 0 && navigator.onLine) {
      throw new Error('Nothing found');
    }
    return body;
  };

  // eslint-disable-next-line no-return-await
  getMovie = async (id) => await this.getResource(`/movie/${id}?`);

  getGenres = async () => this.getResource('/genre/movie/list?').then((body) => body.genres);

  getRated = async (page) => {
    let response = await fetch(
      // `https://api.themoviedb.org/3/guest_session/${localStorage.getItem('session')}/rated/movies?${
      `https://api.themoviedb.org/3/guest_session/${sessionStorage.getItem('session').slice(1, -1)}/rated/movies?${
        this.apiKey
      }&page=${page}`
    );

    if (response.ok) {
      response = await response.json();
    }
    return response;
  };

  // eslint-disable-next-line consistent-return
  postMovieRate = async (movieId, rate) => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?${this.apiKey}&guest_session_id=${sessionStorage
        .getItem('session')
        .slice(1, -1)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rate }),
      }
    );

    const ratedMovies = sessionStorage.getItem('ratedMovies');
    if (!ratedMovies) {
      return sessionStorage.setItem('ratedMovies', JSON.stringify([{ movieId, rate }]));
    }
    const ratedMoviesParse = JSON.parse(ratedMovies);

    if (ratedMovies.includes(`${movieId}`)) {
      const result = ratedMoviesParse.map((item) => {
        if (item.movieId === movieId) {
          return { movieId: item.movieId, rate };
        }
        return item;
      });
      return sessionStorage.setItem('ratedMovies', JSON.stringify(result));
    }

    ratedMoviesParse.push({ movieId, rate });
    sessionStorage.setItem('ratedMovies', JSON.stringify(ratedMoviesParse));
  };
}
