/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { PropTypes } from 'prop-types';
import { Spin, Alert } from 'antd';

import MovieCard from '../movie-card/movie-card';
// import MoviesPagination from '../movies-pagination/movies-pagination';

import './movies-list.css';

// const { Footer, Content } = Layout;

export default class MoviesList extends Component {
  render() {
    const {
      data, error, errorMessage, errorType, loading,
    } = this.props.options;

    const movies = data.map((movie) => {
      const { ...movieProps } = movie;
      return (
        <li key={movie.id} className="movie-item card">
          <MovieCard {...movieProps} />
          {/* // error={error} loading={loading} /> */}
        </li>
      );
    });

    // const pagination = elements.length !== 0 ? <Pagination defaultCurrent={1} pageSize={20} total={50} /> : null;

    const hasData = !(loading || error);

    const spinner = loading ? <Spin size="large" /> : null;
    const hasError = error ? <Alert message={error} description={errorMessage} type={errorType} showIcon /> : null;
    const content = hasData ? <ul className="movies-list">{movies}</ul> : null;

    return (
      <>
        {hasError}
        {spinner}
        {content}
      </>
    );
  }
}

MoviesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // color: React.PropTypes.string.isRequired,
      // fontSize: React.PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string,
      // genreIds:,
      voteAverage: PropTypes.number.isRequired,
      overview: PropTypes.string,
      // eslint-disable-next-line comma-dangle
    })
  ),
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

MoviesList.defaultProps = {
  data: [],
};
