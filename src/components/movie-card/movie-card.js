import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { format, parseISO } from 'date-fns';
import { intlFormat } from 'date-fns';

import {
  Card, Layout, Progress, Rate,
} from 'antd';
// , Spin

import './movie-card.css';

const { Sider, Content } = Layout;

export default class MovieCard extends Component {
  key = 100;
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // loading: true,
  //     error: false
  //   };
  // }

  // eslint-disable-next-line class-methods-use-this

  // eslint-disable-next-line class-methods-use-this
  setProgressColor = (value) => {
    if (value > 7) {
      return '#66E900';
    }
    if (value > 5) {
      return '#E9D100';
    }
    if (value > 3) {
      return '#E97E00';
    }
    return '#E90000';
  };

  // eslint-disable-next-line class-methods-use-this
  textShortener = (text, amountOfWords = 35) => {
    const arr = text.split(' ');
    if (arr.length <= amountOfWords) return arr.join(' ');

    return `${arr.slice(0, amountOfWords - 1).join(' ')}...`;
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      // film
      // id,
      title,
      releaseDate,
      genreIds,
      overview,
      posterPath,
      voteAverage,
      // error,
      // loading,
    } = this.props;
    // {} = this.state;

    const genreLabel = genreIds.map((genre) => (
      // eslint-disable-next-line react/no-array-index-key
      <span className="genre-wrapper" key={this.key++}>
        {genre}
      </span>
    ));

    const date = releaseDate !== null ? (
      <span className="date">
        {intlFormat(new Date(releaseDate), { year: 'numeric', month: 'long', day: 'numeric' })}
        {' '}
      </span>
    ) : null;
    // if (error) {
    //   return <p>Oops... it is an ERROR</p>;
    // }

    // const hasData = !(loading || error);

    // const errorMessage = error ? <p>Oops... it is an ERROR</p> : null;
    // const spiner = loading ? <Spin /> : null;
    // const content = hasData ? <PlanetView CardView /> : null;

    return (
      // <React.Fragmen>
      //   {errorMessage}
      //   {spiner}
      //   {content}
      // </React.Fragmen>
      <Card bordered={false}>
        <Layout>
          <Sider>
            {posterPath !== null ? (
              <img className="poster" alt="poster" src={`https://image.tmdb.org/t/p/original/${posterPath}`} />
            ) : null}
          </Sider>
          <Content>
            <h3 className="title">{title}</h3>
            {date}
            {/* format(parseISO(releaseDate), 'MMMM d, yyyy') */}
            <Progress
              type="circle"
              percent={voteAverage * 10}
              format={(percent) => (percent / 10).toFixed(1)}
              width={30}
              className="score"
              strokeColor={this.setProgressColor(voteAverage)}
            />
            <div className="genres">{genreLabel}</div>
            <p className="description">{this.textShortener(overview)}</p>
            <Rate count="10" />
          </Content>
          {/* <Footer> */}
          {/* </Footer> */}
        </Layout>
      </Card>
    );
  }
}

// function CardView({ id, title, releaseDate, genreIds, overview, posterPath }) {
// return (

// );
// }

MovieCard.propTypes = {
  // id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
  // error: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
  voteAverage: PropTypes.number.isRequired,
};

MovieCard.defaultProps = {
  genreIds: [],
  posterPath: null,
  releaseDate: null,
};
