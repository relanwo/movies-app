/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
export default class MovieApiService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=f655e93c97cf1c9464a89b4f09cbd32c';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, receiver ${res.status}`);
    }

    const result = await res.json();
    return result;
  }

  // &query=The%20way%20back
  async getMovies(title) {
    const res = await this.getResource(`&query=${title}`);
    console.log('completed');
    return res.results;
  }

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
}

// const movies = new MovieService();

// movies.getMovie().then((movie) => {
// movie.forEach((p) => {
// console.log(p);
// });
// });
