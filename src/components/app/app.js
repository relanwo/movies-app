/* eslint-disable no-console */
/* eslint-disable no-tabs */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { Offline, Online } from 'react-detect-offline';
// eslint-disable-next-line no-unused-vars
import { debounce } from 'lodash';

import 'antd/dist/reset.css';
import { Input, Tabs, Alert } from 'antd';

import MoviesList from '../movies-list';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import MovieApiService from '../../services/moviedb';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieApiService();
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
      loading: false,
      error: false,
      inputValue: '',
    };
  }

  // componentDidMount() {
  //   // this.getAllMovies(this.inputRequestFormater(this.state.inputValue));
  // }

  componentDidUpdate(prevState) {
    if (this.state.inputValue !== prevState.inputValue) {
      // this.getAllMovies(this.state.inputValue);
      this.getAllMovies(this.inputRequestFormater(this.state.inputValue));
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
    // console.log('catched');
  };

  onMoviesLoaded = (movies) => {
    movies.forEach((movie) => {
      const { films } = this.state;
      films.push({
        id: movie.id,
        genreIds: movie.genre_ids,
        overview: movie.overview,
        releaseDate: movie.release_date,
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
      });
    });
    this.setState({
      // films,
      loading: false,
    });
  };

  onValueChange = (e) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      inputValue: e.target.value,
      loading: true,
    });
    // console.log(this.inputRequestFormater(this.state.inputValue));
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  getAllMovies(title) {
    this.movieService
      .getAllMovies(title)
      .then(this.onMoviesLoaded)
      // .then((movies) => {
      // movies.forEach((movie) => {
      //   const { films } = this.state;
      //   films.push({
      //     id: movie.id,
      //     genreIds: movie.genre_ids,
      //     overview: movie.overview,
      //     releaseDate: movie.release_date,
      //     title: movie.title,
      //     posterPath: movie.poster_path,
      //   });
      // });
      // })
      .catch(this.onError);
    // console.log('completed app');
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  inputRequestFormater = (text) => text.split(' ').join('+');

  render() {
    const {
      films, error, loading, inputValue,
    } = this.state;

    return (
      <div className="app">
        <Offline>
          <Alert message="Error" description="Internet connection problems" type="error" showIcon />
        </Offline>
        <Online>
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                label: 'Search',
                key: 'search',
                children: (
                  <>
                    <Input placeholder="Type to search..." onChange={this.onValueChange} value={inputValue} />
                    {inputValue ? (
                      <MoviesList films={films} error={error} loading={loading} />
                    ) : (
                      <Alert message="Enter the search query above to start" type="info" showIcon />
                    )}
                  </>
                ),
              },
              {
                label: 'Rated',
                key: 'rated',
                children: <Input placeholder="Type to search..." onChange={this.onValueChange} value={inputValue} />,
              },
            ]}
          />
        </Online>
      </div>
    );
  }
}

// /* <Pagination defaultCurrent={1} total={50} /> */

// App.propTypes = {
//   // eslint-disable-next-line react/no-unused-prop-types
//   inputValue: PropTypes.string.isRequired,
// };
App.defaultProps = {
  inputValue: null,
};
