// import { Component } from 'react';
// // import PropTypes from 'prop-types';
// import { Pagination } from 'antd';

// // import MovieCard from '../movie-card';
// import MovieApiService from '../../services/moviedb';

// import './movies-pagination.css';
// import { debounce } from 'lodash';

// // const { Footer, Content } = Layout;

// export default class Search extends Component {

//   constructor() {
//     super(props);
//     this.movieService = new MovieApiService();
//     this.state = {
//       films: [], //movieDate
//       loading: false, //load
//       error: false, //null
//       inputValue: '',
//       totalMovies: 0,
//       currentPage: 1,
//     };
//   }

//   componentDidMount() {
//     const { savedInputSearch, savedCurrentPage } = this.props
//     this.setState({ currentPage: savedCurrentPage.searchPage })
//     if (savedInputSearch) {
//       this.setState({ inputValue: savedInputSearch })
//       this.getMovieList(
//         savedInputSearch.toString(),
//         savedCurrentPage.searchPage
//       )
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { inputValue, currentPage } = this.state
//     if (
//       inputValue !== prevState.inputValue ||
//       currentPage !== prevState.currentPage
//     ) {
//       this.getMovieList(inputValue.toString(), currentPage)
//       return
//     }
//     this.getMovieList.cancel()
//   }

//   onChange = (e) => {
//     const { onChangeInputValue, onChangeCurrentPage } = this.props
//     this.setState({ inputValue: e.target.value, currentPage: 1 })
//     onChangeInputValue(e.target.value)
//     onChangeCurrentPage(1, true)
//   }

//   getMovieList = debounce((str, currentPage) => {
//     if (!str) return
//     this.goLoad()
//     this.movieService
//       .getAllMovies(str, currentPage)
//       .then((res) => {
//         if (res.results.length !== 0) {
//           this.setState({
//             movieDate: res.results,
//             totalMovies: res.total_result,
//             loading: false,
//             error: false
//           })
//         } else throw new Error("no content")
//       })
//       .catch((e) => this.setState({ error: e, loading: false, currentPage: 1}))
//   }, 800)

//   onPaginationChange = (currentPage) => {
//     this.setState({ currentPage })
//     const { onChangeCurrentPage } = this.props
//     onChangeCurrentPage(currentPage, false)
//   }

//   goLoad() {
//     this.setState({ loading: true })
//   }

//   render() {
//     const { movieDate, load, error, totalMovies, currentPage, inputValue } = this.state

//     const body = (
//       <>
//         <MovieList movies={movieDate}/>
//         <Pagination
//           className="movie-page__pagination"
//           total={totalMovies}
//           current={currentPage}
//           pageSize={20}
//           size="small"
//           hideOnSinglePage
//           showSizeChanger={false}
//           onChange={this.onPaginationChange} />
//       </>
//     )
//     // defaultCurrent={1} pageSize={20} total={50} />;
//   }
// }
