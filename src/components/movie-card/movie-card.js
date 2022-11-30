import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Card, Col, Row } from 'antd';

import './movie-card.css';

export default class MovieCard extends Component {
  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      id,
      title,
      releaseDate,
      genreIds,
      overview,
    } = this.props;
    // posterPath
    const genreLabel = genreIds.map((genre) => (
      <span key={genreIds.join('') + id} className="genre-wrapper">
        {genre}
      </span>
    ));

    return (
      <div className="content-wrapper">
        <h3 className="title">{title}</h3>
        <span className="date">{releaseDate}</span>
        <div className="genres">{genreLabel}</div>
        <p className="description">{overview}</p>
      </div>
    );
  }
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string.isRequired,
};

MovieCard.defaultProps = {
  genreIds: [],
};
