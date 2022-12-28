/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import MovieCard from '../movie-card/movie-card';

import './movies-list.css';

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
        </li>
      );
    });

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

MoviesList.defaultProps = {
  data: [],
  error: false,
  loading: false,
};
