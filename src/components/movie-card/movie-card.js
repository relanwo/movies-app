/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { format, parseISO } from 'date-fns';
import { intlFormat } from 'date-fns';

import {
  Card, Layout, Progress, Rate, Tag, Typography,
} from 'antd';
import MovieApiService from '../../services/moviedb';
import ProgressiveImage from '../progressive_image/progressive_image';
// , Spin
// import GenresContext from '../genres-context/genres-context';
import { GenresContextConsumer } from '../genres-context/genres-context';

import './movie-card.css';

const { Paragraph } = Typography;

// eslint-disable-next-line no-unused-vars
const { Sider, Content, Footer } = Layout;

// eslint-disable-next-line no-unused-vars
// const contextType = GenresContext;

export default class MovieCard extends Component {
  // key = 100;

  constructor(props) {
    super(props);
    this.api = new MovieApiService();
    this.state = {
      //   // loading: true,
      //   // error: false
      // genres: [],
      ratedMovies: localStorage.getItem('ratedMovies'),
    };
  }

  // componentDidMount() {
  // 	if (!this.props.genre_ids) {
  // 		return this.createGenresNames(this.props.genres, this.context);
  // 	}
  // 	this.createGenresNames(this.props.genreIds, this.context);
  // }

  // createGenresNames = (genresId, genresData) => {
  // 	const resultIds = genresData.filter(
  // 		(el, i) => genresId.indexOf(el.id) > -1
  // 	);
  // 	const result = resultIds.map((el) => el.name);
  // 	this.setState({ genres: result });
  // 	return result;
  // };

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

  // eslint-disable-next-line class-methods-use-this, react/no-unused-class-component-methods
  textShortener = (text, amountOfWords = 35) => {
    const arr = text.split(' ');
    if (arr.length <= amountOfWords) return arr.join(' ');

    return `${arr.slice(0, amountOfWords - 1).join(' ')}
    `;
  };

  // rateMovie = (id, value) => {
  //   // this.setState(() => ({
  //   //   loadingRated: true,
  //   // }));
  //   this.api.rateMovie(id, value);
  //   // .then(() => {
  //   //   this.setState(() => ({
  //   //     loadingRated: false,
  //   //   }));
  //   // });
  // };

  onMovieRate = (id, value) => {
    this.api.postMovieRate(id, value);
  };

  // eslint-disable-next-line consistent-return
  createRatedValue() {
    let { ratedMovies } = this.state;
    ratedMovies = JSON.parse(ratedMovies);

    // eslint-disable-next-line no-restricted-syntax
    for (const i in ratedMovies) {
      if (ratedMovies[i].movieId === this.props.id) {
        return ratedMovies[i].rate;
      }
    }
  }

  render() {
    const {
      title, releaseDate, overview, posterPath, voteAverage, genreIds,
    } = this.props;
    // const { genres } = this.state;
    // {} = this.state;

    // const genreLabel = genreIds.map((genre) => (
    //   // eslint-disable-next-line react/no-array-index-key
    //   <span className="genre-wrapper" key={this.key++}>
    //     {genre}
    //   </span>
    // ));
    let date = 'no date';
    if (releaseDate && releaseDate !== '') {
      date = (
        <span className="date">
          {intlFormat(new Date(releaseDate), { year: 'numeric', month: 'long', day: 'numeric' })}
          {' '}
        </span>
      );
    }

    // const poster = posterPath === '' || posterPath === undefined
    //   ? 'https://onlinemultfilm.com/uploads/poster_none.png'
    //   : `https://image.tmdb.org/t/p/original/${posterPath}`;

    const rate = this.createRatedValue();

    // if (error) {
    //   return <p>Oops... it is an ERROR</p>;
    // }

    // const hasData = !(loading || error);

    // const errorMessage = error ? <p>Oops... it is an ERROR</p> : null;
    // const spiner = loading ? <Spin /> : null;
    // const content = hasData ? <PlanetView CardView /> : null;

    return (
      <Card bordered={false}>
        <Layout>
          <Sider>
            {/* {posterPath !== null ? (
              <img className="poster" alt="poster" src={`https://image.tmdb.org/t/p/original/${posterPath}`} />
            ) : null} */}
            <ProgressiveImage posterPath={posterPath} />
            {/* <img
              className="poster"
              alt="poster"
              src={poster}
            /> */}
          </Sider>
          <Content>
            <h3 className="title">{title}</h3>
            {date}
            <Progress
              type="circle"
              percent={voteAverage * 10}
              format={(percent) => (percent / 10).toFixed(1)}
              width={30}
              className="score"
              strokeColor={this.setProgressColor(voteAverage)}
            />
            <GenresContextConsumer>
              {(genres) => genreIds.map((elem) => {
                let newElem = (
                  <Tag className="genre-wrapper" key={elem.id}>
                    Unknown genre
                  </Tag>
                );
                genres.forEach((genre) => {
                  if (elem === genre.id) {
                    newElem = (
                      <Tag className="genre-wrapper" key={genre.id}>
                        {genre.name}
                      </Tag>
                    );
                  }
                });
                return newElem;
              })}
            </GenresContextConsumer>
            <Paragraph ellipsis={{ rows: 3 }}>{overview}</Paragraph>
            {/* <p className="description">{this.textShortener(overview)}</p>
            <button className="show-more btn" onClick={this.onShowMore}>
              ...
            </button> */}
            <Rate
              count={10}
              defaultValue={rate}
              allowHalf
              style={{
                fontSize: '14px',
                textAlign: 'center',

                bottom: '15px',
                margin: '8px 0',
              }}
              onChange={(value) => this.onMovieRate(this.props.id, value)}
            />
          </Content>
          {/* <Footer> */}
          {/* </Footer> */}
        </Layout>
      </Card>
    );
  }
}

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
