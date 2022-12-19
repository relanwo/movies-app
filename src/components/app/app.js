/* eslint-disable no-console */
/* eslint-disable no-tabs */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { Offline, Online } from 'react-detect-offline';
// eslint-disable-next-line no-unused-vars
import { debounce } from 'lodash';

import 'antd/dist/reset.css';
import { Input, Tabs, Alert } from 'antd';

// import Search from 'antd/es/transfer/search';
import MoviesList from '../movies-list/movies-list';

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
      // genresList: null,
      // selectedPage: 'search',
      // savedInputSearch: '',
      // savedCurrentPage: {
      //  searchPage: 1,
      //  ratedPage: 1,
      // }
    };
  }

  // componentDidMount() {
  //   window.addEventListener("offline", () => {
  //     this.setState({ error: new Error("Internet connection is failed") })
  //   })

  //   window.addEventListener("offline", () => {
  //     this.setState({ error: null })
  //   })

  //   // this.getGenres()
  //   // this.movieService.createGuestSession()
  // }

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

  // onChangeInputValue = (value) => this.setState({ savedInputSearch: value })

  // onChangeCurrentPage = (page, searchFlag) => {
  //   this.setState({ savedCurrentPage }) => {
  //     const newObj = { ...savedCurrentPage }
  //     if (searchFlag) {
  //       newObj.searchPage = page
  //     } else newObj.reatedPage = page
  //     return { savedCurrentPage: newObj }
  //   })
  // }

  // getGenres = () => {
  //   this.MovieApiService
  //     .getGenres()
  //     .then((genresList) => this.setState({ genresList }))
  //     .catch((err) => this.setState({ error }))
  // }

  render() {
    const {
      films, error, loading, inputValue,
      // selectedPage, savedInputSearch, savedCurrentPage
    } = this.state;
    // const menu = [
    //   { label: "Search", key: "search"},
    //   { label: "Rated", key: "rated"},
    // ]

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

// return (
//   <GenresProvider value={genresList}>
//     {error ? <Alert message="Enter the search query above to start" type="error" showIcon /> : null}
//     <section className='movie-app'>
//       <Menu
//         className="movie-app__menu"
//         items={menu}
//         mode="horisontal"
//         selectedKeys={selectedPage}
//         onSelect={this.onSelect}
//       />
//       {selectedPage === "search" ? (
//         <Search
//           onChangeInputValue={this.onChangeInputValue}
//           savedInputSearch={savedInputSearch}
//           savedCurrentPage={savedCurrentPage}
//           onChangeCurrentPage={this.onChangeCurrentPage}
//         />
//       ) : (
//         <Reted
//           savedCurrentPage={savedCurrentPage}
//           onChangeCurrentPage={this.onChangeCurrentPage}
//         />
//       )}
//     </section>
//   <GenresProvider/>
// )

// /* <Pagination defaultCurrent={1} total={50} /> */

// App.propTypes = {
//   // eslint-disable-next-line react/no-unused-prop-types
//   inputValue: PropTypes.string.isRequired,
// };
App.defaultProps = {
  inputValue: null,
};
