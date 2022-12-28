/* eslint-disable react/no-unused-state */
/* eslint-disable no-tabs */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { Offline, Online } from 'react-detect-offline';

import 'antd/dist/reset.css';
import { Alert, Tabs } from 'antd';

import { cloneDeep } from 'lodash';
import MoviesList from '../movies-list/movies-list';
import MoviePagination from '../movie-pagination/movie-pagination';
import NoElements from '../no-elements/no-elements';
import SearchPanel from '../search-panel/search-panel';
import { GenresContextProvider } from '../genres-context/genres-context';

import MovieApiService from '../../services/moviedb';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.api = new MovieApiService();
    this.state = {
      data: [],
      search: '',
      ratedData: localStorage.getItem('ratedMovies'),
      loading: false,
      error: false,
      errorMessage: null,
      errorType: null,
      noElements: false,
    };
  }

  componentDidMount() {
    this.api.createGuestSession();
    this.api.getGenres().then((response) => this.setState({ genres: response }));
  }

  onError = (error) => {
    if (error.message === 'Nothing found') {
      this.setState({
        noElements: true,
      });
    }

    if (error.message === 'Internet error') {
      return this.setState({
        loading: false,
        error: 'Some problems with Internet',
        errorMessage: 'Probably you do not have network connection',
        errorType: 'warning',
      });
    }
    return this.setState({
      error: error.message,
      loading: false,
      errorMessage: 'Something went wrong',
      errorType: 'error',
    });
  };

  onSearch = (search = '', page = 1) => {
    if (search === '') {
      return this.setState({
        data: [],
        loading: false,
        error: false,
        noElements: false,
      });
    }
    this.setState({ loading: true, search });
    return (
      this.api
        .getBySearch(search, page)
        .then(this.onListLoaded)
        // .then(console.log(this.state.data))
        .catch((error) => {
          this.onError(error);
        })
    );
  };

  onListLoaded = (fullMoviesData) => {
    const moviesData = fullMoviesData.results;
    this.setState({
      data: this.onMoviesLoaded(moviesData),
      loading: false,
      error: false,
      noElements: false,
      totalPages: fullMoviesData.total_pages,
      totalResults: fullMoviesData.total_results,
    });
  };

  onMoviesLoaded = async (movies) => {
    const transformedData = await movies.map((movie) => ({
      id: movie.id,
      genreIds: movie.genre_ids,
      overview: movie.overview,
      releaseDate: movie.release_date,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));
    this.setState({ data: transformedData });
  };

  formateStorageForPagination = (ratedMovies) => {
    if (ratedMovies === null) this.setState({ noElements: true });

    const pagesAmount = Math.ceil(ratedMovies.length / 20); // 2
    const deep = cloneDeep(ratedMovies);
    const paginated = [];
    let n = 1;
    do {
      paginated.push(
        deep.slice(20 * (n - 1), 20 * n),
      );
      n++;
    } while (n <= pagesAmount);
    return paginated;
  };

  onRate = async () => {
    this.setState({ loading: true });
    const data = JSON.parse(sessionStorage.getItem('ratedMovies'));
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const i of data) {
      await this.api
        .getMovie(i.movieId)
        // .then((item) => console.log(item))
        .then((item) => result.push(item))
        .catch((error) => {
          this.onError(error);
        });
    }
    this.formateStorageForPagination(this.onRatedListLoaded(result));
    this.setState({ data: result });
  };

  onRatedListLoaded = (moviesData) => {
    this.setState({
      data: this.onMoviesRated(moviesData),
      loading: false,
      error: false,
      noElements: false,
      totalPages: moviesData.length,
      totalResults: moviesData.length,
    });
  };

  onMoviesRated = async (movies) => {
    const transformedData = await movies.map((movie) => ({
      id: movie.id,
      genreIds: movie.genres.map((obj) => obj.id),
      overview: movie.overview,
      releaseDate: movie.release_date,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));
    this.setState({ data: transformedData });
  };

  onTabsChange = (tab) => {
    if (tab === 'rated') {
      this.onRate();
    } else this.onSearch();
  };

  render() {
    const {
      noElements,
      data,
      error,
      search,
      genres,
      totalResults,
    } = this.state;

    const searchPanel = <SearchPanel onSearch={this.onSearch} key="searchPanel" />;
    const moviesList = noElements ? <NoElements key="noEl" /> : <MoviesList options={this.state} key="movieList" />;

    return (
      <div className="app">
        <Offline>
          <Alert message="Error" description="Internet connection problems" type="error" showIcon />
        </Offline>
        <Online>
          <GenresContextProvider value={genres}>
            <Tabs
              className="movie-tabs"
              defaultActiveKey="search"
              destroyInactiveTabPane
              onChange={(tabsKey) => this.onTabsChange(tabsKey)}
              items={[
                {
                  label: 'Search',
                  key: 'search',
                  children: (
                    <>
                      {searchPanel}
                      {moviesList}
                      {error || noElements || data.length < 20 ? null : (
                        <MoviePagination total={totalResults} onPageChange={(page) => this.onSearch(search, page)} />
                      )}
                    </>
                  ),
                },
                {
                  label: 'Rated',
                  key: 'rated',
                  children: (
                    <>
                      {moviesList}
                      {error || noElements || data.length < 20 ? null : (
                        <MoviePagination total={totalResults} onPageChange={(page) => this.onRate(page)} />
                      )}
                    </>
                  ),
                },
              ]}
            />
          </GenresContextProvider>
        </Online>
      </div>
    );
  }
}

App.defaultProps = {
  search: null,
};
