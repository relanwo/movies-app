/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { PropTypes } from 'prop-types';
import { Spin, Pagination, Alert } from 'antd';

import MovieCard from '../movie-card';

import './movies-list.css';

// const { Footer, Content } = Layout;

export default class MoviesList extends Component {
  render() {
    const { films, error, loading } = this.props;

    // if (loading) {
    //   return <Spin />;
    // }
    // if (films.length === 0) {
    // <p>Oops... no results</p>

    const elements = films.map((item) => {
      const { id, ...movieProps } = item;
      // console.log('a');
      return (
        <li key={id} className="card">
          <MovieCard id={id} {...movieProps} error={error} loading={loading} />
        </li>
      );
    });
    // console.log(elements);

    const pagination = elements.length !== 0 ? <Pagination defaultCurrent={1} pageSize={20} total={50} /> : null;

    const errorMessage = error ? (
      <Alert message="Error" description="Oops... something went wrong" type="error" showIcon />
    ) : null;
    const spiner = loading ? <Spin /> : null;

    const hasData = !(loading || error) && (elements.length !== 0);
    const content = hasData ? (
      <>
        <ul className="movies-list">{elements}</ul>
        {pagination}
      </>
    ) : (<Alert message="Unfortunatly, there is no results for this search" type="info" showIcon />);
    // const content = hasData && elements.length === 0 ? (
    //   <Alert message="Unfortunatly, there is no results for this search" type="info" showIcon />
    // ) : (
    //   <>
    //     <ul className="movies-list">{elements}</ul>
    //     {pagination}
    //   </>
    // );

    return (
      <>
        {errorMessage}
        {spiner}
        {content}
      </>
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
  films: [],
};
