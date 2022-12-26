/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { Offline, Online } from 'react-detect-offline';

import 'antd/dist/reset.css';
import { Alert, Tabs } from 'antd';

// import Search from 'antd/es/transfer/search';
import MoviesList from '../movies-list/movies-list';
import MoviePagination from '../movie-pagination/movie-pagination';
// import MovieTabs from '../tabs/tabs';
import NoElements from '../no-elements/no-elements';
import SearchPanel from '../search-panel/search-panel';
import { GenresContextProvider } from '../genres-context/genres-context';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import MovieApiService from '../../services/moviedb';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.api = new MovieApiService();
    this.state = {
      data: [],
      search: '',
      // genreIds: [],
      ratedData: localStorage.getItem('ratedMovies'),
      loading: false,
      error: false,
      errorMessage: null,
      errorType: null,
      noElements: false,
      // totalPages: null,
    };
  }

  componentDidMount() {
    // sessionStorage.clear();
    // this.api.createGuestSession();
    // this.api.createGuestSession();
    this.api.getGenres().then((response) => this.setState({ genres: response }));
    //   window.addEventListener("offline", () => {
    //     this.setState({ error: new Error("Internet connection is failed") })
    //   })

    //   window.addEventListener("offline", () => {
    //     this.setState({ error: null })
    //   })

    // this.getGenres();
  }

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
    // console.log(fullMoviesData);
    // console.log(`fullMoviesData.total_results ${fullMoviesData.total_results}`);
    // console.log(`fullMoviesData.total_pages ${fullMoviesData.total_pages}`);
    // console.log(`this.state.total_pages ${this.state.total_pages}`);
  };

  onMoviesLoaded = async (movies) => {
    // console.log(movies);
    const transformedData = await movies.map((movie) => ({
      id: movie.id,
      genreIds: movie.genre_ids,
      // genres: movie.genres,
      overview: movie.overview,
      releaseDate: movie.release_date,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));
    this.setState({ data: transformedData });
  };

  onRate = async () => {
    this.setState({ loading: true });
    const data = JSON.parse(localStorage.getItem('ratedMovies'));
    console.log(data);
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const i of data) {
      await this.api
        .getMovie(i.movieId)
        .then((item) => result.push(item))
        .catch((error) => {
          this.onError(error);
        });
    }
    // console.log(`result onRate ${result}`);
    // console.log(result);
    this.onRatedListLoaded(result);
    // console.log(result);
    this.setState({ data: result });
    // console.log(this.state);
    // this.setState({ loading: false });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  onRatedListLoaded = (moviesData) => {
    // console.log(Math.ceil(moviesData.length / 20));
    this.setState({
      data: this.onMoviesRated(moviesData),
      loading: false,
      error: false,
      noElements: false,
      // totalPages: Math.ceil(moviesData.length / 20),
      totalPages: moviesData.length,
      totalResults: moviesData.length,
    });
  };

  onMoviesRated = async (movies) => {
    // console.log(movies);
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
      // eslint-disable-next-line no-unused-vars
      // loading,
      // eslint-disable-next-line no-unused-vars
      search,
      genres,
      totalResults,
      // totalPages,
    } = this.state;

    const searchPanel = <SearchPanel onSearch={this.onSearch} key="searchPanel" />;
    const moviesList = noElements ? <NoElements key="noEl" /> : <MoviesList options={this.state} key="movieList" />;

    // const noNeedPagination = error || noElements || data.length < 20;
    // const pagination =
    //   error || noElements || data.length < 20 ? null : (
    //     <MoviePagination total={totalResults} onPageChangeSearch={(page) => this.onSearch(search, page)} />
    //   );

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
                        <MoviePagination
                          total={totalResults}
                          onPageChange={(page) => this.onSearch(search, page)}
                        />
                      )}
                    </>
                  ),
                },
                {
                  label: 'Rated',
                  key: 'rated',
                  // disabled: loadingRated,
                  children: (
                    <>
                      {moviesList}
                      {error || noElements || data.length < 20 ? null : (
                        <MoviePagination
                          total={totalResults}
                          onPageChange={(page) => this.onRate(page)}
                        />
                      )}
                    </>
                  ),
                },
              ]}
            />
          </GenresContextProvider>
        </Online>
      </div>
      // <div className="app">
      //   <Offline>
      //     <Alert message="Error" description="Internet connection problems" type="error" showIcon />
      //   </Offline>
      //   <Online>
      //     <GenresContextProvider value={genres}>
      //       <MovieTabs
      //         moviesList={moviesList}
      //         searchPanel={searchPanel}
      //         onSearch={this.onSearch}
      //         onRate={this.onRate}
      //         pagination={pagination}
      //       />
      //       {/* {pagination} */}
      //     </GenresContextProvider>
      //   </Online>
      // </div>
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
//   <GenresProvider value={genres}>
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
