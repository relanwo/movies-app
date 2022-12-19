// import { Component } from "react";

// import MovieApiService from '../../services/moviedb';

// export default class Rated extends Component {
//   constructor() {
//     super(props);
//     this.movieService = new MovieApiService();
//     this.state = {
//       films: [], //movieDate
//       loading: false, //load
//       error: false, //null
//       totalMovies: 0,
//       currentPage: 1,
//     };
//   }

//   componentDidMount() {
//     const { savedCurrentPage } = this.props
//     this.setState({ currentPage: savedCurrentPage.ratedPage })
//     const { currentPage } = this.state
//     this.getMovieList(currentPage)
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { currentPage } = this.state
//     if (currentPage !== prevState.currentPage) {
//       this.getMovieList(currentPage)
//     }
//   }

//   getMovieList = debounce((currentPage) => {
//     this.goLoad()
//     this.movieService
//       .getRatedMovies(currentPage)
//       .then((res) => {
//         this.setState({
//           movieDate: res.results,
//           totalMovies: res.total_result,
//           loading: false,
//           error: false
//         // } else throw new Error("no content")
//       })
//       .catch((e) => this.setState({ error: e, loading: false }))
//   }, 100)

//   onPaginationChange = (currentPage) => {
//     this.setState({ currentPage })
//     const { onChangeCurrentPage } = this.props
//     onChangeCurrentPage(currentPage, false)
//   }

//   goLoad() {
//     this.setState({ loading: true })
//   }

//   render() {
//     const { movieDate, load, error, totalMovies, currentPage } = this.state

//     return(
//       <main className="movie-page">
//         {load ? <Spin className='movie-page__spin' size='large' /> : null}
//         {error ? <Alert messasge={error.message} type='error' showIcon /> : null}
//         <MovieList movies={movieData} />
//         <Pagination
//           className="movie-page__pagination"
//           total={totalMovies}
//           current={currentPage}
//           pageSize={20}
//           size="small"
//           hideOnSinglePage
//           showSizeChanger={false}
//           onChange={this.onPaginationChange} />
//       <main/>
//     )
//   }
// }
