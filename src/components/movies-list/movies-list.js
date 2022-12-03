/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { PropTypes } from 'prop-types';
// import { Card } from 'antd';

import MovieCard from '../movie-card';

import './movies-list.css';

export default class MoviesList extends Component {
  render() {
    const { films } = this.props;

    const elements = films.map((item) => {
      const { id, ...movieProps } = item;
      console.log('a');
      return (
        <li key={id} className="card">
          <MovieCard id={id} {...movieProps} />
        </li>
      );
    });
    console.log(elements);
    return (
      <ul className="movies-list">{elements}</ul>
      // list
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      // color: React.PropTypes.string.isRequired,
      // fontSize: React.PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      // genreIds:,
      overview: PropTypes.string,
      // eslint-disable-next-line comma-dangle
    })
  ),
};

MoviesList.defaultProps = {
  films: [],
};
