/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { Offline, Online } from 'react-detect-offline';

import 'antd/dist/reset.css';
import { Alert } from 'antd';

// import Search from 'antd/es/transfer/search';
import MoviesList from '../movies-list/movies-list';
import MoviePagination from '../movie-pagination/movie-pagination';
import MovieTabs from '../movie-tabs/movie-tabs';
import NoElements from '../no-elements/no-elements';
import SearchPanel from '../search-panel/search-panel';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import MovieApiService from '../../services/moviedb';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.api = new MovieApiService();
    this.state = {
      data: [
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
      errorMessage: null,
      errorType: null,
      search: '',
      noElements: false,
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

  // componentDidUpdate(prevState) {
  //   if (this.state.search !== prevState.search) {
  //     // this.getAllMovies(this.state.inputValue);
  //     this.getAllMovies(this.inputRequestFormater(this.state.search));
  //   }
  // }

  // onError = () => {
  //   this.setState({
  //     error: true,
  //     loading: false,
  //   });
  //   // console.log('catched');
  // };
  // eslint-disable-next-line react/no-unused-class-component-methods
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

  // eslint-disable-next-line react/no-unused-class-component-methods
  // onValueChange = (e) => {
  //   this.setState({
  //     // eslint-disable-next-line react/no-unused-state
  //     search: e.target.value,
  //     loading: true,
  //   });
  //   // console.log(this.inputRequestFormater(this.state.inputValue));
  // };

  // eslint-disable-next-line react/no-unused-class-component-methods
  // getAllMovies(title) {
  //   this.api
  //     .getAllMovies(title)
  //     .then(this.onMoviesLoaded)
  //     // .then((movies) => {
  //     // movies.forEach((movie) => {
  //     //   const { films } = this.state;
  //     //   films.push({
  //     //     id: movie.id,
  //     //     genreIds: movie.genre_ids,
  //     //     overview: movie.overview,
  //     //     releaseDate: movie.release_date,
  //     //     title: movie.title,
  //     //     posterPath: movie.poster_path,
  //     //   });
  //     // });
  //     // })
  //     .catch(this.onError);
  //   // console.log('completed app');
  // }

  // eslint-disable-next-line react/no-unused-class-component-methods
  // inputRequestFormater = (text) => text.split(' ').join('+');

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
        // .then(this.onMoviesLoaded)
        .then(this.onListLoaded)
        .then(console.log(this.state.data))
        .catch((error) => {
          this.onError(error);
        })
    );
  };

  onListLoaded = (fullMoviesData) => {
    const moviesData = fullMoviesData.results;
    // console.log(typeof moviesData);
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
    console.log(movies);
    const transformedData = await movies.map((movie) => ({
      id: movie.id,
      genreIds: movie.genre_ids,
      overview: movie.overview,
      releaseDate: movie.release_date,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));
    // movies.forEach((movie) => {
    //   const { data } = this.state;
    //   data.push({
    //     id: movie.id,
    //     genreIds: movie.genre_ids,
    //     overview: movie.overview,
    //     releaseDate: movie.release_date,
    //     title: movie.title,
    //     posterPath: movie.poster_path,
    //     voteAverage: movie.vote_average,
    //   });
    // });
    this.setState({ data: transformedData });
  };

  render() {
    const {
      noElements,
      data,
      error,
      // eslint-disable-next-line no-unused-vars
      // loading,
      search,
      // selectedPage, savedInputSearch, savedCurrentPage
    } = this.state;

    const searchPanel = <SearchPanel onSearch={this.onSearch} key="searchPanel" />;
    const content = noElements ? <NoElements key="noEl" /> : <MoviesList options={this.state} key="movieList" />;

    const noNeedPagination = error || noElements || data.length < 20;
    const pagination = noNeedPagination ? null : (
      <MoviePagination totalPages={this.state.totalPages} onPageChange={(page) => this.onSearch(search, page)} />
    );

    return (
      <div className="app">
        <Offline>
          <Alert message="Error" description="Internet connection problems" type="error" showIcon />
        </Offline>
        <Online>
          <MovieTabs content={content} searchPanel={searchPanel} onSearch={this.onSearch} />
          {pagination}
        </Online>
      </div>
    );
    // return (
    //   <div className="app">
    //     <Offline>
    //       <Alert message="Error" description="Internet connection problems" type="error" showIcon />
    //     </Offline>
    //     <Online>
    //       <Tabs
    //         defaultActiveKey="1"
    //         centered
    //         items={[
    //           {
    //             label: 'Search',
    //             key: 'search',
    //             children: (
    //               <>
    //                 <Input placeholder="Type to search..." onChange={this.onValueChange} value={inputValue} />
    //                 {inputValue ? (
    //                   <MoviesList films={films} error={error} loading={loading} />
    //                 ) : (
    //                   <Alert message="Enter the search query above to start" type="info" showIcon />
    //                 )}
    //               </>
    //             ),
    //           },
    //           {
    //             label: 'Rated',
    //             key: 'rated',
    //             children: <Input placeholder="Type to search..." onChange={this.onValueChange} value={inputValue} />,
    //           },
    //         ]}
    //       />
    //     </Online>
    //   </div>
    // );
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
  search: null,
};
